import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ProductionGrid = ({ productions, deleteProduction }) => {
  return (
    <section id="production-grid">
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
                <div className="delete-prod">
                  <button
                    onClick={(e) => deleteProduction(id)}
                    className="delete-prod-btn"
                  >
                    x
                  </button>
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${budget}
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Link to={`/purchases/${id}`}>View Purchases</Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
export default ProductionGrid;
