import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  color?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, color = true }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color ? '#977EF9' : '#FC4847',
    margin: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 50,
    cursor: 'pointer',
    height: '50px',
    width: '280px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '16px',
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handlePress}>
        <span className='title' style={titleStyle}>{title}</span>
      </button>
    </div>
  );
};

export default CustomButton;
