import React from 'react';
import { Check, Heart } from 'lucide-react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const isVote = message.includes('voted');
  
  return (
    <div className="notification">
      <div className="flex items-center gap-3">
        {isVote ? (
          <Heart className="w-5 h-5 text-red-400 fill-red-400" />
        ) : (
          <Check className="w-5 h-5 text-green-400" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Notification;