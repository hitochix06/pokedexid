import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import pokemon from 'public/assets/pokemon/1.png';

function BasicExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pokemon} />
      <Card.Body>
        <Card.Title>tire</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;