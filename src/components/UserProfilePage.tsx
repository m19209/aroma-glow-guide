import { useState } from "react";
import { AddressForm } from "./AddressForm";
import { OrderCard } from "./OrderCard";
import { updateUserProfile } from "@/lib/user";

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

type UserProfilePageProps = {
  initialUser: UserData;
  initialOrders: Order[];
};

export function UserProfilePage({ initialUser, initialOrders }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"info" | "address" | "orders">("info");
  const [user, setUser] = useState<UserData>(initialUser);
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  
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
    // Delete cookie
    document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to home
    window.location.href = "/";
  };

  // Filter orders
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

      {/* Tabs */}
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

      {/* Tab Contents */}
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
