import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPurchases = ({ show, handleClose, purchase, handleUpdate }) => {
  const [submitted, setSubmitted] = useState(purchase.reimb_submitted);
  const [received, setReceived] = useState(purchase.reimb_received);

  const handleSave = () => {
    handleUpdate(purchase.id, { reimb_submitted: submitted, reimb_received: received });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reimbursement Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSubmitted">
            <Form.Check 
              type="checkbox" 
              id="submittedCheckbox"
              label="Reimbursed Submitted"
              checked={submitted} 
              onChange={(e) => setSubmitted(e.target.checked)} 
              className="custom-checkbox"
            />
          </Form.Group>
          <Form.Group controlId="formReceived">
          <Form.Check 
      type="checkbox" 
      id="receivedCheckbox"
      label="Reimbursed Received"
      checked={received} 
      onChange={(e) => setReceived(e.target.checked)}
      className="custom-checkbox"
    />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="warning" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPurchases;
