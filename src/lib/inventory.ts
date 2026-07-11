import imgNoir from "@/assets/perfume-noir.jpg";
import imgRose from "@/assets/perfume-rose.jpg";
import imgOud from "@/assets/perfume-oud.jpg";
import imgAzur from "@/assets/perfume-azur.jpg";
import imgVert from "@/assets/perfume-vert.jpg";
import imgVelvet from "@/assets/perfume-velvet.jpg";
import imgAmbre from "@/assets/perfume-ambre.jpg";
import imgBlanc from "@/assets/perfume-blanc.jpg";
import imgSaphir from "@/assets/perfume-saphir.jpg";
import imgEmeraude from "@/assets/perfume-emeraude.jpg";
import imgZahra from "@/assets/perfume-zahra.png";
import imgMusk from "@/assets/perfume-musk.png";

import { createServerFn } from '@tanstack/react-start';
import { db } from './db';
import { products } from './db/schema';
import { eq } from 'drizzle-orm';

// --- Types & Data ---
export type BottleKey = "noir" | "rose" | "oud" | "azur" | "vert" | "velvet" | "ambre" | "blanc" | "saphir" | "emeraude" | "zahra" | "musk";

export const BOTTLE_IMAGES: Record<BottleKey, string> = {
  noir: imgNoir, rose: imgRose, oud: imgOud, azur: imgAzur, vert: imgVert,
  velvet: imgVelvet, ambre: imgAmbre, blanc: imgBlanc, saphir: imgSaphir, emeraude: imgEmeraude,
  zahra: imgZahra, musk: imgMusk,
};

export type Product = {
  id: string;
  name: string;
  family: string;
  notes: string;
  price: number;
  oldPrice?: number;
  volume: string;
  badge?: { label: string; variant: "new" | "sale" | "hot" | "limited" };
  bottle: BottleKey;
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
  imageData?: string;
  isCustom?: boolean;
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Layl — ليل", family: "Oriental · Wood", notes: "العنبر · المسك الأسود · خشب العود · الفانيليا", price: 3960, volume: "50 ML", badge: { label: "NEW", variant: "new" }, bottle: "noir", label: "LAYL",
    concentration: "Extrait de Parfum 30%", longevity: "‏10–12 ساعة", sillage: "قوي", occasion: "المساء · المناسبات", gender: "للجنسين", origin: "الطائف · المدينة المنورة",
    topNotes: "الفلفل الأسود · البرغموت", heartNotes: "خشب العود · العنبر · التوابل الشرقية", baseNotes: "العنبر الأسود · الفانيليا · المسك الأبيض",
    story: "توقيع ليلي هادئ من إلهام ليالي رمضان — سكينة ووقار." },
  { id: "p2", name: "Wardat Al-Taif — وردة الطائف", family: "Floral · Musky", notes: "وردة الطائف · الياسمين · المسك الأبيض · الخوخ", price: 4160, oldPrice: 5200, volume: "75 ML", badge: { label: "BEST SELLER", variant: "hot" }, bottle: "rose", label: "WARDAT AL-TAIF",
    concentration: "Eau de Parfum 20%", longevity: "‏8–10 ساعات", sillage: "متوسط–قوي", occasion: "طوال اليوم · المناسبات", gender: "نسائي", origin: "الطائف · المملكة العربية السعودية",
    topNotes: "الخوخ الأبيض · البرغموت · الفلفل الوردي", heartNotes: "وردة الطائف · الياسمين السامباك · الفاوانيا", baseNotes: "المسك الأبيض · الباتشولي المخملي · العنبر",
    story: "باقة من أثمن ورود الطائف — أنوثة كلاسيكية بلمسة عصرية." },
  { id: "p3", name: "Oud Al-Sultan — عود السلطان", family: "Oriental · Oud", notes: "العود الهندي · الصندل · الكهرمان · المسك الملكي", price: 7120, volume: "100 ML", badge: { label: "LIMITED", variant: "limited" }, bottle: "oud", label: "OUD AL-SULTAN",
    concentration: "Extrait de Parfum 35%", longevity: "‏12+ ساعة", sillage: "قوي جداً", occasion: "المناسبات الفاخرة", gender: "للجنسين", origin: "أسّام · الهند",
    topNotes: "الزعفران · العنبر الأحمر · القرنفل", heartNotes: "العود الهندي المُعتَّق · وردة الطائف · خشب الصندل", baseNotes: "المسك الملكي · الكهرمان · جلد العود",
    story: "طبعة محدودة من أندر أنواع العود — روعة تُورَث." },
  { id: "p4", name: "Fajr — فجر", family: "Aquatic · Fresh", notes: "الليمون · بيرغامو · الهواء البحري · السيدر", price: 2432, oldPrice: 3040, volume: "50 ML", badge: { label: "SALE 20%", variant: "sale" }, bottle: "azur", label: "FAJR",
    concentration: "Eau de Toilette 12%", longevity: "‏6–8 ساعات", sillage: "خفيف–متوسط", occasion: "الصيف · النهار", gender: "رجالي", origin: "ساحل البحر الأحمر",
    topNotes: "ليمون صقلي · البرغموت · النعناع", heartNotes: "الملوحة البحرية · الميرمية · اللافندر", baseNotes: "خشب السيدر · المسك المائي · الأمبرغريس",
    story: "نسمة بحرية منعشة — كنسيم الفجر عند شواطئ البحر الأحمر." },
  { id: "p5", name: "Rawḍah — روضة", family: "Woody · Green", notes: "أوراق البنفسج · النعناع · خشب الصندل · المسك", price: 3360, volume: "75 ML", bottle: "vert", label: "RAWDAH",
    concentration: "Eau de Parfum 18%", longevity: "‏7–9 ساعات", sillage: "متوسط", occasion: "المكتب · النهار", gender: "للجنسين", origin: "الحجاز",
    topNotes: "النعناع البري · أوراق الحمضيات · إبرة الراعي", heartNotes: "أوراق البنفسج · شاي الياسمين · الريحان", baseNotes: "خشب الصندل · الفيتيفر · المسك الأبيض",
    story: "خضرة نديّة كروضة أنيقة — نقاء أخّاذ وثقة هادئة." },
  { id: "p6", name: "Wardat Al-Firdaws — وردة الفردوس", family: "Floral · Luxe", notes: "الوردة الجورية · الفراولة · المسك الوردي · الباتشولي", price: 5760, volume: "100 ML", badge: { label: "NEW", variant: "new" }, bottle: "velvet", label: "WARDAT AL-FIRDAWS",
    concentration: "Extrait de Parfum 28%", longevity: "‏10+ ساعات", sillage: "قوي", occasion: "السهرة · العشاء", gender: "نسائي", origin: "بلاد الشام",
    topNotes: "الفراولة البرية · التوت الأسود · الرمان", heartNotes: "الوردة الجورية · العود الوردي · البخور الحلو", baseNotes: "الباتشولي الفاخر · المسك الوردي · الكاكاو الداكن",
    story: "مخملٌ مُذوَّب في زجاجة — أنوثة نضرة وحسّية." },
  { id: "p7", name: "Kahraman — كهرمان", family: "Oriental · Amber", notes: "الكهرمان · البخور · التبغ الحلو · الفانيليا", price: 4880, volume: "75 ML", badge: { label: "HOT", variant: "hot" }, bottle: "ambre", label: "KAHRAMAN",
    concentration: "Extrait de Parfum 30%", longevity: "‏10–12 ساعة", sillage: "قوي", occasion: "الشتاء · المساء", gender: "للجنسين", origin: "ظُفار · عُمان",
    topNotes: "البرتقال المُسكَّر · القرفة · الهيل", heartNotes: "التبغ الحلو · اللبان العُماني · العسل", baseNotes: "الكهرمان الذهبي · الفانيليا · اللبان الأبيض",
    story: "دفء الشمس الغاربة — عناق كهرماني يبقى في الذاكرة." },
  { id: "p8", name: "Yasmeen — ياسمين", family: "Floral · White", notes: "الفل · زهر البرتقال · المسك الأبيض · خشب الكشمير", price: 3040, volume: "50 ML", bottle: "blanc", label: "YASMEEN",
    concentration: "Eau de Parfum 16%", longevity: "‏7–9 ساعات", sillage: "متوسط", occasion: "الأعراس · النهار", gender: "نسائي", origin: "دمشق · بلاد الشام",
    topNotes: "زهر البرتقال · البرغموت · الليتشي", heartNotes: "الفل الهندي · الياسمين الشامي · زنبق الوادي", baseNotes: "المسك الأبيض · خشب الكشمير · العنبر الشفاف",
    story: "بياضٌ ناصع كنسيم الفجر — أنوثة نقيّة وهادئة." },
  { id: "p9", name: "Yaqout — ياقوت", family: "Aquatic · Woody", notes: "الخزامى البحرية · الأمبرغريس · خشب الأرز · المسك", price: 4480, oldPrice: 5600, volume: "100 ML", badge: { label: "SALE", variant: "sale" }, bottle: "saphir", label: "YAQOUT",
    concentration: "Eau de Parfum 22%", longevity: "‏8–10 ساعات", sillage: "متوسط–قوي", occasion: "السفر · طوال اليوم", gender: "رجالي", origin: "خليج العقبة",
    topNotes: "الملح الأزرق · الحمضيات المتجمّدة · الخيار", heartNotes: "الخزامى البحرية · الميرمية · إكليل الجبل", baseNotes: "الأمبرغريس · خشب الأرز · المسك الأبيض",
    story: "برودة الياقوت الأزرق — أناقة ذكورية باردة وواثقة." },
  { id: "p10", name: "Zumurrud — زمرد", family: "Woody · Green", notes: "أوراق التين · الفيتيفر · الباتشولي · خشب الغوياك", price: 5120, volume: "75 ML", badge: { label: "LIMITED", variant: "limited" }, bottle: "emeraude", label: "ZUMURRUD",
    concentration: "Extrait de Parfum 26%", longevity: "‏10 ساعات", sillage: "قوي", occasion: "الخريف · المساء", gender: "للجنسين", origin: "اليمن السعيد",
    topNotes: "أوراق التين الخضراء · البرغموت · الحبهان", heartNotes: "الفيتيفر · الباتشولي المُعتَّق · الأيريس", baseNotes: "خشب الغوياك · العنبر الأخضر · جلد المسك",
    story: "لمعان الزمرد الأخضر — عمقٌ راقٍ لعشّاق الأخشاب النبيلة." },
  { id: "p11", name: "Zahra — زهرة", family: "Floral · Light", notes: "زهور بيضاء · ياسمين · مسك ناعم", price: 500, volume: "50 ML", badge: { label: "NEW", variant: "new" }, bottle: "zahra", label: "ZAHRA",
    concentration: "Eau de Parfum 15%", longevity: "‏5-7 ساعات", sillage: "خفيف", occasion: "الصباح · الاستخدام اليومي", gender: "نسائي", origin: "المملكة العربية السعودية",
    topNotes: "البرغموت · الزهور البيضاء", heartNotes: "ياسمين · زنبق", baseNotes: "مسك ناعم · فانيليا خفيفة",
    story: "إشراقة يوم جديد — نعومة الزهور ورقتها المتفتحة." },
  { id: "p12", name: "Musk — مسك", family: "Oriental · Musk", notes: "المسك الأبيض · البودرة · خشب الأرز", price: 500, volume: "50 ML", badge: { label: "HOT", variant: "hot" }, bottle: "musk", label: "MUSK",
    concentration: "Eau de Parfum 15%", longevity: "‏5-7 ساعات", sillage: "متوسط", occasion: "الصباح · العمل", gender: "للجنسين", origin: "المملكة العربية السعودية",
    topNotes: "البودرة · الليمون الهادئ", heartNotes: "المسك الأبيض · الورد", baseNotes: "خشب الأرز · العنبر الخفيف",
    story: "نقاء البدايات — عبق المسك الأبيض الذي يأسر الحواس." }
];


// --- Stock/Inventory Endpoints ---
export const getProductStock = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const result = await db.select({ stock: products.stock }).from(products).where(eq(products.id, id)).get();
    return result?.stock ?? 0;
  });

export const getAllStocks = createServerFn()
  .handler(async () => {
    const result = await db.select().from(products).all();
    const stockMap = result.reduce((acc, p) => {
      acc[p.id] = p.stock;
      return acc;
    }, {} as Record<string, number>);
    return stockMap;
  });

// --- Promo Code Endpoints ---
const PROMOS: Record<string, number> = { VELORE10: 10, LUXE20: 20, NOIR15: 15 };

export const validatePromo = createServerFn()
  .validator((code: string) => code.trim().toUpperCase())
  .handler(async ({ data: code }) => {
    // Artificial delay to prevent brute-forcing
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (PROMOS[code]) {
      return { success: true as const, pct: PROMOS[code], code };
    }
    return { success: false as const, error: 'رمز الخصم غير صحيح أو منتهي الصلاحية' };
  });
