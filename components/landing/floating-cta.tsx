"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Expanded Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-16 right-0 flex flex-col gap-3"
                >
                  <motion.a
                    href="tel:010-6283-3743"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-card text-foreground px-4 py-3 rounded-full shadow-lg border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-medium pr-2">전화 상담</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.instagram.com/erang_coach"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-card text-foreground px-4 py-3 rounded-full shadow-lg border border-border/50 hover:border-accent/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <span className="font-medium pr-2">DM 문의</span>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              size="lg"
              className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
                isOpen
                  ? "bg-muted hover:bg-muted/80 text-muted-foreground"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
              </motion.div>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
