"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";
import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  FileTextIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  {
    icon: LinkedinIcon,
    href: PROFILE.linkedin,
    label: "LinkedIn",
    color: "#E88B8B",
    desc: "Let's connect professionally",
  },
  {
    icon: GithubIcon,
    href: PROFILE.github,
    label: "GitHub",
    color: "#f0ece4",
    desc: "Explore my repositories",
  },
  {
    icon: MailIcon,
    href: `mailto:${PROFILE.email}`,
    label: "Email",
    color: "#d4a574",
    desc: PROFILE.email,
  },
  {
    icon: FileTextIcon,
    href: PROFILE.resumeUrl,
    label: "Resume",
    color: "#c4917a",
    desc: "View my experience",
  },
];

function ContactCard({
  link,
}: {
  link: (typeof LINKS)[number];
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const Icon = link.icon;

  return (
    <MagneticButton strength={0.2}>
      <a
        ref={cardRef}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        data-contact-card
        className="group relative flex items-center gap-5 p-7 rounded-2xl transition-colors duration-300"
        style={{
          border: `1px solid ${link.color}08`,
          background: `linear-gradient(145deg, ${link.color}04, rgba(10,10,8,0.97))`,
          transformStyle: "preserve-3d",
          perspective: "800px",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${link.color}10, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top border shimmer */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${link.color}35, transparent)`,
          }}
        />

        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            border: `1px solid ${link.color}12`,
            background: `${link.color}06`,
          }}
        >
          <Icon
            size={20}
            style={{ color: link.color }}
            className="opacity-50 group-hover:opacity-90 transition-all duration-300 group-hover:rotate-[-8deg]"
          />
        </div>

        <div className="relative flex-1 min-w-0">
          <p className="text-xs font-mono opacity-35 mb-1 tracking-wider uppercase">
            {link.label}
          </p>
          <p className="text-sm opacity-45 group-hover:opacity-75 transition-opacity duration-300 truncate">
            {link.desc}
          </p>
        </div>

        <ArrowUpRightIcon
          size={16}
          className="relative opacity-0 group-hover:opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
        />
      </a>
    </MagneticButton>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 3D perspective entrance — tilts toward viewer
      gsap.fromTo(
        section,
        { rotateX: 4, z: -60, scale: 0.96, opacity: 0.5, transformPerspective: 1200 },
        {
          rotateX: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "top 25%",
            scrub: 0.8,
          },
        }
      );

      // Giant title — each character reveals with stagger
      if (title) {
        const chars = title.querySelectorAll(".char");
        gsap.from(chars, {
          y: 100,
          rotateX: -90,
          opacity: 0,
          duration: 1.4,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Status badge
      gsap.from("[data-status]", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Subtitle
      gsap.from("[data-contact-sub]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Contact cards stagger
      gsap.from("[data-contact-card]", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          toggleActions: "play none none none",
        },
      });

      // Divider line
      gsap.from("[data-contact-line]", {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform, opacity" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-40 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a08 0%, #16120e 50%, #080806 100%)",
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, #E88B8B, transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #d4a574, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite 2s",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Status badge */}
        <div
          data-status
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <div className="relative flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              border: "1px solid rgba(74, 222, 128, 0.12)",
              background: "rgba(74, 222, 128, 0.04)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-green-400"
              style={{ animation: "status-pulse 2s ease-in-out infinite" }}
            />
            <span className="text-[10px] font-mono tracking-wider text-green-400/70 uppercase">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Giant title */}
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide"
            style={{
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              perspective: "600px",
            }}
          >
            {splitChars("Let's Talk")}
          </h2>
        </div>

        {/* Animated divider */}
        <div
          data-contact-line
          className="w-24 h-px mx-auto mb-8 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E88B8B, transparent)",
          }}
        />

        <p
          data-contact-sub
          className="text-sm opacity-30 max-w-lg mx-auto text-center mb-16 leading-relaxed"
        >
          Open to opportunities, collaborations, and interesting conversations.
          Let&apos;s build something remarkable together.
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {LINKS.map((link) => (
            <ContactCard key={link.label} link={link} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-32 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(232,139,139,0.04)" }}
        >
          <p className="text-[10px] font-mono opacity-12">
            © {new Date().getFullYear()} {PROFILE.name}.
          </p>
        </div>
      </div>
    </section>
  );
}
