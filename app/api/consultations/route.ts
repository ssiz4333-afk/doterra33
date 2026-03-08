import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ConsultationSchema } from "@/lib/validations/consultation";
import { sendConsultationAlert } from "@/lib/email";

// 메모리 기반 Rate Limiting (서버리스 환경 제한 있음 — 추후 Upstash Redis로 교체 가능)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1분
    const maxRequests = 3;

    const current = rateLimit.get(ip);

    if (!current || now > current.resetAt) {
        rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
    }

    if (current.count >= maxRequests) {
        return false;
    }

    current.count += 1;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // IP 기반 Rate Limiting
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0] ??
            request.headers.get("x-real-ip") ??
            "unknown";

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요." },
                { status: 429 }
            );
        }

        // 요청 바디 파싱
        const body = await request.json();

        // Zod 유효성 검사
        const parsed = ConsultationSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "입력 정보를 확인해주세요.",
                    details: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        // DB 저장
        const consultation = await db.consultation.create({
            data: {
                name: parsed.data.name,
                phone: parsed.data.phone,
                interest: parsed.data.interest,
                message: parsed.data.message,
                utmSource: parsed.data.utmSource,
                utmMedium: parsed.data.utmMedium,
                utmCampaign: parsed.data.utmCampaign,
            },
        });

        // 관리자 이메일 알림 (비동기 fire-and-forget)
        sendConsultationAlert({
            ...parsed.data,
            createdAt: consultation.createdAt,
        }).catch((err) => {
            console.error("[Email Alert Error]", err);
        });

        return NextResponse.json(
            { success: true, id: consultation.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("[Consultation API Error]", error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
            { status: 500 }
        );
    }
}
