"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  // URL에서 UTM 파라미터 자동 추출
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      interest: (formData.get("interest") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
      ...utmParams,
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        if (response.status === 429) {
          setErrorMessage("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        } else if (response.status === 400 && data.details) {
          const firstError = Object.values(data.details).flat()[0] as string;
          setErrorMessage(firstError || "입력 정보를 다시 확인해주세요.");
        } else {
          setErrorMessage(data.error || "오류가 발생했습니다. 다시 시도해주세요.");
        }
        setIsError(true);
      }
    } catch {
      setIsError(true);
      setErrorMessage("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">코칭 상담</span> 신청
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            지금 바로 상담을 신청하시고, 새로운 시작을 함께하세요.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">연락처 정보</h3>
                <p className="text-muted-foreground leading-relaxed">
                  궁금한 점이 있으시면 언제든지 연락주세요.
                  <br />
                  빠른 시간 내에 답변 드리겠습니다.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <a
                      href="tel:010-6283-3743"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">전화 상담</p>
                        <p className="text-lg font-semibold text-foreground">010-6283-3743</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <a
                      href="https://www.instagram.com/erang_coach"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                        <Instagram className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">인스타그램</p>
                        <p className="text-lg font-semibold text-foreground">@erang_coach</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Quote */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <p className="text-foreground italic leading-relaxed">
                  {'"'}건강한 삶과 경제적 자유, 두 가지 모두를 이룰 수 있습니다.
                  함께 시작해보세요.{'"'}
                </p>
                <p className="text-primary font-semibold mt-4">— 정종범</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-card border-border/50">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        상담 신청이 완료되었습니다!
                      </h3>
                      <p className="text-muted-foreground">
                        빠른 시간 내에 연락 드리겠습니다.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="홍길동"
                          required
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="010-0000-0000"
                          required
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="interest" className="text-sm font-medium text-foreground">
                          관심 분야
                        </label>
                        <Input
                          id="interest"
                          name="interest"
                          placeholder="비즈니스 코칭, 리더십 코칭 등"
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          문의 내용
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="궁금한 점을 자유롭게 작성해주세요."
                          rows={4}
                          className="bg-secondary/50 border-border focus:border-primary resize-none"
                        />
                      </div>

                      {/* 에러 메시지 */}
                      {isError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                        >
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <p className="text-sm">{errorMessage}</p>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            전송 중...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            상담 신청하기
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
