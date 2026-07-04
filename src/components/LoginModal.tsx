import { useEffect, useRef, useState } from "react";
import { loginUser, signupUser } from "@/lib/auth";

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

  // Re-validate touched fields as user types
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
    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });

    const errors = validateFields(isRegister, authName, authEmail, authPassword);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Don't submit if there are validation errors
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
              <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setErrorMsg(""); setFieldErrors({}); setTouched({}); }}>
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

