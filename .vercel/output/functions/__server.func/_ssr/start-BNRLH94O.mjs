import { i as createStart, n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BNRLH94O.js
function renderErrorPage() {
	return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>حدث خطأ - Aroma Glow</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Kufi+Arabic:wght@400;600&display=swap" rel="stylesheet">
    <style>
      :root {
        --charcoal: #2A2A2A;
        --pearl: #FAFAFA;
        --gold-deep: #C19A5B;
        --gold-light: #E8D3A2;
        --border: #EAEAEA;
      }
      body { 
        font-family: 'Noto Kufi Arabic', sans-serif; 
        background: var(--pearl); 
        color: var(--charcoal); 
        display: grid; 
        place-items: center; 
        min-height: 100vh; 
        margin: 0; 
        padding: 1.5rem; 
      }
      .card { 
        max-width: 28rem; 
        width: 100%; 
        text-align: center; 
        padding: 3rem 2rem; 
        background: #fff;
        border: 1px solid var(--border);
      }
      .brand {
        font-family: 'Cinzel', serif;
        font-size: 1.5rem;
        letter-spacing: 0.15em;
        color: var(--charcoal);
        margin-bottom: 2rem;
        display: block;
      }
      h1 { 
        font-size: 1.25rem; 
        margin: 0 0 0.5rem; 
        font-weight: 600;
      }
      p { 
        color: #666; 
        margin: 0 0 2rem; 
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .actions { 
        display: flex; 
        gap: 1rem; 
        justify-content: center; 
        flex-wrap: wrap; 
      }
      a, button { 
        padding: 0.75rem 1.5rem; 
        font: inherit; 
        cursor: pointer; 
        text-decoration: none; 
        border: 1px solid transparent; 
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }
      .primary { 
        background: var(--charcoal); 
        color: #fff; 
      }
      .primary:hover {
        background: var(--gold-deep);
      }
      .secondary { 
        background: transparent; 
        color: var(--charcoal); 
        border-color: var(--charcoal); 
      }
      .secondary:hover {
        background: var(--charcoal);
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="brand">AROMA GLOW</span>
      <h1>عذراً، حدث خطأ ما</h1>
      <p>لم نتمكن من تحميل هذه الصفحة. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">المحاولة مرة أخرى</button>
        <a class="secondary" href="/">العودة للرئيسية</a>
      </div>
    </div>
  </body>
</html>`;
}
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var startInstance = createStart(() => ({ requestMiddleware: [errorMiddleware] }));
//#endregion
export { startInstance };
