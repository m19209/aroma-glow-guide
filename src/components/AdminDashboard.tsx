import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
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
  pending: { label: "معلق", className: "status-pending", color: "#cca43b", bg: "rgba(204, 164, 59, 0.15)" },
  processing: { label: "قيد المعالجة", className: "status-processing", color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  shipped: { label: "تم الشحن", className: "status-shipped", color: "#4ade80", bg: "rgba(74, 222, 128, 0.15)" },
  delivered: { label: "تم التوصيل", className: "status-delivered", color: "#22c55e", bg: "rgba(34, 197, 94, 0.2)" },
  cancelled: { label: "ملغي", className: "status-cancelled", color: "#f87171", bg: "rgba(248, 113, 113, 0.15)" },
};

const STEPS = [
  { key: "pending", label: "معلق" },
  { key: "processing", label: "قيد المعالجة" },
  { key: "shipped", label: "تم الشحن" },
  { key: "delivered", label: "تم التوصيل" },
];

export function AdminDashboard({ initialUser, initialStats, initialOrders }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [stats, setStats] = useState<AdminStats>(initialStats);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // orderId being updated
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const showNotification = (msg: string, isError = false) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (isError) {
      setErrorMessage(msg);
      timeoutRef.current = window.setTimeout(() => setErrorMessage(null), 4000);
    } else {
      setSuccessMessage(msg);
      timeoutRef.current = window.setTimeout(() => setSuccessMessage(null), 4000);
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
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", fontFamily: "Cairo, sans-serif", color: "#fdfbf7" }}>
      {/* Styles Injected */}
      <style>{`
        .admin-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
          color: #fdfbf7;
          border-bottom: 1px solid rgba(204, 164, 59, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .admin-title {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          letter-spacing: 2px;
          font-weight: 700;
          color: #cca43b;
          text-shadow: 0 0 10px rgba(204, 164, 59, 0.2);
        }
        .btn-back {
          color: #fdfbf7;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 8px 20px;
          border: 1px solid rgba(204, 164, 59, 0.3);
          border-radius: 6px;
          background: rgba(204, 164, 59, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
        }
        .btn-back:hover {
          background: #cca43b;
          color: #121212;
          border-color: #cca43b;
          box-shadow: 0 0 15px rgba(204, 164, 59, 0.3);
        }
        .admin-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 24px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: rgba(22, 22, 22, 0.5);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(204, 164, 59, 0.3);
          box-shadow: 0 15px 35px rgba(204, 164, 59, 0.08);
        }
        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #cca43b, transparent);
        }
        .stat-card-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #8c8c8c;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #fdfbf7;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.5px;
        }
        .stat-icon-wrapper {
          background: rgba(204, 164, 59, 0.08);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cca43b;
          border: 1px solid rgba(204, 164, 59, 0.15);
        }
        .stat-icon {
          width: 28px;
          height: 28px;
        }
        .low-stock-alert {
          background: rgba(178, 122, 0, 0.05);
          border: 1px solid rgba(255, 232, 204, 0.1);
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 40px;
          backdrop-filter: blur(8px);
        }
        .low-stock-title {
          font-weight: 700;
          color: #e5c158;
          margin-top: 0;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
        }
        .low-stock-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .low-stock-item {
          background: rgba(22, 22, 22, 0.6);
          border: 1px solid rgba(255, 232, 204, 0.08);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          color: #fdfbf7;
          transition: border-color 0.2s;
        }
        .low-stock-item:hover {
          border-color: #cca43b;
        }
        .orders-section {
          background: rgba(22, 22, 22, 0.3);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 1.4rem;
          margin: 0;
          font-weight: 700;
          color: #fdfbf7;
        }
        .filters-search {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          width: 100%;
          margin-bottom: 24px;
        }
        .search-input {
          flex: 1;
          min-width: 280px;
          padding: 12px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: rgba(30, 30, 30, 0.4);
          color: #fdfbf7;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .search-input:focus {
          border-color: #cca43b;
          background: rgba(30, 30, 30, 0.6);
          box-shadow: 0 0 12px rgba(204, 164, 59, 0.15);
        }
        .status-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .status-tab {
          padding: 8px 18px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          background: rgba(22, 22, 22, 0.4);
          color: #8c8c8c;
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
        }
        .status-tab:hover {
          color: #fdfbf7;
          border-color: rgba(255, 255, 255, 0.15);
        }
        .status-tab.active {
          background: #cca43b;
          color: #121212;
          border-color: #cca43b;
          box-shadow: 0 4px 15px rgba(204, 164, 59, 0.25);
        }
        .orders-header {
          display: grid;
          grid-template-columns: 1.2fr 2fr 1.5fr 1.2fr 1.2fr;
          gap: 16px;
          align-items: center;
          padding: 12px 24px;
          color: #8c8c8c;
          font-weight: 700;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 12px;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-row {
          display: grid;
          grid-template-columns: 1.2fr 2fr 1.5fr 1.2fr 1.2fr;
          gap: 16px;
          align-items: center;
          padding: 18px 24px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          background: rgba(25, 25, 25, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          animation: fadeIn 0.4s ease forwards;
        }
        .order-row:hover {
          border-color: rgba(204, 164, 59, 0.4);
          background: rgba(30, 30, 30, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        .order-id-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: #cca43b;
          font-size: 0.95rem;
        }
        .badge-status {
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          text-align: center;
          display: inline-block;
          width: fit-content;
          letter-spacing: 0.3px;
        }
        .admin-toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          padding: 16px 28px;
          border-radius: 8px;
          color: #fff;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          z-index: 1000;
          animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          border-left: 4px solid currentColor;
          backdrop-filter: blur(10px);
        }
        .toast-success {
          background: rgba(34, 197, 94, 0.9);
          color: #dcfce7;
          border-color: #22c55e;
        }
        .toast-error {
          background: rgba(239, 68, 68, 0.9);
          color: #fee2e2;
          border-color: #ef4444;
        }
        /* Details Drawer (replaces center modal) */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: flex-end; /* Slides in from the right */
          z-index: 999;
          backdrop-filter: blur(8px);
        }
        .modal-card {
          background: #111;
          border-left: 2px solid #cca43b;
          width: 100%;
          max-width: 520px;
          height: 100vh;
          padding: 36px;
          box-shadow: -15px 0 45px rgba(0, 0, 0, 0.5);
          animation: slideInDrawer 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          color: #fdfbf7;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }
        .modal-close {
          border: none;
          background: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #8c8c8c;
          transition: color 0.2s;
          line-height: 1;
        }
        .modal-close:hover {
          color: #cca43b;
        }
        .btn-status-act {
          padding: 8px 14px;
          border: 1px solid rgba(204, 164, 59, 0.3);
          border-radius: 6px;
          background: rgba(30, 30, 30, 0.8);
          color: #fdfbf7;
          cursor: pointer;
          font-size: 0.88rem;
          outline: none;
          transition: all 0.3s;
          font-weight: 600;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='%23cca43b' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat: no-repeat;
          background-position: left 8px center;
          padding-left: 32px;
        }
        .btn-status-act:focus {
          border-color: #cca43b;
          box-shadow: 0 0 8px rgba(204, 164, 59, 0.3);
        }
        .btn-status-act option {
          background-color: #161616;
          color: #fdfbf7;
        }
        
        /* Timeline Stepper */
        .stepper-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 28px 0;
          padding: 20px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          position: relative;
        }
        .stepper-track-bg {
          position: absolute;
          top: 36px;
          left: 40px;
          right: 40px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 0;
        }
        .stepper-track-progress {
          position: absolute;
          top: 36px;
          right: 40px;
          height: 3px;
          background: #cca43b;
          z-index: 0;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stepper-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .stepper-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1c1c1c;
          border: 2px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #8c8c8c;
          transition: all 0.3s ease;
        }
        .stepper-step.completed .stepper-circle {
          background: #cca43b;
          border-color: #cca43b;
          color: #121212;
        }
        .stepper-step.active .stepper-circle {
          background: #111;
          border-color: #cca43b;
          color: #cca43b;
          box-shadow: 0 0 12px rgba(204, 164, 59, 0.4);
          animation: pulseGold 2s infinite;
        }
        .stepper-label {
          font-size: 0.8rem;
          margin-top: 8px;
          color: #8c8c8c;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        .stepper-step.completed .stepper-label,
        .stepper-step.active .stepper-label {
          color: #fdfbf7;
        }
        .stepper-check {
          width: 16px;
          height: 16px;
        }
        .cancelled-banner {
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          padding: 14px;
          border-radius: 8px;
          text-align: center;
          font-weight: 700;
          margin: 20px 0;
          font-size: 0.95rem;
        }
        
        /* Spinner */
        .spinner {
          width: 22px;
          height: 22px;
          border: 2px solid rgba(204, 164, 59, 0.1);
          border-top-color: #cca43b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Animations */
        @keyframes toastSlideIn {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0% { box-shadow: 0 0 0 0 rgba(204, 164, 59, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(204, 164, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(204, 164, 59, 0); }
        }

        @media(max-width: 768px) {
          .orders-header {
            display: none;
          }
          .order-row {
            grid-template-columns: 1fr 1.2fr;
            gap: 16px;
            padding: 20px;
          }
          .admin-nav {
            padding: 16px 20px;
          }
          .modal-card {
            padding: 24px;
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
            <div className="stat-card-inner">
              <div className="stat-info">
                <div className="stat-label">إجمالي الأرباح (الطلبات المُوصّلة)</div>
                <div className="stat-value">{stats.totalRevenue.toLocaleString()} ج.م</div>
              </div>
              <div className="stat-icon-wrapper">
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-inner">
              <div className="stat-info">
                <div className="stat-label">إجمالي عدد الطلبات</div>
                <div className="stat-value">{stats.totalOrders}</div>
              </div>
              <div className="stat-icon-wrapper">
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-inner">
              <div className="stat-info">
                <div className="stat-label">الطلبات المعلقة</div>
                <div className="stat-value">{stats.pendingOrders}</div>
              </div>
              <div className="stat-icon-wrapper">
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
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
                  <strong>{item.name}</strong>: المتبقي {item.stock} قطع فقط
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

          <div className="status-tabs">
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
                  style={{ borderLeft: `3px solid ${info.color}` }}
                >
                  {info.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="orders-header">
            <div>رقم الطلب</div>
            <div>العميل والتاريخ</div>
            <div>الحالة</div>
            <div>الإجمالي</div>
            <div>تحديث الحالة</div>
          </div>

          <div className="orders-list">
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#8c8c8c" }}>
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
                const statusInfo = STATUS_MAP[order.status] || { label: order.status, color: "#999", bg: "rgba(150, 150, 150, 0.15)" };

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
                      <strong style={{ display: "block", color: "#fdfbf7" }}>{customerName}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#8c8c8c" }}>{dateStr}</span>
                    </div>
                    <div>
                      <span className="badge-status" style={{ color: statusInfo.color, backgroundColor: statusInfo.bg }}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div style={{ fontWeight: "700", fontFamily: "Outfit, sans-serif", color: "#cca43b" }}>
                      {order.totalAmount} ج.م
                    </div>
                    <div onClick={e => e.stopPropagation()} style={{ minWidth: "120px", display: "flex", alignItems: "center" }}>
                      {isUpdating === order.id ? (
                        <div className="spinner"></div>
                      ) : (
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
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal / Drawer */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700" }}>
                تفاصيل الطلب <span style={{ fontFamily: "Outfit, sans-serif", color: "#cca43b" }}>#{selectedOrder.id.substring(0, 8)}</span>
              </h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                &times;
              </button>
            </div>

            {/* Stepper progress timeline */}
            {selectedOrder.status !== "cancelled" ? (
              <div className="stepper-container">
                <div className="stepper-track-bg" />
                <div 
                  className="stepper-track-progress" 
                  style={{ 
                    width: `${(STEPS.findIndex(s => s.key === selectedOrder.status) / (STEPS.length - 1)) * 100}%`,
                    right: "40px",
                    left: "auto"
                  }} 
                />
                {STEPS.map((step, idx) => {
                  const currentStepIndex = STEPS.findIndex(s => s.key === selectedOrder.status);
                  const isCompleted = idx < currentStepIndex;
                  const isActive = idx === currentStepIndex;
                  return (
                    <div key={step.key} className={`stepper-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}>
                      <div className="stepper-circle">
                        {isCompleted ? (
                          <svg className="stepper-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <div className="stepper-label">{step.label}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="cancelled-banner">
                ⚠️ هذا الطلب تم إلغاؤه
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#8c8c8c", fontWeight: "600", display: "flex", alignItems: "center" }}>
                <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px", marginLeft: "8px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                معلومات العميل والشحن:
              </h4>
              <p style={{ background: "rgba(255, 255, 255, 0.02)", padding: "16px", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "8px", margin: 0, fontSize: "0.95rem", lineHeight: "1.6", color: "#fdfbf7" }}>
                {selectedOrder.shippingAddress || "غير متوفر"}
              </p>
            </div>

            {selectedOrder.notes && (
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#8c8c8c", fontWeight: "600", display: "flex", alignItems: "center" }}>
                  <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px", marginLeft: "8px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  ملاحظات العميل:
                </h4>
                <p style={{ background: "rgba(204, 164, 59, 0.05)", borderRight: "4px solid #cca43b", padding: "16px", margin: 0, fontSize: "0.95rem", borderRadius: "0 8px 8px 0" }}>
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            {selectedOrder.paymentMethod && (
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#8c8c8c", fontWeight: "600", display: "flex", alignItems: "center" }}>
                  <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px", marginLeft: "8px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  طريقة الدفع:
                </h4>
                <p style={{ background: "rgba(255, 255, 255, 0.02)", padding: "16px", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "8px", margin: 0, fontSize: "0.95rem", color: "#fdfbf7" }}>
                  {selectedOrder.paymentMethod === "vodafone" ? "فودافون كاش (تحويل إلكتروني)" : "الدفع عند الاستلام (COD)"}
                </p>
              </div>
            )}

            <div style={{ marginBottom: "28px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#8c8c8c", fontWeight: "600", display: "flex", alignItems: "center" }}>
                <svg className="detail-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px", marginLeft: "8px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                العطور المطلوبة:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedOrder.items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px dashed rgba(255, 255, 255, 0.08)",
                      fontSize: "0.95rem"
                    }}
                  >
                    <span><strong style={{ color: "#fdfbf7" }}>{item.productName}</strong></span>
                    <span style={{ color: "#8c8c8c", fontFamily: "Outfit, sans-serif" }}>
                      الكمية: {item.quantity} &times; {item.unitPrice} ج.م
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", padding: "8px 0" }}>
                <strong>إجمالي المبلغ:</strong>
                <strong style={{ fontSize: "1.2rem", color: "#cca43b", fontFamily: "Outfit, sans-serif" }}>
                  {selectedOrder.totalAmount} ج.م
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "24px", marginTop: "auto" }}>
              <div>
                <span style={{ fontSize: "0.9rem", color: "#8c8c8c", marginLeft: "8px", fontWeight: "600" }}>الحالة الحالية:</span>
                <span className="badge-status" style={{
                  color: STATUS_MAP[selectedOrder.status]?.color || "#999",
                  backgroundColor: STATUS_MAP[selectedOrder.status]?.bg || "rgba(150,150,150,0.1)"
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
                  style={{ padding: "8px 16px 8px 32px", border: "1px solid #cca43b" }}
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
