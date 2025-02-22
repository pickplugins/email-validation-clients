import { useState } from "react";

const ToggleContent = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto  overflow-hidden mb-1">
      <div
        className="w-full flex justify-between items-center p-3 bg-amazon-600 rounded-sm hover:bg-amazon-500 cursor-pointer text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
      </div>
      {isOpen && <div className="p-3 bg-white">{children}</div>}
    </div>
  );
};

export default ToggleContent;
