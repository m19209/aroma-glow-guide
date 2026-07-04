import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS, Product } from "@/lib/product-data";
import { Bottle } from "@/components/Bottle";
import { useState, useEffect } from "react";
import { getAllStocks } from "@/lib/products";

export const Route = createFileRoute("/product/$productId")({
  loader: async ({ params }) => {
    const product = PRODUCTS.find(p => p.id === params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name} — VELORE` },
      { name: "description", content: loaderData?.story },
      { property: "og:title", content: `${loaderData?.name} — VELORE` },
      { property: "og:description", content: loaderData?.story },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [stocks, setStocks] = useState<Record<string, number>>({});
  const [stocksLoading, setStocksLoading] = useState(true);

  useEffect(() => {
    getAllStocks().then((res) => {
      if (res) setStocks(res);
      setStocksLoading(false);
    });
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="scrolled">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" className="nav-logo">
            <span className="nav-logo-text">VELORE</span>
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <div className="pdetail-content" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
          <div className="pdetail-left" style={{ flex: '1 1 400px' }}>
            <div className="pdetail-image-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: 'var(--charcoal)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '60%', height: '80%' }}>
                <Bottle variant={product.bottle} label={product.name} />
              </div>
            </div>
            {product.badge && (
              <span className={`pbadge badge-${product.badge.variant}`} style={{ position: 'absolute', top: 20, right: 20 }}>
                {product.badge.label}
              </span>
            )}
          </div>
          <div className="pdetail-right" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="pdetail-header">
              <div className="pfamily" style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase' }}>{product.family}</div>
              <h1 className="pdetail-title" style={{ fontSize: '2.5rem', fontFamily: 'Cinzel, serif', margin: '10px 0' }}>{product.name}</h1>
              <div className="pdetail-volume" style={{ fontSize: '1rem', color: 'var(--text-light)' }}>{product.volume}</div>
            </div>
            <p className="pdetail-desc" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#d1d1d1' }}>{product.story}</p>
            
            <div className="pdetail-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginTop: '20px' }}>
              <div className="pspec-item">
                <span className="pspec-label" style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>التركيز</span>
                <strong className="pspec-val" style={{ fontSize: '0.9rem' }}>{product.concentration}</strong>
              </div>
              <div className="pspec-item">
                <span className="pspec-label" style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>الثبات</span>
                <strong className="pspec-val" style={{ fontSize: '0.9rem' }}>{product.longevity}</strong>
              </div>
              <div className="pspec-item">
                <span className="pspec-label" style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>الفوحان</span>
                <strong className="pspec-val" style={{ fontSize: '0.9rem' }}>{product.sillage}</strong>
              </div>
            </div>

            <div className="pdetail-notes-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', background: '#111', borderRadius: '8px', marginTop: '20px' }}>
              <div className="pnote-col">
                <span className="pnote-title" style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>القمة</span>
                <p className="pnote-val" style={{ margin: 0, fontSize: '0.9rem' }}>{product.topNotes}</p>
              </div>
              <div className="pnote-col">
                <span className="pnote-title" style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>القلب</span>
                <p className="pnote-val" style={{ margin: 0, fontSize: '0.9rem' }}>{product.heartNotes}</p>
              </div>
              <div className="pnote-col">
                <span className="pnote-title" style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>القاعدة</span>
                <p className="pnote-val" style={{ margin: 0, fontSize: '0.9rem' }}>{product.baseNotes}</p>
              </div>
            </div>
            
            <div className="pstock" style={{ color: (stocks[product.id] ?? 5) < 3 ? '#d9534f' : '#8B6F28', fontSize: '0.9rem', marginTop: '10px', fontWeight: 'bold' }}>
              {stocksLoading ? (
                <span className="skeleton-pulse" style={{ display: 'inline-block', width: '80px', height: '12px', background: 'var(--beige)', borderRadius: '4px' }}></span>
              ) : (
                (stocks[product.id] ?? 5) > 0 ? `الكمية المتبقية: ${stocks[product.id] ?? 5} قطع` : 'نفدت الكمية'
              )}
            </div>
            
            <div className="pdetail-price-row" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              {product.oldPrice && <span className="pold-price" style={{ textDecoration: 'line-through', color: '#888', fontSize: '1.2rem' }}>{product.oldPrice} ج.م</span>}
              <span className="pprice" style={{ fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 'bold' }}>{product.price} ج.م</span>
            </div>

            <div className="pdetail-actions" style={{ marginTop: '30px' }}>
              <Link
                to="/"
                className="btn-gold pdetail-buy"
                style={{ textAlign: 'center', padding: '15px 30px', fontSize: '1.1rem', display: 'inline-block' }}
              >
                العودة للصفحة الرئيسية لشراء العطر
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* FOOTER */}
      <footer>
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p>© 2026 VELORE · TOUS DROITS RÉSERVÉS</p>
        </div>
      </footer>
    </>
  );
}
