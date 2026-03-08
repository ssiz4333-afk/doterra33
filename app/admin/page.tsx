import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PhoneCall, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function formatPhone(phone: string) {
    // 예: 010-6283-3743 -> 010-6***-3743
    return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-****-$3");
}

export default async function AdminDashboard() {
    const [
        totalCount,
        pendingCount,
        contactedCount,
        completedCount,
        recentConsultations,
    ] = await Promise.all([
        db.consultation.count(),
        db.consultation.count({ where: { status: "PENDING" } }),
        db.consultation.count({ where: { status: "CONTACTED" } }),
        db.consultation.count({ where: { status: "COMPLETED" } }),
        db.consultation.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        }),
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground">대시보드</h1>
                <p className="text-muted-foreground mt-2">
                    상담 신청 현황을 한눈에 파악하세요.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            총 신청 건수
                        </CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCount}건</div>
                    </CardContent>
                </Card>
                <Card className="bg-card border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            대기중
                        </CardTitle>
                        <Clock className="w-4 h-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingCount}건</div>
                    </CardContent>
                </Card>
                <Card className="bg-card border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            연락 완료
                        </CardTitle>
                        <PhoneCall className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{contactedCount}건</div>
                    </CardContent>
                </Card>
                <Card className="bg-card border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            상담 완료
                        </CardTitle>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedCount}건</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>최근 신청 목록 (5건)</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/consultations">전체 보기</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentConsultations.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg bg-secondary/20">
                                아직 신청 내역이 없습니다.
                            </p>
                        ) : (
                            recentConsultations.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border/50 rounded-lg bg-card/50 hover:bg-card transition-colors"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground">
                                            {item.name}{" "}
                                            <span className="text-muted-foreground font-normal ml-2">
                                                {formatPhone(item.phone)}
                                            </span>
                                        </p>
                                        {item.interest && (
                                            <p className="text-xs text-muted-foreground">
                                                관심: {item.interest}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                        <span className="text-xs text-muted-foreground">
                                            {new Intl.DateTimeFormat("ko-KR", {
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(item.createdAt)}
                                        </span>
                                        <Button variant="secondary" size="sm" asChild>
                                            <Link href={`/admin/consultations/${item.id}`}>
                                                상세 확인
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
