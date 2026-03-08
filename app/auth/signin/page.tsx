import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, AlertCircle } from "lucide-react";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage({
    searchParams,
}: {
    searchParams: { error?: string; callbackUrl?: string };
}) {
    const errorMessage = searchParams.error
        ? "이메일이나 비밀번호가 일치하지 않습니다."
        : null;

    async function loginAction(formData: FormData) {
        "use server";
        try {
            await signIn("credentials", {
                ...Object.fromEntries(formData),
                redirectTo: searchParams.callbackUrl || "/admin",
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        redirect("/auth/signin?error=CredentialsSignin");
                    default:
                        redirect("/auth/signin?error=Default");
                }
            }
            throw error;
        }
    }

    return (
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
                <div className="bg-primary/5 p-8 text-center border-b border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        관리자 로그인
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        도테라 웰니스 대시보드에 접근합니다.
                    </p>
                </div>

                <div className="p-8">
                    {errorMessage && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-6">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-sm text-balance">{errorMessage}</p>
                        </div>
                    )}

                    <form action={loginAction} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                className="bg-secondary/50 border-border focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-secondary/50 border-border focus:border-primary"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                        >
                            로그인
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
