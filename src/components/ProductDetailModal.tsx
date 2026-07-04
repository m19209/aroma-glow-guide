import { useEffect, useRef } from "react";
import { Product } from "@/lib/product-data";
import { Bottle } from "@/components/Bottle";

export function ProductDetailModal({
  product,
  onClose,
  stocks,
  addToCart,
  wishlist,
  toggleWish
}: {
  product: Product | null;
  onClose: () => void;
  stocks: Record<string, number>;
  addToCart: (p: Product) => void;
  wishlist: Set<string>;
  toggleWish: (id: string) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      modalRef.current?.focus();
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="pdetail-backdrop open" onMouseDown={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div
        className="pdetail-modal"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
      >
        <button className="pdetail-close" onClick={onClose} aria-label="إغلاق">✕</button>
        
        <div className="pdetail-media">
          <div className="pdetail-media-img">
            <Bottle variant={product.bottle} label={product.name} />
          </div>
          {product.badge && (
            <span className={`pbadge ${product.badge.variant}`}>
              {product.badge.label}
            </span>
          )}
        </div>

        <div className="pdetail-info-col">
          <div className="pfamily">{product.family}</div>
          <h2 className="pdetail-name">{product.name}</h2>
          <div className="pdetail-vol">{product.volume}</div>
          
          <p className="pdetail-story">{product.story}</p>
          
          <div className="pdetail-info-title">المواصفات</div>
          <ul className="pdetail-specs">
            <li><span>التركيز</span><strong>{product.concentration}</strong></li>
            <li><span>الثبات</span><strong>{product.longevity}</strong></li>
            <li><span>الفوحان</span><strong>{product.sillage}</strong></li>
          </ul>

          <div className="pdetail-info-title">الهرم العطري</div>
          <div className="pdetail-pyramid">
            <div className="pyramid-row">
              <span className="pyramid-lvl">القمة</span>
              <p>{product.topNotes}</p>
            </div>
            <div className="pyramid-row">
              <span className="pyramid-lvl">القلب</span>
              <p>{product.heartNotes}</p>
            </div>
            <div className="pyramid-row">
              <span className="pyramid-lvl">القاعدة</span>
              <p>{product.baseNotes}</p>
            </div>
          </div>
          
          {(stocks[product.id] ?? 5) <= 2 && (
            <div style={{ color: "#d9534f", fontSize: "0.85rem", marginTop: "10px", fontWeight: "bold" }}>
              تبقى {(stocks[product.id] ?? 5)} قطع فقط!
            </div>
          )}

          <div className="pdetail-price">
            {product.oldPrice && <span className="pprice-old">{product.oldPrice} ج.م</span>}
            <span className="pprice">{product.price} ج.م</span>
          </div>
          
          <div className="pdetail-actions">
            <button
              className="btn-gold pdetail-buy"
              disabled={(stocks[product.id] ?? 5) <= 0}
              style={{ opacity: (stocks[product.id] ?? 5) <= 0 ? 0.5 : 1 }}
              onClick={() => { addToCart(product); onClose(); }}
            >
              شراء الآن — Add to Cart
            </button>
            <button
              className={`pwish ${wishlist.has(product.id) ? "active" : ""}`}
              onClick={() => toggleWish(product.id)}
              aria-label="المفضلة"
            >
              {wishlist.has(product.id) ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
