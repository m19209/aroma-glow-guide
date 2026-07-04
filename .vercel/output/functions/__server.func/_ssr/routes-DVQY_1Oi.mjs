import { o as __toESM } from "../_runtime.mjs";
import { n as PRODUCTS } from "./product-data-BvAzUcIU.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { n as getAllStocks, t as Bottle } from "./products-C421Fslf.mjs";
import { r as getUserProfile, t as createOrder } from "./user-D4H6yyrY.mjs";
import { t as Route } from "./routes-DZvhqV9j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DVQY_1Oi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Hero({ scrollToProducts }) {
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const v = videoRef.current;
		if (!v) return;
		v.muted = true;
		v.play().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: "hero-video",
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				preload: "auto",
				style: { backgroundColor: "#050505" },
				poster: "https://images.unsplash.com/photo-1594035919809-0d67af651cad?q=80&w=2000&auto=format&fit=crop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: `/hero-video.mp4`,
					type: "video/mp4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-leak" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-vignette" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-ornament",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orn-line" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hero-eyebrow",
								style: { margin: 0 },
								children: "Maison de Parfum · Depuis 2010"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orn-line right" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title",
						children: "VELORE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-title-sub",
						children: "Eau de Parfum"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hero-desc",
						children: "عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية — مُقطَّرة بعناية من أندر المكونات لتترك أثراً لا يُنسى."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#products",
							onClick: (e) => {
								e.preventDefault();
								scrollToProducts();
							},
							className: "btn-gold",
							children: "اكتشف المجموعة"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-scroll",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hero-scroll-label",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-scroll-line" })]
			})
		]
	});
}
function CartDrawer({ isOpen, onClose, cart, setQty, removeLine, shippingFee, cartTotal, promoApplied, promoInput, setPromoInput, applyPromo, grandTotal, checkout, checkoutLoading, shippingProgress }) {
	const drawerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isOpen) drawerRef.current?.focus();
	}, [isOpen]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `drawer-backdrop ${isOpen ? "open" : ""}`,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `cart-drawer ${isOpen ? "open" : ""}`,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "سلة المشتريات",
		ref: drawerRef,
		tabIndex: -1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cart-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "8px",
						margin: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "1.3rem",
							fontFamily: "\"Cairo\", sans-serif",
							fontWeight: 600,
							letterSpacing: "0"
						},
						children: "سلة المشتريات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "var(--gold-deep)",
							fontWeight: 700,
							fontSize: "1.05rem",
							letterSpacing: "0.15em",
							marginTop: "3px",
							fontFamily: "\"Cinzel\", serif"
						},
						children: "— CART"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "cart-close",
					onClick: onClose,
					"aria-label": "إغلاق السلة",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "22",
						height: "22",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "18",
							y1: "6",
							x2: "6",
							y2: "18"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "6",
							y1: "6",
							x2: "18",
							y2: "18"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cart-body",
				children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cart-empty",
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "80px 20px",
						textAlign: "center",
						opacity: .6
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "64",
							height: "64",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							style: { marginBottom: "24px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "3",
									y1: "6",
									x2: "21",
									y2: "6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 0 1-8 0" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "1.75rem",
								fontWeight: 600,
								margin: 0,
								letterSpacing: "-0.5px"
							},
							children: "السلة فارغة"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "1.05rem",
								marginTop: "12px",
								fontWeight: 300
							},
							children: "لم تقم بإضافة أي عطور بعد."
						})
					]
				}) : cart.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cart-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cart-line-img",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bottle, {
							variant: c.product.bottle,
							label: c.product.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cart-line-info",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cart-line-name",
								style: {
									fontSize: "1.4rem",
									fontWeight: 600
								},
								children: c.product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cart-line-fam",
								style: {
									fontSize: "0.9rem",
									marginTop: "4px"
								},
								children: c.product.family
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cart-line-price",
								style: {
									fontSize: "1.25rem",
									marginTop: "10px"
								},
								children: [c.product.price, " ج.م"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "qty",
								style: { marginTop: "14px" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(c.product.id, c.qty - 1),
										style: {
											width: "32px",
											height: "32px",
											fontSize: "1.2rem"
										},
										children: "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "1.2rem",
											padding: "0 10px"
										},
										children: c.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(c.product.id, c.qty + 1),
										style: {
											width: "32px",
											height: "32px",
											fontSize: "1.2rem"
										},
										children: "+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "qty-remove",
										style: { fontSize: "0.95rem" },
										onClick: () => removeLine(c.product.id),
										children: "إزالة"
									})
								]
							})
						]
					})]
				}, c.product.id))
			}),
			cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cart-foot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ship-progress",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: shippingProgress === 100 ? "ship-msg ship-ok" : "ship-msg",
							style: {
								fontSize: "1.05rem",
								marginBottom: "12px",
								textAlign: "center",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "8px"
							},
							children: shippingProgress === 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22 4 12 14.01 9 11.01" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تهانينا! طلبك مؤهل للشحن المجاني" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "12",
									r: "10"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "12 6 12 12 16 14" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"تبقى ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [800 - cartTotal, " ج.م"] }),
								" للحصول على شحن مجاني"
							] })] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ship-bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ship-fill",
								style: { width: `${shippingProgress}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "8px",
							marginBottom: "16px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "كود الخصم (إن وجد)",
							"aria-label": "كود الخصم",
							value: promoInput,
							onChange: (e) => setPromoInput(e.target.value),
							style: {
								flex: 1,
								padding: "10px 14px",
								border: "1px solid var(--border)",
								borderRadius: "4px",
								fontSize: "1.1rem"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: applyPromo,
							className: "btn-gold",
							style: {
								padding: "0 18px",
								fontSize: "1.1rem"
							},
							children: "تفعيل"
						})]
					}),
					promoApplied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							color: "#d4af37",
							fontSize: "1.1rem",
							marginBottom: "15px"
						},
						children: [
							"تم تفعيل الخصم: ",
							promoApplied.pct,
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cart-total",
						style: {
							fontSize: "1.4rem",
							color: "var(--muted)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [cartTotal, " ج.م"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cart-total",
						style: {
							fontSize: "1.4rem",
							color: "var(--muted)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الشحن" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shippingFee === 0 ? "مجاني" : `${shippingFee} ج.م` })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cart-total",
						style: {
							fontWeight: 700,
							color: "var(--charcoal)",
							fontSize: "1.9rem",
							marginTop: "12px",
							borderTop: "2px solid var(--border)",
							paddingTop: "18px",
							paddingBottom: "12px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإجمالي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [grandTotal, " ج.م"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-gold",
						style: {
							width: "100%",
							padding: "18px",
							fontSize: "1.3rem",
							fontWeight: 700,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "10px"
						},
						onClick: checkout,
						disabled: checkoutLoading,
						children: checkoutLoading ? "جاري التحويل..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إتمام الطلب" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							width: "22",
							height: "22",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 19-7-7 7-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 12H5" })]
						})] })
					})
				]
			})
		]
	})] });
}
var loginUser = createServerFn().validator((data) => {
	if (!data.email.includes("@") || data.password.length < 4) throw new Error("Invalid input");
	return data;
}).handler(createSsrRpc("6c94d701ef22ff58d7a82ea654edf2cb08167b608dd3c9298c1b897db0e2c255"));
var signupUser = createServerFn().validator((data) => {
	if (!data.email.includes("@") || data.password.length < 4) throw new Error("Invalid input");
	return data;
}).handler(createSsrRpc("1324ede70119ed4bf81a9910fa6bb7eee7c397bfbcc908462e9030043955a6b6"));
function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateFields(isRegister, name, email, password) {
	const errors = {};
	if (isRegister && name.trim().length < 3) errors.name = "يرجى إدخال الاسم الكامل (3 أحرف على الأقل)";
	if (!email.trim()) errors.email = "يرجى إدخال البريد الإلكتروني";
	else if (!validateEmail(email.trim())) errors.email = "صيغة البريد الإلكتروني غير صحيحة";
	if (!password) errors.password = "يرجى إدخال كلمة المرور";
	else if (password.length < 6) errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
	return errors;
}
function LoginModal({ isOpen, onClose, onLogin }) {
	const [isRegister, setIsRegister] = (0, import_react.useState)(false);
	const [authName, setAuthName] = (0, import_react.useState)("");
	const [authEmail, setAuthEmail] = (0, import_react.useState)("");
	const [authPassword, setAuthPassword] = (0, import_react.useState)("");
	const [authLoading, setAuthLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const modalRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setIsRegister(false);
			setAuthName("");
			setAuthEmail("");
			setAuthPassword("");
			setErrorMsg("");
			setFieldErrors({});
			setTouched({});
			modalRef.current?.focus();
		}
	}, [isOpen]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	(0, import_react.useEffect)(() => {
		if (Object.keys(touched).length === 0) return;
		const errors = validateFields(isRegister, authName, authEmail, authPassword);
		const visibleErrors = {};
		if (touched.name && errors.name) visibleErrors.name = errors.name;
		if (touched.email && errors.email) visibleErrors.email = errors.email;
		if (touched.password && errors.password) visibleErrors.password = errors.password;
		setFieldErrors(visibleErrors);
	}, [
		authName,
		authEmail,
		authPassword,
		isRegister,
		touched
	]);
	if (!isOpen) return null;
	const handleBlur = (field) => {
		setTouched((prev) => ({
			...prev,
			[field]: true
		}));
	};
	const handleSubmit = async () => {
		setTouched({
			name: true,
			email: true,
			password: true
		});
		const errors = validateFields(isRegister, authName, authEmail, authPassword);
		setFieldErrors(errors);
		if (Object.keys(errors).length > 0) return;
		setAuthLoading(true);
		setErrorMsg("");
		try {
			if (isRegister) {
				const res = await signupUser({ data: {
					name: authName,
					email: authEmail,
					password: authPassword
				} });
				if (res.success) {
					onLogin(res.userId || "user_id");
					onClose();
				} else setErrorMsg(res.error || "حدث خطأ");
			} else {
				const res = await loginUser({ data: {
					email: authEmail,
					password: authPassword
				} });
				if (res.success) {
					onLogin(res.userId || "user_id");
					onClose();
				} else setErrorMsg(res.error || "بيانات الدخول غير صحيحة");
			}
		} finally {
			setAuthLoading(false);
		}
	};
	const fieldErrorStyle = {
		color: "#e74c3c",
		fontSize: "0.78rem",
		marginTop: "4px",
		textAlign: "right",
		fontWeight: 500,
		display: "flex",
		alignItems: "center",
		gap: "4px"
	};
	const inputErrorClass = (field) => fieldErrors[field] ? "magic-input magic-input-error" : "magic-input";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "magic-backdrop",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "magic-login-modal split-modal",
			role: "dialog",
			"aria-modal": "true",
			ref: modalRef,
			tabIndex: -1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "magic-modal-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "magic-close",
					onClick: onClose,
					"aria-label": "إغلاق",
					children: "✕"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "magic-dropdown-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "magic-title",
							children: isRegister ? "إنشاء حساب" : "تسجيل الدخول"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "magic-subtitle",
							children: isRegister ? "انضم إلى مجتمع ڤيلور الفاخر" : "مرحباً بعودتك إلى عالم ڤيلور"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "magic-form",
							children: [
								isRegister && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "magic-input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "الاسم الكامل",
										value: authName,
										onChange: (e) => setAuthName(e.target.value),
										onBlur: () => handleBlur("name"),
										className: inputErrorClass("name"),
										"aria-invalid": !!fieldErrors.name
									}), fieldErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: fieldErrorStyle,
										role: "alert",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠" }),
											" ",
											fieldErrors.name
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "magic-input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										placeholder: "البريد الإلكتروني",
										value: authEmail,
										onChange: (e) => setAuthEmail(e.target.value),
										onBlur: () => handleBlur("email"),
										className: inputErrorClass("email"),
										"aria-invalid": !!fieldErrors.email
									}), fieldErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: fieldErrorStyle,
										role: "alert",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠" }),
											" ",
											fieldErrors.email
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "magic-input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										placeholder: "كلمة المرور (6 أحرف على الأقل)",
										value: authPassword,
										onChange: (e) => setAuthPassword(e.target.value),
										onBlur: () => handleBlur("password"),
										className: inputErrorClass("password"),
										"aria-invalid": !!fieldErrors.password
									}), fieldErrors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: fieldErrorStyle,
										role: "alert",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠" }),
											" ",
											fieldErrors.password
										]
									})]
								}),
								errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "#e74c3c",
										fontSize: "0.85rem",
										marginBottom: "10px",
										textAlign: "right",
										background: "rgba(231,76,60,0.08)",
										padding: "8px 12px",
										borderRadius: "6px",
										border: "1px solid rgba(231,76,60,0.2)"
									},
									role: "alert",
									children: errorMsg
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: authLoading,
									className: "magic-submit-btn",
									onClick: handleSubmit,
									children: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "magic-loader" }) : isRegister ? "إنشاء حساب" : "تسجيل الدخول"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "magic-switch",
							children: [isRegister ? "لديك حساب بالفعل؟ " : "ليس لديك حساب؟ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								onClick: (e) => {
									e.preventDefault();
									setIsRegister(!isRegister);
									setErrorMsg("");
									setFieldErrors({});
									setTouched({});
								},
								children: isRegister ? "تسجيل الدخول" : "إنشاء حساب"
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "magic-modal-image" })]
		})
	});
}
function ProductDetailModal({ product, onClose, stocks, addToCart, wishlist, toggleWish }) {
	const modalRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (product) modalRef.current?.focus();
	}, [product]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && product) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [product, onClose]);
	if (!product) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pdetail-backdrop open",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pdetail-modal",
			role: "dialog",
			"aria-modal": "true",
			ref: modalRef,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "pdetail-close",
					onClick: onClose,
					"aria-label": "إغلاق",
					children: "✕"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdetail-media",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pdetail-media-img",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bottle, {
							variant: product.bottle,
							label: product.name
						})
					}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `pbadge ${product.badge.variant}`,
						children: product.badge.label
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdetail-info-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pfamily",
							children: product.family
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "pdetail-name",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pdetail-vol",
							children: product.volume
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pdetail-story",
							children: product.story
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pdetail-info-title",
							children: "المواصفات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "pdetail-specs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "التركيز" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: product.concentration })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الثبات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: product.longevity })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الفوحان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: product.sillage })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pdetail-info-title",
							children: "الهرم العطري"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-pyramid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pyramid-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pyramid-lvl",
										children: "القمة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.topNotes })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pyramid-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pyramid-lvl",
										children: "القلب"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.heartNotes })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pyramid-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pyramid-lvl",
										children: "القاعدة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.baseNotes })]
								})
							]
						}),
						(stocks[product.id] ?? 5) <= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								color: "#d9534f",
								fontSize: "0.85rem",
								marginTop: "10px",
								fontWeight: "bold"
							},
							children: [
								"تبقى ",
								stocks[product.id] ?? 5,
								" قطع فقط!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-price",
							children: [product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pprice-old",
								children: [product.oldPrice, " ج.م"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pprice",
								children: [product.price, " ج.م"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdetail-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-gold pdetail-buy",
								disabled: (stocks[product.id] ?? 5) <= 0,
								style: { opacity: (stocks[product.id] ?? 5) <= 0 ? .5 : 1 },
								onClick: () => {
									addToCart(product);
									onClose();
								},
								children: "شراء الآن — Add to Cart"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `pwish ${wishlist.has(product.id) ? "active" : ""}`,
								onClick: () => toggleWish(product.id),
								"aria-label": "المفضلة",
								children: wishlist.has(product.id) ? "♥" : "♡"
							})]
						})
					]
				})
			]
		})
	});
}
function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery, onSelectProduct }) {
	const modalRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `drawer-backdrop active`,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "search-modal",
		onClick: (e) => e.stopPropagation(),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "نافذة البحث",
		ref: modalRef,
		tabIndex: -1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				className: "search-input",
				placeholder: "ابحث عن عطر، عائلة، نوتة...",
				value: searchQuery,
				onChange: (e) => setSearchQuery(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "search-results",
				children: PRODUCTS.filter((p) => {
					if (!searchQuery.trim()) return true;
					const q = searchQuery.toLowerCase();
					return p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q) || p.notes.includes(q);
				}).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "search-item",
					onClick: () => {
						onClose();
						onSelectProduct(p);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "search-item-fam",
						children: [
							p.family,
							" · ",
							p.price,
							" ج.م"
						]
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "search-close",
				onClick: onClose,
				children: "إغلاق"
			})
		]
	})] });
}
var ArrowUpIcon = ({ size = 24 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 7-7 7 7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5" })]
});
function BackToTop() {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) setIsVisible(true);
			else setIsVisible(false);
		};
		window.addEventListener("scroll", toggleVisibility, { passive: true });
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `back-to-top ${isVisible ? "is-visible" : ""}`,
		onClick: scrollToTop,
		"aria-label": "العودة إلى الأعلى",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpIcon, { size: 24 })
	});
}
var validatePromo = createServerFn().validator((code) => code.trim().toUpperCase()).handler(createSsrRpc("fbb2a54a643ebfc9696d034a65d9e40a0bcfd593ca667af15edf6afe23a9172c"));
var CATEGORIES = [
	{
		key: "oriental",
		name: "Oriental",
		icon: "✦"
	},
	{
		key: "floral",
		name: "Floral",
		icon: "✿"
	},
	{
		key: "woody",
		name: "Oud & Wood",
		icon: "◈"
	},
	{
		key: "aquatic",
		name: "Aquatic",
		icon: "✧"
	}
];
function Index() {
	const navigate = useNavigate();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [loginOpen, setLoginOpen] = (0, import_react.useState)(false);
	const [isRegister, setIsRegister] = (0, import_react.useState)(false);
	const [authName, setAuthName] = (0, import_react.useState)("");
	const [authEmail, setAuthEmail] = (0, import_react.useState)("");
	const [authPassword, setAuthPassword] = (0, import_react.useState)("");
	const [authLoading, setAuthLoading] = (0, import_react.useState)(false);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [stocksLoading, setStocksLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [wishlist, setWishlist] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [toast, setToast] = (0, import_react.useState)(null);
	const [detailProduct, setDetailProduct] = (0, import_react.useState)(null);
	const [stocks, setStocks] = (0, import_react.useState)({});
	const [checkoutLoading, setCheckoutLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getAllStocks().then((res) => {
			if (res) setStocks(res);
			setStocksLoading(false);
		});
	}, []);
	const [filterCat, setFilterCat] = (0, import_react.useState)(null);
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const [promoInput, setPromoInput] = (0, import_react.useState)("");
	const [promoApplied, setPromoApplied] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const c = localStorage.getItem("velore_cart");
			if (c) setCart(JSON.parse(c));
			const w = localStorage.getItem("velore_wish");
			if (w) setWishlist(new Set(JSON.parse(w)));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		getUserProfile().then((res) => {
			if (res.success && res.user) setCurrentUser(res.user.id);
		});
	}, []);
	const searchParams = Route.useSearch();
	(0, import_react.useEffect)(() => {
		if (searchParams.loginRequired) {
			setLoginOpen(true);
			showToast("يرجى تسجيل الدخول أولاً للوصول إلى حسابك");
		}
	}, [searchParams.loginRequired]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem("velore_cart", JSON.stringify(cart));
		} catch {}
	}, [cart]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem("velore_wish", JSON.stringify([...wishlist]));
		} catch {}
	}, [wishlist]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = cartOpen || loginOpen || searchOpen || detailProduct ? "hidden" : "";
	}, [
		cartOpen,
		loginOpen,
		searchOpen,
		detailProduct
	]);
	const cartCount = cart.reduce((a, l) => a + l.qty, 0);
	const cartTotal = cart.reduce((a, l) => a + l.qty * l.product.price, 0);
	function showToast(msg) {
		setToast(msg);
		window.setTimeout(() => setToast(null), 2200);
	}
	function addToCart(p) {
		const currentStock = stocks[p.id] ?? 5;
		if (currentStock <= 0) {
			showToast("عذراً، نفدت الكمية");
			return;
		}
		setCart((c) => {
			const found = c.find((l) => l.product.id === p.id);
			if (found) {
				if (found.qty >= currentStock) {
					showToast(`تبقّى ${currentStock} قطع فقط`);
					return c;
				}
				return c.map((l) => l.product.id === p.id ? {
					...l,
					qty: l.qty + 1
				} : l);
			}
			return [...c, {
				product: p,
				qty: 1
			}];
		});
		showToast(`تمت إضافة ${p.name} إلى الحقيبة`);
	}
	function removeLine(id) {
		setCart((c) => c.filter((l) => l.product.id !== id));
	}
	function setQty(id, qty) {
		if (qty <= 0) return removeLine(id);
		const currentStock = stocks[id] ?? 5;
		if (qty > currentStock) {
			showToast(`تبقّى ${currentStock} قطع فقط`);
			return;
		}
		setCart((c) => c.map((l) => l.product.id === id ? {
			...l,
			qty
		} : l));
	}
	function toggleWish(id) {
		setWishlist((w) => {
			const n = new Set(w);
			if (n.has(id)) {
				n.delete(id);
				showToast("أُزيل من المفضلة");
			} else {
				n.add(id);
				showToast("أُضيف إلى المفضلة");
			}
			return n;
		});
	}
	function scrollTo(id) {
		setMobileOpen(false);
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	async function checkout() {
		if (cart.length === 0) return;
		if (!currentUser) {
			showToast("يرجى تسجيل الدخول أولاً لإتمام الطلب");
			setLoginOpen(true);
			return;
		}
		setCheckoutLoading(true);
		showToast("جاري إرسال طلبك…");
		try {
			const profile = await getUserProfile();
			if (!profile.success || !profile.user) {
				showToast("حدث خطأ في استرداد بيانات الحساب");
				setCheckoutLoading(false);
				return;
			}
			const u = profile.user;
			if (!u.phone || !u.city || !u.district || !u.street) {
				showToast("يرجى إكمال عنوان التوصيل ورقم الهاتف في حسابك أولاً");
				window.setTimeout(() => {
					navigate({ to: "/account" });
				}, 1500);
				return;
			}
			const addressStr = `${u.building ? u.building + "، " : ""}${u.street}، ${u.district}، ${u.city} (هاتف: ${u.phone})`;
			const res = await createOrder({ data: {
				items: cart.map((line) => ({
					productId: line.product.id,
					productName: line.product.name,
					quantity: line.qty,
					unitPrice: line.product.price
				})),
				totalAmount: cart.reduce((sum, line) => sum + line.qty * line.product.price, 0),
				shippingAddress: addressStr
			} });
			if (res.success) {
				setCart([]);
				setCartOpen(false);
				showToast("تم تسجيل طلبك بنجاح! شكراً لك.");
			} else showToast(res.error || "فشل إتمام الطلب");
		} catch (err) {
			showToast("حدث خطأ أثناء الاتصال بالخادم");
		} finally {
			setCheckoutLoading(false);
		}
	}
	const visibleProducts = (0, import_react.useMemo)(() => {
		let list = PRODUCTS;
		if (filterCat) list = list.filter((p) => {
			const f = p.family.toLowerCase();
			if (filterCat === "oriental") return f.includes("oriental");
			if (filterCat === "floral") return f.includes("floral");
			if (filterCat === "woody") return f.includes("oud") || f.includes("wood");
			if (filterCat === "aquatic") return f.includes("aquatic");
			return true;
		});
		if (searchQuery.trim()) {
			const q = searchQuery.trim().toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q) || p.notes.includes(q));
		}
		const sorted = [...list];
		if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
		else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
		else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
		return sorted;
	}, [
		filterCat,
		searchQuery,
		sortBy
	]);
	const SHIPPING_FREE_AT = 800;
	const promoDiscount = promoApplied ? cartTotal * (promoApplied.pct / 100) : 0;
	const subTotalWithPromo = Math.max(0, cartTotal - promoDiscount);
	const shippingFee = cartTotal === 0 ? 0 : subTotalWithPromo >= SHIPPING_FREE_AT ? 0 : 250;
	const grandTotal = Math.max(0, subTotalWithPromo + shippingFee);
	const shippingProgress = Math.min(100, Math.round(subTotalWithPromo / SHIPPING_FREE_AT * 100));
	async function applyPromo() {
		const code = promoInput.trim().toUpperCase();
		if (!code) return;
		const res = await validatePromo({ data: code });
		if (res.success) {
			setPromoApplied({
				code: res.code,
				pct: res.pct
			});
			showToast(`تم تطبيق كود الخصم ${res.code} (${res.pct}%)`);
			setPromoInput("");
		} else showToast(res.error || "كود غير صالح");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: scrolled ? "scrolled" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-brand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						onClick: (e) => {
							e.preventDefault();
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						className: "nav-logo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-logo-text",
							children: "VELORE"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "nav-links",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#products",
						onClick: (e) => {
							e.preventDefault();
							scrollTo("products");
						},
						children: "Parfums"
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nav-right",
					style: {
						display: "flex",
						alignItems: "center",
						gap: "16px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nav-search",
							onClick: () => setSearchOpen(true),
							style: { cursor: "pointer" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "11",
									cy: "11",
									r: "8"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "21",
									y1: "21",
									x2: "16.65",
									y2: "16.65"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "ابحث...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								onFocus: () => setSearchOpen(true),
								"aria-label": "البحث عن منتج"
							})]
						}),
						currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nav-auth",
							style: {
								display: "flex",
								gap: "8px",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/account",
								className: "nav-login-btn magic-login-btn",
								style: {
									color: scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.9)",
									textDecoration: "none"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "12",
										cy: "7",
										r: "4"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "login-label",
									children: "حسابي"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
									setCurrentUser(null);
									showToast("تم تسجيل الخروج بنجاح");
								},
								className: "nav-login-btn magic-login-btn logout-btn",
								style: {
									color: scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.9)",
									border: "none",
									paddingLeft: "8px",
									paddingRight: "8px"
								},
								"aria-label": "تسجيل الخروج",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 17 21 12 16 7" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "21",
											y1: "12",
											x2: "9",
											y2: "12"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "login-label",
									children: "تسجيل الخروج"
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nav-login-btn magic-login-btn",
							onClick: () => setLoginOpen(true),
							style: { color: scrolled ? "var(--charcoal)" : "rgba(255,255,255,0.9)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "7",
									r: "4"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "login-label",
								children: "تسجيل الدخول"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nav-cart-btn",
							onClick: () => setCartOpen(true),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "15",
									height: "15",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "3",
											y1: "6",
											x2: "21",
											y2: "6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 01-8 0" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cart-label",
									children: "الحقيبة"
								}),
								cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cart-count-badge",
									children: cartCount
								}, cartCount)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `nav-hamburger ${mobileOpen ? "open" : ""}`,
							"aria-label": "Menu",
							onClick: () => setMobileOpen((o) => !o),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							]
						})
					]
				})
			]
		}),
		mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mobile-menu open",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mobile-search-wrapper",
					style: {
						display: "flex",
						alignItems: "center",
						borderBottom: "1px solid var(--border)",
						paddingBottom: "14px",
						marginBottom: "8px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "18",
						height: "18",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						style: { color: "var(--charcoal-dim)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "11",
							cy: "11",
							r: "8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "21",
							y1: "21",
							x2: "16.65",
							y2: "16.65"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "ابحث...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						onFocus: () => {
							setMobileOpen(false);
							setSearchOpen(true);
						},
						style: {
							border: "none",
							background: "transparent",
							outline: "none",
							width: "100%",
							padding: "0 12px",
							fontSize: "1rem",
							color: "var(--charcoal)"
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#products",
					onClick: (e) => {
						e.preventDefault();
						setMobileOpen(false);
						scrollTo("products");
					},
					children: "Parfums"
				}),
				currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/account",
					onClick: () => setMobileOpen(false),
					style: {
						display: "flex",
						alignItems: "center",
						gap: "12px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "7",
							r: "4"
						})]
					}), "حسابي"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
						setCurrentUser(null);
						setMobileOpen(false);
						showToast("تم تسجيل الخروج بنجاح");
					},
					className: "mobile-menu-btn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 17 21 12 16 7" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "21",
								y1: "12",
								x2: "9",
								y2: "12"
							})
						]
					}), "تسجيل الخروج"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setMobileOpen(false);
						setLoginOpen(true);
					},
					className: "mobile-menu-btn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "7",
							r: "4"
						})]
					}), "تسجيل الدخول"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "main-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { scrollToProducts: () => scrollTo("products") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divider",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "div-line" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "div-ornament",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "div-diamond" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontFamily: "'Cinzel',serif",
										fontSize: ".6rem",
										letterSpacing: ".3em",
										color: "var(--gold-dim)"
									},
									children: "VELORE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "div-diamond" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "div-line" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "products",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-header products-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "section-eyebrow",
								children: "Best Sellers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "section-title",
								children: ["عطور ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "تُعرِّفك" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "filter-bar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "filter-chips",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `chip ${!filterCat ? "active" : ""}`,
									onClick: () => setFilterCat(null),
									children: "الكل"
								}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `chip ${filterCat === c.key ? "active" : ""}`,
									onClick: () => setFilterCat(filterCat === c.key ? null : c.key),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "chip-icon",
										children: c.icon
									}), c.name]
								}, c.key))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sort-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sort-label",
										children: "ترتيب"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "sort-select",
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "featured",
												children: "المُختار"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "price-asc",
												children: "السعر: من الأقل"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "price-desc",
												children: "السعر: من الأعلى"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "name",
												children: "الاسم (أ–ي)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "result-count",
										children: [visibleProducts.length, " عطر"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "products",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "products-grid",
								children: [visibleProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-state",
									children: "لا توجد عطور تطابق بحثك."
								}), visibleProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pcard",
									onClick: () => setDetailProduct(p),
									role: "button",
									tabIndex: 0,
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											setDetailProduct(p);
										}
									},
									children: [
										p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `pbadge badge-${p.badge.variant}`,
											children: p.badge.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pimg-wrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pimg-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pimg-inner",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bottle, {
													variant: p.bottle,
													label: p.label
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pinfo",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pfamily",
													children: p.family
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pname",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/product/$productId",
														params: { productId: p.id },
														onClick: (e) => e.stopPropagation(),
														style: {
															color: "inherit",
															textDecoration: "none"
														},
														children: p.name
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pstock",
													style: {
														color: (stocks[p.id] ?? 5) < 3 ? "#d9534f" : "#8B6F28",
														fontSize: "0.75rem",
														marginBottom: "8px",
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
													}) : (stocks[p.id] ?? 5) > 0 ? `الكمية المتبقية: ${stocks[p.id] ?? 5} قطع` : "نفدت الكمية"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pnotes",
													children: p.notes
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "pfooter",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "pprice-old",
														children: p.oldPrice
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "pprice",
														children: [p.price, " ج.م"]
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "pright",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "pvol",
															children: p.volume
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: `pwish ${wishlist.has(p.id) ? "active" : ""}`,
															onClick: (e) => {
																e.stopPropagation();
																toggleWish(p.id);
															},
															"aria-label": "المفضلة",
															children: wishlist.has(p.id) ? "♥" : "♡"
														})]
													})]
												})
											]
										}),
										(() => {
											const line = cart.find((l) => l.product.id === p.id);
											if (!line) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "pcard-buy",
												onClick: (e) => {
													e.stopPropagation();
													addToCart(p);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pcard-buy-icon",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "11",
														height: "11",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2.5",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
																x1: "3",
																y1: "6",
																x2: "21",
																y2: "6"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 01-8 0" })
														]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "أضف للحقيبة" })]
											});
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pcard-qty",
												onClick: (e) => e.stopPropagation(),
												style: {
													display: "flex",
													alignItems: "center",
													justifyItems: "center",
													justifyContent: "center",
													gap: "30px",
													padding: "10px 0",
													background: "rgba(0,0,0,0.03)",
													margin: "0 8px 12px",
													borderRadius: "4px"
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: (e) => {
															e.stopPropagation();
															setQty(p.id, line.qty - 1);
														},
														"aria-label": "−",
														style: {
															fontSize: "1.4rem",
															border: "none",
															background: "transparent",
															cursor: "pointer",
															padding: "0 10px"
														},
														children: "−"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															fontSize: "1.2rem",
															fontWeight: 700
														},
														children: line.qty
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: (e) => {
															e.stopPropagation();
															setQty(p.id, line.qty + 1);
														},
														"aria-label": "+",
														style: {
															fontSize: "1.4rem",
															border: "none",
															background: "transparent",
															cursor: "pointer",
															padding: "0 10px"
														},
														children: "+"
													})
												]
											});
										})()
									]
								}, p.id))]
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "footer-logo-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "footer-logo-name",
						children: "VELORE"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "footer-logo-sub",
					children: "MAISON DE PARFUM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "footer-tagline",
					children: "صناعة العطور كفنّ — كل قارورة قصة، كل رائحة ذكرى."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "footer-socials",
					children: [
						"إنستقرام",
						"فيسبوك",
						"إكس",
						"يوتيوب"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "social-btn",
						style: { fontSize: "0.85rem" },
						children: s
					}, s))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Maison" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#products",
					onClick: (e) => {
						e.preventDefault();
						scrollTo("products");
					},
					children: "العطور"
				}) }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Service" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الشحن" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإرجاع" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الأسئلة" }) })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:hello@velore.com",
						children: "hello@velore.com"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "tel:+966500000000",
						children: "+966 50 000 0000"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الرياض · المملكة العربية السعودية" })
				] })]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-bottom",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 VELORE · TOUS DROITS RÉSERVÉS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pay-chips",
				children: [
					"VISA",
					"MASTER",
					"MADA",
					"APPLE PAY"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pay-chip",
					children: c
				}, c))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
			isOpen: cartOpen,
			onClose: () => setCartOpen(false),
			cart,
			setQty,
			removeLine,
			shippingFee,
			cartTotal,
			promoApplied,
			promoInput,
			setPromoInput,
			applyPromo,
			grandTotal,
			checkout,
			checkoutLoading,
			shippingProgress
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginModal, {
			isOpen: loginOpen,
			onClose: () => setLoginOpen(false),
			onLogin: (userId) => {
				setCurrentUser(userId);
				showToast("تم تسجيل الدخول بنجاح!");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailModal, {
			product: detailProduct,
			onClose: () => setDetailProduct(null),
			stocks,
			addToCart,
			wishlist,
			toggleWish
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchModal, {
			isOpen: searchOpen,
			onClose: () => setSearchOpen(false),
			searchQuery,
			setSearchQuery,
			onSelectProduct: (p) => setDetailProduct(p)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {}),
		toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "toast",
			role: "alert",
			"aria-live": "assertive",
			children: toast
		})
	] });
}
//#endregion
export { Index as component };
