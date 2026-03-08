import { auth, signOut } from "@/auth";
import { Leaf, LayoutDashboard, List, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            {/* Sidebar for Desktop */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border/50 hidden lg:flex flex-col z-50">
                <div className="h-16 flex items-center px-6 border-b border-border/50 bg-primary/5">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-foreground">웰니스 관리자</span>
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        메뉴
                    </p>
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">대시보드</span>
                    </Link>
                    <Link
                        href="/admin/consultations"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                        <List className="w-5 h-5" />
                        <span className="font-medium">상담 신청 목록</span>
                    </Link>
                </div>

                <div className="p-4 border-t border-border/50">
                    <div className="px-3 py-2 mb-2">
                        <p className="text-sm font-medium text-foreground">
                            {session?.user?.name || "관리자"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {session?.user?.email}
                        </p>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-foreground/70 hover:text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            로그아웃
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="h-16 flex items-center justify-between px-4 bg-card border-b border-border/50 lg:hidden">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-primary" />
                        <span className="font-bold text-foreground">웰니스 관리자</span>
                    </Link>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                </header>

                <main className="flex-1 p-4 md:p-8 h-full max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
