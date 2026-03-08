"use client";

import { motion } from "framer-motion";
import { Leaf, Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-background" />
              </div>
              <div>
                <p className="font-bold text-lg text-background">정종범</p>
                <p className="text-sm text-background/70">dōTERRA Wellness Coach</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="tel:010-6283-3743"
                className="flex items-center gap-2 text-background/80 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>010-6283-3743</span>
              </a>
              <a
                href="https://www.instagram.com/erang_coach"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/80 hover:text-background transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@erang_coach</span>
              </a>
            </div>
          </div>

          <div className="border-t border-background/10 mt-8 pt-8 text-center">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} 정종범. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
