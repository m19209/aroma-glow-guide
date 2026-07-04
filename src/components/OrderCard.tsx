import { useState } from "react";

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
            {order.totalAmount} ج.م
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
                  <span>سعر الوحدة: {item.unitPrice} ج.م</span>
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
