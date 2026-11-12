"use client";

import Link from "@/i18n/Link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Send } from "lucide-react";
import { Fragment } from "react";
import { useDictionary } from "@/i18n/I18nProvider";

const heroFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (n: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + n * 0.1,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function HeroSection() {
  const { hero } = useDictionary().home;
  return (
    <section
      className="relative flex items-center overflow-hidden bg-transparent"
      style={{
        height: "100vh",
        minHeight: "600px",
      }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/image/main/m-1.jpg")',
          opacity: 1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/25 to-transparent z-[1]" />
      <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply">
        <motion.div
          className="absolute top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply border border-white/10"
          style={{
            backgroundColor: "rgba(242, 114, 69, 0.3)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[5%] right-[0%] w-[50vw] h-[60vw] rounded-l-[100vw] mix-blend-multiply border border-white/10"
          style={{
            backgroundColor: "rgba(56, 139, 219, 0.3)",
          }}
          animate={{
            x: [0, -20, 20, 0],
            scale: [1, 1.02, 0.98, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply border border-white/10"
          style={{
            backgroundColor: "rgba(224, 75, 87, 0.3)",
          }}
          animate={{
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply border border-white/10"
          style={{
            backgroundColor: "rgba(45, 153, 149, 0.2)",
          }}
          animate={{
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div
        className="absolute inset-0 z-0 border-white/10"
        style={{
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px), 
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-x-0 top-1/2 -mt-[250px] h-[500px] z-0 bg-white/10 backdrop-blur-[4px]" />
      <div className="relative z-10 mx-auto px-6 sm:px-8 w-full max-w-[1440px] pt-32 md:pt-0">
        <div className="max-w-[800px] bg-white/60 backdrop-blur-md p-8 sm:p-10 md:p-16 rounded-[40px] border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={heroFadeUp}
            className="flex items-center"
            style={{
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#E84B3A",
                width: "24px",
                height: "2px",
              }}
            />
            <span
              className="font-display font-bold uppercase"
              style={{
                fontSize: "0.7rem",
                color: "#1a1a1a",
                letterSpacing: "0.2em",
              }}
            >
              {hero.eyebrow}
            </span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={heroFadeUp}
            className="font-display font-medium text-[#111827] leading-[1.08] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              marginBottom: "1.25rem",
            }}
          >
            <span className="block font-bold">{hero.titleLine1}</span>
            <span>{hero.titleLead}</span>{" "}
            <span className="relative inline-block text-[#2563EB]">{hero.titleHighlight}</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={heroFadeUp}
            className="font-sans font-medium text-[#111827]"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              maxWidth: "520px",
              lineHeight: 1.5,
              marginBottom: "2.5rem",
            }}
          >
            {hero.descLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={heroFadeUp}
            className="flex items-center flex-wrap"
            style={{
              gap: "1.25rem",
            }}
          >
            <Link
              href="/services"
              className="flex items-center gap-2 text-white rounded-full font-display font-semibold no-underline transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: "#1E293B",
                fontSize: "0.95rem",
                padding: "1rem 2.25rem",
                letterSpacing: "0.02em",
              }}
            >
              {hero.ctaServices} <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full font-display font-semibold no-underline transition-all bg-white hover:bg-gray-50 border border-gray-200"
              style={{
                color: "#1E293B",
                fontSize: "0.95rem",
                padding: "1rem 2.25rem",
                letterSpacing: "0.02em",
              }}
            >
              {hero.ctaContact} <Send size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          {
            color: "#E84B3A",
            top: "30%",
            left: "15%",
          },
          {
            color: "#2563EB",
            top: "70%",
            left: "80%",
          },
          {
            color: "#F59E0B",
            top: "80%",
            left: "25%",
          },
          {
            color: "#10B981",
            top: "20%",
            left: "75%",
          },
        ].map((n, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: n.color,
              width: 8,
              height: 8,
              top: n.top,
              left: n.left,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute -inset-2 rounded-full opacity-30 blur-sm"
              style={{
                backgroundColor: n.color,
              }}
            />
            <svg
              className="absolute pointer-events-none"
              style={{
                top: "4px",
                left: "4px",
                width: "200px",
                height: "200px",
                overflow: "visible",
                opacity: 0.2,
              }}
            >
              <path
                d={`M0,0 L${i % 2 === 0 ? 100 : -100},${i % 3 === 0 ? -80 : 120}`}
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
