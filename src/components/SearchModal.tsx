import { Product, PRODUCTS } from "@/lib/product-data";
import { useEffect, useRef } from "react";

export function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSelectProduct
}: {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSelectProduct: (p: Product) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={`drawer-backdrop active`} onClick={onClose} />
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="نافذة البحث"
        ref={modalRef}
        tabIndex={-1}
      >
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
            <button key={p.id} className="search-item" onClick={() => { onClose(); onSelectProduct(p); }}>
              <span>{p.name}</span>
              <span className="search-item-fam">{p.family} · {p.price} ج.م</span>
            </button>
          ))}
        </div>
        <button className="search-close" onClick={onClose}>إغلاق</button>
      </div>
    </>
  );
}
