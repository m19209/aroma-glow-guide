import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { PRODUCTS, Product, getAllStocks, validatePromo } from "@/lib/inventory";
import { listCustomProducts } from "@/lib/admin-service";
import { loginUser, signupUser, getUserProfile, createOrder } from "@/lib/auth-service";
import { Bottle, Hero, BackToTop } from "@/components/ui-elements";
import { LoginModal, ProductDetailModal, SearchModal } from "@/components/modals";
import { CartDrawer } from "@/components/features";
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { loginRequired?: boolean } => {
    return {
      loginRequired: search.loginRequired === 'true' || search.loginRequired === true ? true : undefined,
    };
  },
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



const CATEGORIES = [
  { key: "oriental", name: "Oriental", icon: "✦" },
  { key: "floral", name: "Floral", icon: "✿" },
  { key: "woody", name: "Oud & Wood", icon: "◈" },
  { key: "aquatic", name: "Aquatic", icon: "✧" },
];

type CartLine = { product: Product; qty: number };

function Index() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [stocksLoading, setStocksLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [stocks, setStocks] = useState<Record<string, number>>({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Data fetching
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  useEffect(() => {
    getAllStocks().then((res) => {
      if (res) setStocks(res);
      setStocksLoading(false);
    });
    listCustomProducts().then((res) => {
      if (Array.isArray(res)) setCustomProducts(res as Product[]);
    }).catch(() => {});
  }, []);

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

  // Check user session from cookie on mount securely
  useEffect(() => {
    getUserProfile().then((res) => {
      if (res.success && res.user) {
        setCurrentUser(res.user.id);
      }
    });
  }, []);

  // Handle loginRequired search param redirect
  const searchParams = Route.useSearch();
  useEffect(() => {
    if (searchParams.loginRequired) {
      setLoginOpen(true);
      showToast("يرجى تسجيل الدخول أولاً للوصول إلى حسابك");
    }
  }, [searchParams.loginRequired]);

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

  // Lock body scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow = cartOpen || loginOpen || searchOpen || detailProduct ? "hidden" : "";
  }, [cartOpen, loginOpen, searchOpen, detailProduct]);
  const cartCount = cart.reduce((a, l) => a + l.qty, 0);
  const cartTotal = cart.reduce((a, l) => a + l.qty * l.product.price, 0);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }
  function addToCart(p: Product) {
    const currentStock = stocks[p.id] ?? 5;
    if (currentStock <= 0) {
      showToast("عذراً، نفدت الكمية");
      return;
    }
    setCart((c) => {
      const found = c.find((l) => l.product.id === p.id);
      if (found) {
        if (found.qty >= currentStock) {
          showToast(`تبقّى ${currentStock} قطع فقط`);
          return c;
        }
        return c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...c, { product: p, qty: 1 }];
    });
    showToast(`تمت إضافة ${p.name} إلى الحقيبة`);
  }
  function removeLine(id: string) { setCart((c) => c.filter((l) => l.product.id !== id)); }
  function setQty(id: string, qty: number) {
    if (qty <= 0) return removeLine(id);
    const currentStock = stocks[id] ?? 5;
    if (qty > currentStock) {
      showToast(`تبقّى ${currentStock} قطع فقط`);
      return;
    }
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
  async function checkout() {
    if (cart.length === 0) return;
    if (!currentUser) {
      showToast("يرجى تسجيل الدخول أولاً لإتمام الطلب");
      setLoginOpen(true);
      return;
    }
    
    setCheckoutLoading(true);
    showToast("جاري إرسال طلبك…");
    
    try {
      const profile = await getUserProfile();
      if (!profile.success || !profile.user) {
        showToast("حدث خطأ في استرداد بيانات الحساب");
        setCheckoutLoading(false);
        return;
      }

      const u = profile.user;
      if (!u.phone || !u.city || !u.district || !u.street) {
        showToast("يرجى إكمال عنوان التوصيل ورقم الهاتف في حسابك أولاً");
        window.setTimeout(() => {
          navigate({ to: "/account" });
        }, 1500);
        return;
      }

      const addressStr = `${u.building ? u.building + '، ' : ''}${u.street}، ${u.district}، ${u.city} (هاتف: ${u.phone})`;

      const items = cart.map(line => ({
        productId: line.product.id,
        productName: line.product.name,
        quantity: line.qty,
        unitPrice: line.product.price,
      }));

      const totalAmount = cart.reduce((sum, line) => sum + line.qty * line.product.price, 0);

      const res = await createOrder({
        data: {
          items,
          totalAmount,
          shippingAddress: addressStr,
        }
      });

      if (res.success) {
        setCart([]);
        setCartOpen(false);
        showToast("تم تسجيل طلبك بنجاح! شكراً لك.");
      } else {
        showToast(res.error || "فشل إتمام الطلب");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setCheckoutLoading(false);
    }
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

  const SHIPPING_FREE_AT = 800;
  const promoDiscount = promoApplied ? cartTotal * (promoApplied.pct / 100) : 0;
  const subTotalWithPromo = Math.max(0, cartTotal - promoDiscount);
  const shippingFee = cartTotal === 0 ? 0 : subTotalWithPromo >= SHIPPING_FREE_AT ? 0 : 250;
  const grandTotal = Math.max(0, subTotalWithPromo + shippingFee);
  const shippingProgress = Math.min(100, Math.round((subTotalWithPromo / SHIPPING_FREE_AT) * 100));


  async function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const res = await validatePromo({ data: code });
    if (res.success) {
      setPromoApplied({ code: res.code, pct: res.pct });
      showToast(`تم تطبيق كود الخصم ${res.code} (${res.pct}%)`);
      setPromoInput("");
    } else {
      showToast(res.error || "كود غير صالح");
    }
  }

  return (
    <>


      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-brand">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="nav-logo">
            <span className="nav-logo-text">VELORE</span>
          </a>
        </div>

        <ul className="nav-links">
          <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>Parfums</a></li>
        </ul>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="nav-search" onClick={() => setSearchOpen(true)} style={{ cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              placeholder="ابحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              aria-label="البحث عن منتج"
            />
          </div>

          {currentUser ? (
            <div className="nav-auth" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link to="/account" className="nav-login-btn magic-login-btn" style={{ 
                color: scrolled ? 'var(--charcoal)' : 'rgba(255,255,255,0.9)', 
                textDecoration: 'none'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="login-label">حسابي</span>
              </Link>
              <button 
                onClick={() => { 
                  document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  setCurrentUser(null); 
                  showToast("تم تسجيل الخروج بنجاح"); 
                }} 
                className="nav-login-btn magic-login-btn logout-btn"
                style={{ 
                  color: scrolled ? 'var(--charcoal)' : 'rgba(255,255,255,0.9)', 
                  border: 'none', 
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }}
                aria-label="تسجيل الخروج"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span className="login-label">تسجيل الخروج</span>
              </button>
            </div>
          ) : (
            <button className="nav-login-btn magic-login-btn" onClick={() => setLoginOpen(true)} style={{ color: scrolled ? 'var(--charcoal)' : 'rgba(255,255,255,0.9)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="login-label">تسجيل الدخول</span>
            </button>
          )}

          <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
            <span className="cart-label">الحقيبة</span>
            {cartCount > 0 && <span key={cartCount} className="cart-count-badge">{cartCount}</span>}
          </button>
          
          <button className={`nav-hamburger ${mobileOpen ? 'open' : ''}`} aria-label="Menu" onClick={() => setMobileOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <div className="drawer-backdrop open" style={{ zIndex: 298 }} onClick={() => setMobileOpen(false)} />
          <div className="mobile-menu open">
          <div className="mobile-search-wrapper" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--charcoal-dim)' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input 
              type="text" 
              placeholder="ابحث..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { setMobileOpen(false); setSearchOpen(true); }}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', padding: '0 12px', fontSize: '1rem', color: 'var(--charcoal)' }}
            />
          </div>
          
          <a href="#products" onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollTo("products"); }}>Parfums</a>
          
          {currentUser ? (
            <>
              <Link to="/account" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                حسابي
              </Link>
              <button 
                onClick={() => { 
                  document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  setCurrentUser(null); 
                  setMobileOpen(false);
                  showToast("تم تسجيل الخروج بنجاح"); 
                }} 
                className="mobile-menu-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                تسجيل الخروج
              </button>
            </>
          ) : (
            <button 
              onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
              className="mobile-menu-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              تسجيل الدخول
            </button>
          )}
        </div>
        </>
      )}

      <main id="main-content">
      <Hero scrollToProducts={() => scrollTo("products")} />






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
              <div
                className="pcard"
                key={p.id}
                onClick={() => setDetailProduct(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDetailProduct(p); } }}
              >
                {p.badge && <span className={`pbadge badge-${p.badge.variant}`}>{p.badge.label}</span>}
                <div className="pimg-wrap">
                  <div className="pimg-glow" />
                  <div className="pimg-inner"><Bottle variant={p.bottle} label={p.label} imageSrc={p.imageData} /></div>
                </div>
                <div className="pinfo">
                  <div className="pfamily">{p.family}</div>
                  <div className="pname">
                    <Link to="/product/$productId" params={{ productId: p.id }} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {p.name}
                    </Link>
                  </div>
                  <div className="pstock" style={{ color: (stocks[p.id] ?? 5) < 3 ? '#d9534f' : '#8B6F28', fontSize: '0.75rem', marginBottom: '8px', fontWeight: 'bold' }}>
                    {stocksLoading ? (
                      <span className="skeleton-pulse" style={{ display: 'inline-block', width: '80px', height: '12px', background: 'var(--beige)', borderRadius: '4px' }}></span>
                    ) : (
                      (stocks[p.id] ?? 5) > 0 ? `الكمية المتبقية: ${stocks[p.id] ?? 5} قطع` : 'نفدت الكمية'
                    )}
                  </div>
                  <div className="pnotes">{p.notes}</div>
                  <div className="pfooter">
                    <div>
                      {p.oldPrice && <span className="pprice-old">{p.oldPrice}</span>}
                      <span className="pprice">{p.price} ج.م</span>
                    </div>
                    <div className="pright">
                      <span className="pvol">{p.volume}</span>
                      <button
                        className={`pwish ${wishlist.has(p.id) ? "active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
                        aria-label="المفضلة"
                      >{wishlist.has(p.id) ? "♥" : "♡"}</button>
                    </div>
                  </div>
                </div>
                {(() => {
                  const line = cart.find((l) => l.product.id === p.id);
                  if (!line) {
                    return (
                      <button className="pcard-buy" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>
                        <span className="pcard-buy-icon">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                        </span>
                        <span>أضف للحقيبة</span>
                      </button>
                    );
                  }
                  return (
                    <div className="pcard-qty" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '30px', padding: '10px 0', background: 'rgba(0,0,0,0.03)', margin: '0 8px 12px', borderRadius: '4px' }}>
                      <button onClick={(e) => { e.stopPropagation(); setQty(p.id, line.qty - 1); }} aria-label="−" style={{ fontSize: '1.4rem', border: 'none', background: 'transparent', cursor: 'pointer', padding: '0 10px' }}>−</button>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{line.qty}</span>
                      <button onClick={(e) => { e.stopPropagation(); setQty(p.id, line.qty + 1); }} aria-label="+" style={{ fontSize: '1.4rem', border: 'none', background: 'transparent', cursor: 'pointer', padding: '0 10px' }}>+</button>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>


      </main>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo-wrap">
            <span className="footer-logo-name">VELORE</span>
          </div>
          <span className="footer-logo-sub">MAISON DE PARFUM</span>
          <p className="footer-tagline">صناعة العطور كفنّ — كل قارورة قصة، كل رائحة ذكرى.</p>
          <div className="footer-socials">
            {["إنستقرام", "فيسبوك", "إكس", "يوتيوب"].map((s) => (
              <span key={s} className="social-btn" style={{ fontSize: '0.85rem' }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Maison</h4>
          <ul>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>العطور</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Service</h4>
          <ul>
            <li><span>الشحن</span></li>
            <li><span>الإرجاع</span></li>
            <li><span>الأسئلة</span></li>
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

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setQty={setQty}
        removeLine={removeLine}
        shippingFee={shippingFee}
        cartTotal={cartTotal}
        promoApplied={promoApplied}
        promoInput={promoInput}
        setPromoInput={setPromoInput}
        applyPromo={applyPromo}
        grandTotal={grandTotal}
        checkout={checkout}
        checkoutLoading={checkoutLoading}
        shippingProgress={shippingProgress}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(userId) => {
          setCurrentUser(userId);
          showToast("تم تسجيل الدخول بنجاح!");
        }}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        stocks={stocks}
        addToCart={addToCart}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />


      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(p) => setDetailProduct(p)}
      />

      <BackToTop />

      {/* TOAST */}
      {toast && <div className="toast" role="alert" aria-live="assertive">{toast}</div>}
    </>
  );
}
