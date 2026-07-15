import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";


function NotFoundComponent() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdfbf7', padding: '1rem', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '4rem', color: '#1a1a1a', fontFamily: 'Cinzel, serif' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginTop: '1rem', fontFamily: 'Cairo, sans-serif' }}>الصفحة غير موجودة</h2>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/" style={{ padding: '0.75rem 2rem', backgroundColor: '#1a1a1a', color: '#fff', textDecoration: 'none', fontFamily: 'Cairo, sans-serif' }}>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Error tracking removed
  }, [error]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdfbf7', padding: '1rem', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', color: '#1a1a1a', fontFamily: 'Cairo, sans-serif' }}>
          عذراً، حدث خطأ ما
        </h1>
        <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            style={{ padding: '0.75rem 2rem', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
          >
            حاول مرة أخرى
          </button>
          <a
            href="/"
            style={{ padding: '0.75rem 2rem', backgroundColor: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a', textDecoration: 'none', fontFamily: 'Cairo, sans-serif' }}
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VELORE — Eau de Parfum" },
      { name: "description", content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية." },
      { name: "author", content: "VELORE Parfums" },
      { property: "og:title", content: "VELORE — Eau de Parfum" },
      { property: "og:description", content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@VELOREParfums" },
      { name: "twitter:title", content: "VELORE — Eau de Parfum" },
      { name: "twitter:description", content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3292e5ed-6db8-48eb-b963-62ec9b70a9ec/id-preview-5616a25b--770eedcd-543e-461e-909b-b1086e89f1cf.lovable.app-1782734182741.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3292e5ed-6db8-48eb-b963-62ec9b70a9ec/id-preview-5616a25b--770eedcd-543e-461e-909b-b1086e89f1cf.lovable.app-1782734182741.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Cairo:wght@300;400;600;700&family=Tajawal:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
