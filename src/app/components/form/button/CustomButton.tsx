import React from 'react';
import Button from 'react-bootstrap/Button';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  pressed: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, pressed = false }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: !pressed ? '#4a0a9a' : '#a895f5',
    marginTop: '20px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '18px',
    fontFamily: '"Pragati Narrow", sans-serif',
  };

  return (
      <Button disabled={pressed} onClick={handlePress} style={buttonStyle} className='col-md-12' variant="primary" size="lg">
      {title}
      </Button>
  );
};

export default CustomButton;