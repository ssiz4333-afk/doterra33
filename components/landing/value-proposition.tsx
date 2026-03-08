"use client";

import { motion } from "framer-motion";
import { Store, Wallet, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const valueProps = [
  {
    icon: Store,
    title: "무점포",
    subtitle: "No Store Required",
    description: "장소의 제약 없이 어디서든 비즈니스가 가능합니다.",
  },
  {
    icon: Wallet,
    title: "무자본",
    subtitle: "No Capital Required",
    description: "초기 비용 부담 없이 열정만으로 시작할 수 있습니다.",
  },
  {
    icon: GraduationCap,
    title: "무경험",
    subtitle: "No Experience Required",
    description: "체계적인 교육 시스템으로 초보자도 전문가가 됩니다.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function ValueProposition() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            누구나 시작할 수 있는 <span className="text-primary">3無 비즈니스</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            진입 장벽 없이 시작하는 새로운 형태의 웰니스 비즈니스
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {valueProps.map((prop, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <prop.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{prop.title}</h3>
                  <p className="text-sm text-accent font-medium mb-4">{prop.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
