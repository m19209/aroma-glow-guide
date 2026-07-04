import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserProfilePage } from "@/components/UserProfilePage";
import { getUserProfile, getUserOrders } from "@/lib/user";

export const Route = createFileRoute("/account")({
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
    const ordersRes = await getUserOrders();
    return {
      user: profileRes.user,
      orders: ordersRes.orders || [],
    };
  },
  head: () => ({
    meta: [
      { title: "حسابي الفاخر — VELORE" },
      { name: "description", content: "إدارة معلومات الحساب وعناوين التوصيل وسجل الطلبات." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, orders } = Route.useLoaderData();

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

      <main style={{ paddingTop: '100px', minHeight: '80vh', backgroundColor: "#fdfbf7" }}>
        <UserProfilePage initialUser={user} initialOrders={orders} />
      </main>

      {/* FOOTER */}
      <footer>
        <div style={{ padding: '40px 20px', textAlign: 'center', borderTop: "1px solid var(--border)" }}>
          <p>© 2026 VELORE · TOUS DROITS RÉSERVÉS</p>
        </div>
      </footer>
    </>
  );
}
