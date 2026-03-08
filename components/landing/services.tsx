"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: BarChart3,
    title: "도테라 비즈니스 코칭",
    description: "성공적인 네트워크 마케팅 전략과 수익 구조 최적화 가이드",
    features: ["맞춤형 비즈니스 전략 수립", "수익 구조 분석 및 최적화", "성공 사례 기반 코칭"],
  },
  {
    icon: Users,
    title: "리더십 코칭",
    description: "팀을 이끄는 힘, 건강한 조직 문화를 만드는 리더십 인사이트",
    features: ["효과적인 팀 빌딩 전략", "동기부여 및 멘토링 스킬", "지속 가능한 성장 시스템"],
  },
  {
    icon: Instagram,
    title: "인스타그램 마케팅 코칭",
    description: "퍼스널 브랜딩부터 실전 마케팅까지, SNS를 통한 비즈니스 확장법",
    features: ["콘텐츠 전략 및 기획", "팔로워 성장 전략", "전환율 최적화 기법"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function Services() {
  return (
    <section id="services" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">전문 코칭</span> 서비스
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            비즈니스 성공을 위한 체계적이고 전문적인 코칭 프로그램
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
