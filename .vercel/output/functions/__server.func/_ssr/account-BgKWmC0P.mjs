import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as updateUserProfile } from "./user-D4H6yyrY.mjs";
import { t as Route } from "./account-X-aa9MV1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BgKWmC0P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddressForm({ initialData, onSave }) {
	const [phone, setPhone] = (0, import_react.useState)(initialData.phone);
	const [city, setCity] = (0, import_react.useState)(initialData.city);
	const [district, setDistrict] = (0, import_react.useState)(initialData.district);
	const [street, setStreet] = (0, import_react.useState)(initialData.street);
	const [building, setBuilding] = (0, import_react.useState)(initialData.building);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg("");
		setSuccessMsg("");
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
			if (await onSave({
				phone,
				city,
				district,
				street,
				building
			})) setSuccessMsg("تم حفظ العنوان بنجاح");
			else setErrorMsg("حدث خطأ أثناء حفظ البيانات");
		} catch (err) {
			setErrorMsg("حدث خطأ غير متوقع");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "address-form-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "section-subtitle",
			style: {
				textAlign: "right",
				marginBottom: "20px",
				color: "var(--gold-deep)"
			},
			children: "عنوان التوصيل المعتمد"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "magic-form",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "magic-input-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "input-label-ar",
						children: "رقم الهاتف *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "tel",
						placeholder: "مثال: 01xxxxxxxxx",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						className: "magic-input",
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-row-two",
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "16px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "magic-input-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "input-label-ar",
							children: "المدينة *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "مثال: القاهرة",
							value: city,
							onChange: (e) => setCity(e.target.value),
							className: "magic-input",
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "magic-input-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "input-label-ar",
							children: "المنطقة / الحي *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "مثال: مصر الجديدة",
							value: district,
							onChange: (e) => setDistrict(e.target.value),
							className: "magic-input",
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "magic-input-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "input-label-ar",
						children: "الشارع *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "اسم الشارع أو الرقم",
						value: street,
						onChange: (e) => setStreet(e.target.value),
						className: "magic-input",
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "magic-input-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "input-label-ar",
						children: "البناية / الشقة / تفاصيل إضافية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "رقم البناية، الطابق، الشقة",
						value: building,
						onChange: (e) => setBuilding(e.target.value),
						className: "magic-input"
					})]
				}),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						color: "#e74c3c",
						fontSize: "0.85rem",
						marginTop: "10px",
						textAlign: "right"
					},
					role: "alert",
					children: ["⚠ ", errorMsg]
				}),
				successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						color: "#2ecc71",
						fontSize: "0.85rem",
						marginTop: "10px",
						textAlign: "right"
					},
					role: "alert",
					children: ["✓ ", successMsg]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "magic-submit-btn",
					style: { marginTop: "24px" },
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "magic-loader" }) : "حفظ العنوان"
				})
			]
		})]
	});
}
var STATUS_MAP = {
	pending: {
		label: "معلق",
		className: "status-pending"
	},
	processing: {
		label: "قيد المعالجة",
		className: "status-processing"
	},
	shipped: {
		label: "تم الشحن",
		className: "status-shipped"
	},
	delivered: {
		label: "تم التوصيل",
		className: "status-delivered"
	},
	cancelled: {
		label: "ملغي",
		className: "status-cancelled"
	}
};
function OrderCard({ order }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const statusInfo = STATUS_MAP[order.status] || {
		label: order.status,
		className: "status-unknown"
	};
	const dateStr = new Date(order.createdAt).toLocaleDateString("ar-EG", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "order-card-wrapper",
		style: {
			border: "1px solid var(--border)",
			padding: "20px",
			marginBottom: "16px",
			background: "#fff",
			position: "relative"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "order-card-header",
			style: {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				cursor: "pointer",
				userSelect: "none"
			},
			onClick: () => setExpanded(!expanded),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
				style: {
					fontFamily: "Cinzel, Cairo, sans-serif",
					margin: 0,
					fontSize: "1.1rem",
					color: "var(--charcoal)",
					textAlign: "right"
				},
				children: ["طلب #", order.id.substring(0, 8)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.82rem",
					color: "var(--muted)",
					display: "block",
					marginTop: "4px"
				},
				children: ["تاريخ الطلب: ", dateStr]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "12px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `status-badge ${statusInfo.className}`,
						style: {
							fontSize: "0.85rem",
							padding: "4px 10px",
							borderRadius: "2px",
							fontWeight: 500
						},
						children: statusInfo.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "1.1rem",
							color: "var(--charcoal)",
							fontWeight: "bold"
						},
						children: [order.totalAmount, " ج.م"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.8rem",
							color: "var(--muted)"
						},
						children: expanded ? "▲" : "▼"
					})
				]
			})]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "order-card-body",
			style: {
				marginTop: "20px",
				borderTop: "1px solid var(--border)",
				paddingTop: "16px"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					style: {
						fontSize: "0.9rem",
						color: "var(--muted)",
						margin: "0 0 10px",
						textAlign: "right"
					},
					children: "تفاصيل العطور المطلوبة:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "order-items-list",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "8px"
					},
					children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							fontSize: "0.92rem",
							padding: "6px 0",
							borderBottom: "1px dashed var(--border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "var(--charcoal)",
								fontWeight: 500
							},
							children: item.productName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "20px",
								color: "var(--muted)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["الكمية: ", item.quantity] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"سعر الوحدة: ",
								item.unitPrice,
								" ج.م"
							] })]
						})]
					}, item.id))
				}),
				order.shippingAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: "16px",
						fontSize: "0.88rem",
						color: "var(--muted)",
						textAlign: "right"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "عنوان الشحن:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							margin: "4px 0 0",
							color: "var(--charcoal)"
						},
						children: order.shippingAddress
					})]
				})
			]
		})]
	});
}
function UserProfilePage({ initialUser, initialOrders }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("info");
	const [user, setUser] = (0, import_react.useState)(initialUser);
	const [ordersList, setOrdersList] = (0, import_react.useState)(initialOrders);
	const [name, setName] = (0, import_react.useState)(user.name || "");
	const [isEditingInfo, setIsEditingInfo] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [infoError, setInfoError] = (0, import_react.useState)("");
	const [infoSuccess, setInfoSuccess] = (0, import_react.useState)("");
	const handleSaveInfo = async (e) => {
		e.preventDefault();
		setLoading(true);
		setInfoError("");
		setInfoSuccess("");
		if (!name.trim()) {
			setInfoError("يرجى إدخال الاسم");
			setLoading(false);
			return;
		}
		try {
			const res = await updateUserProfile({ data: {
				name,
				phone: user.phone,
				city: user.city,
				district: user.district,
				street: user.street,
				building: user.building
			} });
			if (res.success) {
				setUser((prev) => ({
					...prev,
					name
				}));
				setInfoSuccess("تم تحديث المعلومات بنجاح");
				setIsEditingInfo(false);
			} else setInfoError(res.error || "حدث خطأ أثناء التحديث");
		} catch (err) {
			setInfoError("حدث خطأ غير متوقع");
		} finally {
			setLoading(false);
		}
	};
	const handleSaveAddress = async (addressData) => {
		try {
			if ((await updateUserProfile({ data: {
				name: user.name || "",
				...addressData
			} })).success) {
				setUser((prev) => ({
					...prev,
					...addressData
				}));
				return true;
			}
			return false;
		} catch {
			return false;
		}
	};
	const handleLogout = () => {
		document.cookie = "velore_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.href = "/";
	};
	const activeOrders = ordersList.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
	const previousOrders = ordersList.filter((o) => o.status === "delivered" || o.status === "cancelled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "profile-container-main",
		style: {
			maxWidth: "900px",
			margin: "40px auto",
			padding: "0 20px",
			direction: "rtl"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-header-card",
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderBottom: "1px solid var(--border2)",
					paddingBottom: "24px",
					marginBottom: "30px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section-title",
					style: {
						margin: 0,
						textAlign: "right",
						color: "var(--charcoal)",
						fontFamily: "Cinzel, Cairo, sans-serif"
					},
					children: "حسابي الفاخر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						margin: "6px 0 0",
						color: "var(--muted)",
						fontSize: "0.95rem"
					},
					children: ["مرحباً بك، ", user.name || "عميلنا الكريم"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleLogout,
					className: "btn-outline-light",
					style: {
						padding: "10px 20px",
						fontSize: "0.9rem",
						color: "#e74c3c",
						borderColor: "rgba(231,76,60,0.3)",
						background: "transparent",
						cursor: "pointer"
					},
					children: "تسجيل الخروج"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-tabs-bar",
				style: {
					display: "flex",
					gap: "10px",
					borderBottom: "1px solid var(--border)",
					marginBottom: "30px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveTab("info"),
						className: `profile-tab-btn ${activeTab === "info" ? "active" : ""}`,
						children: "المعلومات الشخصية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveTab("address"),
						className: `profile-tab-btn ${activeTab === "address" ? "active" : ""}`,
						children: "عنوان التوصيل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("orders"),
						className: `profile-tab-btn ${activeTab === "orders" ? "active" : ""}`,
						children: [
							"طلباتي (",
							ordersList.length,
							")"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-tab-content",
				children: [
					activeTab === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-section-card",
						style: {
							background: "var(--pearl)",
							padding: "30px",
							border: "1px solid var(--border)",
							borderRadius: "4px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "section-subtitle",
							style: {
								textAlign: "right",
								color: "var(--gold-deep)",
								marginBottom: "20px"
							},
							children: "بيانات الحساب الأساسية"
						}), isEditingInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveInfo,
							className: "magic-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "magic-input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "input-label-ar",
										children: "الاسم الكامل *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: name,
										onChange: (e) => setName(e.target.value),
										className: "magic-input",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "magic-input-group",
									style: { opacity: .7 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "input-label-ar",
										children: "البريد الإلكتروني (غير قابل للتعديل)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: user.email,
										className: "magic-input",
										disabled: true
									})]
								}),
								infoError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										color: "#e74c3c",
										fontSize: "0.85rem",
										marginTop: "10px"
									},
									children: ["⚠ ", infoError]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: "12px",
										marginTop: "24px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: loading,
										className: "magic-submit-btn",
										style: {
											flex: 1,
											margin: 0
										},
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "magic-loader" }) : "حفظ التغييرات"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setIsEditingInfo(false);
											setName(user.name || "");
										},
										className: "btn-outline-light",
										style: {
											flex: 1,
											background: "transparent",
											border: "1px solid var(--border)",
											color: "var(--charcoal)",
											cursor: "pointer"
										},
										children: "إلغاء"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "16px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "profile-info-row",
									style: {
										display: "flex",
										justifyContent: "space-between",
										borderBottom: "1px dashed var(--border)",
										paddingBottom: "10px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "var(--muted)",
											fontSize: "0.95rem"
										},
										children: "الاسم الكامل:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--charcoal)" },
										children: user.name || "بدون اسم"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "profile-info-row",
									style: {
										display: "flex",
										justifyContent: "space-between",
										borderBottom: "1px dashed var(--border)",
										paddingBottom: "10px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "var(--muted)",
											fontSize: "0.95rem"
										},
										children: "البريد الإلكتروني:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--charcoal)" },
										children: user.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "profile-info-row",
									style: {
										display: "flex",
										justifyContent: "space-between",
										borderBottom: "1px dashed var(--border)",
										paddingBottom: "10px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "var(--muted)",
											fontSize: "0.95rem"
										},
										children: "تاريخ الانضمام:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--charcoal)" },
										children: new Date(user.createdAt).toLocaleDateString("ar-EG")
									})]
								}),
								infoSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										color: "#2ecc71",
										fontSize: "0.85rem",
										marginTop: "10px"
									},
									children: ["✓ ", infoSuccess]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsEditingInfo(true),
									className: "magic-submit-btn",
									style: { marginTop: "20px" },
									children: "تعديل معلومات الحساب"
								})
							]
						})]
					}),
					activeTab === "address" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "profile-section-card",
						style: {
							background: "var(--pearl)",
							padding: "30px",
							border: "1px solid var(--border)",
							borderRadius: "4px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressForm, {
							initialData: {
								phone: user.phone,
								city: user.city,
								district: user.district,
								street: user.street,
								building: user.building
							},
							onSave: handleSaveAddress
						})
					}),
					activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-section-card",
						style: {
							background: "var(--pearl)",
							padding: "30px",
							border: "1px solid var(--border)",
							borderRadius: "4px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "section-subtitle",
							style: {
								textAlign: "right",
								color: "var(--gold-deep)",
								marginBottom: "24px"
							},
							children: "سجل الطلبات"
						}), ordersList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "center",
								padding: "40px 0",
								color: "var(--muted)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "3rem",
									display: "block",
									marginBottom: "16px"
								},
								children: "🛒"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ليس لديك أي طلبات حالية أو سابقة." })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [activeOrders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "30px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									color: "var(--charcoal)",
									borderRight: "3px solid var(--gold)",
									paddingRight: "10px",
									marginBottom: "16px",
									fontSize: "1rem",
									textAlign: "right"
								},
								children: "الطلبات الجارية"
							}), activeOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order }, order.id))]
						}), previousOrders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							style: {
								color: "var(--muted)",
								borderRight: "3px solid var(--border2)",
								paddingRight: "10px",
								marginBottom: "16px",
								fontSize: "1rem",
								textAlign: "right"
							},
							children: "الطلبات السابقة"
						}), previousOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order }, order.id))] })] })]
					})
				]
			})
		]
	});
}
function AccountPage() {
	const { user, orders } = Route.useLoaderData();
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
				paddingTop: "100px",
				minHeight: "80vh",
				backgroundColor: "#fdfbf7"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfilePage, {
				initialUser: user,
				initialOrders: orders
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: "40px 20px",
				textAlign: "center",
				borderTop: "1px solid var(--border)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 VELORE · TOUS DROITS RÉSERVÉS" })
		}) })
	] });
}
//#endregion
export { AccountPage as component };
