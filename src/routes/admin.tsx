import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkAdmin, listCustomProducts, createCustomProduct, deleteCustomProduct } from "@/lib/admin-service";
import { loginUser } from "@/lib/auth-service";
import type { Product } from "@/lib/inventory";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة — VELORE" },
      { name: "description", content: "إدارة المنتجات — إضافة وحذف عطور المتجر." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type FormState = {
  name: string;
  family: string;
  notes: string;
  price: string;
  oldPrice: string;
  volume: string;
  badgeLabel: string;
  badgeVariant: string;
  bottle: string;
  label: string;
  concentration: string;
  longevity: string;
  sillage: string;
  occasion: string;
  gender: string;
  origin: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  story: string;
  imageData: string;
  stock: string;
};

const EMPTY: FormState = {
  name: "", family: "Oriental · Wood", notes: "", price: "", oldPrice: "", volume: "50 ML",
  badgeLabel: "", badgeVariant: "new", bottle: "noir", label: "",
  concentration: "Eau de Parfum 20%", longevity: "8-10 ساعات", sillage: "متوسط",
  occasion: "", gender: "للجنسين", origin: "", topNotes: "", heartNotes: "",
  baseNotes: "", story: "", imageData: "", stock: "10",
};

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "unauth" | "notadmin" | "ok">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [products, setProducts] = useState<(Product & { imageData?: string })[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function refresh() {
    const res = await checkAdmin();
    if (!res.loggedIn) return setStatus("unauth");
    if (!res.isAdmin) return setStatus("notadmin");
    setStatus("ok");
    const list = await listCustomProducts();
    setProducts(list as any);
  }

  useEffect(() => { refresh(); }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");
    const res = await loginUser({ data: { email, password } });
    if (res.success) refresh();
    else setLoginErr(res.error || "فشل تسجيل الدخول");
  }

  async function handleImage(file: File) {
    if (file.size > 2_000_000) { setMsg("حجم الصورة يجب أن يكون أقل من 2MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, imageData: reader.result as string }));
    reader.readAsDataURL(file);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setMsg("");
    const payload = {
      name: form.name.trim(),
      family: form.family,
      notes: form.notes,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      volume: form.volume,
      badgeLabel: form.badgeLabel || undefined,
      badgeVariant: form.badgeVariant || undefined,
      bottle: form.bottle,
      label: form.label || form.name,
      concentration: form.concentration,
      longevity: form.longevity,
      sillage: form.sillage,
      occasion: form.occasion,
      gender: form.gender,
      origin: form.origin,
      topNotes: form.topNotes,
      heartNotes: form.heartNotes,
      baseNotes: form.baseNotes,
      story: form.story,
      imageData: form.imageData,
      stock: Number(form.stock || 0),
    };
    try {
      const res = await createCustomProduct({ data: payload });
      if (res.success) {
        setMsg("✓ تم إضافة المنتج بنجاح");
        setForm(EMPTY);
        refresh();
      } else {
        setMsg(res.error || "فشل حفظ المنتج");
      }
    } catch (err: any) {
      setMsg(err?.message || "خطأ غير متوقع");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    const res = await deleteCustomProduct({ data: id });
    if (res.success) refresh();
    else setMsg(res.error || "فشل الحذف");
  }

  const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "40px 24px", fontFamily: "Cairo, sans-serif" };
  const card: React.CSSProperties = { background: "#fff", border: "1px solid #eadfc9", borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: "0 6px 24px rgba(0,0,0,.05)" };
  const input: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #d9c9a7", borderRadius: 8, fontFamily: "inherit", fontSize: 15, background: "#fdfbf7" };
  const label: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#6b5b3b" };
  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 };
  const btn: React.CSSProperties = { padding: "12px 24px", background: "#1a1a1a", color: "#e9d9a7", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontFamily: "inherit", fontSize: 15 };

  return (
    <div style={{ minHeight: "100vh", background: "#fdfbf7" }} dir="rtl">
      <nav style={{ position: "sticky", top: 0, background: "#0d0d0d", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
        <Link to="/" style={{ color: "#e9d9a7", fontFamily: "Cinzel, serif", fontSize: 24, fontWeight: 700, textDecoration: "none", letterSpacing: 3 }}>VELORE</Link>
        <span style={{ color: "#e9d9a7", fontFamily: "Cairo, sans-serif", fontSize: 14 }}>لوحة الإدارة</span>
      </nav>

      <div style={wrap}>
        {status === "loading" && <p style={{ textAlign: "center", padding: 60 }}>جاري التحميل...</p>}

        {status === "unauth" && (
          <div style={{ ...card, maxWidth: 420, margin: "60px auto" }}>
            <h2 style={{ fontFamily: "Cinzel, serif", marginBottom: 8, textAlign: "center" }}>تسجيل دخول الإدارة</h2>
            <p style={{ fontSize: 13, color: "#8a7a5a", marginBottom: 20, textAlign: "center" }}>يجب أن يكون حسابك مسجّلاً كمشرف</p>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label style={label}>البريد الإلكتروني</label>
                <input style={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={label}>كلمة المرور</label>
                <input style={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {loginErr && <p style={{ color: "#c33", fontSize: 13, marginBottom: 12 }}>{loginErr}</p>}
              <button style={{ ...btn, width: "100%" }} type="submit">دخول</button>
            </form>
          </div>
        )}

        {status === "notadmin" && (
          <div style={{ ...card, maxWidth: 500, margin: "60px auto", textAlign: "center" }}>
            <h2 style={{ color: "#c33", marginBottom: 12 }}>صلاحيات غير كافية</h2>
            <p style={{ color: "#6b5b3b", marginBottom: 20 }}>حسابك ليس لديه صلاحيات إدارة. تواصل مع مسؤول المتجر.</p>
            <p style={{ fontSize: 12, color: "#8a7a5a", background: "#f5eedb", padding: 12, borderRadius: 8 }}>
              💡 لتفعيل الصلاحيات: أضف بريدك الإلكتروني إلى متغير البيئة <code>ADMIN_EMAILS</code> (مفصول بفواصل)، ثم أعد تحميل هذه الصفحة.
            </p>
            <button style={{ ...btn, marginTop: 20 }} onClick={() => navigate({ to: "/" })}>العودة للرئيسية</button>
          </div>
        )}

        {status === "ok" && (
          <>
            <div style={card}>
              <h2 style={{ fontFamily: "Cinzel, serif", fontSize: 26, marginBottom: 6 }}>إضافة منتج جديد</h2>
              <p style={{ fontSize: 14, color: "#8a7a5a", marginBottom: 20 }}>سيظهر المنتج الجديد في المتجر مباشرة بنفس تنسيق البطاقات الأخرى.</p>
              <form onSubmit={submit}>
                <div style={grid2}>
                  <div><label style={label}>اسم المنتج *</label><input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                  <div><label style={label}>العلامة (LABEL بالإنجليزية)</label><input style={input} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="مثل: LAYL" /></div>
                  <div><label style={label}>العائلة العطرية</label><input style={input} value={form.family} onChange={(e) => setForm({ ...form, family: e.target.value })} /></div>
                  <div><label style={label}>الحجم</label><input style={input} value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} /></div>
                  <div><label style={label}>السعر (ج.م) *</label><input style={input} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
                  <div><label style={label}>السعر القديم (اختياري)</label><input style={input} type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} /></div>
                  <div><label style={label}>المخزون</label><input style={input} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
                  <div><label style={label}>الشارة (Badge)</label><input style={input} value={form.badgeLabel} onChange={(e) => setForm({ ...form, badgeLabel: e.target.value })} placeholder="مثل: NEW / SALE / HOT" /></div>
                  <div>
                    <label style={label}>نوع الشارة</label>
                    <select style={input} value={form.badgeVariant} onChange={(e) => setForm({ ...form, badgeVariant: e.target.value })}>
                      <option value="new">new</option><option value="sale">sale</option><option value="hot">hot</option><option value="limited">limited</option>
                    </select>
                  </div>
                  <div>
                    <label style={label}>نمط الزجاجة الاحتياطي</label>
                    <select style={input} value={form.bottle} onChange={(e) => setForm({ ...form, bottle: e.target.value })}>
                      {["noir","rose","oud","azur","vert","velvet","ambre","blanc","saphir","emeraude","zahra","musk"].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <label style={label}>ملاحظات مختصرة (سطر واحد)</label>
                  <input style={input} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="العنبر · المسك · العود ..." />
                </div>

                <div style={{ ...grid2, marginTop: 14 }}>
                  <div><label style={label}>التركيز</label><input style={input} value={form.concentration} onChange={(e) => setForm({ ...form, concentration: e.target.value })} /></div>
                  <div><label style={label}>الثبات</label><input style={input} value={form.longevity} onChange={(e) => setForm({ ...form, longevity: e.target.value })} /></div>
                  <div><label style={label}>الانتشار</label><input style={input} value={form.sillage} onChange={(e) => setForm({ ...form, sillage: e.target.value })} /></div>
                  <div><label style={label}>المناسبة</label><input style={input} value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} /></div>
                  <div><label style={label}>الفئة</label><input style={input} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} /></div>
                  <div><label style={label}>المنشأ</label><input style={input} value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} /></div>
                </div>

                <div style={{ ...grid2, marginTop: 14 }}>
                  <div><label style={label}>النغمات العُلوية</label><input style={input} value={form.topNotes} onChange={(e) => setForm({ ...form, topNotes: e.target.value })} /></div>
                  <div><label style={label}>نغمات القلب</label><input style={input} value={form.heartNotes} onChange={(e) => setForm({ ...form, heartNotes: e.target.value })} /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label style={label}>النغمات القاعدية</label><input style={input} value={form.baseNotes} onChange={(e) => setForm({ ...form, baseNotes: e.target.value })} /></div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <label style={label}>القصة</label>
                  <textarea style={{ ...input, minHeight: 80, fontFamily: "inherit" }} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} />
                </div>

                <div style={{ marginTop: 14 }}>
                  <label style={label}>صورة المنتج * (JPG/PNG بحد 2MB)</label>
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} />
                  {form.imageData && (
                    <img src={form.imageData} alt="preview" style={{ marginTop: 10, maxWidth: 160, maxHeight: 160, borderRadius: 10, border: "1px solid #eadfc9" }} />
                  )}
                </div>

                {msg && <p style={{ marginTop: 14, padding: 10, borderRadius: 8, background: msg.startsWith("✓") ? "#e8f5e9" : "#fde8e8", color: msg.startsWith("✓") ? "#2e7d32" : "#c33" }}>{msg}</p>}

                <button style={{ ...btn, marginTop: 18 }} type="submit" disabled={saving}>{saving ? "جاري الحفظ..." : "إضافة المنتج"}</button>
              </form>
            </div>

            <div style={card}>
              <h2 style={{ fontFamily: "Cinzel, serif", fontSize: 22, marginBottom: 16 }}>المنتجات المضافة ({products.length})</h2>
              {products.length === 0 && <p style={{ color: "#8a7a5a" }}>لم يتم إضافة أي منتجات حتى الآن.</p>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {products.map((p) => (
                  <div key={p.id} style={{ border: "1px solid #eadfc9", borderRadius: 10, padding: 14, background: "#fdfbf7" }}>
                    {p.imageData && <img src={p.imageData} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} />}
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#8a7a5a", marginBottom: 8 }}>{p.family} · {p.volume}</div>
                    <div style={{ fontWeight: 700, color: "#8b6f2a", marginBottom: 10 }}>{p.price} ج.م</div>
                    <button onClick={() => remove(p.id)} style={{ width: "100%", padding: "8px", background: "#fde8e8", color: "#c33", border: "1px solid #f5c6c6", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>حذف</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
