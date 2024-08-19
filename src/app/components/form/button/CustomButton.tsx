import React from 'react';
import Button from 'react-bootstrap/Button';

interface CustomButtonProps {
  toDownload?: boolean;
  title: string;
  handlePress: () => void;
  pressed: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, pressed = false, toDownload=false }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: !pressed ? '#4a0a9a' : '#a895f5',
    cursor: 'pointer',
    color: 'white',
    fontSize: '18px',
    fontFamily: '"Pragati Narrow", sans-serif',
  };
  return (toDownload ?
    <div className='col-md-12'>
    <Button className='col-md-12' variant="outline-secondary">İndir</Button> 
    </div>:
      <Button disabled={pressed} onClick={handlePress} style={buttonStyle} className='col-md-12' variant="primary" size="lg">
      {title}
      </Button>
  );
};

export default CustomButton;