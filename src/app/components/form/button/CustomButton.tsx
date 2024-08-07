import React from 'react';
import Button from 'react-bootstrap/Button';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  color?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, color = true }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color ? '#a895f5' : '#FC4847',
    marginTop: '20px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '18px',
    fontFamily: '"Pragati Narrow", sans-serif',
  };

  return (
      <Button onClick={handlePress} style={buttonStyle} className='col-md-12' variant="primary" size="lg">
      {title}
      </Button>
  );
};

export default CustomButton;
