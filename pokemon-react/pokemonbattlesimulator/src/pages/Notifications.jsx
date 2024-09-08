import React from 'react';
import './Notifications.css';

const Notifications = ({ notifications, removeNotification }) => {
  return (
    <div className="notifications-container">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${notification.type}`}
        >
          <span>{notification.message}</span>
          <button className="close-button" onClick={() => removeNotification(index)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;



