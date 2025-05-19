import { X } from "lucide-react";

export default function ConfirmDialog ({onClose, onSubmit, cancelText, acceptText, labelText, headerText}:any) {
    return (
        <div className="fixed inset-0 bg-gray bg-opacity-30 flex items-center justify-center z-20">
          <div className="bg-white rounded-3xl p-6 w-72 relative text-center shadow-xl">
            <div className="text-[#3C9CDF] font-semibold text-base mb-2">{headerText || "Are you sure?"}</div>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={() => onClose()}
            >
              <X size={20} />
            </button>
            <p className="text-[#2D2D2D] text-sm font-medium mb-6 mt-1">
              {labelText || "You really want to cancel this incident?"}
            </p>
            <button
              className="w-full bg-[#3C9CDF] text-white font-semibold py-2 rounded-full mb-3"
              onClick={() => onSubmit()}
            >
              {acceptText || "YES CANCEL"}
            </button>
            <button
              className="text-sm text-[#2D2D2D] font-medium underline"
              onClick={() => onClose()}
            >
              {cancelText || "NO Thanks"}
            </button>
          </div>
        </div>
      )
}