import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ProductionGrid = ({ productions, deleteProduction }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteProduction(currentId);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <section id="production-grid">
      <h2>Productions</h2>
      <div className="productions-grid">
        {productions.map((prod) => {
          const { id, title, description, budget } = prod;
          return (
            <Card key={id} style={{ width: "18rem", padding: "10px", margin: "10px" }}>
              <Card.Body>
                <div className="delete-prod">
                <Button variant="text" className="text-secondary" onClick={() => handleDeleteClick(id)}>x</Button>
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">${budget}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Link to={`/purchases/${id}`} className="custom-link">View Purchases</Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Modal for confirming deletion */}
      <Modal show={showModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this production?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="warning" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ProductionGrid;