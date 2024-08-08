import Card from "react-bootstrap/Card";

const ProductionGrid = (props) => {
  return (
    <section>
      <h2>Productions</h2>
      <div>
        {props.productions.map((prod) => {
          const { id, title, budget } = prod;
          return (
            <Card
              key={id}
              style={{ width: "18rem", padding: "10px", margin: "10px" }}
            >
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {budget}
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title.
                </Card.Text>
                <Card.Link href="#">View Purchases</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
export default ProductionGrid;
