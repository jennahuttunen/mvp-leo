import { useState, useEffect } from "react";
import "./ProductionGrid.css";
import Card from "react-bootstrap/Card";

const ProductionGrid = ({ productions }) => {
  return (
    <section>
      <h2>Productions</h2>
      <div className="productions-grid">
        {productions.map((prod) => {
          const { id, title, description, budget } = prod;
          return (
            <Card
              key={id}
              style={{ width: "18rem", padding: "10px", margin: "10px" }}
            >
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${budget}
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
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
