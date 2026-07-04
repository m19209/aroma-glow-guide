import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_productId-DsaG5joi.mjs";
import { n as getAllStocks, t as Bottle } from "./_ssr/products-C421Fslf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_productId-CE06psSz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const product = Route.useLoaderData();
	const [stocks, setStocks] = (0, import_react.useState)({});
	const [stocksLoading, setStocksLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getAllStocks().then((res) => {
			if (res) setStocks(res);
			setStocksLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "scrolled",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "20px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "nav-logo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "nav-logo-text",
						children: "VELORE"
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			style: {
				paddingTop: "80px",
				minHeight: "80vh"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pdetail-content",
				style: {
					display: "flex",
					flexWrap: "wrap",
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "40px 20px",
					gap: "40px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdetail-left",
					style: { flex: "1 1 400px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pdetail-image-wrap",
						style: {
							position: "relative",
							width: "100%",
							aspectRatio: "3/4",
							background: "var(--charcoal)",
							borderRadius: "8px",
							overflow: "hidden",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: "60%",
								height: "80%"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bottle, {
								variant: product.bottle,
								label: product.name
							})
						})
					}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `pbadge badge-${product.badge.variant}`,
						style: {
							position: "absolute",
							top: 20,
							right: 20
						},
						children: product.badge.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdetail-right",
					style: {
						flex: "1 1 400px",
						display: "flex",
						flexDirection: "column",
						gap: "20px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pfamily",
									style: {
										color: "var(--gold)",
										letterSpacing: "0.1em",
										fontSize: "0.8rem",
										textTransform: "uppercase"
									},
									children: product.family
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "pdetail-title",
									style: {
										fontSize: "2.5rem",
										fontFamily: "Cinzel, serif",
										margin: "10px 0"
									},
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pdetail-volume",
									style: {
										fontSize: "1rem",
										color: "var(--text-light)"
									},
									children: product.volume
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pdetail-desc",
							style: {
								fontSize: "1.1rem",
								lineHeight: 1.6,
								color: "#d1d1d1"
							},
							children: product.story
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-specs",
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
								gap: "15px",
								marginTop: "20px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pspec-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pspec-label",
										style: {
											display: "block",
											fontSize: "0.8rem",
											color: "#888"
										},
										children: "التركيز"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "pspec-val",
										style: { fontSize: "0.9rem" },
										children: product.concentration
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pspec-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pspec-label",
										style: {
											display: "block",
											fontSize: "0.8rem",
											color: "#888"
										},
										children: "الثبات"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "pspec-val",
										style: { fontSize: "0.9rem" },
										children: product.longevity
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pspec-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pspec-label",
										style: {
											display: "block",
											fontSize: "0.8rem",
											color: "#888"
										},
										children: "الفوحان"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "pspec-val",
										style: { fontSize: "0.9rem" },
										children: product.sillage
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-notes-grid",
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								padding: "20px",
								background: "#111",
								borderRadius: "8px",
								marginTop: "20px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pnote-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pnote-title",
										style: {
											color: "var(--gold)",
											fontSize: "0.8rem"
										},
										children: "القمة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "pnote-val",
										style: {
											margin: 0,
											fontSize: "0.9rem"
										},
										children: product.topNotes
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pnote-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pnote-title",
										style: {
											color: "var(--gold)",
											fontSize: "0.8rem"
										},
										children: "القلب"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "pnote-val",
										style: {
											margin: 0,
											fontSize: "0.9rem"
										},
										children: product.heartNotes
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pnote-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pnote-title",
										style: {
											color: "var(--gold)",
											fontSize: "0.8rem"
										},
										children: "القاعدة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "pnote-val",
										style: {
											margin: 0,
											fontSize: "0.9rem"
										},
										children: product.baseNotes
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pstock",
							style: {
								color: (stocks[product.id] ?? 5) < 3 ? "#d9534f" : "#8B6F28",
								fontSize: "0.9rem",
								marginTop: "10px",
								fontWeight: "bold"
							},
							children: stocksLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "skeleton-pulse",
								style: {
									display: "inline-block",
									width: "80px",
									height: "12px",
									background: "var(--beige)",
									borderRadius: "4px"
								}
							}) : (stocks[product.id] ?? 5) > 0 ? `الكمية المتبقية: ${stocks[product.id] ?? 5} قطع` : "نفدت الكمية"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-price-row",
							style: {
								display: "flex",
								alignItems: "center",
								gap: "15px",
								marginTop: "10px"
							},
							children: [product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pold-price",
								style: {
									textDecoration: "line-through",
									color: "#888",
									fontSize: "1.2rem"
								},
								children: [product.oldPrice, " ج.م"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pprice",
								style: {
									fontSize: "1.8rem",
									color: "var(--gold)",
									fontWeight: "bold"
								},
								children: [product.price, " ج.م"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pdetail-actions",
							style: { marginTop: "30px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "btn-gold pdetail-buy",
								style: {
									textAlign: "center",
									padding: "15px 30px",
									fontSize: "1.1rem",
									display: "inline-block"
								},
								children: "العودة للصفحة الرئيسية لشراء العطر"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: "40px 20px",
				textAlign: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 VELORE · TOUS DROITS RÉSERVÉS" })
		}) })
	] });
}
//#endregion
export { ProductPage as component };
