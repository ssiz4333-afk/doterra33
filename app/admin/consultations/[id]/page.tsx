import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, User, Phone, Tag, Calendar, MessageSquare, Briefcase } from "lucide-react";
import { StatusUpdater, AdminNoteUpdater } from "./actions-client";

export default async function ConsultationDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const consultation = await db.consultation.findUnique({
        where: { id: params.id },
    });

    if (!consultation) {
        notFound();
    }

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "full",
        timeStyle: "medium",
    }).format(consultation.createdAt);

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="pl-0 gap-2 hover:bg-transparent hover:text-primary">
                    <Link href="/admin/consultations">
                        <ArrowLeft className="w-4 h-4" />
                        목록으로 돌아가기
                    </Link>
                </Button>
                <StatusUpdater id={consultation.id} currentStatus={consultation.status} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">신청 상세 정보</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <User className="w-4 h-4" /> 이름
                                    </div>
                                    <p className="font-medium text-lg">{consultation.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Phone className="w-4 h-4" /> 연락처
                                    </div>
                                    <p className="font-medium text-lg text-primary">{consultation.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Briefcase className="w-4 h-4" /> 관심 분야
                                    </div>
                                    <p className="font-medium">{consultation.interest || "미입력"}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Calendar className="w-4 h-4" /> 신청 일시
                                    </div>
                                    <p className="font-medium">{formattedDate}</p>
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-border/50 pt-6">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <MessageSquare className="w-4 h-4" /> 문의 내용
                                </div>
                                <p className="whitespace-pre-line text-foreground/90 leading-relaxed bg-secondary/30 p-4 rounded-lg">
                                    {consultation.message || "입력된 문의 내용이 없습니다."}
                                </p>
                            </div>

                            {(consultation.utmSource || consultation.utmMedium || consultation.utmCampaign) && (
                                <div className="space-y-2 border-t border-border/50 pt-6">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Tag className="w-4 h-4" /> 인입 경로 (UTM)
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {consultation.utmSource && (
                                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                                                Source: {consultation.utmSource}
                                            </span>
                                        )}
                                        {consultation.utmMedium && (
                                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                                                Medium: {consultation.utmMedium}
                                            </span>
                                        )}
                                        {consultation.utmCampaign && (
                                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                                                Campaign: {consultation.utmCampaign}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-6">
                        <CardHeader>
                            <CardTitle className="text-lg">관리자 메모</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminNoteUpdater id={consultation.id} rawNote={consultation.adminNote || ""} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
