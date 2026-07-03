// Auto-generated from velore_redesign.html
export const VELORE_CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --white:     #FFFFFF;
  --off-white: #FAFAF8;
  --pearl:     #F6F2EA;
  --pearl2:    #EDE8DC;
  --gold:      #C9A84C;
  --gold-deep: #A6832E;
  --gold-lt:   #E2C97A;
  --gold-pale: #F0E4B8;
  --gold-dim:  #8B6F28;
  --charcoal:  #1A1612;
  --text:      #2C2418;
  --muted:     #7A6B50;
  --muted2:    #9B8E78;
  --border:    rgba(201,168,76,.18);
  --border2:   rgba(201,168,76,.35);
  --border3:   rgba(201,168,76,.6);
  --shadow:    rgba(26,22,18,.08);
  --shadow2:   rgba(26,22,18,.14);
}

html { scroll-behavior: smooth; }
body { background: var(--white); color: var(--text); font-family: 'Cairo', sans-serif; font-weight: 300; overflow-x: hidden; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   NAVBAR
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 300;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 56px;
  height: 76px;
  background: rgba(255,255,255,0);
  transition: background .4s, box-shadow .4s, height .3s;
}
nav.scrolled {
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--border), 0 8px 32px var(--shadow);
  height: 68px;
}

.nav-logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; flex-shrink: 0;
}
.nav-logo img {
  height: 52px; width: 52px; object-fit: contain;
  transition: height .3s;
}
nav.scrolled .nav-logo img { height: 44px; width: 44px; }

.nav-links {
  display: flex; gap: 0; list-style: none;
  position: absolute; left: 50%; transform: translateX(-50%);
}
.nav-links a {
  color: rgba(255,255,255,.82); text-decoration: none;
  font-size: .68rem; letter-spacing: .22em; text-transform: uppercase;
  transition: color .25s; font-family: 'Cinzel', serif; font-weight: 400;
  padding: 8px 22px; border-radius: 2px;
  position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: 2px; left: 50%; right: 50%;
  height: 1px; background: var(--gold);
  transition: left .25s, right .25s;
}
.nav-links a:hover::after { left: 22px; right: 22px; }
nav.scrolled .nav-links a { color: var(--muted); }
.nav-links a:hover { color: var(--gold); }
nav.scrolled .nav-links a:hover { color: var(--gold-deep); }

.nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

.nav-icon-btn {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,.8);
  font-size: 1rem; transition: all .2s; background: transparent;
}
nav.scrolled .nav-icon-btn { border-color: var(--border2); color: var(--muted); }
.nav-icon-btn:hover { background: rgba(201,168,76,.12); border-color: var(--border3); color: var(--gold); }

.nav-cart-btn {
  display: flex; align-items: center; gap: 8px;
  background: var(--gold); color: var(--charcoal);
  font-size: .62rem; letter-spacing: .2em; text-transform: uppercase;
  padding: 10px 22px; border-radius: 2px; cursor: pointer;
  font-family: 'Cinzel', serif; font-weight: 700; border: none;
  transition: background .25s, transform .2s; box-shadow: 0 4px 16px rgba(201,168,76,.35);
}
.nav-cart-btn:hover { background: var(--gold-lt); transform: translateY(-1px); }

.nav-hamburger {
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  padding: 8px; background: none; border: none;
}
.nav-hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,.85); border-radius: 2px; transition: all .3s; }
nav.scrolled .nav-hamburger span { background: var(--charcoal); }

/* Mobile menu */
.mobile-menu {
  display: none; position: fixed; top: 68px; left: 0; right: 0; z-index: 299;
  background: rgba(255,255,255,.98); backdrop-filter: blur(20px);
  padding: 24px 32px 32px; box-shadow: 0 16px 48px var(--shadow2);
  border-bottom: 1px solid var(--border);
  flex-direction: column; gap: 4px;
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
  color: var(--text); text-decoration: none; font-family: 'Cinzel', serif;
  font-size: .82rem; letter-spacing: .18em; text-transform: uppercase;
  padding: 14px 0; border-bottom: 1px solid var(--border);
  transition: color .2s, padding-right .2s;
}
.mobile-menu a:hover { color: var(--gold-deep); padding-right: 8px; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   HERO
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.hero-video {
  position: absolute; inset: 0; z-index: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
}
.hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(10,8,6,.4) 0%,
    rgba(10,8,6,.1) 45%,
    rgba(10,8,6,.5) 100%
  );
}
.hero-vignette {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  box-shadow: inset 0 0 120px rgba(0,0,0,.6);
}

.hero-content {
  position: relative; z-index: 3;
  text-align: center; padding: 140px 40px 100px;
  max-width: 880px;
}

.hero-ornament {
  display: flex; align-items: center; justify-content: center; gap: 16px;
  margin-bottom: 30px;
}
.orn-line { width: 60px; height: 1px; background: linear-gradient(to left, var(--gold), transparent); }
.orn-line.right { background: linear-gradient(to right, var(--gold), transparent); }
.orn-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); }

.hero-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: .62rem; letter-spacing: .5em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 26px; font-weight: 400;
}
.hero-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(3.6rem, 8vw, 7rem);
  line-height: .95; font-weight: 700; color: #FFFFFF;
  margin-bottom: 8px;
  text-shadow: 0 0 80px rgba(201,168,76,.3), 0 4px 40px rgba(0,0,0,.5);
  letter-spacing: .18em;
}
.hero-title-sub {
  font-family: 'Cinzel', serif;
  font-size: .75rem; letter-spacing: .55em; color: rgba(201,168,76,.7);
  margin-bottom: 34px; text-transform: uppercase;
}
.hero-desc {
  font-size: .9rem; line-height: 2; color: rgba(255,255,255,.55);
  max-width: 460px; margin: 0 auto 52px;
}
.hero-actions { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; }
.hero-actions .btn-gold,
.hero-actions .btn-outline-light {
  font-size: 1.08rem !important;
  padding: 18px 56px !important;
}

.btn-gold {
  display: inline-block; background: var(--gold);
  color: var(--charcoal); font-size: .65rem; letter-spacing: .28em;
  text-transform: uppercase; padding: 15px 48px; border-radius: 2px;
  text-decoration: none; font-weight: 700; font-family: 'Cinzel', serif;
  transition: background .25s, transform .2s, box-shadow .25s;
  box-shadow: 0 4px 28px rgba(201,168,76,.35);
}
.btn-gold:hover { background: var(--gold-lt); transform: translateY(-2px); box-shadow: 0 8px 40px rgba(201,168,76,.5); }

.btn-outline-light {
  display: inline-block;
  border: 1px solid rgba(255,255,255,.45); color: rgba(255,255,255,.85);
  font-size: .65rem; letter-spacing: .28em; text-transform: uppercase;
  padding: 15px 40px; border-radius: 2px; text-decoration: none;
  font-family: 'Cinzel', serif; font-weight: 400;
  transition: background .25s, border-color .25s;
}
.btn-outline-light:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.7); }

/* Stats */
.hero-stats {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  display: flex; justify-content: center;
  background: rgba(10,8,6,.65); backdrop-filter: blur(16px);
  border-top: 1px solid rgba(201,168,76,.18);
}
.hero-stat { flex: 1; max-width: 200px; padding: 22px 16px; text-align: center; border-left: 1px solid rgba(201,168,76,.15); }
.hero-stat:first-child { border-left: none; }
.stat-n { font-family: 'Cinzel', serif; font-size: 1.8rem; color: var(--gold); line-height: 1; font-weight: 600; }
.stat-l { font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: rgba(201,168,76,.55); margin-top: 6px; font-family: 'Cinzel', serif; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   MARQUEE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.marquee-wrap {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 14px 0; overflow: hidden;
  background: var(--pearl);
}
.marquee-track { display: flex; gap: 56px; animation: marq 28s linear infinite; white-space: nowrap; }
@keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.mitem { display: inline-flex; align-items: center; gap: 16px; font-size: .64rem; letter-spacing: .3em; text-transform: uppercase; color: var(--muted); font-family: 'Cinzel', serif; }
.mdot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; opacity: .7; flex-shrink: 0; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   SECTION HEADER
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.section-header { text-align: center; padding: 80px 60px 52px; background: var(--white); }
.section-eyebrow {
  display: inline-flex; align-items: center; gap: 16px;
  font-size: .6rem; letter-spacing: .45em; text-transform: uppercase;
  color: var(--gold-deep); margin-bottom: 18px; font-family: 'Cinzel', serif;
}
.section-eyebrow::before, .section-eyebrow::after {
  content: ''; width: 32px; height: 1px; background: var(--gold-dim); opacity: .5;
}
.section-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600; color: var(--charcoal); line-height: 1.15; letter-spacing: .08em;
}
.section-title em { font-style: italic; color: var(--gold-deep); font-family: 'Cormorant Garamond', serif; font-size: 1.1em; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   CATEGORIES
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.categories { padding: 0 48px 80px; background: var(--white); }
.cat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.cat-card {
  position: relative; height: 260px; border-radius: 4px; overflow: hidden;
  cursor: pointer; border: 1px solid var(--border);
  transition: border-color .35s, box-shadow .35s, transform .35s;
  box-shadow: 0 4px 24px var(--shadow);
}
.cat-card:hover { border-color: var(--border2); box-shadow: 0 12px 48px var(--shadow2), 0 0 0 1px var(--border2); transform: translateY(-5px); }
.cat-card:hover .cat-bg { transform: scale(1.06); }
.cat-bg { position: absolute; inset: 0; transition: transform .55s cubic-bezier(.22,.61,.36,1); }
.cat-oriental { background: linear-gradient(135deg, #3D1A06 0%, #1A0A02 100%); }
.cat-floral   { background: linear-gradient(135deg, #2A1030 0%, #0E0618 100%); }
.cat-woody    { background: linear-gradient(135deg, #1A1206 0%, #0A0802 100%); }
.cat-aquatic  { background: linear-gradient(135deg, #0A1E2E 0%, #030C14 100%); }
.cat-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 5rem; opacity: .12; }
.cat-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.1) 0%, transparent 70%);
}
.cat-info {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,8,6,.9) 0%, rgba(10,8,6,.1) 55%, transparent 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 32px;
}
.cat-name { font-family: 'Cinzel', serif; font-size: 1.15rem; font-weight: 600; color: #FFFFFF; margin-bottom: 6px; letter-spacing: .12em; }
.cat-count { font-size: .6rem; letter-spacing: .28em; text-transform: uppercase; color: var(--gold); font-family: 'Cinzel', serif; }
.cat-line { width: 30px; height: 1px; background: var(--gold); margin: 0 auto 12px; opacity: .6; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   DIVIDER
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.divider {
  display: flex; align-items: center; gap: 20px;
  padding: 0 64px 56px; background: var(--white);
}
.div-line { flex: 1; height: 1px; background: var(--border); }
.div-ornament {
  display: flex; align-items: center; gap: 10px; color: var(--gold-dim);
  font-size: .7rem;
}
.div-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); opacity: .6; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   PRODUCTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.products { padding: 0 48px 100px; background: var(--off-white); }

.section-header.products-header {
  background: var(--off-white);
}

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px,1fr)); gap: 24px; }

/* Product Card */
.pcard {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden; cursor: pointer; position: relative;
  transition: transform .35s cubic-bezier(.22,.61,.36,1), box-shadow .35s, border-color .35s;
  box-shadow: 0 2px 16px var(--shadow);
  display: flex; flex-direction: column;
}
.pcard:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 56px var(--shadow2), 0 0 0 1px var(--border2);
  border-color: var(--border2);
}
.pcard:hover .pimg-inner { transform: scale(1.05); }

.pbadge {
  position: absolute; top: 14px; right: 14px; z-index: 3;
  font-size: .55rem; letter-spacing: .2em; text-transform: uppercase;
  padding: 5px 12px; border-radius: 2px; font-weight: 700; font-family: 'Cinzel', serif;
}
.badge-new     { background: var(--gold); color: var(--charcoal); }
.badge-sale    { background: #C0392B; color: #FFFFFF; }
.badge-hot     { background: var(--pearl); color: var(--gold-deep); border: 1px solid var(--border2); }
.badge-limited { background: transparent; color: var(--gold-deep); border: 1px solid var(--border2); }

.pimg-wrap {
  position: relative; height: 300px; overflow: hidden;
  background: linear-gradient(135deg, var(--pearl) 0%, var(--pearl2) 100%);
}
.pimg-inner {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  transition: transform .5s cubic-bezier(.22,.61,.36,1);
}
.pbottle {
  width: 112px;
  filter: drop-shadow(0 20px 40px rgba(26,22,18,.2)) drop-shadow(0 6px 12px rgba(26,22,18,.12));
}
.pimg-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 70% 55% at 50% 38%, rgba(201,168,76,.1) 0%, transparent 70%);
}

/* No more hover-only overlay \u2014 we show a real button below */

.pinfo { padding: 20px 20px 0; border-top: 1px solid var(--border); flex: 1; }
.pfamily { font-size: .56rem; letter-spacing: .32em; text-transform: uppercase; color: var(--gold-deep); margin-bottom: 6px; font-family: 'Cinzel', serif; }
.pname { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 400; color: var(--charcoal); margin-bottom: 8px; font-style: italic; }
.pnotes { font-size: .72rem; color: var(--muted2); margin-bottom: 16px; line-height: 1.65; }
.pfooter { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.pprice { font-family: 'Cinzel', serif; font-size: 1.2rem; color: var(--gold-deep); font-weight: 600; }
.pprice-old { font-size: .75rem; color: rgba(122,107,80,.5); text-decoration: line-through; margin-left: 6px; }
.pright { display: flex; align-items: center; gap: 8px; }
.pvol { font-size: .58rem; letter-spacing: .12em; border: 1px solid var(--border); color: var(--muted2); padding: 3px 10px; border-radius: 2px; font-family: 'Cinzel', serif; }
.pwish {
  width: 34px; height: 34px; border-radius: 50%;
  border: 1px solid var(--border); background: transparent;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: .9rem; color: var(--muted2);
  transition: border-color .2s, color .2s, background .2s;
}
.pwish:hover { border-color: var(--gold); color: var(--gold-deep); background: var(--pearl); }

/* \u2b07 PERSISTENT BUY BUTTON \u2014 always visible */
.pcard-buy {
  display: block; width: calc(100% - 40px); margin: 0 20px 20px;
  background: var(--charcoal); color: var(--gold);
  border: none; border-radius: 2px; padding: 12px 0;
  font-family: 'Cinzel', serif; font-size: .62rem;
  letter-spacing: .26em; text-transform: uppercase; font-weight: 600;
  cursor: pointer; text-align: center; text-decoration: none;
  transition: background .25s, color .25s, transform .2s, box-shadow .2s;
  box-shadow: 0 2px 8px var(--shadow);
}
.pcard-buy:hover {
  background: var(--gold); color: var(--charcoal);
  transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,.3);
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   FEATURES STRIP
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.features {
  display: grid; grid-template-columns: repeat(4,1fr);
  background: var(--pearl);
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.feat-item { padding: 46px 28px; text-align: center; border-left: 1px solid var(--border); }
.feat-item:last-child { border-left: none; }
.feat-icon {
  width: 54px; height: 54px; margin: 0 auto 18px;
  border: 1px solid var(--border2); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
  background: var(--white);
}
.feat-title { font-family: 'Cinzel', serif; font-size: .88rem; font-weight: 600; color: var(--charcoal); margin-bottom: 10px; letter-spacing: .08em; }
.feat-desc { font-size: .74rem; color: var(--muted); line-height: 1.7; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   NEWSLETTER
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.newsletter {
  padding: 96px 60px; text-align: center;
  background: var(--charcoal);
  position: relative; overflow: hidden;
}
.newsletter::before {
  content: 'V'; font-family: 'Cinzel', serif;
  font-size: 32rem; font-weight: 700;
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  color: rgba(201,168,76,.04); line-height: 1; pointer-events: none;
}
.newsletter h2 { font-family: 'Cinzel', serif; font-size: 2.2rem; font-weight: 600; color: var(--pearl); margin-bottom: 10px; letter-spacing: .1em; }
.newsletter h2 span { color: var(--gold); font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15em; }
.newsletter p { font-size: .84rem; color: var(--muted); max-width: 380px; margin: 0 auto 36px; line-height: 1.8; }
.nl-form {
  display: flex; max-width: 480px; margin: 0 auto;
  border: 1px solid rgba(201,168,76,.35); border-radius: 2px; overflow: hidden;
}
.nl-input { flex: 1; border: none; outline: none; background: rgba(255,255,255,.06); padding: 15px 20px; color: var(--pearl); font-family: 'Cairo', sans-serif; font-size: .84rem; }
.nl-input::placeholder { color: var(--muted); }
.nl-btn { background: var(--gold); border: none; padding: 15px 30px; color: var(--charcoal); font-family: 'Cinzel', serif; font-size: .62rem; letter-spacing: .22em; text-transform: uppercase; font-weight: 700; cursor: pointer; transition: background .2s; white-space: nowrap; }
.nl-btn:hover { background: var(--gold-lt); }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   FOOTER
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
footer { background: var(--off-white); border-top: 1px solid var(--border); padding: 64px 60px 40px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 48px; }
.footer-logo-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
.footer-logo-img { height: 56px; width: 56px; object-fit: contain; }
.footer-logo-name { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--gold-deep); letter-spacing: .22em; font-weight: 600; }
.footer-logo-sub { font-size: .52rem; letter-spacing: .35em; color: var(--muted2); font-family: 'Cinzel', serif; display: block; }
.footer-tagline { font-size: .78rem; color: var(--muted); line-height: 1.9; max-width: 220px; }
.footer-socials { display: flex; gap: 10px; margin-top: 24px; }
.social-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--white); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: .85rem; color: var(--muted); transition: border-color .2s, color .2s, background .2s; }
.social-btn:hover { border-color: var(--gold); color: var(--gold-deep); background: var(--pearl); }
.footer-col h4 { font-size: .6rem; letter-spacing: .35em; text-transform: uppercase; color: var(--gold-deep); margin-bottom: 22px; font-family: 'Cinzel', serif; font-weight: 600; }
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 12px; }
.footer-col a { color: var(--muted2); text-decoration: none; font-size: .78rem; transition: color .2s; }
.footer-col a:hover { color: var(--charcoal); }
.footer-bottom { background: var(--pearl); border-top: 1px solid var(--border); padding: 18px 60px; display: flex; justify-content: space-between; align-items: center; }
.footer-bottom p { font-size: .66rem; color: var(--muted2); font-family: 'Cinzel', serif; letter-spacing: .1em; }
.pay-chips { display: flex; gap: 8px; }
.pay-chip { border: 1px solid var(--border2); border-radius: 3px; padding: 4px 11px; font-size: .6rem; color: var(--muted2); letter-spacing: .06em; font-family: 'Cinzel', serif; background: var(--white); }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   RESPONSIVE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
@media (max-width: 1024px) {
  nav { padding: 0 20px; }
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .nav-cart-btn span.cart-label { display: none; }
  .hero-content { padding: 110px 24px 90px; }
  .hero-title { font-size: 3rem; }
  .hero-stats { display: none; }
  .categories { padding: 0 20px 60px; }
  .cat-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .products { padding: 0 20px 60px; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .features { grid-template-columns: repeat(2,1fr); }
  .feat-item:nth-child(2) { border-left: none; }
  footer { grid-template-columns: 1fr 1fr; padding: 48px 24px 32px; gap: 32px; }
  .newsletter { padding: 64px 24px; }
  .footer-bottom { padding: 18px 24px; flex-direction: column; gap: 12px; }
  .section-header { padding: 60px 24px 40px; }
  .divider { padding: 0 24px 48px; }
}
@media (max-width: 540px) {
  .cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
  .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
  .features { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .pay-chips { flex-wrap: wrap; }
  .pimg-wrap { height: 170px; }
  .pbottle { width: 70px; }
  .pname { font-size: 1rem; }
  .pprice { font-size: 0.95rem; }
  .pcard-buy { font-size: 0.52rem; padding: 10px 0; margin: 0 8px 12px; width: calc(100% - 16px); letter-spacing: 0.14em; }
  .pinfo { padding: 10px 10px 0; }
  .cat-card { height: 160px; }
  .cat-name { font-size: 0.9rem; }
  .filter-bar { justify-content: center; gap: 12px; padding: 0 14px; }
  .filter-chips { justify-content: center; gap: 6px; }
  .chip { padding: 7px 12px; font-size: 0.58rem; }
}
  .features { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .pay-chips { flex-wrap: wrap; }
}

/* === Interactive additions === */
.nav-logo-text { font-family: 'Cinzel', serif; font-size: 1.5rem; font-weight: 700; color: #FFFFFF; letter-spacing: .28em; transition: color .25s, font-size .3s; }
nav.scrolled .nav-logo-text { color: var(--charcoal); font-size: 1.3rem; }

.cat-card { background: transparent; border: 1px solid var(--border); }
.cat-card.active { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 12px 48px var(--shadow2); }

.filter-clear { margin-top: 14px; background: transparent; border: 1px solid var(--border2); color: var(--gold-deep); padding: 8px 18px; border-radius: 2px; font-family: 'Cinzel', serif; font-size: .65rem; letter-spacing: .2em; cursor: pointer; transition: background .2s; }
.filter-clear:hover { background: var(--pearl); }

.empty-state { grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--muted); font-size: .9rem; }

.pwish.active { color: var(--gold-deep); border-color: var(--gold); background: var(--pearl); }

/* Drawer */
.drawer-backdrop { position: fixed; inset: 0; background: rgba(10,8,6,.55); backdrop-filter: blur(4px); z-index: 400; opacity: 0; pointer-events: none; transition: opacity .3s; }
.drawer-backdrop.open { opacity: 1; pointer-events: auto; }

.cart-drawer {
  position: fixed; top: 0; bottom: 0; left: 0;
  width: 100%; max-width: 440px; background: var(--white); z-index: 401;
  display: flex; flex-direction: column;
  transform: translateX(-100%); transition: transform .35s cubic-bezier(.22,.61,.36,1);
  box-shadow: 0 0 60px rgba(0,0,0,.18);
}
[dir=\"rtl\"] .cart-drawer { left: auto; right: 0; transform: translateX(100%); }
.cart-drawer.open { transform: translateX(0); }
.cart-head { display: flex; justify-content: space-between; align-items: center; padding: 22px 28px; border-bottom: 1px solid var(--border); background: var(--pearl); }
.cart-head h3 { font-family: 'Cinzel', serif; font-size: 1.05rem; color: var(--charcoal); letter-spacing: .2em; font-weight: 600; }
.cart-head h3 span { color: var(--gold-deep); font-weight: 400; margin-right: 6px; }
.cart-close { background: transparent; border: 1px solid var(--border2); width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; color: var(--muted); cursor: pointer; transition: all .2s; }
.cart-close:hover { background: var(--charcoal); color: var(--gold); border-color: var(--charcoal); }
.cart-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
.cart-empty { text-align: center; padding: 60px 20px; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 16px; }
.cart-empty p { font-size: .95rem; }
.cart-line { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--border); }
.cart-line-img { width: 72px; flex-shrink: 0; background: linear-gradient(135deg, var(--pearl), var(--pearl2)); border-radius: 4px; display: flex; align-items: center; justify-content: center; padding: 6px; }
.cart-line-img svg { width: 100%; height: auto; }
.cart-line-info { flex: 1; }
.cart-line-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--charcoal); font-style: italic; }
.cart-line-fam { font-size: .7rem; color: var(--muted2); letter-spacing: .12em; margin: 4px 0; }
.cart-line-price { font-family: 'Cinzel', serif; color: var(--gold-deep); font-weight: 600; margin: 6px 0; }
.qty { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.qty button { width: 34px; height: 34px; background: var(--pearl); border: 1px solid var(--border); border-radius: 4px; cursor: pointer; font-size: 1rem; color: var(--charcoal); transition: all .2s; }
.qty button:hover { background: var(--gold); color: var(--charcoal); border-color: var(--gold); }
.qty span { min-width: 28px; text-align: center; font-family: 'Cinzel', serif; font-weight: 600; }
.qty-remove { width: auto !important; padding: 0 12px; font-size: .65rem !important; letter-spacing: .15em; margin-right: auto; background: transparent !important; border-color: var(--border) !important; color: var(--muted) !important; font-family: 'Cinzel', serif; }
.qty-remove:hover { color: #C0392B !important; border-color: #C0392B !important; background: transparent !important; }
.cart-foot { border-top: 1px solid var(--border); padding: 22px 28px; background: var(--off-white); }
.cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.cart-total span { font-size: .7rem; letter-spacing: .25em; color: var(--muted); font-family: 'Cinzel', serif; text-transform: uppercase; }
.cart-total strong { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--charcoal); font-weight: 700; }

/* Search modal */
.search-modal {
  position: fixed; top: 20%; left: 50%; transform: translateX(-50%);
  width: 92%; max-width: 540px; background: var(--white); z-index: 402;
  border-radius: 4px; box-shadow: 0 24px 80px rgba(0,0,0,.3);
  padding: 24px; display: flex; flex-direction: column; gap: 12px;
  max-height: 70vh;
}
.search-input { border: none; border-bottom: 1px solid var(--border2); outline: none; padding: 14px 4px; font-size: 1.05rem; font-family: 'Cairo', sans-serif; background: transparent; color: var(--charcoal); }
.search-input::placeholder { color: var(--muted2); }
.search-results { overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.search-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 8px; background: transparent; border: none; border-bottom: 1px solid var(--border); cursor: pointer; text-align: right; font-family: inherit; transition: background .15s; }
.search-item:hover { background: var(--pearl); }
.search-item > span:first-child { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1rem; color: var(--charcoal); }
.search-item-fam { font-size: .7rem; color: var(--muted); letter-spacing: .1em; font-family: 'Cinzel', serif; }
.search-close { align-self: flex-end; background: transparent; border: 1px solid var(--border2); color: var(--muted); padding: 8px 18px; border-radius: 2px; font-family: 'Cinzel', serif; font-size: .65rem; letter-spacing: .2em; cursor: pointer; }
.search-close:hover { background: var(--charcoal); color: var(--gold); border-color: var(--charcoal); }

/* Toast */
.toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--charcoal); color: var(--gold);
  padding: 14px 28px; border-radius: 2px; z-index: 500;
  font-family: 'Cairo', sans-serif; font-size: .85rem; font-weight: 600;
  box-shadow: 0 8px 32px rgba(0,0,0,.3); border: 1px solid rgba(201,168,76,.3);
  animation: toastIn .25s cubic-bezier(.22,.61,.36,1);
}
@keyframes toastIn { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }

@media (max-width: 540px) {
  .cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
  .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
  .features { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .pay-chips { flex-wrap: wrap; }
  .pimg-wrap { height: 170px; }
  .pbottle { width: 70px; }
  .pname { font-size: 1rem; }
  .pprice { font-size: 0.95rem; }
  .pcard-buy { font-size: 0.52rem; padding: 10px 0; margin: 0 8px 12px; width: calc(100% - 16px); letter-spacing: 0.14em; }
  .pinfo { padding: 10px 10px 0; }
  .cat-card { height: 160px; }
  .cat-name { font-size: 0.9rem; }
  .filter-bar { justify-content: center; gap: 12px; padding: 0 14px; }
  .filter-chips { justify-content: center; gap: 6px; }
  .chip { padding: 7px 12px; font-size: 0.58rem; }
}
  .search-modal { top: 10%; padding: 18px; }
}

/* HERO IMPERIAL OUD NOIR OVERRIDES */
.hero { background: #050505; }
.hero-overlay {
  background:
    radial-gradient(circle at 50% 40%, transparent 0%, rgba(5,5,5,.3) 90%),
    linear-gradient(to bottom, rgba(5,5,5,.4) 0%, rgba(5,5,5,.05) 45%, rgba(5,5,5,.6) 100%);
}
.hero-vignette {
  box-shadow: inset 0 0 100px rgba(0,0,0,.5);
  background: linear-gradient(to top right, transparent 60%, rgba(201,168,76,.06));
}
.hero-video { opacity: 1; }
.hero-content { padding: 130px 32px 140px; }
.hero-ornament { gap: 14px; margin-bottom: 22px; opacity: .85; }
.hero-ornament .orn-line { width: 28px; background: var(--gold); opacity: .9; }
.hero-eyebrow { font-size: .58rem; letter-spacing: .55em; color: rgba(201,168,76,.85); margin-bottom: 0; }
.hero-title {
  position: relative; display: inline-block; padding-bottom: 18px;
  text-shadow: 0 0 100px rgba(201,168,76,.25), 0 4px 60px rgba(0,0,0,.7);
  letter-spacing: .2em; margin-top: 18px;
}
.hero-title::after {
  content: ''; position: absolute; left: 50%; bottom: 0;
  transform: translateX(-50%); width: 64px; height: 1px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
}
.hero-title-sub { font-size: .68rem; letter-spacing: .6em; color: rgba(255,255,255,.55); margin-top: 22px; }
.hero-desc { color: rgba(255,255,255,.72); font-weight: 300; line-height: 2.1; }
.btn-gold { padding: 17px 52px; box-shadow: 0 10px 40px -8px rgba(201,168,76,.55); }
.btn-outline-light { border-color: rgba(201,168,76,.35); color: rgba(255,255,255,.92); backdrop-filter: blur(8px); }
.btn-outline-light:hover { border-color: var(--gold); background: rgba(201,168,76,.08); }
.hero-scroll {
  position: absolute; left: 50%; bottom: 28px; transform: translateX(-50%);
  z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 10px;
  opacity: .5; pointer-events: none;
}
.hero-scroll-label {
  font-family: 'Cinzel', serif; font-size: .55rem;
  letter-spacing: .4em; text-transform: uppercase; color: #fff;
}
.hero-scroll-line {
  width: 1px; height: 44px;
  background: linear-gradient(to bottom, rgba(255,255,255,.9), transparent);
  animation: scrollPulse 2.4s ease-in-out infinite;
  transform-origin: top;
}
@keyframes scrollPulse {
  0%, 100% { opacity: .3; transform: scaleY(.6); }
  50% { opacity: 1; transform: scaleY(1); }
}
.hero-leak {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background:
    radial-gradient(ellipse at top right, rgba(201,168,76,.10), transparent 55%),
    linear-gradient(to bottom, rgba(0,0,0,.75), transparent 18%);
}
@media (max-width: 640px) {
  .hero-title { letter-spacing: .15em; }
  .hero-eyebrow { font-size: .5rem; letter-spacing: .35em; }
  .hero-ornament .orn-line { width: 18px; }
  .hero-actions { flex-direction: column; width: 100%; gap: 12px; }
  .hero-actions .btn-gold,
  .hero-actions .btn-outline-light {
    font-size: 0.92rem !important;
    padding: 14px 28px !important;
    width: 100%;
    max-width: 300px;
  }
}
  .hero-eyebrow { font-size: .5rem; letter-spacing: .35em; }
  .hero-ornament .orn-line { width: 18px; }
}

/* === Interactive polish === */
button { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 2px; }

.btn-gold, .nav-cart-btn, .pcard-buy { will-change: transform; }
.btn-gold:active, .nav-cart-btn:active, .pcard-buy:active { transform: translateY(0) scale(.97); transition: transform .08s; }

.pcard { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s, border-color .35s; }
.pcard:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,22,18,.18); border-color: var(--border3); }
.pimg-inner { overflow: hidden; }
.pimg-inner .pbottle { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.pcard:hover .pimg-inner .pbottle { transform: scale(1.06); }
.pcard:hover .pimg-glow { opacity: 1; }
.pimg-glow { transition: opacity .4s; }

.pwish { transition: transform .2s, color .2s, background .2s; }
.pwish:hover { transform: scale(1.15); }
.pwish.active { color: #d33a5b; animation: heart-pop .4s ease; }
@keyframes heart-pop { 0%{transform:scale(.8)} 50%{transform:scale(1.35)} 100%{transform:scale(1)} }

.pcard-buy { display: flex; align-items: center; justify-content: center; gap: 10px; position: relative; overflow: hidden; }
.pcard-buy-icon { display: inline-flex; width: 18px; height: 18px; align-items: center; justify-content: center; border-radius: 50%; background: rgba(0,0,0,.12); font-weight: 700; font-size: 1rem; line-height: 1; }
.pcard-buy::before { content:''; position:absolute; inset:0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.4) 50%, transparent 70%); transform: translateX(-100%); transition: transform .6s; }
.pcard-buy:hover::before { transform: translateX(100%); }

.pcard-qty { display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--charcoal); color: var(--gold-lt); padding: 12px 16px; font-family: 'Cinzel', serif; font-size: .72rem; letter-spacing: .15em; }
.pcard-qty strong { color: var(--white); margin: 0 6px; }
.pcard-qty button { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border3); background: transparent; color: var(--gold); font-size: 1.1rem; cursor: pointer; transition: background .2s, transform .15s; display: flex; align-items: center; justify-content: center; }
.pcard-qty button:hover { background: var(--gold); color: var(--charcoal); }
.pcard-qty button:active { transform: scale(.9); }

.cat-card { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s; }
.cat-card:hover { transform: translateY(-4px) scale(1.02); }
.cat-card:active { transform: translateY(-2px) scale(.99); }
.cat-card.active { box-shadow: 0 0 0 2px var(--gold), 0 16px 40px rgba(201,168,76,.3); }

.nav-cart-btn { position: relative; }
.cart-count-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px; background: var(--charcoal); color: var(--gold-lt); font-family: 'Cinzel', serif; font-size: .62rem; font-weight: 700; animation: badge-pop .35s cubic-bezier(.2,1.4,.4,1); }
@keyframes badge-pop { 0%{transform:scale(.4); opacity:0} 60%{transform:scale(1.25)} 100%{transform:scale(1); opacity:1} }

.nav-icon-btn:active { transform: scale(.92); }
.nav-icon-btn { transition: all .2s, transform .12s; }

.toast { animation: toast-in .35s cubic-bezier(.2,1.2,.3,1); }
@keyframes toast-in { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

/* === Trust strip === */
.trust-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; max-width: 1280px; margin: 60px auto 20px; padding: 0 56px; }
.trust-item { display: flex; align-items: center; gap: 14px; padding: 24px 18px; border-right: 1px solid var(--border); }
.trust-item:last-child { border-right: none; }
.trust-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: linear-gradient(135deg, rgba(201,168,76,.15), rgba(201,168,76,.04)); color: var(--gold-deep); font-size: 1.2rem; flex-shrink: 0; border: 1px solid var(--border2); }
.trust-title { font-family: 'Cinzel', serif; font-size: .82rem; letter-spacing: .12em; color: var(--text); font-weight: 600; }
.trust-desc { font-size: .72rem; color: var(--muted); margin-top: 3px; }
@media (max-width: 820px) {
  .trust-strip { grid-template-columns: repeat(2, 1fr); padding: 0 24px; gap: 0; }
  .trust-item { border-bottom: 1px solid var(--border); }
  .trust-item:nth-child(even) { border-right: none; }
  .trust-item:nth-last-child(-n+2) { border-bottom: none; }
}

/* === Filter bar === */
.filter-bar { max-width: 1280px; margin: 14px auto 30px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.filter-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 999px; border: 1px solid var(--border2); background: transparent; color: var(--muted); font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; transition: all .2s; }
.chip:hover { border-color: var(--gold); color: var(--gold-deep); background: rgba(201,168,76,.06); }
.chip.active { background: var(--charcoal); color: var(--gold-lt); border-color: var(--charcoal); }
.chip-icon { font-size: .9rem; }
.sort-wrap { display: flex; align-items: center; gap: 10px; }
.sort-label { font-family: 'Cinzel', serif; font-size: .65rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }
.sort-select { border: 1px solid var(--border2); background: var(--white); color: var(--text); font-family: 'Cairo', sans-serif; font-size: .8rem; padding: 8px 14px; border-radius: 2px; cursor: pointer; transition: border-color .2s; }
.sort-select:hover, .sort-select:focus { border-color: var(--gold); outline: none; }
.result-count { font-size: .72rem; color: var(--muted); padding-right: 6px; border-right: 1px solid var(--border); padding-left: 12px; }
@media (max-width: 720px) { .filter-bar { padding: 0 24px; } }

/* === Cart shipping/promo/summary === */
.ship-progress { padding: 14px 18px; background: linear-gradient(135deg, rgba(201,168,76,.08), rgba(201,168,76,.02)); border: 1px solid var(--border); border-radius: 4px; margin-bottom: 14px; }
.ship-msg { font-size: .78rem; color: var(--text); margin-bottom: 10px; text-align: center; }
.ship-msg strong { color: var(--gold-deep); font-weight: 700; }
.ship-msg.ship-ok { color: var(--gold-deep); font-weight: 600; font-family: 'Cinzel', serif; font-size: .76rem; letter-spacing: .1em; }
.ship-bar { height: 6px; background: var(--pearl2); border-radius: 99px; overflow: hidden; }
.ship-fill { height: 100%; background: linear-gradient(90deg, var(--gold-deep), var(--gold-lt)); border-radius: 99px; transition: width .5s cubic-bezier(.2,.7,.2,1); box-shadow: 0 0 12px rgba(201,168,76,.5); }

.promo-row { display: flex; gap: 8px; margin-bottom: 14px; }
.promo-input { flex: 1; padding: 10px 14px; border: 1px solid var(--border2); border-radius: 2px; font-family: 'Cairo', sans-serif; font-size: .82rem; background: var(--white); color: var(--text); transition: border-color .2s; }
.promo-input:focus { outline: none; border-color: var(--gold); }
.promo-btn { padding: 0 20px; background: var(--charcoal); color: var(--gold-lt); border: none; font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
.promo-btn:hover { background: var(--gold-deep); color: var(--white); }
.promo-applied { flex: 1; display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(40,140,80,.08); border: 1px solid rgba(40,140,80,.3); border-radius: 2px; font-size: .78rem; color: #2a6b4a; }
.promo-applied strong { color: var(--gold-deep); }
.promo-applied button { background: none; border: none; font-size: 1.2rem; color: var(--muted); cursor: pointer; padding: 0 6px; }

.cart-summary { padding: 14px 0; border-top: 1px solid var(--border); margin-bottom: 14px; }
.cart-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: .82rem; color: var(--muted); }
.cart-row.discount { color: #2a6b4a; }

.nav-search { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: 1px solid rgba(255,255,255,.3); border-radius: 999px; background: rgba(255,255,255,.06); color: rgba(255,255,255,.85); width: 220px; transition: all .25s; }
nav.scrolled .nav-search { border-color: var(--border2); background: rgba(0,0,0,.03); color: var(--muted); }
.nav-search:focus-within { border-color: var(--gold); background: rgba(201,168,76,.08); width: 260px; }
.nav-search svg { flex-shrink: 0; opacity: .75; }
.nav-search input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; color: inherit; font-family: Cairo, sans-serif; font-size: .82rem; }
.nav-search input::placeholder { color: currentColor; opacity: .6; }
@media (max-width: 720px) { .nav-search { width: 140px; } .nav-search:focus-within { width: 160px; } }

/* === Smooth global polish === */
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
img, .pbottle { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.pcard, .btn-gold, .nav-cart-btn, .pcard-buy, .chip, .cat-card, .pwish { transform: translateZ(0); }
.pcard { cursor: pointer; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}

/* === Product detail modal === */
.pdetail-backdrop {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(10,8,6,.72); backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; opacity: 0; pointer-events: none;
  transition: opacity .28s ease;
}
.pdetail-backdrop.open { opacity: 1; pointer-events: auto; }
.pdetail-modal {
  position: relative;
  width: 100%; max-width: 1040px; max-height: 92vh; overflow: hidden;
  background: var(--white); border: 1px solid var(--border2); border-radius: 6px;
  box-shadow: 0 40px 120px rgba(0,0,0,.5), 0 0 0 1px rgba(201,168,76,.15);
  display: grid; grid-template-columns: 1.05fr 1fr;
  animation: pdetail-in .38s cubic-bezier(.2,.9,.25,1.05);
}
@keyframes pdetail-in {
  from { opacity: 0; transform: translateY(24px) scale(.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.pdetail-close {
  position: absolute; top: 14px; left: 14px; z-index: 3;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,.92); border: 1px solid var(--border2);
  color: var(--charcoal); font-size: 1.4rem; line-height: 1; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .15s, color .2s;
}
.pdetail-close:hover { background: var(--gold); color: var(--white); transform: rotate(90deg); }
.pdetail-left { display: flex; flex-direction: column; background: linear-gradient(180deg, var(--pearl), #fff); max-height: 92vh; overflow-y: auto; }
.pdetail-img {
  position: relative;
  background: linear-gradient(160deg, var(--pearl), var(--pearl2));
  display: flex; align-items: center; justify-content: center;
  padding: 40px 30px; min-height: 320px;
  border-bottom: 1px solid var(--border);
}
.pdetail-img .pbottle { width: 100% !important; height: 100% !important; max-height: 340px; object-fit: contain; }
.pdetail-img .pbadge { position: absolute; top: 18px; right: 18px; }
.pdetail-info { padding: 24px 26px 30px; display: flex; flex-direction: column; gap: 18px; }
.pdetail-info-title { font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .28em; text-transform: uppercase; color: var(--gold-deep); text-align: center; position: relative; padding: 0 12px; }
.pdetail-info-title::before, .pdetail-info-title::after { content: ''; position: absolute; top: 50%; width: 24px; height: 1px; background: var(--border2); }
.pdetail-info-title::before { right: 100%; }
.pdetail-info-title::after { left: 100%; }
.pdetail-specs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: 0; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
.pdetail-specs li { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; font-size: .82rem; border-bottom: 1px solid var(--border); background: rgba(255,255,255,.6); }
.pdetail-specs li:last-child { border-bottom: none; }
.pdetail-specs li span { color: var(--muted); font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .16em; text-transform: uppercase; }
.pdetail-specs li strong { color: var(--charcoal); font-weight: 600; text-align: left; }
.pdetail-pyramid { display: flex; flex-direction: column; gap: 10px; padding: 14px; background: linear-gradient(135deg, rgba(201,168,76,.08), rgba(201,168,76,.02)); border: 1px solid var(--border); border-radius: 4px; }
.pyramid-row { display: flex; gap: 12px; align-items: flex-start; }
.pyramid-lvl { flex-shrink: 0; min-width: 56px; font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; color: var(--gold-deep); padding-top: 3px; border-right: 1px solid var(--border2); padding-right: 10px; }
.pyramid-row p { flex: 1; font-size: .82rem; line-height: 1.7; color: var(--text); margin: 0; }
.pdetail-body {
  padding: 44px 40px; display: flex; flex-direction: column; gap: 14px;
  overflow-y: auto; max-height: 92vh;
}
.pdetail-body .pfamily { font-family: 'Cinzel', serif; font-size: .68rem; letter-spacing: .28em; text-transform: uppercase; color: var(--gold-deep); }
.pdetail-name { font-family: 'Cinzel', serif; font-size: 2rem; letter-spacing: .06em; color: var(--charcoal); font-weight: 600; line-height: 1.15; }
.pdetail-vol { font-family: 'Cinzel', serif; font-size: .72rem; letter-spacing: .3em; color: var(--muted); }
.pdetail-notes { font-size: .92rem; line-height: 1.9; color: var(--text); border-top: 1px solid var(--border); padding-top: 16px; }
.pdetail-story { font-family: 'Cinzel', serif; font-style: italic; font-size: .88rem; line-height: 1.8; color: var(--muted); border-right: 2px solid var(--gold); padding: 4px 14px 4px 0; }
.pdetail-price { display: flex; align-items: baseline; gap: 12px; padding-top: 8px; border-top: 1px solid var(--border); }
.pdetail-price .pprice { font-family: 'Cinzel', serif; font-size: 1.6rem; color: var(--gold-deep); font-weight: 700; }
.pdetail-price .pprice-old { font-size: 1rem; color: var(--muted2); text-decoration: line-through; }
.pdetail-actions { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
.pdetail-actions .pwish { width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--border2); background: var(--white); font-size: 1.3rem; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); }
.pdetail-actions .pwish.active { color: #d33a5b; border-color: #d33a5b; }
@media (max-width: 880px) {
  .pdetail-modal { grid-template-columns: 1fr; max-height: 94vh; overflow-y: auto; }
  .pdetail-left { max-height: none; overflow: visible; }
  .pdetail-img { min-height: 240px; padding: 24px; }
  .pdetail-body { padding: 26px 22px; max-height: none; }
  .pdetail-name { font-size: 1.5rem; }
}

/* ═══════════ USER OVERRIDES ═══════════ */

/* Bigger base font for readability */
body { font-size: 1.05rem; }

/* Nav logo — Cinzel white, hero-style, reasonable size */
.nav-logo-text {
  font-family: 'Cinzel', serif;
  color: #FFFFFF;
  font-size: 1.55rem;
  letter-spacing: .32em;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 0 0 24px rgba(201,168,76,.35), 0 2px 12px rgba(0,0,0,.5);
  transition: color .3s, font-size .3s;
}
nav.scrolled .nav-logo-text {
  color: var(--charcoal);
  text-shadow: none;
  font-size: 1.35rem;
}

/* Nav links — bigger & more visible */
.nav-links a {
  font-size: .95rem !important;
  padding: 10px 26px !important;
  letter-spacing: .18em !important;
  color: rgba(255,255,255,.95) !important;
  font-weight: 500 !important;
}
nav.scrolled .nav-links a { color: var(--charcoal) !important; }
.nav-links a:hover { color: var(--gold) !important; }

/* Nav cart button — bigger */
.nav-cart-btn {
  font-size: .82rem !important;
  padding: 14px 28px !important;
  gap: 10px !important;
}
.nav-cart-btn svg { width: 18px !important; height: 18px !important; }
.cart-label { font-size: .82rem; }

/* Nav search — wider, more squared */
.nav-search {
  width: 300px !important;
  border-radius: 6px !important;
  padding: 11px 14px !important;
  gap: 10px !important;
}
.nav-search:focus-within { width: 340px !important; }
.nav-search input { font-size: .95rem !important; }
.nav-search svg { width: 18px !important; height: 18px !important; }

/* Products grid — force 3 columns */
.products-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 32px !important;
}
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 640px) {
  .products-grid { grid-template-columns: 1fr !important; }
}

/* Larger, readable product card text */
.pfamily { font-size: .78rem !important; letter-spacing: .18em; }
.pname { font-size: 1.4rem !important; }
.pnotes { font-size: .95rem !important; line-height: 1.8 !important; }
.pprice { font-size: 1.35rem !important; }
.pprice-old { font-size: .95rem !important; }
.pvol { font-size: .78rem !important; }
.pcard-buy { font-size: .82rem !important; padding: 14px 18px !important; letter-spacing: .18em; }

/* Filter bar — chips on the RIGHT, sort/count on the LEFT */
.filter-bar { flex-direction: row-reverse !important; }
.filter-chips .chip { font-size: .82rem !important; padding: 10px 18px !important; }
.sort-select, .sort-label, .result-count { font-size: .9rem !important; }

/* Section titles slightly bigger */
.section-title { font-size: clamp(2rem, 4.4vw, 3.2rem) !important; }

/* ═══════════ PRODUCT DETAIL MODAL — restructured ═══════════ */
.pdetail-modal {
  grid-template-columns: 1.15fr 1fr !important;
  max-width: 1100px !important;
  width: 94vw !important;
  max-height: 92vh !important;
  overflow: hidden !important;
  border-radius: 8px;
}
.pdetail-info-col {
  padding: 40px 44px 36px;
  overflow-y: auto;
  max-height: 92vh;
  display: flex; flex-direction: column; gap: 18px;
  background: #fff;
}
.pdetail-info-col .pfamily {
  font-family: 'Cinzel', serif;
  color: var(--gold-deep);
  letter-spacing: .28em;
  font-size: .82rem !important;
}
.pdetail-info-col .pdetail-name {
  font-family: 'Cinzel', serif;
  font-size: 2.4rem;
  color: var(--charcoal);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}
.pdetail-info-col .pdetail-vol {
  font-family: 'Cinzel', serif;
  letter-spacing: .38em;
  color: var(--muted);
  font-size: .9rem;
}
.pdetail-info-col .pdetail-notes {
  font-size: 1.02rem !important;
  line-height: 1.9 !important;
  color: var(--text);
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
.pdetail-info-col .pdetail-story {
  font-family: 'Cinzel', serif;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
  border-right: 3px solid var(--gold);
  padding: 4px 16px 4px 0;
}
.pdetail-info-col .pdetail-info-title {
  font-family: 'Cinzel', serif;
  color: var(--gold-deep);
  letter-spacing: .32em;
  font-size: .82rem;
  text-align: center;
  padding: 8px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-top: 4px;
}
.pdetail-info-col .pdetail-specs {
  list-style: none;
  margin: 0; padding: 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px 22px;
}
.pdetail-info-col .pdetail-specs li {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px;
  background: var(--pearl);
  border-radius: 4px;
  font-size: .95rem;
}
.pdetail-info-col .pdetail-specs li span { color: var(--muted); font-size: .82rem; }
.pdetail-info-col .pdetail-specs li strong { color: var(--charcoal); font-weight: 600; font-size: .92rem; }
.pdetail-info-col .pdetail-pyramid {
  background: var(--pearl);
  padding: 16px 18px;
  border-radius: 4px;
  display: flex; flex-direction: column; gap: 10px;
}
.pdetail-info-col .pyramid-row { display: flex; align-items: flex-start; gap: 14px; }
.pdetail-info-col .pyramid-lvl {
  font-family: 'Cinzel', serif;
  color: var(--gold-deep);
  font-size: .78rem;
  letter-spacing: .22em;
  min-width: 62px;
  padding-top: 2px;
}
.pdetail-info-col .pyramid-row p { margin: 0; font-size: .95rem; line-height: 1.7; color: var(--text); flex: 1; }
.pdetail-info-col .pdetail-price {
  display: flex; align-items: baseline; gap: 14px;
  padding-top: 14px; border-top: 1px solid var(--border);
}
.pdetail-info-col .pdetail-price .pprice {
  font-family: 'Cinzel', serif;
  font-size: 2rem !important;
  color: var(--gold-deep);
  font-weight: 700;
}
.pdetail-info-col .pdetail-price .pprice-old {
  font-size: 1.1rem !important;
  color: var(--muted2);
  text-decoration: line-through;
}
.pdetail-info-col .pdetail-actions {
  display: flex; gap: 14px; margin-top: 6px;
}
.pdetail-info-col .pdetail-buy {
  flex: 1;
  font-size: 1rem !important;
  padding: 18px 24px !important;
  letter-spacing: .22em !important;
}
.pdetail-info-col .pdetail-actions .pwish {
  width: 58px; height: 58px;
  border-radius: 6px;
  border: 1.5px solid var(--border2);
  background: var(--white);
  font-size: 1.6rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--muted);
  transition: all .2s;
}
.pdetail-info-col .pdetail-actions .pwish:hover { border-color: #d33a5b; color: #d33a5b; }
.pdetail-info-col .pdetail-actions .pwish.active { color: #d33a5b; border-color: #d33a5b; background: #fef2f4; }

/* RIGHT — image only, centered, large */
.pdetail-media {
  position: relative;
  background: linear-gradient(135deg, var(--pearl) 0%, var(--pearl2) 100%);
  display: flex; align-items: center; justify-content: center;
  padding: 40px;
  min-height: 100%;
}
.pdetail-media-img {
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1 / 1;
  display: flex; align-items: center; justify-content: center;
}
.pdetail-media-img img,
.pdetail-media-img .pbottle {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}
.pdetail-media .pbadge {
  position: absolute; top: 24px; right: 24px; left: auto;
  font-size: .85rem; padding: 10px 20px;
  z-index: 4;
}

/* Hide the old inner containers if any leftover uses */
.pdetail-modal > .pdetail-left,
.pdetail-modal > .pdetail-body { display: none !important; }

@media (max-width: 880px) {
  .pdetail-modal {
    grid-template-columns: 1fr !important;
    max-height: 94vh !important;
    overflow-y: auto !important;
  }
  .pdetail-media { min-height: 320px; padding: 26px; order: -1; }
  .pdetail-media-img { max-width: 260px; }
  .pdetail-info-col { padding: 28px 22px; max-height: none; overflow: visible; }
  .pdetail-info-col .pdetail-name { font-size: 1.85rem; }
  .pdetail-info-col .pdetail-specs { grid-template-columns: 1fr; }
}

/* Smooth transitions polish */
.pcard, .pcard-buy, .btn-gold, .nav-cart-btn, .chip { will-change: transform; transition-timing-function: cubic-bezier(.4,0,.2,1); }

.filter-bar { max-width: none !important; }

@media (max-width: 1024px) {
  .nav-search { width: 38px !important; height: 38px !important; border-radius: 50% !important; padding: 0 !important; justify-content: center !important; background: transparent !important; border: 1px solid rgba(255,255,255,.3) !important; gap: 0 !important; flex: 0 0 38px !important; }
  nav.scrolled .nav-search { border-color: var(--border2) !important; background: transparent !important; }
  .nav-search:focus-within { width: 38px !important; background: transparent !important; }
  .nav-search input { display: none !important; }
  .nav-search svg { margin: 0 !important; width: 16px !important; height: 16px !important; opacity: 1 !important; flex-shrink: 0 !important; }
  .nav-right { width: auto !important; max-width: none !important; flex: 1; justify-content: flex-end; }
}
`;

