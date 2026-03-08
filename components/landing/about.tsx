"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Target, Award } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    icon: Leaf,
    label: "웰니스 전문가",
  },
  {
    icon: Heart,
    label: "건강한 삶의 동반자",
  },
  {
    icon: Target,
    label: "비즈니스 성공 멘토",
  },
  {
    icon: Award,
    label: "도테라 리더",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/jong-beom-seminar.jpg"
                  alt="정종범 - 도테라 웰니스 세미나 강연"
                  fill
                  className="object-cover object-center"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/20 blur-2xl -z-10" />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">dōTERRA Expert</p>
                    <p className="text-xs text-muted-foreground">Wellness Business Coach</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                안녕하세요,
                <br />
                <span className="text-primary">정종범</span>입니다.
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                도테라 에센셜 오일을 매개로 사람들의 건강과 삶의 가치를 높이는 
                <strong className="text-foreground"> 웰니스 비즈니스 전문가</strong>입니다.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                건강한 삶을 추구하는 분들과 함께 경제적 자유를 이루어 나가고 있습니다. 
                체계적인 코칭 시스템을 통해 누구나 성공할 수 있는 길을 안내해 드립니다.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
