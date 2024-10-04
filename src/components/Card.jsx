import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Row } from 'react-bootstrap';
import pokemon from '../assets/pokemon/1.png';


function Cards() {
  return (
    <Row>
      <Card style={{ width: '18rem' }}>
        <Card.Body className="text-center">
          <Card.Title>nom pokemon</Card.Title>
          <Card.Img variant="top" src={pokemon} style={{ width: '100px' }} />
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