import { ChevronRight, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
  const areas = [
    { label: 'PRIMARY', icon: '1', action: ()=> {navigate('/incident/primary',{state:{assembly:"Primary"}})}},
    { label: 'SECONDARY', icon: '2', action: ()=> {navigate('/incident/secondary',{state:{assembly:"Primary"}})}},
    { label: 'DO NOT EVACUATE', icon: <Ban size={18} />, action: ()=> {navigate('/incident/do-not-evacuate',{state:{assembly:"Primary"}})}},
    { label: 'NIL', icon: <Ban size={18} />, action: ()=> {navigate('/incident/nil',{state:{assembly:"Primary"}})}},
  ];

  return (
    <div className="p-4 flex-1 flex flex-col">
      <div className="bg-white rounded-2xl shadow-md p-4 min-h-full flex-1 flex flex-col">
        <div className="border-b border-[#E0E0E0] pb-2 mb-3 ">
          <h2 className="text-xl text-[#3C9CDF] font-bold">Assembly Area</h2>
          <p className="text-xs text-[#3C9CDF]">Choose Assembly Area to use</p>
        </div>

        <div className="space-y-3">
          {areas.map((area, index) => (
            <div
              onClick={area.action}
              key={index}
              className="flex items-center justify-between bg-[#E8F3FF] px-4 py-3 rounded-full"
            >
              <div className="flex items-center space-x-2 text-[#3C9CDF] font-medium text-sm">
                <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                  {typeof area.icon === 'string' ? (
                    <span className="text-xs font-bold">{area.icon}</span>
                  ) : (
                    area.icon
                  )}
                </span>
                <span>{area.label}</span>
              </div>
              <ChevronRight className="text-[#3C9CDF]" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
