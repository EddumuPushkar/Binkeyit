import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

function Dashboard() {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Sidebar */}
          <div className="hidden md:block md:col-span-1">
            <UserMenu />
          </div>

          {/* Content */}
          <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-2xl shadow">
            <Outlet/>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Dashboard;
