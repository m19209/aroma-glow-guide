import { useState, useEffect, useRef } from "react";
import { BottleKey, BOTTLE_IMAGES } from "@/lib/inventory";

export const ArrowUpIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="العودة إلى الأعلى"
      // We keep it in the DOM for smooth opacity transitions per UI/UX guidelines
    >
      <ArrowUpIcon size={24} />
    </button>
  );
}

export function Bottle({ variant, label, imageSrc }: { variant: BottleKey; label: string; imageSrc?: string }) {
  const src = imageSrc || BOTTLE_IMAGES[variant];
  return (
    <img
      className="pbottle"
      src={src}
      alt={label}
      loading="lazy"
      decoding="async"
      width={1024}
      height={1024}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

export function Hero({ scrollToProducts }: { scrollToProducts: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {/* autoplay blocked — poster shows as fallback */});
  }, []);

  return (
    <section className="hero">
      <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="auto" style={{ backgroundColor: "#050505", aspectRatio: "16/9", width: "100%", height: "100%" }} poster="https://images.unsplash.com/photo-1594035919809-0d67af651cad?q=80&w=2000&auto=format&fit=crop">
        <source src={`/hero-video.mp4`} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-leak" />
      <div className="hero-vignette" />
      <div className="hero-content">
        <div className="hero-ornament">
          <div className="orn-line" />
          <span className="hero-eyebrow" style={{ margin: 0 }}>Maison de Parfum · Depuis 2010</span>
          <div className="orn-line right" />
        </div>
        <h1 className="hero-title">VELORE</h1>
        <div className="hero-title-sub">Eau de Parfum</div>
        <p className="hero-desc">عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية — مُقطَّرة بعناية من أندر المكونات لتترك أثراً لا يُنسى.</p>
        <div className="hero-actions">
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollToProducts(); }} className="btn-gold">اكتشف المجموعة</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span className="hero-scroll-label">Explore</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
