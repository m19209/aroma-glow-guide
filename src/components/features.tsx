import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Product } from "@/lib/inventory";
import { updateUserProfile, getUserProfile } from "@/lib/auth-service";
import { Bottle } from "@/components/ui-elements";

// --- Types ---
export type CartLine = { product: Product; qty: number };

type UserData = {
  id: string;
  name: string | null;
  email: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  building: string;
  createdAt: Date;
};

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  status: string;
  totalAmount: number;
  shippingAddress: string | null;
  createdAt: Date;
  items: OrderItem[];
};

type AddressData = {
  phone: string;
  city: string;
  district: string;
  street: string;
  building: string;
};

// --- Cart Drawer ---
export function CartDrawer({
  isOpen,
  onClose,
  cart,
  setQty,
  removeLine,
  shippingFee,
  cartTotal,
  promoApplied,
  promoInput,
  setPromoInput,
  applyPromo,
  grandTotal,
  checkout,
  checkoutLoading,
  shippingProgress,
  currentUser,
  onLoginRequired
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartLine[];
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  shippingFee: number;
  cartTotal: number;
  promoApplied: { code: string; pct: number } | null;
  promoInput: string;
  setPromoInput: (val: string) => void;
  applyPromo: () => void;
  grandTotal: number;
  checkout: (data: {
    customerName: string;
    customerPhone: string;
    governorate: string;
    city: string;
    district: string;
    street: string;
    building: string;
    orderNotes: string;
    paymentMethod: 'cod' | 'vodafone';
  }) => void;
  checkoutLoading: boolean;
  shippingProgress: number;
  currentUser: string | null;
  onLoginRequired: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vodafone'>('cod');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setIsCheckingOut(false);
      setFormErrors({});
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
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    onClose();
    navigate({ to: "/checkout" });
  };

  const handleConfirmOrder = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.customerName = "يرجى إدخال الاسم الكامل";
    if (!customerPhone.trim()) {
      errors.customerPhone = "يرجى إدخال رقم الهاتف";
    } else if (customerPhone.trim().length < 10) {
      errors.customerPhone = "رقم الهاتف غير صحيح";
    }
    if (!governorate.trim()) errors.governorate = "يرجى إدخال المحافظة";
    if (!city.trim()) errors.city = "يرجى إدخال المدينة";
    if (!district.trim()) errors.district = "يرجى إدخال المنطقة / الحي";
    if (!street.trim()) errors.street = "يرجى إدخال اسم الشارع";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    checkout({
      customerName,
      customerPhone,
      governorate,
      city,
      district,
      street,
      building,
      orderNotes,
      paymentMethod,
    });
  };

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? "open" : ""}`} onClick={onClose} />
      <div 
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة المشتريات"
        ref={drawerRef}
        tabIndex={-1}
      >
        <div className="cart-head">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            {isCheckingOut ? (
              <>
                <button 
                  onClick={() => setIsCheckingOut(false)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--charcoal)' }}
                  aria-label="العودة"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 19 12 12 5"></polyline></svg>
                </button>
                <span style={{ fontSize: '1.3rem', fontFamily: '"Cairo", sans-serif', fontWeight: 600 }}>إتمام الطلب</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '1rem', fontFamily: '"Cairo", sans-serif', fontWeight: 700, letterSpacing: '0' }}>سلة المشتريات</span>
                <span style={{ color: 'var(--gold-deep)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', marginTop: '2px', fontFamily: '"Cinzel", serif' }}>— CART</span>
              </>
            )}
          </h3>
          <button className="cart-close" onClick={onClose} aria-label="إغلاق السلة">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="cart-body" style={{ padding: isCheckingOut ? '24px 20px' : undefined }}>
          {isCheckingOut ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', direction: 'rtl', textAlign: 'right' }}>
              <h4 style={{ margin: '0 0 2px', fontSize: '1.05rem', color: 'var(--gold-deep)', fontFamily: '"Cairo", sans-serif' }}>تفاصيل الشحن والتوصيل</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>الاسم الكامل</label>
                <input 
                  type="text" 
                  className={`magic-input ${formErrors.customerName ? 'magic-input-error' : ''}`}
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="اسم المستلم ثلاثي"
                  style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                />
                {formErrors.customerName && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.customerName}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>رقم الهاتف (للتواصل أو واتساب)</label>
                <input 
                  type="tel" 
                  className={`magic-input ${formErrors.customerPhone ? 'magic-input-error' : ''}`}
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="مثال: 010xxxxxxxx"
                  style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                />
                {formErrors.customerPhone && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.customerPhone}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>المحافظة</label>
                  <input 
                    type="text" 
                    className={`magic-input ${formErrors.governorate ? 'magic-input-error' : ''}`}
                    value={governorate}
                    onChange={e => setGovernorate(e.target.value)}
                    placeholder="مثال: القاهرة"
                    style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                  />
                  {formErrors.governorate && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.governorate}</span>}

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>المدينة</label>
                  <input 
                    type="text" 
                    className={`magic-input ${formErrors.city ? 'magic-input-error' : ''}`}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="مثال: مدينة نصر"
                    style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                  />
                  {formErrors.city && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.city}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>المنطقة / الحي</label>
                <input 
                  type="text" 
                  className={`magic-input ${formErrors.district ? 'magic-input-error' : ''}`}
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="مثال: الحي السابع"
                  style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                />
                {formErrors.district && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.district}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>الشارع</label>
                  <input 
                    type="text" 
                    className={`magic-input ${formErrors.street ? 'magic-input-error' : ''}`}
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="اسم الشارع"
                    style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                  />
                  {formErrors.street && <span style={{ color: '#e74c3c', fontSize: '0.75rem' }}>{formErrors.street}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>تفاصيل المنزل</label>
                  <input 
                    type="text" 
                    className="magic-input"
                    value={building}
                    onChange={e => setBuilding(e.target.value)}
                    placeholder="مثال: مبنى 10، دور 2"
                    style={{ padding: '8px 12px', fontSize: '0.95rem', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--charcoal)', fontWeight: 600 }}>ملاحظات الطلب</label>
                <textarea 
                  className="magic-input"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="هل هناك ملاحظات أخرى؟"
                  style={{ padding: '8px 12px', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical', border: '1px solid var(--border3)', borderRadius: '6px', backgroundColor: 'var(--beige-light)' }}
                />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />

              <h4 style={{ margin: '0 0 2px', fontSize: '1.05rem', color: 'var(--gold-deep)', fontFamily: '"Cairo", sans-serif' }}>طريقة الدفع</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: paymentMethod === 'cod' ? '2px solid var(--gold-deep)' : '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: paymentMethod === 'cod' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.1rem' }}>💵</span>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <strong style={{ fontSize: '0.9rem' }}>الدفع عند الاستلام (COD)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>ادفع نقدًا عند توصيل طلبتك للعنوان</span>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    style={{ accentColor: 'var(--gold-deep)' }}
                  />
                </div>

                <div 
                  onClick={() => setPaymentMethod('vodafone')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: paymentMethod === 'vodafone' ? '2px solid var(--gold-deep)' : '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: paymentMethod === 'vodafone' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.1rem' }}>📱</span>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <strong style={{ fontSize: '0.9rem' }}>فودافون كاش (Vodafone Cash)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>تحويل محفظة إلكترونية فورية</span>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={paymentMethod === 'vodafone'} 
                    onChange={() => setPaymentMethod('vodafone')}
                    style={{ accentColor: 'var(--gold-deep)' }}
                  />
                </div>
              </div>

              {paymentMethod === 'vodafone' && (
                <div style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: '#9f7d1c',
                  lineHeight: '1.5',
                  textAlign: 'right',
                  marginTop: '4px'
                }}>
                  ⚠️ <strong>ملاحظة هامة للتحويل:</strong> يرجى تحويل مبلغ الطلب الإجمالي إلى الرقم <strong>01012345678</strong> (فودافون كاش) بعد إتمام الطلب، والاحتفاظ بلقطة الشاشة للتأكيد عند تواصلنا معك.
                </div>
              )}
            </div>
          ) : (
            cart.length === 0 ? (
              <div className="cart-empty" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '80px 20px',
                textAlign: 'center',
                opacity: 0.6 
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '24px' }}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0, letterSpacing: '-0.5px' }}>السلة فارغة</p>
                <p style={{ fontSize: '1.05rem', marginTop: '12px', fontWeight: 300 }}>لم تقم بإضافة أي عطور بعد.</p>
              </div>
            ) : (
              cart.map(c => (
                <div key={c.product.id} className="cart-line cart-item-card">
                  <div className="cart-line-img">
                    <Bottle variant={c.product.bottle} label={c.product.name} />
                  </div>
                  <div className="cart-line-info">
                    <div className="cart-line-name">{c.product.name}</div>
                    <div className="cart-line-fam">{c.product.family}</div>
                    <div className="cart-line-price"><span dir="ltr">{c.product.price}</span> ج.م</div>
                    <div className="qty">
                      <div className="qty-pill">
                        <button type="button" onClick={() => setQty(c.product.id, c.qty - 1)} className="qty-btn qty-minus" aria-label="تقليل الكمية">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <span className="qty-count">{c.qty}</span>
                        <button type="button" onClick={() => setQty(c.product.id, c.qty + 1)} className="qty-btn qty-plus" aria-label="زيادة الكمية">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeLine(c.product.id)} aria-label="إزالة المنتج">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cart-remove-icon">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              ))
            )
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            {!isCheckingOut && (
              <>
                {/* Ultra-compact shipping progress bar */}
                <div className="ship-progress" style={{ marginBottom: '4px', padding: '4px 8px' }}>
                  <div className={shippingProgress === 100 ? "ship-msg ship-ok" : "ship-msg"} style={{ fontSize: "0.72rem", marginBottom: "2px", textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    {shippingProgress === 100 ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>طلبك مؤهل للشحن المجاني!</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>تبقى <strong>{800 - cartTotal} ج.م</strong> للشحن المجاني</span>
                      </>
                    )}
                  </div>
                  <div className="ship-bar" style={{ height: '3px' }}>
                    <div className="ship-fill" style={{ width: `${shippingProgress}%` }} />
                  </div>
                </div>

                {/* Ultra-compact promo row */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  <input
                    type="text"
                    placeholder="كود الخصم (إن وجد)"
                    aria-label="كود الخصم"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    style={{ flex: 1, padding: '3px 8px', border: '1px solid var(--border)', borderRadius: '3px', fontSize: '0.8rem', height: '26px' }}
                  />
                  <button onClick={applyPromo} className="btn-gold" style={{ padding: "0 10px", fontSize: "0.78rem", height: '26px' }}>تفعيل</button>
                </div>
                {promoApplied && (
                  <div style={{ color: "#d4af37", fontSize: "0.75rem", marginBottom: "3px" }}>
                    تم تفعيل الخصم: {promoApplied.pct}%
                  </div>
                )}
              </>
            )}

            {/* Subtotal & Shipping on 1 single line */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 2px', fontSize: '0.76rem', color: 'var(--muted)' }}>
              <span>المجموع: <strong style={{ color: 'var(--charcoal)', fontFamily: "'Cinzel', serif" }}><span dir="ltr">{cartTotal}</span> ج.م</strong></span>
              <span>الشحن: <strong style={{ color: shippingFee === 0 ? 'var(--gold-deep)' : 'var(--charcoal)', fontFamily: "'Cinzel', serif" }}>{shippingFee === 0 ? "مجاني 🎉" : <><span dir="ltr">{shippingFee}</span> ج.م</>}</strong></span>
            </div>

            {/* Grand Total Box */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', margin: '3px 0 5px', background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.3)', borderRadius: '4px' }}>
              <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'var(--charcoal)' }}>الإجمالي</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--charcoal)' }}><span dir="ltr">{grandTotal}</span> ج.م</span>
            </div>

            {isCheckingOut ? (
              <button
                className="btn-gold"
                style={{ width: "100%", padding: "8px", fontSize: "0.88rem", fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '4px' }}
                onClick={handleConfirmOrder}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "جاري تسجيل طلبك..." : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span>تأكيد الطلب</span>
                    <span dir="ltr" style={{ opacity: 0.8, fontSize: '0.85em' }}>— Confirm</span>
                  </span>
                )}
              </button>
            ) : (
              <button
                className="btn-gold"
                style={{ width: "100%", padding: "9px", fontSize: "0.9rem", fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '4px' }}
                onClick={handleProceedToCheckout}
              >
                <span>إتمام الطلب</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// --- Order Card ---
const STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending: { label: "معلق", className: "status-pending" },
  processing: { label: "قيد المعالجة", className: "status-processing" },
  shipped: { label: "تم الشحن", className: "status-shipped" },
  delivered: { label: "تم التوصيل", className: "status-delivered" },
  cancelled: { label: "ملغي", className: "status-cancelled" },
};

export function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = STATUS_MAP[order.status] || { label: order.status, className: "status-unknown" };
  const dateStr = new Date(order.createdAt).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="order-card-wrapper" style={{ border: "1px solid var(--border)", padding: "20px", marginBottom: "16px", background: "#fff", position: "relative" }}>
      <div 
        className="order-card-header" 
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h4 style={{ fontFamily: "Cinzel, Cairo, sans-serif", margin: 0, fontSize: "1.1rem", color: "var(--charcoal)", textAlign: "right" }}>
            طلب #{order.id.substring(0, 8)}
          </h4>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)", display: "block", marginTop: "4px" }}>
            تاريخ الطلب: {dateStr}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className={`status-badge ${statusInfo.className}`} style={{ fontSize: "0.85rem", padding: "4px 10px", borderRadius: "2px", fontWeight: 500 }}>
            {statusInfo.label}
          </span>
          <span style={{ fontSize: "1.1rem", color: "var(--charcoal)", fontWeight: "bold" }}>
            <span dir="ltr">{order.totalAmount}</span> ج.م
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="order-card-body" style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
          <h5 style={{ fontSize: "0.9rem", color: "var(--muted)", margin: "0 0 10px", textAlign: "right" }}>تفاصيل العطور المطلوبة:</h5>
          <div className="order-items-list" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem", padding: "6px 0", borderBottom: "1px dashed var(--border)" }}>
                <span style={{ color: "var(--charcoal)", fontWeight: 500 }}>{item.productName}</span>
                <div style={{ display: "flex", gap: "20px", color: "var(--muted)" }}>
                  <span>الكمية: {item.quantity}</span>
                  <span>سعر الوحدة: <span dir="ltr">{item.unitPrice}</span> ج.م</span>
                </div>
              </div>
            ))}
          </div>

          {order.shippingAddress && (
            <div style={{ marginTop: "16px", fontSize: "0.88rem", color: "var(--muted)", textAlign: "right" }}>
              <strong>عنوان الشحن:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--charcoal)" }}>{order.shippingAddress}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- Address Form ---
type AddressFormProps = {
  initialData: AddressData;
  onSave: (data: AddressData) => Promise<boolean>;
};

export function AddressForm({ initialData, onSave }: AddressFormProps) {
  const [phone, setPhone] = useState(initialData.phone);
  const [city, setCity] = useState(initialData.city);
  const [district, setDistrict] = useState(initialData.district);
  const [street, setStreet] = useState(initialData.street);
  const [building, setBuilding] = useState(initialData.building);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Basic validation
    if (!phone.trim()) {
      setErrorMsg("يرجى إدخال رقم الهاتف");
      setLoading(false);
      return;
    }
    if (!city.trim() || !district.trim() || !street.trim()) {
      setErrorMsg("يرجى ملء جميع الحقول الأساسية (المدينة، الحي، الشارع)");
      setLoading(false);
      return;
    }

    try {
      const ok = await onSave({ phone, city, district, street, building });
      if (ok) {
        setSuccessMsg("تم حفظ العنوان بنجاح");
      } else {
        setErrorMsg("حدث خطأ أثناء حفظ البيانات");
      }
    } catch (err) {
      setErrorMsg("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form-container">
      <h3 className="section-subtitle" style={{ textAlign: "right", marginBottom: "20px", color: "var(--gold-deep)" }}>
        عنوان التوصيل المعتمد
      </h3>
      
      <div className="magic-form">
        <div className="magic-input-group">
          <label className="input-label-ar">رقم الهاتف *</label>
          <input
            type="tel"
            placeholder="مثال: 01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="magic-input"
            required
          />
        </div>

        <div className="form-row-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="magic-input-group">
            <label className="input-label-ar">المدينة *</label>
            <input
              type="text"
              placeholder="مثال: القاهرة"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="magic-input"
              required
            />
          </div>
          <div className="magic-input-group">
            <label className="input-label-ar">المنطقة / الحي *</label>
            <input
              type="text"
              placeholder="مثال: مصر الجديدة"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="magic-input"
              required
            />
          </div>
        </div>

        <div className="magic-input-group">
          <label className="input-label-ar">الشارع *</label>
          <input
            type="text"
            placeholder="اسم الشارع أو الرقم"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="magic-input"
            required
          />
        </div>

        <div className="magic-input-group">
          <label className="input-label-ar">البناية / الشقة / تفاصيل إضافية</label>
          <input
            type="text"
            placeholder="رقم البناية، الطابق، الشقة"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="magic-input"
          />
        </div>

        {errorMsg && (
          <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "10px", textAlign: "right" }} role="alert">
            ⚠ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ color: "#2ecc71", fontSize: "0.85rem", marginTop: "10px", textAlign: "right" }} role="alert">
            ✓ {successMsg}
          </div>
        )}

        <button type="submit" disabled={loading} className="magic-submit-btn" style={{ marginTop: "24px" }}>
          {loading ? <span className="magic-loader"></span> : "حفظ العنوان"}
        </button>
      </div>
    </form>
  );
}

// --- User Profile Page ---
type UserProfilePageProps = {
  initialUser: UserData;
  initialOrders: Order[];
};

export function UserProfilePage({ initialUser, initialOrders }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"info" | "address" | "orders">("info");
  const [user, setUser] = useState<UserData>(initialUser);
  const [ordersList] = useState<Order[]>(initialOrders);
  
  const [name, setName] = useState(user.name || "");
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [infoSuccess, setInfoSuccess] = useState("");

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInfoError("");
    setInfoSuccess("");

    if (!name.trim()) {
      setInfoError("يرجى إدخال الاسم");
      setLoading(false);
      return;
    }

    try {
      const res = await updateUserProfile({
        data: {
          name,
          phone: user.phone,
          city: user.city,
          district: user.district,
          street: user.street,
          building: user.building,
        }
      });

      if (res.success) {
        setUser(prev => ({ ...prev, name }));
        setInfoSuccess("تم تحديث المعلومات بنجاح");
        setIsEditingInfo(false);
      } else {
        setInfoError(res.error || "حدث خطأ أثناء التحديث");
      }
    } catch (err) {
      setInfoError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async (addressData: {
    phone: string;
    city: string;
    district: string;
    street: string;
    building: string;
  }) => {
    try {
      const res = await updateUserProfile({
        data: {
          name: user.name || "",
          ...addressData
        }
      });

      if (res.success) {
        setUser(prev => ({ ...prev, ...addressData }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleLogout = () => {
    document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  const activeOrders = ordersList.filter(o => o.status !== "delivered" && o.status !== "cancelled");
  const previousOrders = ordersList.filter(o => o.status === "delivered" || o.status === "cancelled");

  return (
    <div className="profile-container-main" style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px", direction: "rtl" }}>
      <div className="profile-header-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border2)", paddingBottom: "24px", marginBottom: "30px" }}>
        <div>
          <h2 className="section-title" style={{ margin: 0, textAlign: "right", color: "var(--charcoal)", fontFamily: "Cinzel, Cairo, sans-serif" }}>
            حسابي الفاخر
          </h2>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
            مرحباً بك، {user.name || "عميلنا الكريم"}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="btn-outline-light" 
          style={{ padding: "10px 20px", fontSize: "0.9rem", color: "#e74c3c", borderColor: "rgba(231,76,60,0.3)", background: "transparent", cursor: "pointer" }}
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="profile-tabs-bar" style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border)", marginBottom: "30px" }}>
        <button 
          onClick={() => setActiveTab("info")}
          className={`profile-tab-btn ${activeTab === "info" ? "active" : ""}`}
        >
          المعلومات الشخصية
        </button>
        <button 
          onClick={() => setActiveTab("address")}
          className={`profile-tab-btn ${activeTab === "address" ? "active" : ""}`}
        >
          عنوان التوصيل
        </button>
        <button 
          onClick={() => setActiveTab("orders")}
          className={`profile-tab-btn ${activeTab === "orders" ? "active" : ""}`}
        >
          طلباتي ({ordersList.length})
        </button>
      </div>

      <div className="profile-tab-content">
        {activeTab === "info" && (
          <div className="profile-section-card" style={{ background: "var(--pearl)", padding: "30px", border: "1px solid var(--border)", borderRadius: "4px" }}>
            <h3 className="section-subtitle" style={{ textAlign: "right", color: "var(--gold-deep)", marginBottom: "20px" }}>
              بيانات الحساب الأساسية
            </h3>

            {isEditingInfo ? (
              <form onSubmit={handleSaveInfo} className="magic-form">
                <div className="magic-input-group">
                  <label className="input-label-ar">الاسم الكامل *</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="magic-input"
                    required
                  />
                </div>
                <div className="magic-input-group" style={{ opacity: 0.7 }}>
                  <label className="input-label-ar">البريد الإلكتروني (غير قابل للتعديل)</label>
                  <input 
                    type="email"
                    value={user.email}
                    className="magic-input"
                    disabled
                  />
                </div>

                {infoError && <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "10px" }}>⚠ {infoError}</div>}
                
                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <button type="submit" disabled={loading} className="magic-submit-btn" style={{ flex: 1, margin: 0 }}>
                    {loading ? <span className="magic-loader"></span> : "حفظ التغييرات"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setIsEditingInfo(false); setName(user.name || ""); }}
                    className="btn-outline-light" 
                    style={{ flex: 1, background: "transparent", border: "1px solid var(--border)", color: "var(--charcoal)", cursor: "pointer" }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="profile-info-row" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border)", paddingBottom: "10px" }}>
                  <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>الاسم الكامل:</span>
                  <strong style={{ color: "var(--charcoal)" }}>{user.name || "بدون اسم"}</strong>
                </div>
                <div className="profile-info-row" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border)", paddingBottom: "10px" }}>
                  <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>البريد الإلكتروني:</span>
                  <strong style={{ color: "var(--charcoal)" }}>{user.email}</strong>
                </div>
                <div className="profile-info-row" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border)", paddingBottom: "10px" }}>
                  <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>تاريخ الانضمام:</span>
                  <strong style={{ color: "var(--charcoal)" }}>
                    {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                  </strong>
                </div>

                {infoSuccess && <div style={{ color: "#2ecc71", fontSize: "0.85rem", marginTop: "10px" }}>✓ {infoSuccess}</div>}

                <button 
                  onClick={() => setIsEditingInfo(true)}
                  className="magic-submit-btn"
                  style={{ marginTop: "20px" }}
                >
                  تعديل معلومات الحساب
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div className="profile-section-card" style={{ background: "var(--pearl)", padding: "30px", border: "1px solid var(--border)", borderRadius: "4px" }}>
            <AddressForm 
              initialData={{
                phone: user.phone,
                city: user.city,
                district: user.district,
                street: user.street,
                building: user.building,
              }}
              onSave={handleSaveAddress}
            />
          </div>
        )}

        {activeTab === "orders" && (
          <div className="profile-section-card" style={{ background: "var(--pearl)", padding: "30px", border: "1px solid var(--border)", borderRadius: "4px" }}>
            <h3 className="section-subtitle" style={{ textAlign: "right", color: "var(--gold-deep)", marginBottom: "24px" }}>
              سجل الطلبات
            </h3>

            {ordersList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🛒</span>
                <p>ليس لديك أي طلبات حالية أو سابقة.</p>
              </div>
            ) : (
              <div>
                {activeOrders.length > 0 && (
                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "var(--charcoal)", borderRight: "3px solid var(--gold)", paddingRight: "10px", marginBottom: "16px", fontSize: "1rem", textAlign: "right" }}>
                      الطلبات الجارية
                    </h4>
                    {activeOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}

                {previousOrders.length > 0 && (
                  <div>
                    <h4 style={{ color: "var(--muted)", borderRight: "3px solid var(--border2)", paddingRight: "10px", marginBottom: "16px", fontSize: "1rem", textAlign: "right" }}>
                      الطلبات السابقة
                    </h4>
                    {previousOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
