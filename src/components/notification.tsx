import { useState } from "react";

interface NotificationProps {
  onProceed: () => void;
  onIgnore: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onProceed, onIgnore }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4">
      <span>Disabling weekends will remove your previous weekend selections.</span>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        onClick={() => {
          setVisible(false);
          onProceed();
        }}
      >
        Proceed
      </button>
      <button
        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
        onClick={() => {
          setVisible(false);
          onIgnore();
        }}
      >
        Ignore
      </button>
    </div>
  );
};
