import { useEffect, useRef } from "react";

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
      <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="auto" style={{ backgroundColor: "#050505" }} poster="https://images.unsplash.com/photo-1594035919809-0d67af651cad?q=80&w=2000&auto=format&fit=crop">
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
