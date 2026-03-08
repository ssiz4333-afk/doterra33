import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; color: string }> = {
        PENDING: { label: "대기중", color: "bg-yellow-100 text-yellow-800" },
        CONTACTED: { label: "연락완료", color: "bg-blue-100 text-blue-800" },
        COMPLETED: { label: "상담완료", color: "bg-green-100 text-green-800" },
        CANCELLED: { label: "취소", color: "bg-gray-100 text-gray-800" },
    };

    const { label, color } = map[status] || map.PENDING;

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${color}`}>
            {label}
        </span>
    );
}

export default async function ConsultationsPage({
    searchParams,
}: {
    searchParams: { status?: string; page?: string };
}) {
    const statusFilter = searchParams.status || "ALL";
    const page = Number(searchParams.page) || 1;
    const take = 10;
    const skip = (page - 1) * take;

    const where = statusFilter === "ALL" ? {} : { status: statusFilter as any };

    const [total, items] = await Promise.all([
        db.consultation.count({ where }),
        db.consultation.findMany({
            where,
            orderBy: { createdAt: "desc" },
            take,
            skip,
        }),
    ]);

    const totalPages = Math.ceil(total / take);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">상담 신청 목록</h1>
                    <p className="text-muted-foreground mt-2">
                        접수된 모든 상담 신청을 관리합니다. (총 {total}건)
                    </p>
                </div>

                {/* 필터 탭 */}
                <div className="flex bg-secondary/50 p-1 rounded-xl">
                    {["ALL", "PENDING", "CONTACTED", "COMPLETED"].map((st) => {
                        const label =
                            st === "ALL"
                                ? "전체"
                                : st === "PENDING"
                                    ? "대기중"
                                    : st === "CONTACTED"
                                        ? "연락완료"
                                        : "상담완료";
                        const isActive = statusFilter === st;

                        return (
                            <Link
                                key={st}
                                href={`/admin/consultations?status=${st}`}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? "bg-card shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">이름 / 연락처</th>
                                    <th className="px-6 py-4 font-medium">관심 분야</th>
                                    <th className="px-6 py-4 font-medium">신청일시</th>
                                    <th className="px-6 py-4 font-medium">진행 상태</th>
                                    <th className="px-6 py-4 font-medium text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
                                            신청 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-secondary/10 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">{item.name}</div>
                                                <div className="text-muted-foreground text-xs mt-1">
                                                    {item.phone.replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-****-$3")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                                                {item.interest || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Intl.DateTimeFormat("ko-KR", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }).format(item.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/consultations/${item.id}`}>상세보기</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        asChild={page > 1}
                    >
                        {page > 1 ? (
                            <Link
                                href={`/admin/consultations?status=${statusFilter}&page=${page - 1
                                    }`}
                            >
                                이전
                            </Link>
                        ) : (
                            <span>이전</span>
                        )}
                    </Button>
                    <div className="flex items-center px-4 text-sm text-muted-foreground">
                        {page} / {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        asChild={page < totalPages}
                    >
                        {page < totalPages ? (
                            <Link
                                href={`/admin/consultations?status=${statusFilter}&page=${page + 1
                                    }`}
                            >
                                다음
                            </Link>
                        ) : (
                            <span>다음</span>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
