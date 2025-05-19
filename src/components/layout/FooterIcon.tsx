import { NavLink } from "react-router-dom";

export default function FooterIcon({ icon, label, url }: { icon: React.ReactNode; label: string, url:string }) {
  return (
    <NavLink to={url} className="flex flex-col items-center text-[#3C9CDF] text-xs font-medium">
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}