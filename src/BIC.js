import React, { useState } from 'react';

export default function BIC() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`bottom-info-container ${isOpen ? '' : 'slide-down'}`}>
      <div className="square">
        <div className="label-row">
          <div className="square-label">Section</div>
          <div className="info-open-label" onClick={handleClick} style={{ cursor: 'pointer' }}>
            Open
          </div>
        </div>
      </div>
      <div className="info-box">
        <p>
          This is a sample paragraph of text that describes the current section. You can dynamically update this based on which label is active.
        </p>
      </div>
    </div>
  );
}
