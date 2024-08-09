import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function AddPurchasesForm({ getPurchases }) {
  // Initialize useState with an empty purchases obj
  const EmptyForm = {
    vender: "",
    date: "",
    order_num: 0,
    description: "",
    payment_type: "",
    items: 0,
    total: 0,
    reimb_submitted: false,
    reimb_received: false,
  };

  // Create a piece of state to change the purchase data
  const [purchase, setPurchase] = useState(EmptyForm);

  const handleAddPurchase = async () => {
    try {
      let response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        //call getPurchases
      } else {
        alert(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  // You'll need a handleChange
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setProduction((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // You'll need a handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // pass data back up to the parent
    handleAddPurchase(purchase);
    setProduction((purchase) => EmptyForm);
  };

  return (
    <div id="add-purchase">
      <h2>Add Purchase</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={7}>
            <Form.Control
              name="vender"
              onChange={(e) => handleInputChange(e)}
              placeholder="Vendor"
            />
          </Col>
          <Col>
            <Form.Control
              name="date"
              onChange={(e) => handleInputChange(e)}
              placeholder="Date"
            />
          </Col>
          <Col>
            <Form.Control
              name="order_num"
              onChange={(e) => handleInputChange(e)}
              placeholder="Order #"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              name="description"
              onChange={(e) => handleInputChange(e)}
              placeholder="Description (optional)"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Form.Control
              name="payment_type"
              onChange={(e) => handleInputChange(e)}
              placeholder="Payment Type"
            />
          </Col>
          <Col>
            <Form.Control
              name="items"
              onChange={(e) => handleInputChange(e)}
              placeholder="# Items"
            />
          </Col>
          <Col>
            <Form.Control
              name="total"
              onChange={(e) => handleInputChange(e)}
              placeholder="Total ($)"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Form.Check
              name="reimb_submitted"
              onChange={(e) => handleInputChange(e)}
              type="checkbox"
              id={`default-checkbox reimb_submitted `}
              label={`Submitted`}
            />
          </Col>
          <Col xs={2}>
            <Form.Check
              name="reimb_received"
              onChange={(e) => handleInputChange(e)}
              type="checkbox"
              id={`default-checkbox reimb_received`}
              label={`Received`}
            />
          </Col>
        </Row>
        <Row>
          <Button variant="info">Submit</Button>
        </Row>
      </Form>
    </div>
  );
}

export default AddPurchasesForm;
