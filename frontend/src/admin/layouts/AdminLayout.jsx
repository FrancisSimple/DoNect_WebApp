import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-admin-container bg-gray-50 flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="md:ml-64 flex flex-1 bg-green-50/10 overflow-hidden">
        <AdminHeader onHamburger={() => setSidebarOpen(true)} />
        <main className="flex-1 pt-[64px] px-4 pb-0 m-unset w-full max-w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
