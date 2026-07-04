import { Product } from "@/lib/product-data";
import { Bottle } from "@/components/Bottle";
import { useEffect, useRef } from "react";

export type CartLine = { product: Product; qty: number };

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
  shippingProgress
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
  checkout: () => void;
  checkoutLoading: boolean;
  shippingProgress: number;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
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
            <span style={{ fontSize: '1.2rem' }}>سلة المشتريات</span>
            <span style={{ color: 'var(--gold-deep)', fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.15em', marginTop: '3px' }}>— CART</span>
          </h3>
          <button className="cart-close" onClick={onClose} aria-label="إغلاق السلة">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
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
              <div key={c.product.id} className="cart-line">
                <div className="cart-line-img">
                  <Bottle variant={c.product.bottle} label={c.product.name} />
                </div>
                <div className="cart-line-info">
                  <div className="cart-line-name" style={{ fontSize: '1.4rem', fontWeight: 600 }}>{c.product.name}</div>
                  <div className="cart-line-fam" style={{ fontSize: '0.9rem', marginTop: '4px' }}>{c.product.family}</div>
                  <div className="cart-line-price" style={{ fontSize: '1.25rem', marginTop: '10px' }}>{c.product.price} ج.م</div>
                  <div className="qty" style={{ marginTop: '14px' }}>
                    <button onClick={() => setQty(c.product.id, c.qty - 1)} style={{ width: '32px', height: '32px', fontSize: '1.2rem' }}>-</button>
                    <span style={{ fontSize: '1.2rem', padding: '0 10px' }}>{c.qty}</span>
                    <button onClick={() => setQty(c.product.id, c.qty + 1)} style={{ width: '32px', height: '32px', fontSize: '1.2rem' }}>+</button>
                    <button className="qty-remove" style={{ fontSize: '0.95rem' }} onClick={() => removeLine(c.product.id)}>إزالة</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="ship-progress">
              <div className={shippingProgress === 100 ? "ship-msg ship-ok" : "ship-msg"} style={{ fontSize: "1.05rem", marginBottom: "12px", textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {shippingProgress === 100 ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span>تهانينا! طلبك مؤهل للشحن المجاني</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>تبقى <strong>{800 - cartTotal} ج.م</strong> للحصول على شحن مجاني</span>
                  </>
                )}
              </div>
              <div className="ship-bar">
                <div className="ship-fill" style={{ width: `${shippingProgress}%` }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="كود الخصم (إن وجد)"
                aria-label="كود الخصم"
                value={promoInput}
                onChange={e => setPromoInput(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '1.1rem' }}
              />
              <button onClick={applyPromo} className="btn-gold" style={{ padding: "0 18px", fontSize: "1.1rem" }}>تفعيل</button>
            </div>
            {promoApplied && (
              <div style={{ color: "#d4af37", fontSize: "1.1rem", marginBottom: "15px" }}>
                تم تفعيل الخصم: {promoApplied.pct}%
              </div>
            )}
            <div className="cart-total" style={{ fontSize: '1.4rem', color: 'var(--muted)' }}>
              <span>المجموع</span>
              <span>{cartTotal} ج.م</span>
            </div>
            <div className="cart-total" style={{ fontSize: '1.4rem', color: 'var(--muted)' }}>
              <span>الشحن</span>
              <span>{shippingFee === 0 ? "مجاني" : `${shippingFee} ج.م`}</span>
            </div>
            <div className="cart-total" style={{ fontWeight: 700, color: 'var(--charcoal)', fontSize: '1.9rem', marginTop: '12px', borderTop: '2px solid var(--border)', paddingTop: '18px', paddingBottom: '12px' }}>
              <span>الإجمالي</span>
              <span>{grandTotal} ج.م</span>
            </div>
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "18px", fontSize: "1.3rem", fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              onClick={checkout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "جاري التحويل..." : (
                <>
                  <span>إتمام الطلب</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"/>
                    <path d="M19 12H5"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
