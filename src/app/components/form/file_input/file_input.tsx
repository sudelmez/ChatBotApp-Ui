import Form from 'react-bootstrap/Form';

interface CustomFileInputProps {
    isLasted: boolean;
    title: string
  }
const CustomFileInput: React.FC<CustomFileInputProps> = ({isLasted,title}) => {
    return(
        <>
        <div className="col-md-12">
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>{title}</Form.Label>
            <Form.Control type="file" style={{fontFamily:'"Pragati Narrow", sans-serif', color:!isLasted ? '#4a0a9a' : '#a895f5', fontSize: '18px',borderColor: !isLasted ? '#4a0a9a' : '#a895f5', borderWidth: 0.5, borderRadius:'3px', borderStyle: 'solid'}}/>
        </Form.Group>
        </div>
        </>
    );
}

export default CustomFileInput;