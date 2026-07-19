import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { PRODUCTS, Product, getAllStocks, validatePromo, getSheetProducts } from "@/lib/inventory";
import { listCustomProducts } from "@/lib/admin-service";
import { loginUser, signupUser, getUserProfile, createOrder } from "@/lib/auth-service";
import { Bottle, Hero, BackToTop } from "@/components/ui-elements";
import { LoginModal, ProductDetailModal, SearchModal } from "@/components/modals";
import { CartDrawer } from "@/components/features";
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { loginRequired?: boolean; adminRequired?: boolean } => {
    return {
      loginRequired: search.loginRequired === 'true' || search.loginRequired === true ? true : undefined,
      adminRequired: search.adminRequired === 'true' || search.adminRequired === true ? true : undefined,
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
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string | null } | null>(null);
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
  const [sheetProducts, setSheetProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initial fetch
    getAllStocks().then((res) => {
      if (res) setStocks(res);
      setStocksLoading(false);
    });

    listCustomProducts().then((res) => {
      if (Array.isArray(res)) setCustomProducts(res as Product[]);
    }).catch(() => { });

    getSheetProducts().then((res) => {
      if (Array.isArray(res)) setSheetProducts(res as Product[]);
    }).catch(() => { });

    // Poll every 1 second for realtime stock updates
    const interval = setInterval(() => {
      getAllStocks().then((res) => {
        if (res) {
          setStocks(prev => JSON.stringify(prev) === JSON.stringify(res) ? prev : res);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
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
    } catch {/* noop */ }
  }, []);

  // Check user session from cookie on mount securely
  useEffect(() => {
    getUserProfile().then((res) => {
      if (res.success && res.user) {
        setCurrentUser({ id: res.user.id, role: res.user.role ?? null });
      }
    });
  }, []);

  // Handle loginRequired or adminRequired search param redirect
  const searchParams = Route.useSearch();
  useEffect(() => {
    if (searchParams.loginRequired) {
      setLoginOpen(true);
      showToast("يرجى تسجيل الدخول أولاً للوصول إلى حسابك");
    } else if (searchParams.adminRequired) {
      showToast("غير مصرح لك بدخول صفحة الإدارة!");
    }
  }, [searchParams.loginRequired, searchParams.adminRequired]);

  useEffect(() => {
    try { localStorage.setItem("velore_cart", JSON.stringify(cart)); } catch {/* noop */ }
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem("velore_wish", JSON.stringify([...wishlist])); } catch {/* noop */ }
  }, [wishlist]);

  // Scroll (Optimized to prevent re-render thrashing while scrolling)
  useEffect(() => {
    let lastState = window.scrollY > 40;
    setScrolled(lastState);
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== lastState) {
        lastState = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when any modal is open (robust for iOS)
  useEffect(() => {
    const isModalOpen = cartOpen || loginOpen || searchOpen || detailProduct;
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
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
          showToast(`نفدت الكمية المتاحة للإضافة`);
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
  async function checkout(formData: {
    customerName: string;
    customerPhone: string;
    governorate: string;
    city: string;
    district: string;
    street: string;
    building: string;
    orderNotes: string;
    paymentMethod: 'cod' | 'vodafone';
  }) {
    if (cart.length === 0) return;

    setCheckoutLoading(true);
    showToast("جاري إرسال طلبك…");

    try {
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
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          governorate: formData.governorate,
          city: formData.city,
          district: formData.district,
          street: formData.street,
          building: formData.building,
          notes: formData.orderNotes,
          paymentMethod: formData.paymentMethod,
        }
      });

      if (res.success) {
        setCart([]);
        setCartOpen(false);
        showToast("تم تسجيل طلبك بنجاح! شكراً لك.");
        // Refetch stocks after successful checkout to update the UI
        getAllStocks().then((updatedStocks) => {
          if (updatedStocks) setStocks(updatedStocks);
        });
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
    // Filter out sheet products that are already in customProducts or PRODUCTS by ID
    const existingIds = new Set([...customProducts.map(p => p.id), ...PRODUCTS.map(p => p.id)]);
    const uniqueSheetProducts = sheetProducts.filter(sp => !existingIds.has(sp.id));
    
    let list: Product[] = [...customProducts, ...uniqueSheetProducts, ...PRODUCTS];
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
  }, [filterCat, searchQuery, sortBy, customProducts]);

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
              {visibleProducts.map((p) => {
                const line = cart.find((l) => l.product.id === p.id);
                const cartQty = line ? line.qty : 0;
                const availableStock = Math.max(0, (stocks[p.id] ?? 5) - cartQty);
                return (
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
                      <button
                        className={`pwish ${wishlist.has(p.id) ? "active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
                        aria-label="المفضلة"
                      >{wishlist.has(p.id) ? "♥" : "♡"}</button>
                      <div className="pimg-glow" />
                      <div className="pimg-inner"><Bottle variant={p.bottle} label={p.label} imageSrc={p.imageData} /></div>
                    </div>
                    <div className="pinfo">
                      <div className="pfamily">{p.family}</div>
                      <div className="pname">
                        <Link to="/product/$productId" params={{ productId: p.id }} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block', direction: 'ltr', textAlign: 'right' }}>
                          {p.name}
                        </Link>
                      </div>
                      <div className="pnotes">{p.notes}</div>
                      <div className="pfooter" style={{ marginTop: 'auto' }}>
                        <div>
                          {p.oldPrice && <span className="pprice-old"><span dir="ltr">{p.oldPrice}</span> ج.م</span>}
                          <span className="pprice"><span dir="ltr">{p.price}</span> ج.م</span>
                        </div>
                        <div className="pright">
                          <span className="pvol">{p.volume}</span>
                        </div>
                      </div>
                      <div className="pstock" style={{ color: availableStock < 3 ? '#d9534f' : 'var(--gold)', fontSize: '0.72rem', marginBottom: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {!stocksLoading && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: availableStock < 3 ? '#d9534f' : 'var(--gold)', boxShadow: `0 0 4px ${availableStock < 3 ? 'rgba(217,83,79,0.5)' : 'rgba(196,164,119,0.5)'}` }} />}
                        {stocksLoading ? (
                          <span className="skeleton-pulse" style={{ display: 'inline-block', width: '80px', height: '12px', background: 'var(--beige)', borderRadius: '4px' }}></span>
                        ) : (
                          availableStock > 0 ? `الكمية المتبقية: ${availableStock} قطع` : 'نفدت الكمية'
                        )}
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
                        <div className="pcard-qty" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setQty(p.id, line.qty - 1); }}
                            aria-label="تقليل الكمية"
                            className="pcard-qty-btn"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span className="pcard-qty-val">{line.qty}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setQty(p.id, line.qty + 1); }}
                            aria-label="زيادة الكمية"
                            className="pcard-qty-btn"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
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
          <p className="footer-tagline">صناعة العطور كفنّ — كل قارورة قصة، كل رائحة ذكرى تخلد في الأذهان.</p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-btn" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>التشكيلة</h4>
          <ul>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>أحدث العطور</a></li>
            <li><span>المجموعات الحصرية</span></li>
            <li><span>عطور المنزل</span></li>
            <li><span>هدايا فاخرة</span></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>خدمة العملاء</h4>
          <ul>
            <li><span>تتبع الطلب</span></li>
            <li><span>سياسة الشحن</span></li>
            <li><span>الاسترجاع والاستبدال</span></li>
            <li><span>الأسئلة الشائعة</span></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>نشرتنا البريدية</h4>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', lineHeight: '1.6' }}>
            اشترك لتصلك أحدث إصداراتنا وعروضنا الحصرية المخصصة لك.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--pearl)', fontSize: '0.85rem' }} 
            />
            <button 
              className="btn-gold" 
              style={{ padding: '0 16px', borderRadius: '4px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              اشتراك
            </button>
          </div>
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
        currentUser={currentUser?.id ?? null}
        onLoginRequired={() => {
          setCartOpen(false);
          setLoginOpen(true);
        }}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(userId) => {
          // Re-fetch profile to get role after login
          getUserProfile().then((res) => {
            if (res.success && res.user) {
              setCurrentUser({ id: res.user.id, role: res.user.role ?? null });
            } else {
              setCurrentUser({ id: userId, role: null });
            }
          });
          showToast("تم تسجيل الدخول بنجاح!");
        }}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        stocks={stocks}
        cartQty={detailProduct ? cart.find((l) => l.product.id === detailProduct.id)?.qty || 0 : 0}
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
