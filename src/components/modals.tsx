import { useEffect, useRef, useState } from "react";
import { loginUser, signupUser } from "@/lib/auth-service";
import { Product, PRODUCTS } from "@/lib/inventory";
import { Bottle } from "@/components/ui-elements";

// --- Login Modal ---

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFields(
  isRegister: boolean,
  name: string,
  email: string,
  password: string
): FieldErrors {
  const errors: FieldErrors = {};

  if (isRegister && name.trim().length < 3) {
    errors.name = "يرجى إدخال الاسم الكامل (3 أحرف على الأقل)";
  }

  if (!email.trim()) {
    errors.email = "يرجى إدخال البريد الإلكتروني";
  } else if (!validateEmail(email.trim())) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة";
  }

  if (!password) {
    errors.password = "يرجى إدخال كلمة المرور";
  } else if (password.length < 6) {
    errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  }

  return errors;
}

export function LoginModal({
  isOpen,
  onClose,
  onLogin
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userId: string) => void;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRegister(false);
      setAuthName("");
      setAuthEmail("");
      setAuthPassword("");
      setErrorMsg("");
      setFieldErrors({});
      setTouched({});
      modalRef.current?.focus();
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

  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    const errors = validateFields(isRegister, authName, authEmail, authPassword);
    const visibleErrors: FieldErrors = {};
    if (touched.name && errors.name) visibleErrors.name = errors.name;
    if (touched.email && errors.email) visibleErrors.email = errors.email;
    if (touched.password && errors.password) visibleErrors.password = errors.password;
    setFieldErrors(visibleErrors);
  }, [authName, authEmail, authPassword, isRegister, touched]);

  if (!isOpen) return null;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, password: true });

    const errors = validateFields(isRegister, authName, authEmail, authPassword);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setAuthLoading(true);
    setErrorMsg("");
    try {
      if (isRegister) {
        const res = await signupUser({ data: { name: authName, email: authEmail, password: authPassword } });
        if (res.success) {
          onLogin(res.userId || "user_id");
          onClose();
        } else {
          setErrorMsg(res.error || "حدث خطأ");
        }
      } else {
        const res = await loginUser({ data: { email: authEmail, password: authPassword } });
        if (res.success) {
          onLogin(res.userId || "user_id");
          onClose();
        } else {
          setErrorMsg(res.error || "بيانات الدخول غير صحيحة");
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const fieldErrorStyle: React.CSSProperties = {
    color: "#e74c3c",
    fontSize: "0.78rem",
    marginTop: "4px",
    textAlign: "right",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const inputErrorClass = (field: keyof FieldErrors) =>
    fieldErrors[field] ? "magic-input magic-input-error" : "magic-input";

  return (
    <div 
      className="magic-backdrop" 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="magic-login-modal split-modal"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="magic-modal-content">
          <button className="magic-close" onClick={onClose} aria-label="إغلاق">✕</button>
          <div className="magic-dropdown-inner">
            <h2 className="magic-title">{isRegister ? "إنشاء حساب" : "تسجيل الدخول"}</h2>
            <p className="magic-subtitle">
              {isRegister ? "انضم إلى مجتمع ڤيلور الفاخر" : "مرحباً بعودتك إلى عالم ڤيلور"}
            </p>
            
            <div className="magic-form">
              {isRegister && (
                <div className="magic-input-group">
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputErrorClass("name")}
                    aria-invalid={!!fieldErrors.name}
                  />
                  {fieldErrors.name && (
                    <div style={fieldErrorStyle} role="alert">
                      <span>⚠</span> {fieldErrors.name}
                    </div>
                  )}
                </div>
              )}
              <div className="magic-input-group">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputErrorClass("email")}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <div style={fieldErrorStyle} role="alert">
                    <span>⚠</span> {fieldErrors.email}
                  </div>
                )}
              </div>
              <div className="magic-input-group">
                <input
                  type="password"
                  placeholder="كلمة المرور (6 أحرف على الأقل)"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={inputErrorClass("password")}
                  aria-invalid={!!fieldErrors.password}
                />
                {fieldErrors.password && (
                  <div style={fieldErrorStyle} role="alert">
                    <span>⚠</span> {fieldErrors.password}
                  </div>
                )}
              </div>
              {errorMsg && (
                <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginBottom: "10px", textAlign: "right", background: "rgba(231,76,60,0.08)", padding: "8px 12px", borderRadius: "6px", border: "1px solid rgba(231,76,60,0.2)" }} role="alert">
                  {errorMsg}
                </div>
              )}
              <button disabled={authLoading} className="magic-submit-btn" onClick={handleSubmit}>
                {authLoading ? <span className="magic-loader"></span> : isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
              </button>
            </div>
            
            <div className="magic-switch">
              {isRegister ? "لديك حساب بالفعل؟ " : "ليس لديك حساب؟ "}
              <a href="#switch" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setErrorMsg(""); setFieldErrors({}); setTouched({}); }}>
                {isRegister ? "تسجيل الدخول" : "إنشاء حساب"}
              </a>
            </div>
          </div>
        </div>
        <div className="magic-modal-image"></div>
      </div>
    </div>
  );
}

// --- Product Detail Modal ---

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

// --- Search Modal ---

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
      <div className="drawer-backdrop open" onClick={onClose} />
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
