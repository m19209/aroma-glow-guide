import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Product, getAllStocks, validatePromo } from "@/lib/inventory";
import { createOrder, getUserProfile } from "@/lib/auth-service";
import { Bottle } from "@/components/ui-elements";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب — VELORE" },
      { name: "description", content: "أتمم طلبك من عطور VELORE الفاخرة" },
    ],
  }),
  component: CheckoutPage,
});

type CartLine = { product: Product; qty: number };

const EGYPT_GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر",
  "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية",
  "المنيا", "القليوبية", "الوادي الجديد", "السويس", "أسوان",
  "أسيوط", "بني سويف", "بورسعيد", "دمياط", "الشرقية",
  "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا",
  "شمال سيناء", "سوهاج",
];

function CheckoutPage() {
  const { t: translate, lang, dir } = useI18n();
  const navigate = useNavigate();

  // Cart state from localStorage
  const [cart, setCart] = useState<CartLine[]>([]);
  const [stocks, setStocks] = useState<Record<string, number>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "vodafone">("cod");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem("velore_cart");
      if (c) setCart(JSON.parse(c));
    } catch { /* noop */ }

    getAllStocks().then((res) => { if (res) setStocks(res); });

    getUserProfile().then((res) => {
      if (res.success && res.user) {
        setCustomerName(res.user.name || "");
        setCustomerPhone(res.user.phone || "");
        setGovernorate(res.user.governorate || "");
        setCity(res.user.city || "");
        setDistrict(res.user.district || "");
        setStreet(res.user.street || "");
        setBuilding(res.user.building || "");
      }
    });
  }, []);

  // Totals
  const cartTotal = cart.reduce((s, l) => s + l.qty * l.product.price, 0);
  const discount = promoApplied ? Math.round(cartTotal * promoApplied.pct / 100) : 0;
  const shippingFee = cartTotal - discount >= 800 ? 0 : 60;
  const grandTotal = cartTotal - discount + shippingFee;
  const shippingProgress = Math.min(100, Math.round((cartTotal / 800) * 100));

  async function applyPromo() {
    setPromoError("");
    try {
      const res = await validatePromo({ data: promoInput });
      if (res.success && res.pct) {
        setPromoApplied({ code: promoInput.toUpperCase(), pct: res.pct });
      } else {
        setPromoError("كود الخصم غير صالح");
      }
    } catch {
      setPromoError("تعذر التحقق من الكود");
    }
  }

  async function handleSubmit() {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.customerName = "يرجى إدخال الاسم الكامل";
    if (!customerPhone.trim()) errors.customerPhone = "يرجى إدخال رقم الهاتف";
    else if (customerPhone.trim().length < 10) errors.customerPhone = "رقم الهاتف غير صحيح";
    if (!governorate.trim()) errors.governorate = "يرجى اختيار المحافظة";
    if (!city.trim()) errors.city = "يرجى إدخال المدينة";
    if (!district.trim()) errors.district = "يرجى إدخال المنطقة / الحي";
    if (!street.trim()) errors.street = "يرجى إدخال اسم الشارع";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setFormErrors({});
    setLoading(true);

    try {
      const items = cart.map((l) => ({
        productId: l.product.id,
        productName: l.product.name,
        quantity: l.qty,
        unitPrice: l.product.price,
      }));

      const res = await createOrder({
        data: {
          items,
          totalAmount: grandTotal,
          customerName,
          customerPhone,
          governorate,
          city,
          district,
          street,
          building,
          notes: orderNotes,
          paymentMethod,
        },
      });

      if (res.success) {
        localStorage.removeItem("velore_cart");
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
          return;
        }
        setSuccess(true);
        setOrderId(res.orderId || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setFormErrors({ submit: res.error || "فشل إتمام الطلب، حاول مرة أخرى" });
      }
    } catch {
      setFormErrors({ submit: "حدث خطأ أثناء الاتصال بالخادم" });
    } finally {
      setLoading(false);
    }
  }

  // Success screen
  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 30%, rgba(201,168,76,.12) 0%, rgba(250,250,248,1) 70%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Cairo', sans-serif", direction: "rtl" }}>
        <div style={{ maxWidth: "540px", width: "100%", background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(201,168,76,.3)", borderRadius: "16px", padding: "64px 48px", textAlign: "center", boxShadow: "0 30px 90px rgba(26,22,18,.12)" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(201,168,76,.25), rgba(201,168,76,.08))", border: "2px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: "2.2rem", color: "var(--gold-deep)", boxShadow: "0 0 30px rgba(201,168,76,.2)" }}>
            ✓
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: ".7rem", letterSpacing: ".35em", color: "var(--gold-deep)", textTransform: "uppercase", marginBottom: "12px" }}>VELORE Parfums</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400, fontStyle: "italic", color: "var(--charcoal)", margin: "0 0 16px" }}>تم استلام طلبك بنجاح</h1>
          <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "16px" }}>
            شكراً لثقتك بـ VELORE! سيتواصل معك فريقنا قريباً لتأكيد الطلب وتحديد موعد التوصيل.
          </p>
          {orderId && (
            <div style={{ background: "var(--pearl)", padding: "12px 24px", borderRadius: "8px", border: "1px solid var(--border2)", display: "inline-block", marginBottom: "32px" }}>
              <span style={{ fontSize: ".85rem", color: "var(--muted)" }}>رقم الطلب: </span>
              <strong style={{ color: "var(--gold-deep)", fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: ".1em" }}>#{orderId.slice(-8).toUpperCase()}</strong>
            </div>
          )}
          <div>
            <Link to="/" style={{ display: "inline-block", padding: "16px 44px", background: "var(--charcoal)", color: "var(--gold-pale)", fontFamily: "'Cinzel', serif", fontSize: ".72rem", letterSpacing: ".22em", textTransform: "uppercase", textDecoration: "none", borderRadius: "6px", transition: "all .3s ease", boxShadow: "0 8px 24px rgba(26,22,18,.2)" }}>
              العودة للمتجر الرئيسي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 30%, rgba(201,168,76,.08) 0%, rgba(250,250,248,1) 70%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", direction: "rtl", fontFamily: "'Cairo', sans-serif" }}>
        <div style={{ textAlign: "center", background: "var(--white)", padding: "50px 40px", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(26,22,18,.06)", maxWidth: "420px", width: "100%" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: .8 }}>🛒</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontStyle: "italic", color: "var(--charcoal)", margin: "0 0 10px" }}>سلة المشتريات فارغة</p>
          <p style={{ fontSize: ".9rem", color: "var(--muted)", marginBottom: "28px" }}>يبدو أنك لم تضف أي عطور لسلتك بعد.</p>
          <Link to="/" style={{ display: "inline-block", padding: "14px 36px", background: "var(--charcoal)", color: "var(--gold-pale)", fontFamily: "'Cinzel', serif", fontSize: ".7rem", letterSpacing: ".2em", textDecoration: "none", borderRadius: "6px", boxShadow: "0 8px 24px rgba(26,22,18,.15)" }}>
            استكشف تشكيلة العطور
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, rgba(250,250,248,1) 60%)", direction: "rtl", fontFamily: "'Cairo', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "rgba(26, 22, 18, 0.95)", backdropFilter: "blur(12px)", padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(201,168,76,.2)", boxShadow: "0 4px 25px rgba(0,0,0,.25)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          <span style={{ color: "rgba(201,168,76,.85)", fontFamily: "'Cairo', sans-serif", fontSize: ".85rem", fontWeight: 600 }}>العودة للمتجر</span>
        </Link>
        <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-pale)", fontSize: "1.15rem", letterSpacing: ".3em", fontWeight: 600 }}>VELORE</span>
        <div style={{ width: "90px" }} />
      </header>

      {/* Page Title */}
      <div style={{ textAlign: "center", padding: "48px 24px 24px" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: ".65rem", letterSpacing: ".45em", color: "var(--gold-deep)", textTransform: "uppercase", marginBottom: "8px" }}>Checkout Cart</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 500, fontStyle: "italic", color: "var(--charcoal)", margin: 0 }}>إتمام الطلب</h1>
        <div style={{ width: "54px", height: "2px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "16px auto 0" }} />
      </div>

      {/* Progress Steps */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "520px", margin: "0 auto 44px", padding: "0 24px" }}>
        {[
          { num: "١", label: "السلة", status: "completed" },
          { num: "٢", label: "بيانات الشحن", status: "active" },
          { num: "٣", label: "الدفع والتأكيد", status: "pending" }
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: step.status === "pending" ? "var(--pearl2)" : "var(--charcoal)",
                color: step.status === "pending" ? "var(--muted)" : "var(--gold-pale)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cairo', sans-serif",
                fontSize: ".85rem",
                fontWeight: 700,
                border: step.status === "active" ? "2px solid var(--gold)" : "none",
                boxShadow: step.status === "active" ? "0 0 14px rgba(201,168,76,.4)" : "none"
              }}>
                {step.status === "completed" ? "✓" : step.num}
              </div>
              <span style={{ fontSize: ".72rem", color: step.status === "pending" ? "var(--muted)" : "var(--gold-deep)", fontWeight: 700, whiteSpace: "nowrap" }}>{step.label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: "2px", background: i === 0 ? "var(--gold)" : "var(--border2)", margin: "0 10px", marginBottom: "20px" }} />}
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "1fr 420px", gap: "36px", alignItems: "start" }} className="checkout-layout">

        {/* LEFT: Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Shipping Info */}
          <section style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", padding: "36px", boxShadow: "0 10px 30px rgba(26,22,18,.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: ".82rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold-deep)", margin: 0, fontWeight: 700 }}>
                عنوان الشحن والتوصيل
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }} className="checkout-form-grid">
              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>الاسم الكامل <span style={{ color: "#e74c3c" }}>*</span></label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك الثلاثي"
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.customerName ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)", transition: "all .2s ease" }}
                />
                {formErrors.customerName && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.customerName}</span>}
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>رقم الهاتف <span style={{ color: "#e74c3c" }}>*</span></label>
                <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.customerPhone ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)", direction: "ltr", textAlign: "right" }}
                />
                {formErrors.customerPhone && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.customerPhone}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>المحافظة <span style={{ color: "#e74c3c" }}>*</span></label>
                <select value={governorate} onChange={e => setGovernorate(e.target.value)}
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.governorate ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)", cursor: "pointer", fontFamily: "'Cairo', sans-serif" }}
                >
                  <option value="">اختر المحافظة</option>
                  {EGYPT_GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {formErrors.governorate && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.governorate}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>المدينة <span style={{ color: "#e74c3c" }}>*</span></label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)}
                  placeholder="مثال: مدينة نصر"
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.city ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)" }}
                />
                {formErrors.city && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.city}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>المنطقة / الحي <span style={{ color: "#e74c3c" }}>*</span></label>
                <input type="text" value={district} onChange={e => setDistrict(e.target.value)}
                  placeholder="مثال: الحي السابع"
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.district ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)" }}
                />
                {formErrors.district && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.district}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>اسم الشارع <span style={{ color: "#e74c3c" }}>*</span></label>
                <input type="text" value={street} onChange={e => setStreet(e.target.value)}
                  placeholder="مثال: شارع مصطفى النحاس"
                  style={{ padding: "13px 16px", border: `1px solid ${formErrors.street ? "#e74c3c" : "var(--border2)"}`, borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)" }}
                />
                {formErrors.street && <span style={{ color: "#e74c3c", fontSize: ".75rem" }}>{formErrors.street}</span>}
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>تفاصيل العنوان (رقم المبنى / الطابق)</label>
                <input type="text" value={building} onChange={e => setBuilding(e.target.value)}
                  placeholder="مثال: عمارة ١٥، الدور الرابع، شقة ٨"
                  style={{ padding: "13px 16px", border: "1px solid var(--border2)", borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--charcoal)" }}>ملاحظات التوصيل (اختياري)</label>
                <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)}
                  placeholder="أي تعليمات خاصة لمندوب الشحن..."
                  rows={3}
                  style={{ padding: "13px 16px", border: "1px solid var(--border2)", borderRadius: "8px", fontSize: ".92rem", outline: "none", background: "var(--white)", resize: "vertical", fontFamily: "'Cairo', sans-serif" }}
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", padding: "36px", boxShadow: "0 10px 30px rgba(26,22,18,.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: ".82rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold-deep)", margin: 0, fontWeight: 700 }}>
                طريقة الدفع
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { key: "cod" as const, icon: "💵", title: "الدفع عند الاستلام (COD)", desc: "سداد المبلغ نقداً لمندوب الشحن عند استلام العطر" },
                { key: "vodafone" as const, icon: "📱", title: "فودافون كاش (Vodafone Cash)", desc: "تحويل مباشر من محفظتك الإلكترونية" },
              ].map(opt => {
                const active = paymentMethod === opt.key;
                return (
                  <div key={opt.key} style={{ display: "flex", flexDirection: "column" }}>
                    <div role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPaymentMethod(opt.key); } }} onClick={() => setPaymentMethod(opt.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "20px 24px",
                        border: `2px solid ${active ? "var(--gold-deep)" : "var(--border)"}`,
                        borderRadius: active && opt.key === "vodafone" ? "10px 10px 0 0" : "10px",
                        cursor: "pointer",
                        background: active ? "rgba(201,168,76,.05)" : "var(--white)",
                        boxShadow: active ? "0 6px 20px rgba(201,168,76,.12)" : "none",
                        transition: "all .25s ease"
                      }}
                    >
                      <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{opt.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--charcoal)" }}>{opt.title}</div>
                        <div style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: "4px" }}>{opt.desc}</div>
                      </div>
                      <div style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: `2px solid ${active ? "var(--gold-deep)" : "var(--border2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: active ? "var(--gold-deep)" : "transparent"
                      }}>
                        {active && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
                      </div>
                    </div>



                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT: Order Summary */}
        <div style={{ position: "sticky", top: "84px", display: "flex", flexDirection: "column", gap: "20px" }} className="checkout-summary-sticky">
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(26,22,18,.05)" }}>
            {/* Summary Header */}
            <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid var(--border)", background: "linear-gradient(135deg, var(--pearl), var(--off-white))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: ".8rem", letterSpacing: ".25em", textTransform: "uppercase", color: "var(--gold-deep)", margin: 0, fontWeight: 700 }}>
                ملخص الطلب
              </h2>
              <span style={{ fontSize: ".8rem", color: "var(--muted)", fontWeight: 600 }}>{cart.length} {cart.length === 1 ? "منتج" : "منتجات"}</span>
            </div>

            {/* Cart Items */}
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {cart.map((line) => {
                const avail = Math.max(0, (stocks[line.product.id] ?? 5));
                return (
                  <div key={line.product.id} style={{ display: "flex", gap: "14px", padding: "16px 20px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                    <div style={{ width: "58px", height: "58px", borderRadius: "8px", overflow: "hidden", background: "linear-gradient(135deg, var(--pearl), var(--pearl2))", flexShrink: 0, border: "1px solid var(--border2)", padding: "4px" }}>
                      <Bottle variant={line.product.bottle} label={line.product.name} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--charcoal)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{line.product.name}</div>
                      <div style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: "2px" }}>{line.product.family}</div>
                      <div style={{ fontSize: ".78rem", color: "var(--muted2)", marginTop: "2px" }}>الكمية: <strong>{line.qty}</strong></div>
                      {avail < 3 && avail > 0 && <div style={{ fontSize: ".7rem", color: "#d9534f", marginTop: "2px", fontWeight: 600 }}>⚠ متبقي {avail} قطع فقط</div>}
                    </div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: ".95rem", color: "var(--gold-deep)", flexShrink: 0 }}>
                      {line.qty * line.product.price} ج.م
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="text" value={promoInput} onChange={e => setPromoInput(e.target.value)}
                  placeholder="أدخل كود الخصم"
                  style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--border2)", borderRadius: "6px", fontSize: ".88rem", outline: "none", background: "var(--off-white)", fontFamily: "'Cairo', sans-serif" }}
                  onKeyDown={e => e.key === "Enter" && applyPromo()}
                />
                <button onClick={applyPromo}
                  style={{ padding: "0 20px", background: "var(--charcoal)", color: "var(--gold-pale)", border: "none", borderRadius: "6px", fontFamily: "'Cinzel', serif", fontSize: ".7rem", letterSpacing: ".15em", cursor: "pointer", fontWeight: 700 }}
                >
                  تفعيل
                </button>
              </div>
              {promoError && <p style={{ color: "#e74c3c", fontSize: ".78rem", margin: "8px 0 0", fontWeight: 600 }}>{promoError}</p>}
              {promoApplied && <p style={{ color: "var(--gold-deep)", fontSize: ".82rem", margin: "8px 0 0", fontWeight: 700 }}>✓ تم تطبيق خصم {promoApplied.pct}% بنجاح</p>}
            </div>

            {/* Free Shipping Progress Bar */}
            {shippingProgress < 100 && (
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "rgba(201,168,76,.04)" }}>
                <p style={{ fontSize: ".8rem", color: "var(--muted)", marginBottom: "8px", textAlign: "center" }}>
                  أضف عطوراً بقيمة <strong style={{ color: "var(--gold-deep)" }}>{800 - cartTotal} ج.م</strong> للحصول على <strong>شحن مجاني</strong> 🚚
                </p>
                <div style={{ height: "6px", background: "var(--pearl2)", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: `${shippingProgress}%`, height: "100%", background: "linear-gradient(90deg, var(--gold-dim), var(--gold))", borderRadius: "99px", transition: "width .4s ease" }} />
                </div>
              </div>
            )}

            {/* Totals */}
            <div style={{ padding: "20px" }}>
              {[
                { label: "المجموع الفرعي", value: `${cartTotal} ج.م` },
                ...(promoApplied ? [{ label: `خصم ${promoApplied.pct}%`, value: `-${discount} ج.م`, green: true }] : []),
                { label: "مصاريف الشحن", value: shippingFee === 0 ? "مجاني 🎉" : `${shippingFee} ج.م` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontSize: ".88rem", color: (row as any).green ? "#2a7a4a" : "var(--muted)" }}>
                  <span>{row.label}</span>
                  <span style={{ fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 4px", borderTop: "1px solid var(--border)", marginTop: "10px" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: ".85rem", letterSpacing: ".15em", color: "var(--charcoal)", fontWeight: 700 }}>الإجمالي الكلي</span>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", color: "var(--gold-deep)", fontWeight: 800 }}>{grandTotal} ج.م</span>
              </div>
            </div>
          </div>



          {paymentMethod === "vodafone" && (
            <div style={{ background: "var(--white)", border: "1px solid var(--gold)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 15px rgba(201,168,76,.08)" }}>
              {/* Info Section */}
              <div style={{ background: "var(--pearl)", borderBottom: "1px solid rgba(201,168,76,.15)", padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(201,168,76,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 6px", fontFamily: "'Cairo', sans-serif", fontSize: "1.05rem", color: "var(--charcoal)", fontWeight: 800, lineHeight: 1.3 }}>
                    الدفع الآمن عبر فودافون كاش
                  </h4>
                  <p style={{ margin: 0, fontFamily: "'Cairo', sans-serif", fontSize: ".9rem", color: "var(--charcoal)", opacity: 0.85, lineHeight: 1.6, fontWeight: 500 }}>
                    أدخل رقم محفظتك في الأسفل. بعد الضغط على "تأكيد الطلب"، ستصلك رسالة من فودافون كاش على هاتفك مباشرة لتأكيد الخصم برقمك السري بكل أمان.
                  </p>
                </div>
              </div>

              {/* Input Section */}
              <div style={{ padding: "20px" }}>
                <label style={{ display: "block", fontFamily: "'Cairo', sans-serif", fontSize: ".95rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "10px" }}>
                  رقم محفظة فودافون كاش <span style={{ color: "#e74c3c", fontSize: "1.1em" }}>*</span>
                </label>
                <div style={{ position: "relative", maxWidth: "400px" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "1.2rem", display: "flex", pointerEvents: "none" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  </span>
                  <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="010xxxxxxxx"
                    style={{ 
                      width: "100%", padding: "14px 16px 14px 44px", border: "1.5px solid var(--border2)", 
                      borderRadius: "8px", fontSize: "1.1rem", outline: "none", background: "var(--white)", 
                      direction: "ltr", textAlign: "left", fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: "2px", 
                      color: "var(--charcoal)", transition: "all .2s ease", boxShadow: "inset 0 2px 4px rgba(26,22,18,.02)"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border2)"; e.target.style.boxShadow = "inset 0 2px 4px rgba(26,22,18,.02)"; }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Error */}
          {formErrors.submit && (
            <div style={{ background: "rgba(231,76,60,.1)", border: "1px solid rgba(231,76,60,.4)", borderRadius: "8px", padding: "14px 18px", fontSize: ".88rem", color: "#c0392b", textAlign: "center", fontWeight: 600 }}>
              {formErrors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
            onMouseDown={() => setBtnPressed(true)}
            onMouseUp={() => setBtnPressed(false)}
            style={{
              width: "100%",
              padding: "20px",
              background: loading
                ? "var(--muted2)"
                : btnPressed
                  ? "#2a2200"
                  : btnHovered
                    ? "var(--gold-deep)"
                    : "var(--charcoal)",
              color: btnHovered && !loading ? "#fff" : "var(--gold-pale)",
              border: "none",
              borderRadius: "10px",
              fontFamily: "'Cinzel', serif",
              fontSize: ".85rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all .25s ease",
              transform: btnPressed ? "scale(0.98) translateY(2px)" : btnHovered ? "translateY(-3px)" : "none",
              boxShadow: btnPressed
                ? "0 3px 10px rgba(26,22,18,.2)"
                : btnHovered
                  ? "0 16px 40px rgba(166,131,46,.45)"
                  : "0 10px 30px rgba(26,22,18,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontWeight: 700
            }}
          >
            {loading ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                  <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                جاري تأكيد وتسجيل الطلب...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {paymentMethod === 'vodafone' ? 'الدفع بواسطة فودافون كاش' : 'تأكيد الطلب الآن'}
              </>
            )}
          </button>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "8px 0" }}>
            {["🔒 دفع آمن ومشفر", "🚚 توصيل لكافة المحافظات", "↩ ضمان الجودة"].map(t => (
              <span key={t} style={{ fontSize: ".72rem", color: "var(--muted)", fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus {
          border-color: var(--gold) !important;
          box-shadow: 0 0 0 4px rgba(201,168,76,.15) !important;
        }
      `}</style>
    </div>
  );
}
