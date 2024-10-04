import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Row }  from 'react-bootstrap';


function Cards() {
  return (
    <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>nom pokemon</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Badge bg="primary" className='me-2'  >Type</Badge>
            <Badge bg="primary" className='me-2'>Type</Badge>
          </Card.Body>
        </Card>
        
    </Row>
  );
}

export default Cards;