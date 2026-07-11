import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { updateOrderStatus } from "@/lib/auth-service";

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
  notes: string | null;
  paymentMethod: string | null;
  createdAt: Date | string;
  items: OrderItem[];
};

type AdminStats = {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  lowStockItems: Array<{ id: string; name: string; stock: number }>;
};

type AdminDashboardProps = {
  initialUser: { id: string; name: string | null; email: string };
  initialStats: AdminStats;
  initialOrders: Order[];
};

const STATUS_MAP: Record<string, { label: string; className: string; color: string; bg: string }> = {
  pending: { label: "معلق", className: "status-pending", color: "#cca43b", bg: "#fcf8e3" },
  processing: { label: "قيد المعالجة", className: "status-processing", color: "#31708f", bg: "#d9edf7" },
  shipped: { label: "تم الشحن", className: "status-shipped", color: "#3c763d", bg: "#dff0d8" },
  delivered: { label: "تم التوصيل", className: "status-delivered", color: "#1e5a1e", bg: "#d0e9c6" },
  cancelled: { label: "ملغي", className: "status-cancelled", color: "#a94442", bg: "#f2dede" },
};

export function AdminDashboard({ initialUser, initialStats, initialOrders }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [stats, setStats] = useState<AdminStats>(initialStats);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // orderId being updated
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsUpdating(orderId);
    try {
      const res = await updateOrderStatus({ data: { orderId, status: newStatus } });
      if (res.success) {
        // Update local state
        setOrders(prev =>
          prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        // Recalculate stats pending
        setStats(prev => {
          const matchedOrder = orders.find(o => o.id === orderId);
          if (!matchedOrder) return prev;
          
          let pendingDiff = 0;
          if (matchedOrder.status === "pending" && newStatus !== "pending") {
            pendingDiff = -1;
          } else if (matchedOrder.status !== "pending" && newStatus === "pending") {
            pendingDiff = 1;
          }

          let revenueDiff = 0;
          if (newStatus === "delivered" && matchedOrder.status !== "delivered") {
            revenueDiff = matchedOrder.totalAmount;
          } else if (matchedOrder.status === "delivered" && newStatus !== "delivered") {
            revenueDiff = -matchedOrder.totalAmount;
          }

          return {
            ...prev,
            pendingOrders: prev.pendingOrders + pendingDiff,
            totalRevenue: prev.totalRevenue + revenueDiff
          };
        });

        // Update selected order view if open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }

        showNotification("تم تحديث حالة الطلب ومزامنته مع جوجل شيت بنجاح! ✨");
      } else {
        showNotification(res.error || "فشل تحديث الطلب", true);
      }
    } catch (e: any) {
      showNotification(e.message || "حدث خطأ غير متوقع", true);
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    // Search by address info or notes (address contains customer details like name/phone)
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !normalizedQuery || 
      (order.shippingAddress && order.shippingAddress.toLowerCase().includes(normalizedQuery)) ||
      (order.notes && order.notes.toLowerCase().includes(normalizedQuery)) ||
      order.id.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: "#fdfbf7", minHeight: "100vh", fontFamily: "Cairo, sans-serif", color: "#1a1a1a" }}>
      {/* Styles Injected */}
      <style>{`
        .admin-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: #121212;
          color: #fdfbf7;
          border-bottom: 2px solid #cca43b;
        }
        .admin-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          letter-spacing: 2px;
          font-weight: 700;
          color: #cca43b;
        }
        .btn-back {
          color: #fdfbf7;
          text-decoration: none;
          font-size: 0.95rem;
          padding: 8px 16px;
          border: 1px solid #cca43b;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .btn-back:hover {
          background: #cca43b;
          color: #121212;
        }
        .admin-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid #e6e1da;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: #cca43b;
        }
        .stat-label {
          font-size: 0.9rem;
          color: #777;
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #121212;
          font-family: 'Outfit', sans-serif;
        }
        .low-stock-alert {
          background: #fff8eb;
          border: 1px solid #ffe8cc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 40px;
        }
        .low-stock-title {
          font-weight: 700;
          color: #b27a00;
          margin-top: 0;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .low-stock-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .low-stock-item {
          background: #fff;
          border: 1px solid #ffe8cc;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.88rem;
        }
        .orders-section {
          background: #fff;
          border: 1px solid #e6e1da;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 1.3rem;
          margin: 0;
          font-weight: 700;
        }
        .filters-search {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          width: 100%;
          margin-bottom: 20px;
        }
        .search-input {
          flex: 1;
          min-width: 260px;
          padding: 10px 16px;
          border: 1px solid #e6e1da;
          border-radius: 4px;
          background: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .search-input:focus {
          border-color: #cca43b;
        }
        .status-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .status-tab {
          padding: 8px 16px;
          border: 1px solid #e6e1da;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.3s;
        }
        .status-tab.active {
          background: #121212;
          color: #fdfbf7;
          border-color: #121212;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1.2fr 1fr 1fr;
          align-items: center;
          padding: 16px 20px;
          border: 1px solid #e6e1da;
          border-radius: 6px;
          background: #fcfcfc;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .order-row:hover {
          border-color: #cca43b;
          background: #fff;
        }
        .order-id-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          color: #cca43b;
        }
        .badge-status {
          padding: 4px 10px;
          border-radius: 2px;
          font-size: 0.82rem;
          font-weight: 600;
          text-align: center;
          display: inline-block;
          width: fit-content;
        }
        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 16px 24px;
          border-radius: 4px;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideIn 0.3s forwards;
        }
        .toast-success {
          background: #3c763d;
        }
        .toast-error {
          background: #a94442;
        }
        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          backdrop-filter: blur(4px);
        }
        .modal-card {
          background: #fff;
          border: 1px solid #e6e1da;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          animation: scaleUp 0.25s forwards;
          max-height: 85vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #e6e1da;
          padding-bottom: 12px;
        }
        .modal-close {
          border: none;
          background: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #777;
        }
        .modal-close:hover {
          color: #121212;
        }
        .btn-status-act {
          padding: 6px 12px;
          border: 1px solid #e6e1da;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .btn-status-act:focus {
          border-color: #cca43b;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media(max-width: 768px) {
          .order-row {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .admin-nav {
            padding: 16px 20px;
          }
        }
      `}</style>

      {/* Nav */}
      <nav className="admin-nav">
        <div className="admin-title">VELORE ADMIN</div>
        <Link to="/" className="btn-back">
          العودة للمتجر
        </Link>
      </nav>

      {/* Toast Notification */}
      {successMessage && <div className="admin-toast toast-success">{successMessage}</div>}
      {errorMessage && <div className="admin-toast toast-error">{errorMessage}</div>}

      <div className="admin-container">
        {/* Statistics cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">إجمالي الأرباح (الطلبات المُوصّلة)</div>
            <div className="stat-value">{stats.totalRevenue.toLocaleString()} ج.م</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">إجمالي عدد الطلبات</div>
            <div className="stat-value">{stats.totalOrders}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">الطلبات المعلقة</div>
            <div className="stat-value">{stats.pendingOrders}</div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {stats.lowStockItems.length > 0 && (
          <div className="low-stock-alert">
            <h4 className="low-stock-title">
              ⚠️ عطور منخفضة المخزون (بحاجة إلى تعبئة في Google Sheets)
            </h4>
            <div className="low-stock-list">
              {stats.lowStockItems.map(item => (
                <div key={item.id} className="low-stock-item">
                  <strong>{item.name}</strong>: المتبقي {item.stock} قطة فقط
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="orders-section">
          <div className="section-header">
            <h3 className="section-title">إدارة طلبات المتجر</h3>
          </div>

          <div className="filters-search">
            <input
              type="text"
              placeholder="البحث باسم العميل، الهاتف، أو رقم الطلب..."
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="status-tabs" style={{ marginBottom: "24px" }}>
            <button
              className={`status-tab ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              الكل ({orders.length})
            </button>
            {Object.entries(STATUS_MAP).map(([key, info]) => {
              const count = orders.filter(o => o.status === key).length;
              return (
                <button
                  key={key}
                  className={`status-tab ${filterStatus === key ? "active" : ""}`}
                  onClick={() => setFilterStatus(key)}
                  style={{ borderLeftColor: info.color }}
                >
                  {info.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="orders-list">
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                لا توجد طلبات تطابق معايير البحث.
              </div>
            ) : (
              filteredOrders.map(order => {
                // Try to extract name from address formatting or use guest
                const nameMatch = order.shippingAddress?.match(/^([^،(]+)/);
                const customerName = nameMatch ? nameMatch[0].trim() : "طلب زائر";
                const dateStr = new Date(order.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                const statusInfo = STATUS_MAP[order.status] || { label: order.status, color: "#999", bg: "#f0f0f0" };

                return (
                  <div
                    key={order.id}
                    className="order-row"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <span className="order-id-label">#{order.id.substring(0, 8)}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block" }}>{customerName}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#888" }}>{dateStr}</span>
                    </div>
                    <div>
                      <span className="badge-status" style={{ color: statusInfo.color, backgroundColor: statusInfo.bg }}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div style={{ fontWeight: "700", fontFamily: "Outfit, sans-serif" }}>
                      {order.totalAmount} ج.م
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                      <select
                        className="btn-status-act"
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        disabled={isUpdating === order.id}
                      >
                        {Object.entries(STATUS_MAP).map(([key, info]) => (
                          <option key={key} value={key}>
                            {info.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}>
                تفاصيل الطلب <span style={{ fontFamily: "Outfit, sans-serif", color: "#cca43b" }}>#{selectedOrder.id.substring(0, 8)}</span>
              </h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                &times;
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#777" }}>معلومات العميل والشحن:</h4>
              <p style={{ background: "#fdfbf7", padding: "14px", border: "1px solid #e6e1da", borderRadius: "4px", margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedOrder.shippingAddress || "غير متوفر"}
              </p>
            </div>

            {selectedOrder.notes && (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#777" }}>ملاحظات العميل:</h4>
                <p style={{ background: "#fff8eb", borderLeft: "4px solid #cca43b", padding: "14px", margin: 0, fontSize: "0.95rem" }}>
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#777" }}>العطور المطلوبة:</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selectedOrder.items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px dashed #e6e1da",
                      fontSize: "0.95rem"
                    }}
                  >
                    <span><strong>{item.productName}</strong></span>
                    <span style={{ color: "#777" }}>
                      الكمية: {item.quantity} &times; {item.unitPrice} ج.م
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", padding: "8px 0" }}>
                <strong>إجمالي المبلغ:</strong>
                <strong style={{ fontSize: "1.15rem", color: "#cca43b", fontFamily: "Outfit, sans-serif" }}>
                  {selectedOrder.totalAmount} ج.م
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e6e1da", paddingTop: "20px" }}>
              <div>
                <span style={{ fontSize: "0.9rem", color: "#777", marginRight: "8px" }}>الحالة الحالية:</span>
                <span className="badge-status" style={{
                  color: STATUS_MAP[selectedOrder.status]?.color || "#999",
                  backgroundColor: STATUS_MAP[selectedOrder.status]?.bg || "#f0f0f0"
                }}>
                  {STATUS_MAP[selectedOrder.status]?.label || selectedOrder.status}
                </span>
              </div>
              <div>
                <select
                  className="btn-status-act"
                  value={selectedOrder.status}
                  onChange={e => handleStatusChange(selectedOrder.id, e.target.value)}
                  disabled={isUpdating === selectedOrder.id}
                  style={{ padding: "8px 16px", border: "1px solid #cca43b" }}
                >
                  {Object.entries(STATUS_MAP).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
