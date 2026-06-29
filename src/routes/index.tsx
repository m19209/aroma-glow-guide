import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { VELORE_CSS } from "@/lib/velore-styles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VELORE — Eau de Parfum" },
      { name: "description", content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية." },
      { property: "og:title", content: "VELORE — Eau de Parfum" },
      { property: "og:description", content: "Maison de Parfum — عطور فاخرة." },
    ],
  }),
  component: Index,
});

type Product = {
  id: string;
  name: string;
  family: string;
  notes: string;
  price: number;
  oldPrice?: number;
  volume: string;
  badge?: { label: string; variant: "new" | "sale" | "hot" | "limited" };
  bottle: "noir" | "rose" | "oud" | "azur" | "vert" | "velvet";
  label: string;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Noir Absolu", family: "Oriental · Wood", notes: "العنبر · المسك الأسود · خشب العود · الفانيليا", price: 495, volume: "50 ML", badge: { label: "NEW", variant: "new" }, bottle: "noir", label: "NOIR ABSOLU" },
  { id: "p2", name: "Rose Royale", family: "Floral · Musky", notes: "وردة الطائف · الياسمين · المسك الأبيض · الخوخ", price: 520, oldPrice: 650, volume: "75 ML", badge: { label: "BEST SELLER", variant: "hot" }, bottle: "rose", label: "ROSE ROYALE" },
  { id: "p3", name: "Oud Impériale", family: "Oud · Amber", notes: "العود الهندي · الصندل · الكهرمان · المسك الملكي", price: 890, volume: "100 ML", badge: { label: "LIMITED", variant: "limited" }, bottle: "oud", label: "OUD IMPERIALE" },
  { id: "p4", name: "Azur Nuit", family: "Aquatic · Fresh", notes: "الليمون · بيرغامو · الهواء البحري · السيدر", price: 304, oldPrice: 380, volume: "50 ML", badge: { label: "SALE 20%", variant: "sale" }, bottle: "azur", label: "AZUR NUIT" },
  { id: "p5", name: "Vert Sacré", family: "Green · Woody", notes: "أوراق البنفسج · النعناع · خشب الصندل · المسك", price: 420, volume: "75 ML", bottle: "vert", label: "VERT SACRÉ" },
  { id: "p6", name: "Velvet Rose", family: "Floral · Luxe", notes: "الوردة الجورجية · الفراولة · المسك الوردي · الباتشولي", price: 720, volume: "100 ML", badge: { label: "NEW", variant: "new" }, bottle: "velvet", label: "VELVET ROSE" },
];

const CATEGORIES = [
  { key: "oriental", name: "Oriental", count: "٢٤ عطراً", icon: "🌙", bgClass: "cat-oriental" },
  { key: "floral", name: "Floral", count: "١٨ عطراً", icon: "🌸", bgClass: "cat-floral" },
  { key: "woody", name: "Oud & Wood", count: "٣١ عطراً", icon: "🌿", bgClass: "cat-woody" },
];

function Bottle({ variant, label }: { variant: Product["bottle"]; label: string }) {
  // Single bottle shape, color varies by gradient
  const grads: Record<Product["bottle"], [string, string, string]> = {
    noir: ["#1A1510", "#3A3020", "#150F08"],
    rose: ["#1A0E14", "#2A1820", "#100810"],
    oud: ["#180E04", "#2A1A08", "#100A02"],
    azur: ["#080E18", "#101C2E", "#050A12"],
    vert: ["#0A1208", "#141E10", "#080E06"],
    velvet: ["#180808", "#281010", "#100404"],
  };
  const [c1, c2, c3] = grads[variant];
  const gid = `g-${variant}`;
  const ggid = `gg-${variant}`;
  return (
    <svg className="pbottle" viewBox="0 0 110 200" fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
        <linearGradient id={ggid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#7A5A18" />
        </linearGradient>
      </defs>
      <ellipse cx="55" cy="190" rx="32" ry="6" fill="rgba(201,168,76,.15)" />
      <rect x="16" y="50" width="78" height="134" rx="6" fill={`url(#${gid})`} stroke="rgba(201,168,76,.35)" strokeWidth=".8" />
      <rect x="19" y="55" width="6" height="122" rx="3" fill="rgba(201,168,76,.15)" />
      <rect x="38" y="22" width="34" height="30" rx="4" fill={`url(#${gid})`} stroke="rgba(201,168,76,.25)" strokeWidth=".8" />
      <rect x="30" y="6" width="50" height="18" rx="3" fill={`url(#${ggid})`} />
      <rect x="34" y="7" width="9" height="14" rx="2" fill="rgba(255,255,255,.18)" />
      <rect x="22" y="88" width="66" height="64" rx="2" fill="rgba(201,168,76,.07)" stroke="rgba(201,168,76,.3)" strokeWidth=".6" />
      <text x="55" y="106" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="7" fill="rgba(201,168,76,.95)" letterSpacing="1">V</text>
      <line x1="35" y1="110" x2="75" y2="110" stroke="rgba(201,168,76,.25)" strokeWidth=".5" />
      <text x="55" y="122" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="6.5" fill="rgba(201,168,76,.9)" letterSpacing="3">VELORE</text>
      <text x="55" y="135" textAnchor="middle" fontFamily="sans-serif" fontSize="4" fill="rgba(201,168,76,.55)" letterSpacing="2.5">{label}</text>
      <line x1="35" y1="141" x2="75" y2="141" stroke="rgba(201,168,76,.2)" strokeWidth=".5" />
      <text x="55" y="150" textAnchor="middle" fontFamily="sans-serif" fontSize="3.5" fill="rgba(201,168,76,.4)" letterSpacing="1.5">EAU DE PARFUM</text>
    </svg>
  );
}

type CartLine = { product: Product; qty: number };

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [filterCat, setFilterCat] = useState<string | null>(null);

  // Persist
  useEffect(() => {
    try {
      const c = localStorage.getItem("velore_cart");
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem("velore_wish");
      if (w) setWishlist(new Set(JSON.parse(w)));
    } catch {/* noop */}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("velore_cart", JSON.stringify(cart)); } catch {/* noop */}
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem("velore_wish", JSON.stringify([...wishlist])); } catch {/* noop */}
  }, [wishlist]);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when cart open
  useEffect(() => {
    document.body.style.overflow = cartOpen || mobileOpen || searchOpen ? "hidden" : "";
  }, [cartOpen, mobileOpen, searchOpen]);

  const cartCount = cart.reduce((a, l) => a + l.qty, 0);
  const cartTotal = cart.reduce((a, l) => a + l.qty * l.product.price, 0);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }
  function addToCart(p: Product) {
    setCart((c) => {
      const found = c.find((l) => l.product.id === p.id);
      if (found) return c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { product: p, qty: 1 }];
    });
    showToast(`تمت إضافة ${p.name} إلى الحقيبة`);
  }
  function removeLine(id: string) { setCart((c) => c.filter((l) => l.product.id !== id)); }
  function setQty(id: string, qty: number) {
    if (qty <= 0) return removeLine(id);
    setCart((c) => c.map((l) => (l.product.id === id ? { ...l, qty } : l)));
  }
  function toggleWish(id: string) {
    setWishlist((w) => {
      const n = new Set(w);
      if (n.has(id)) { n.delete(id); showToast("أُزيل من المفضلة"); }
      else { n.add(id); showToast("أُضيف إلى المفضلة"); }
      return n;
    });
  }
  function scrollTo(id: string) {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function checkout() {
    if (cart.length === 0) return;
    showToast("جارٍ تحويلك إلى الدفع…");
    window.setTimeout(() => {
      setCart([]);
      setCartOpen(false);
      showToast("شكراً لطلبك! تم إتمام الدفع.");
    }, 1200);
  }
  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { showToast("الرجاء إدخال بريد صحيح"); return; }
    showToast("تم اشتراكك! تحقق من بريدك.");
    setEmail("");
  }

  const visibleProducts = useMemo(() => {
    let list = PRODUCTS;
    if (filterCat) {
      list = list.filter((p) => {
        const f = p.family.toLowerCase();
        if (filterCat === "oriental") return f.includes("oriental");
        if (filterCat === "floral") return f.includes("floral");
        if (filterCat === "woody") return f.includes("oud") || f.includes("wood");
        return true;
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q) || p.notes.includes(q));
    }
    return list;
  }, [filterCat, searchQuery]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VELORE_CSS }} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="nav-logo">
          <span className="nav-logo-text">VELORE</span>
        </a>
        <ul className="nav-links">
          <li><a href="#collections" onClick={(e) => { e.preventDefault(); scrollTo("collections"); }}>Collections</a></li>
          <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>Parfums</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>Notre Maison</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>Newsletter</a></li>
        </ul>
        <div className="nav-right">
          <button className="nav-icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
            <span className="cart-label">الحقيبة ({cartCount})</span>
          </button>
          <button className="nav-hamburger" aria-label="Menu" onClick={() => setMobileOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu open">
          <a href="#collections" onClick={(e) => { e.preventDefault(); scrollTo("collections"); }}>Collections</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>Parfums</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>Notre Maison</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>Newsletter</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="https://www.dropbox.com/scl/fi/otbgvp5emmg3ulf020xxx/Perfume-Blender-3D-Animation-b3d-blender-houdini-cgi-productads-perfume-blender3D.mp4?rlkey=g92ylnm82zb4i3z6gq8gtvzci&st=82jej8qb&dl=1" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="hero-ornament">
            <div className="orn-line" />
            <div className="orn-diamond" />
            <div className="orn-line right" />
          </div>
          <div className="hero-eyebrow">Maison de Parfum · Depuis 2010</div>
          <h1 className="hero-title">VELORE</h1>
          <div className="hero-title-sub">✦ &nbsp; Eau de Parfum &nbsp; ✦</div>
          <p className="hero-desc">عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية — مُقطَّرة بعناية من أندر المكونات لتترك أثراً لا يُنسى.</p>
          <div className="hero-actions">
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }} className="btn-gold">اكتشف المجموعة</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }} className="btn-outline-light">قصتنا</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="stat-n">73+</div><div className="stat-l">عطراً حصرياً</div></div>
          <div className="hero-stat"><div className="stat-n">12</div><div className="stat-l">دولة حول العالم</div></div>
          <div className="hero-stat"><div className="stat-n">98%</div><div className="stat-l">رضا العملاء</div></div>
          <div className="hero-stat"><div className="stat-n">15</div><div className="stat-l">سنة خبرة</div></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: 56 }}>
              {["Premium Quality", "Finest Ingredients", "Long Lasting Fragrance", "Timeless Elegance", "شحن مجاني فوق ٣٠٠ ريال", "عطور أصلية مضمونة ١٠٠٪"].map((t, j) => (
                <span key={j} className="mitem"><span className="mdot" />{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section id="collections">
        <div className="section-header">
          <div className="section-eyebrow">Collections Exclusives</div>
          <h2 className="section-title">اختر <em>عالمك</em></h2>
        </div>
        <div className="categories">
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`cat-card ${filterCat === c.key ? "active" : ""}`}
                onClick={() => { setFilterCat(filterCat === c.key ? null : c.key); scrollTo("products"); }}
                aria-pressed={filterCat === c.key}
              >
                <div className={`cat-bg ${c.bgClass}`} />
                <div className="cat-glow" />
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-info">
                  <div className="cat-line" />
                  <div className="cat-name">{c.name}</div>
                  <div className="cat-count">{c.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="divider">
        <div className="div-line" />
        <div className="div-ornament">
          <div className="div-diamond" />
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: ".6rem", letterSpacing: ".3em", color: "var(--gold-dim)" }}>VELORE</span>
          <div className="div-diamond" />
        </div>
        <div className="div-line" />
      </div>

      {/* PRODUCTS */}
      <section id="products">
        <div className="section-header products-header">
          <div className="section-eyebrow">Best Sellers</div>
          <h2 className="section-title">عطور <em>تُعرِّفك</em></h2>
          {filterCat && (
            <button className="filter-clear" onClick={() => setFilterCat(null)}>إزالة الفلتر ×</button>
          )}
        </div>
        <div className="products">
          <div className="products-grid">
            {visibleProducts.length === 0 && (
              <div className="empty-state">لا توجد عطور تطابق بحثك.</div>
            )}
            {visibleProducts.map((p) => (
              <div className="pcard" key={p.id}>
                {p.badge && <span className={`pbadge badge-${p.badge.variant}`}>{p.badge.label}</span>}
                <div className="pimg-wrap">
                  <div className="pimg-glow" />
                  <div className="pimg-inner"><Bottle variant={p.bottle} label={p.label} /></div>
                </div>
                <div className="pinfo">
                  <div className="pfamily">{p.family}</div>
                  <div className="pname">{p.name}</div>
                  <div className="pnotes">{p.notes}</div>
                  <div className="pfooter">
                    <div>
                      {p.oldPrice && <span className="pprice-old">{p.oldPrice}</span>}
                      <span className="pprice">{p.price} ر.س</span>
                    </div>
                    <div className="pright">
                      <span className="pvol">{p.volume}</span>
                      <button
                        className={`pwish ${wishlist.has(p.id) ? "active" : ""}`}
                        onClick={() => toggleWish(p.id)}
                        aria-label="المفضلة"
                      >{wishlist.has(p.id) ? "♥" : "♡"}</button>
                    </div>
                  </div>
                </div>
                <button className="pcard-buy" onClick={() => addToCart(p)}>Add to Cart — أضف للحقيبة</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features" id="features">
        {[
          { i: "👑", t: "Premium Quality", d: "عطور من أعلى درجات الجودة العالمية" },
          { i: "🌿", t: "Finest Ingredients", d: "مكونات طبيعية نقية من أندر بقاع العالم" },
          { i: "✨", t: "Long Lasting", d: "ثبات استثنائي يدوم طوال اليوم وما بعده" },
          { i: "💎", t: "Timeless Elegance", d: "تغليف فاخر يليق بمستوى عطورنا" },
        ].map((f, i) => (
          <div className="feat-item" key={i}>
            <div className="feat-icon">{f.i}</div>
            <div className="feat-title">{f.t}</div>
            <div className="feat-desc">{f.d}</div>
          </div>
        ))}
      </div>

      {/* NEWSLETTER */}
      <div className="newsletter" id="about">
        <h2>Rejoignez <span>Velore</span></h2>
        <p>اشترك وكن أول من يعلم بالمجموعات الحصرية الجديدة. خصم ١٥٪ على أول طلب.</p>
        <form className="nl-form" onSubmit={subscribe}>
          <input className="nl-input" type="email" placeholder="بريدك الإلكتروني..." value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="nl-btn" type="submit">Join Now</button>
        </form>
      </div>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo-wrap">
            <span className="footer-logo-name">VELORE</span>
          </div>
          <span className="footer-logo-sub">MAISON DE PARFUM</span>
          <p className="footer-tagline">صناعة العطور كفنّ — كل قارورة قصة، كل رائحة ذكرى.</p>
          <div className="footer-socials">
            {["IG", "FB", "TW", "YT"].map((s) => (
              <a href="#" key={s} className="social-btn" onClick={(e) => e.preventDefault()}>{s}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Maison</h4>
          <ul>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>قصتنا</a></li>
            <li><a href="#collections" onClick={(e) => { e.preventDefault(); scrollTo("collections"); }}>المجموعات</a></li>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>العطور</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Service</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>الشحن</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>الإرجاع</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>الأسئلة</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@velore.com">hello@velore.com</a></li>
            <li><a href="tel:+966500000000">+966 50 000 0000</a></li>
            <li>الرياض · المملكة العربية السعودية</li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2026 VELORE · TOUS DROITS RÉSERVÉS</p>
        <div className="pay-chips">
          {["VISA", "MASTER", "MADA", "APPLE PAY"].map((c) => <span key={c} className="pay-chip">{c}</span>)}
        </div>
      </div>

      {/* CART DRAWER */}
      <div className={`drawer-backdrop ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="cart-head">
          <h3>الحقيبة <span>({cartCount})</span></h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="إغلاق">×</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛍️</div>
              <p>حقيبتك فارغة</p>
              <button className="btn-gold" onClick={() => { setCartOpen(false); scrollTo("products"); }}>تصفح العطور</button>
            </div>
          ) : (
            cart.map((l) => (
              <div className="cart-line" key={l.product.id}>
                <div className="cart-line-img"><Bottle variant={l.product.bottle} label={l.product.label} /></div>
                <div className="cart-line-info">
                  <div className="cart-line-name">{l.product.name}</div>
                  <div className="cart-line-fam">{l.product.family} · {l.product.volume}</div>
                  <div className="cart-line-price">{l.product.price * l.qty} ر.س</div>
                  <div className="qty">
                    <button onClick={() => setQty(l.product.id, l.qty - 1)} aria-label="-">−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="+">+</button>
                    <button className="qty-remove" onClick={() => removeLine(l.product.id)}>حذف</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span>المجموع</span>
              <strong>{cartTotal} ر.س</strong>
            </div>
            <button className="btn-gold" style={{ width: "100%" }} onClick={checkout}>إتمام الدفع</button>
          </div>
        )}
      </aside>

      {/* SEARCH MODAL */}
      <div className={`drawer-backdrop ${searchOpen ? "open" : ""}`} onClick={() => setSearchOpen(false)} />
      {searchOpen && (
        <div className="search-modal" onClick={(e) => e.stopPropagation()}>
          <input
            autoFocus
            className="search-input"
            placeholder="ابحث عن عطر، عائلة، نوتة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-results">
            {PRODUCTS.filter((p) => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q) || p.notes.includes(q);
            }).map((p) => (
              <button key={p.id} className="search-item" onClick={() => { setSearchOpen(false); scrollTo("products"); }}>
                <span>{p.name}</span>
                <span className="search-item-fam">{p.family} · {p.price} ر.س</span>
              </button>
            ))}
          </div>
          <button className="search-close" onClick={() => setSearchOpen(false)}>إغلاق</button>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
