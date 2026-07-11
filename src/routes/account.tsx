import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { UserProfilePage } from "@/components/features";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getUserProfile, getUserOrders, getAdminStats, getAdminOrders } from "@/lib/auth-service";

export const Route = createFileRoute("/account")({
  loader: async () => {
    const profileRes = await getUserProfile();
    if (!profileRes.success || !profileRes.user) {
      throw redirect({
        to: "/",
        search: { loginRequired: true },
      });
    }

    const user = profileRes.user;

    // Admin path — load dashboard data
    if (user.role === "admin") {
      const [statsRes, ordersRes] = await Promise.all([
        getAdminStats(),
        getAdminOrders(),
      ]);
      return {
        user,
        isAdmin: true as const,
        stats: statsRes.stats || { totalRevenue: 0, totalOrders: 0, pendingOrders: 0, lowStockItems: [] },
        adminOrders: ordersRes.orders || [],
        orders: [],
      };
    }

    // Regular user path
    const ordersRes = await getUserOrders();
    return {
      user,
      isAdmin: false as const,
      stats: null,
      adminOrders: [],
      orders: ordersRes.orders || [],
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.isAdmin
          ? "لوحة تحكم الإدارة — VELORE"
          : "حسابي الفاخر — VELORE",
      },
      {
        name: "description",
        content: loaderData?.isAdmin
          ? "إدارة متجر VELORE، متابعة المخزون والطلبات والإحصائيات."
          : "إدارة معلومات الحساب وعناوين التوصيل وسجل الطلبات.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, isAdmin, stats, adminOrders, orders } = Route.useLoaderData();

  /* ── Admin view ── */
  if (isAdmin && stats) {
    return (
      <AdminDashboard
        initialUser={user}
        initialStats={stats}
        initialOrders={adminOrders}
      />
    );
  }

  /* ── Regular user view ── */
  return (
    <>
      {/* NAV */}
      <nav className="scrolled">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/" className="nav-logo">
            <span className="nav-logo-text">VELORE</span>
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: "100px", minHeight: "80vh", backgroundColor: "#fdfbf7" }}>
        <UserProfilePage initialUser={user} initialOrders={orders} />
      </main>

      {/* FOOTER */}
      <footer>
        <div style={{ padding: "40px 20px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
          <p>© 2026 VELORE · TOUS DROITS RÉSERVÉS</p>
        </div>
      </footer>
    </>
  );
}

