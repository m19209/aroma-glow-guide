import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

export const translations = {
  ar: {
    // Navbar
    home: "الرئيسية",
    collection: "المجموعة",
    perfumes: "العطور",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    myAccount: "حسابي",
    search: "بحث",
    searchPlaceholder: "ابحث عن عطر...",
    // Cart Drawer
    cartTitle: "سلة المشتريات",
    emptyCartTitle: "السلة فارغة",
    emptyCartSub: "لم تقم بإضافة أي عطور بعد.",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    freeShipping: "مجاني",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    qty: "الكمية",
    freeShippingEarned: "تهانينا! حصلت على شحن مجاني 🚀",
    freeShippingProgress: "أضف عطوراً بقيمة",
    freeShippingMore: "للحصول على شحن مجاني!",
    // Products
    currency: "ج.م",
    productsTitle: "التشكيلة المميزة",
    productsSubtitle: "أحدث العطور",
    addToCart: "أضف للحقيبة",
    inBag: "في الحقيبة",
    outOfStock: "نفدت الكمية",
    moreDetails: "التفاصيل",
    notes: "المكونات",
    categoryAll: "الكل",
    searchNoResults: "لم نجد عطوراً تطابق بحثك",
    // Footer
    tagline: "صناعة العطور كفنّ — كل قارورة قصة، كل رائحة ذكرى تخلد في الأذهان.",
    collectionCol: "التشكيلة",
    customerServiceCol: "خدمة العملاء",
    rightsReserved: "جميع الحقوق محفوظة",
    // Checkout
    checkoutTitle: "إتمام الطلب",
    checkoutSubtitle: "Checkout Cart",
    shippingDetails: "بيانات التوصيل",
    fullName: "الاسم بالكامل",
    phone: "رقم الهاتف",
    governorate: "المحافظة",
    city: "المدينة / المنطقة",
    district: "الحي (اختياري)",
    street: "اسم الشارع",
    building: "رقم العمارة والشقة",
    notesOptional: "ملاحظات إضافية (اختياري)",
    paymentMethod: "طريقة الدفع",
    cod: "الدفع عند الاستلام (COD)",
    codDesc: "سداد المبلغ نقداً لمندوب الشحن عند استلام العطر",
    vodafone: "فودافون كاش (Vodafone Cash)",
    vodafoneDesc: "تحويل مباشر من محفظتك الإلكترونية",
    vodafoneSecure: "الدفع الآمن عبر فودافون كاش",
    vodafoneSecureDesc: "أدخل رقم محفظتك في الأسفل. بعد الضغط على 'تأكيد الطلب'، ستصلك رسالة من فودافون كاش على هاتفك مباشرة لتأكيد الخصم برقمك السري بكل أمان.",
    vodafoneNumber: "رقم محفظة فودافون كاش",
    orderSummary: "ملخص الطلب",
    promoCode: "كود الخصم",
    applyPromo: "تطبيق",
    grandTotal: "الإجمالي الكلي",
    confirmCod: "تأكيد الطلب الآن",
    confirmVodafone: "الدفع بواسطة فودافون كاش",
    processingOrder: "جاري تأكيد وتسجيل الطلب...",
    securePaymentBadge: "🔒 دفع آمن ومشفر",
    deliveryBadge: "🚚 توصيل لكافة المحافظات",
    qualityGuaranteeBadge: "↩ ضمان الجودة",
  },
  en: {
    // Navbar
    home: "Home",
    collection: "Collection",
    perfumes: "Fragrances",
    login: "Login",
    logout: "Sign Out",
    myAccount: "My Account",
    search: "Search",
    searchPlaceholder: "Search haute parfumerie...",
    // Cart Drawer
    cartTitle: "Shopping Bag",
    emptyCartTitle: "Your Bag is Empty",
    emptyCartSub: "You haven't added any fragrances to your bag yet.",
    subtotal: "Subtotal",
    shipping: "Complimentary Delivery",
    freeShipping: "Complimentary",
    total: "Total",
    checkout: "Proceed to Checkout",
    qty: "Qty",
    freeShippingEarned: "Complimentary Express Delivery Unlocked ✦",
    freeShippingProgress: "Add items worth",
    freeShippingMore: "more to receive complimentary delivery!",
    // Products
    currency: "EGP",
    productsTitle: "Curated Selections",
    productsSubtitle: "Haute Parfumerie",
    addToCart: "Add to Bag",
    inBag: "In Shopping Bag",
    outOfStock: "Sold Out",
    moreDetails: "Discover Scent",
    notes: "Olfactory Pyramid",
    categoryAll: "All Fragrances",
    searchNoResults: "No fragrances match your search criteria.",
    // Footer
    tagline: "The art of fine perfumery — bottled memories and unforgettable olfactory signatures.",
    collectionCol: "Bespoke Collection",
    customerServiceCol: "Client Concierge",
    rightsReserved: "All rights reserved",
    // Checkout
    checkoutTitle: "Secure Checkout",
    checkoutSubtitle: "Complete Your Purchase",
    shippingDetails: "Delivery Address",
    fullName: "Full Name",
    phone: "Phone Number",
    governorate: "Governorate / Region",
    city: "City / Area",
    district: "District (Optional)",
    street: "Street Address",
    building: "Building & Apt No.",
    notesOptional: "Delivery Notes (Optional)",
    paymentMethod: "Payment Method",
    cod: "Cash on Delivery (COD)",
    codDesc: "Pay in cash to the courier upon delivery of your order.",
    vodafone: "Vodafone Cash",
    vodafoneDesc: "Direct transfer from your electronic wallet",
    vodafoneSecure: "Secure Vodafone Cash Checkout",
    vodafoneSecureDesc: "Enter your wallet number below. You will receive a prompt on your mobile device to securely confirm the payment.",
    vodafoneNumber: "Vodafone Cash Wallet Number",
    orderSummary: "Order Summary",
    promoCode: "Promotional Code",
    applyPromo: "Apply",
    grandTotal: "Total Amount",
    confirmCod: "Confirm Order Now",
    confirmVodafone: "Pay with Vodafone Cash",
    processingOrder: "Securing your order...",
    securePaymentBadge: "🔒 Encrypted & Secure Checkout",
    deliveryBadge: "🚚 Doorstep Delivery Nationwide",
    qualityGuaranteeBadge: "↩ Guaranteed Authenticity",
  }
};

type Translations = typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("ar"); // Default is Arabic

  useEffect(() => {
    // Check cookie
    const match = document.cookie.match(new RegExp('(^| )velore_lang=([^;]+)'));
    if (match) {
      const storedLang = match[2] as Language;
      if (storedLang === "en" || storedLang === "ar") {
        setLang(storedLang);
      }
    }
  }, []);

  useEffect(() => {
    document.cookie = `velore_lang=${lang}; path=/; max-age=31536000`;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: keyof Translations) => {
    return translations[lang][key] || translations["ar"][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
