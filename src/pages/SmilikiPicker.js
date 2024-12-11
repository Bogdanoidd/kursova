import React from 'react';

const SmilikiPicker = ({ onSelectsmiliki }) => {
  const smiliki = ['😊', '😂', '😍', '😎', '😢', '😜', '😡', '🥺'];

  return (
    <div className="smiliki-picker">
      {smiliki.map((smiliki, index) => (
        <span
          key={index}
          className="smiliki"
          onClick={() => onSelectsmiliki(smiliki)}
        >
          {smiliki}
        </span>
      ))}
    </div>
  );
};

export default SmilikiPicker;
