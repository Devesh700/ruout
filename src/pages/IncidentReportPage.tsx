// IncidentReportPage.tsx
import ConfirmDialog from '../components/ui/ConfirmDialog';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserX,
  UserCheck,
  Flame,
  FileText,
  ChevronRight,
  MoreVertical,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function IncidentReportPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const items = [
    { label: 'Cleared', icon: <CheckCircle size={18} />, count: null },
    { label: 'Not Cleared', icon: <XCircle size={18} />, count: null },
    { label: 'No Response', icon: <UserX size={18} />, count: null },
    { label: 'Refusals', icon: <UserCheck size={18} />, count: 3 },
    { label: 'Person with Disability', icon: <UserCheck size={18} />, count: 3 },
    { label: 'Sign of Danger', icon: <Flame size={18} />, count: 3 },
    { label: 'Additional Details and Request', icon: <AlertTriangle size={18} />, count: 3 },
    { label: 'Media Files', icon: <FileText size={18} />, count: 3 },
  ];

  return (
    <div className="p-4 flex-1">
      <div className="bg-white rounded-2xl shadow-md p-4 min-h-full">
        {/* Header Info */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-[#F48A1D] text-sm font-bold">Fire Or Smoke</h2>
            <p className="text-xs text-gray-500">
              activated by Common Mall / Level 1
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-5 h-5 border-2 border-blue-500 rounded-sm flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 text-sm font-medium text-[#2D2D2D]">
                <div className="p-3 hover:bg-gray-100 cursor-pointer">Submit and Complete</div>
                <div className="p-3 hover:bg-gray-100 cursor-pointer">Submit and Keep Open</div>
                <div
                  className="p-3 text-red-600 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setConfirmCancel(true);
                    setDropdownOpen(false);
                  }}
                >
                  Cancel Incident
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          <button className="text-white text-xs bg-[#3C9CDF] rounded-full px-3 py-1">
            Retailers
          </button>
          <button className="text-[#3C9CDF] text-xs bg-[#E8F3FF] rounded-full px-3 py-1">
            Commons
          </button>
        </div>

        {/* Report Items */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-[#F5F6F4] px-4 py-3 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="text-black bg-black bg-opacity-10 p-2 rounded-xl">
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-[#2D2D2D]">
                  {item.label}
                  {item.count && (
                    <span className="ml-2 bg-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Cancel Dialog */}
      {confirmCancel && 
      <ConfirmDialog 
      onClose={()=>setConfirmCancel(false)} 
      onSubmit={()=>console.log("Cancelled")} 
      acceptText={"YES CANCEL"} 
      cancelText={"NO Thanks"} 
      labelText={"You really want to cancel this incident?"} 
      headerText={"Are you sure?"}/>}
    </div>
  );
}
