import { Outlet } from 'react-router-dom';
import Logo from '../../assets/Images/logo.png';
import { Home, BarChart, Menu, FileText, Info } from 'lucide-react';
import FooterIcon from './FooterIcon';

export default function Layout() {
  return (
    <div className="w-full min-h-screen max-w-96 mx-auto bg-white flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white shadow-md rounded-b-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-[40px] h-[40px]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#3C9CDF] font-medium">Save Time, Save Lives</span>
            <span className="text-[14px] font-bold text-[#3C9CDF]">RUOUT</span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <Outlet />
      </div>

      {/* Footer Menu */}
      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200 bg-white sticky bottom-0 z-50">
        <FooterIcon icon={<Menu size={20} />} url={"/"} label="Menu" />
        <FooterIcon icon={<Home size={20} />} url={"/"} label="Home" />
        <FooterIcon icon={<BarChart size={20} />} url={"/incident/primary"} label="Reports" />
        <FooterIcon icon={<FileText size={20} />} url={"/"} label="Logs" />
        <FooterIcon icon={<Info size={20} />} url={"/"} label="Instruct" />
      </div>
    </div>
  );
}

