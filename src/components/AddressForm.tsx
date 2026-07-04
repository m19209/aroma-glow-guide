import { useState } from "react";

type AddressData = {
  phone: string;
  city: string;
  district: string;
  street: string;
  building: string;
};

type AddressFormProps = {
  initialData: AddressData;
  onSave: (data: AddressData) => Promise<boolean>;
};

export function AddressForm({ initialData, onSave }: AddressFormProps) {
  const [phone, setPhone] = useState(initialData.phone);
  const [city, setCity] = useState(initialData.city);
  const [district, setDistrict] = useState(initialData.district);
  const [street, setStreet] = useState(initialData.street);
  const [building, setBuilding] = useState(initialData.building);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Basic validation
    if (!phone.trim()) {
      setErrorMsg("يرجى إدخال رقم الهاتف");
      setLoading(false);
      return;
    }
    if (!city.trim() || !district.trim() || !street.trim()) {
      setErrorMsg("يرجى ملء جميع الحقول الأساسية (المدينة، الحي، الشارع)");
      setLoading(false);
      return;
    }

    try {
      const ok = await onSave({ phone, city, district, street, building });
      if (ok) {
        setSuccessMsg("تم حفظ العنوان بنجاح");
      } else {
        setErrorMsg("حدث خطأ أثناء حفظ البيانات");
      }
    } catch (err) {
      setErrorMsg("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form-container">
      <h3 className="section-subtitle" style={{ textAlign: "right", marginBottom: "20px", color: "var(--gold-deep)" }}>
        عنوان التوصيل المعتمد
      </h3>
      
      <div className="magic-form">
        <div className="magic-input-group">
          <label className="input-label-ar">رقم الهاتف *</label>
          <input
            type="tel"
            placeholder="مثال: 01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="magic-input"
            required
          />
        </div>

        <div className="form-row-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="magic-input-group">
            <label className="input-label-ar">المدينة *</label>
            <input
              type="text"
              placeholder="مثال: القاهرة"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="magic-input"
              required
            />
          </div>
          <div className="magic-input-group">
            <label className="input-label-ar">المنطقة / الحي *</label>
            <input
              type="text"
              placeholder="مثال: مصر الجديدة"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="magic-input"
              required
            />
          </div>
        </div>

        <div className="magic-input-group">
          <label className="input-label-ar">الشارع *</label>
          <input
            type="text"
            placeholder="اسم الشارع أو الرقم"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="magic-input"
            required
          />
        </div>

        <div className="magic-input-group">
          <label className="input-label-ar">البناية / الشقة / تفاصيل إضافية</label>
          <input
            type="text"
            placeholder="رقم البناية، الطابق، الشقة"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="magic-input"
          />
        </div>

        {errorMsg && (
          <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "10px", textAlign: "right" }} role="alert">
            ⚠ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ color: "#2ecc71", fontSize: "0.85rem", marginTop: "10px", textAlign: "right" }} role="alert">
            ✓ {successMsg}
          </div>
        )}

        <button type="submit" disabled={loading} className="magic-submit-btn" style={{ marginTop: "24px" }}>
          {loading ? <span className="magic-loader"></span> : "حفظ العنوان"}
        </button>
      </div>
    </form>
  );
}
