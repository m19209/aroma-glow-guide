import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { VELORE_CSS } from "@/lib/velore-styles";
import imgNoir from "@/assets/perfume-noir.jpg";
import imgRose from "@/assets/perfume-rose.jpg";
import imgOud from "@/assets/perfume-oud.jpg";
import imgAzur from "@/assets/perfume-azur.jpg";
import imgVert from "@/assets/perfume-vert.jpg";
import imgVelvet from "@/assets/perfume-velvet.jpg";
import imgAmbre from "@/assets/perfume-ambre.jpg";
import imgBlanc from "@/assets/perfume-blanc.jpg";
import imgSaphir from "@/assets/perfume-saphir.jpg";
import imgEmeraude from "@/assets/perfume-emeraude.jpg";

type BottleKey = "noir" | "rose" | "oud" | "azur" | "vert" | "velvet" | "ambre" | "blanc" | "saphir" | "emeraude";

const BOTTLE_IMAGES: Record<BottleKey, string> = {
  noir: imgNoir,
  rose: imgRose,
  oud: imgOud,
  azur: imgAzur,
  vert: imgVert,
  velvet: imgVelvet,
  ambre: imgAmbre,
  blanc: imgBlanc,
  saphir: imgSaphir,
  emeraude: imgEmeraude,
};

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
  bottle: BottleKey;
  label: string;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Noir Absolu", family: "Oriental · Wood", notes: "العنبر · المسك الأسود · خشب العود · الفانيليا", price: 495, volume: "50 ML", badge: { label: "NEW", variant: "new" }, bottle: "noir", label: "NOIR ABSOLU" },
  { id: "p2", name: "Rose Royale", family: "Floral · Musky", notes: "وردة الطائف · الياسمين · المسك الأبيض · الخوخ", price: 520, oldPrice: 650, volume: "75 ML", badge: { label: "BEST SELLER", variant: "hot" }, bottle: "rose", label: "ROSE ROYALE" },
  { id: "p3", name: "Oud Impériale", family: "Oriental · Oud", notes: "العود الهندي · الصندل · الكهرمان · المسك الملكي", price: 890, volume: "100 ML", badge: { label: "LIMITED", variant: "limited" }, bottle: "oud", label: "OUD IMPERIALE" },
  { id: "p4", name: "Azur Nuit", family: "Aquatic · Fresh", notes: "الليمون · بيرغامو · الهواء البحري · السيدر", price: 304, oldPrice: 380, volume: "50 ML", badge: { label: "SALE 20%", variant: "sale" }, bottle: "azur", label: "AZUR NUIT" },
  { id: "p5", name: "Vert Sacré", family: "Woody · Green", notes: "أوراق البنفسج · النعناع · خشب الصندل · المسك", price: 420, volume: "75 ML", bottle: "vert", label: "VERT SACRÉ" },
  { id: "p6", name: "Velvet Rose", family: "Floral · Luxe", notes: "الوردة الجورجية · الفراولة · المسك الوردي · الباتشولي", price: 720, volume: "100 ML", badge: { label: "NEW", variant: "new" }, bottle: "velvet", label: "VELVET ROSE" },
  { id: "p7", name: "Ambre d'Or", family: "Oriental · Amber", notes: "الكهرمان · البخور · التبغ الحلو · الفانيليا بوربون", price: 610, volume: "75 ML", badge: { label: "HOT", variant: "hot" }, bottle: "ambre", label: "AMBRE D'OR" },
  { id: "p8", name: "Blanc Pur", family: "Floral · White", notes: "الفل · زهر البرتقال · المسك الأبيض · خشب الكشمير", price: 380, volume: "50 ML", bottle: "blanc", label: "BLANC PUR" },
  { id: "p9", name: "Saphir Bleu", family: "Aquatic · Woody", notes: "الخزامى البحرية · الأمبرغريس · خشب الأرز · المسك", price: 560, oldPrice: 700, volume: "100 ML", badge: { label: "SALE", variant: "sale" }, bottle: "saphir", label: "SAPHIR BLEU" },
  { id: "p10", name: "Émeraude", family: "Woody · Green", notes: "أوراق التين · الفيتيفر · الباتشولي · خشب الغوياك", price: 640, volume: "75 ML", badge: { label: "LIMITED", variant: "limited" }, bottle: "emeraude", label: "EMERAUDE" },
];

const CATEGORIES = [
  { key: "oriental", name: "Oriental", count: "٣ عطور", icon: "✦", bgClass: "cat-oriental" },
  { key: "floral", name: "Floral", count: "٣ عطور", icon: "✿", bgClass: "cat-floral" },
  { key: "woody", name: "Oud & Wood", count: "٤ عطور", icon: "◈", bgClass: "cat-woody" },
  { key: "aquatic", name: "Aquatic", count: "٢ عطور", icon: "✧", bgClass: "cat-aquatic" },
];

function Bottle({ variant, label }: { variant: Product["bottle"]; label: string }) {
  return (
    <img
      className="pbottle"
      src={BOTTLE_IMAGES[variant]}
      alt={label}
      loading="lazy"
      width={1024}
      height={1024}
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
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

  const [filterCat, setFilterCat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; pct: number } | null>(null);

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

  // Keyboard accessibility: Escape key closes drawers and modals
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  const visibleProducts = useMemo(() => {
    let list = PRODUCTS;
    if (filterCat) {
      list = list.filter((p) => {
        const f = p.family.toLowerCase();
        if (filterCat === "oriental") return f.includes("oriental");
        if (filterCat === "floral") return f.includes("floral");
        if (filterCat === "woody") return f.includes("oud") || f.includes("wood");
        if (filterCat === "aquatic") return f.includes("aquatic");
        return true;
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q) || p.notes.includes(q));
    }
    const sorted = [...list];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [filterCat, searchQuery, sortBy]);

  const SHIPPING_FREE_AT = 500;
  const PROMOS: Record<string, number> = { VELORE10: 10, LUXE20: 20, NOIR15: 15 };
  const promoDiscount = promoApplied ? Math.round(cartTotal * (promoApplied.pct / 100)) : 0;
  const shippingFee = cartTotal === 0 ? 0 : cartTotal - promoDiscount >= SHIPPING_FREE_AT ? 0 : 30;
  const grandTotal = Math.max(0, cartTotal - promoDiscount + shippingFee);
  const shippingProgress = Math.min(100, Math.round((cartTotal / SHIPPING_FREE_AT) * 100));

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code]) {
      setPromoApplied({ code, pct: PROMOS[code] });
      showToast(`تم تطبيق كود الخصم ${code} (${PROMOS[code]}%)`);
      setPromoInput("");
    } else {
      showToast("كود غير صالح");
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VELORE_CSS }} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="nav-logo">
          <span className="nav-logo-text">VELORE</span>
        </a>
        <ul className="nav-links">
          <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>Parfums</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>Maison</a></li>
        </ul>
        <div className="nav-right">
          <div className="nav-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              placeholder="ابحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              aria-label="Search"
            />
          </div>
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
            <span className="cart-label">الحقيبة</span>
            {cartCount > 0 && <span key={cartCount} className="cart-count-badge">{cartCount}</span>}
          </button>
          <button className="nav-hamburger" aria-label="Menu" onClick={() => setMobileOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu open">
          <a href="#products" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollTo("products"); }}>Parfums</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollTo("features"); }}>Maison</a>
        </div>
      )}

      <main id="main-content">
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" style={{ backgroundColor: "#050505" }}>
          <source src="https://www.dropbox.com/scl/fi/otbgvp5emmg3ulf020xxx/Perfume-Blender-3D-Animation-b3d-blender-houdini-cgi-productads-perfume-blender3D.mp4?rlkey=g92ylnm82zb4i3z6gq8gtvzci&st=82jej8qb&dl=1" type="video/mp4" />
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
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }} className="btn-gold">اكتشف المجموعة</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }} className="btn-outline-light">لماذا VELORE</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-label">Explore</span>
          <span className="hero-scroll-line" />
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
        </div>
        <div className="filter-bar">
          <div className="filter-chips">
            <button className={`chip ${!filterCat ? "active" : ""}`} onClick={() => setFilterCat(null)}>الكل</button>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`chip ${filterCat === c.key ? "active" : ""}`}
                onClick={() => setFilterCat(filterCat === c.key ? null : c.key)}
              >
                <span className="chip-icon">{c.icon}</span>{c.name}
              </button>
            ))}
          </div>
          <div className="sort-wrap">
            <label className="sort-label">ترتيب</label>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="featured">المُختار</option>
              <option value="price-asc">السعر: من الأقل</option>
              <option value="price-desc">السعر: من الأعلى</option>
              <option value="name">الاسم (أ–ي)</option>
            </select>
            <span className="result-count">{visibleProducts.length} عطر</span>
          </div>
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
                {(() => {
                  const line = cart.find((l) => l.product.id === p.id);
                  if (!line) {
                    return (
                      <button className="pcard-buy" onClick={() => addToCart(p)}>
                        <span className="pcard-buy-icon">+</span>
                        <span>Add to Cart — أضف للحقيبة</span>
                      </button>
                    );
                  }
                  return (
                    <div className="pcard-qty">
                      <button onClick={() => setQty(p.id, line.qty - 1)} aria-label="−">−</button>
                      <span>في الحقيبة: <strong>{line.qty}</strong></span>
                      <button onClick={() => setQty(p.id, line.qty + 1)} aria-label="+">+</button>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>


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
            <li><a href="#collections" onClick={(e) => { e.preventDefault(); scrollTo("collections"); }}>المجموعات</a></li>
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
      </main>

      {/* CART DRAWER */}
      <div className={`drawer-backdrop ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen} role="dialog" aria-modal="true" aria-label="سلة التسوق">
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
            <div className="ship-progress">
              {shippingFee === 0 ? (
                <div className="ship-msg ship-ok">🎉 تأهلت للشحن المجاني!</div>
              ) : (
                <div className="ship-msg">أضف <strong>{SHIPPING_FREE_AT - cartTotal} ر.س</strong> للحصول على شحن مجاني</div>
              )}
              <div className="ship-bar"><div className="ship-fill" style={{ width: `${shippingProgress}%` }} /></div>
            </div>

            <div className="promo-row">
              {promoApplied ? (
                <div className="promo-applied">
                  <span>✓ كود <strong>{promoApplied.code}</strong> — خصم {promoApplied.pct}%</span>
                  <button onClick={() => setPromoApplied(null)} aria-label="إزالة">×</button>
                </div>
              ) : (
                <>
                  <input
                    className="promo-input"
                    placeholder="كود الخصم (جرب VELORE10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") applyPromo(); }}
                  />
                  <button className="promo-btn" onClick={applyPromo}>تطبيق</button>
                </>
              )}
            </div>

            <div className="cart-summary">
              <div className="cart-row"><span>المجموع الفرعي</span><span>{cartTotal} ر.س</span></div>
              {promoDiscount > 0 && <div className="cart-row discount"><span>الخصم</span><span>−{promoDiscount} ر.س</span></div>}
              <div className="cart-row"><span>الشحن</span><span>{shippingFee === 0 ? "مجاني" : `${shippingFee} ر.س`}</span></div>
              <div className="cart-total">
                <span>الإجمالي</span>
                <strong>{grandTotal} ر.س</strong>
              </div>
            </div>
            <button className="btn-gold" style={{ width: "100%" }} onClick={checkout}>إتمام الدفع</button>
          </div>
        )}
      </aside>

      {/* SEARCH MODAL */}
      <div className={`drawer-backdrop ${searchOpen ? "open" : ""}`} onClick={() => setSearchOpen(false)} />
      {searchOpen && (
        <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="نافذة البحث">
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
