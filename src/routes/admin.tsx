import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUserProfile, getAdminStats, getAdminOrders } from "@/lib/auth-service";
import { AdminDashboard } from "@/components/AdminDashboard";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const profileRes = await getUserProfile();
    
    if (!profileRes.success || !profileRes.user) {
      throw redirect({
        to: "/",
        search: {
          loginRequired: true,
        },
      });
    }

    // Role check
    if (profileRes.user.role !== 'admin') {
      throw redirect({
        to: "/",
        search: {
          adminRequired: true,
        },
      });
    }

    const statsRes = await getAdminStats();
    const ordersRes = await getAdminOrders();

    return {
      user: profileRes.user,
      stats: statsRes.stats || { totalRevenue: 0, totalOrders: 0, pendingOrders: 0, lowStockItems: [] },
      orders: ordersRes.orders || [],
    };
  },
  head: () => ({
    meta: [
      { title: "لوحة تحكم الإدارة — VELORE" },
      { name: "description", content: "إدارة متجر VELORE، متابعة المخزون والطلبات والإحصائيات." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, stats, orders } = Route.useLoaderData();

  return <AdminDashboard initialUser={user} initialStats={stats} initialOrders={orders} />;
}
