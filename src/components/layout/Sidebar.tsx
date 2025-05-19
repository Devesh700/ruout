import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Navlist", path: "/dashboard/navlist" },
  { label: "Feature", path: "/dashboard/features" },
  { label: "Hero", path: "/dashboard/hero" },
  { label: "Services", path: "/dashboard/services" },
  { label: "About", path: "/dashboard/about" },
  { label: "Banners", path: "/dashboard/banners" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6 text-xl font-bold border-b border-gray-700">Admin</div>
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
