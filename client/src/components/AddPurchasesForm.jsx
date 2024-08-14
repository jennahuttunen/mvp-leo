import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function AddPurchasesForm({ getPurchases, production_id }) {
  // Initialize useState with an empty purchases obj
  const EmptyForm = {
    production_id,
    vender: "",
    date: "",
    order_num: null,
    description: "",
    payment_type: "",
    items: null,
    total: null,
    reimb_submitted: false,
    reimb_received: false,
  };
  // Make sure you are sending the date format SQL is expecting YYYMMDD
  //Send the request, console log what you send, look at the error in the backend terminal
  // Create a piece of state to change the purchase data
  const [purchase, setPurchase] = useState(EmptyForm);
  /// Destructure the purchase object
  const {
    id,
    vender,
    date,
    order_num,
    description,
    payment_type,
    items,
    total,
    reimb_submitted,
    reimb_received,
  } = purchase;
  const handleAddPurchase = async () => {
    console.log("hello");
    try {
      let response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        getPurchases();
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
    setPurchase((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // You'll need a handleSubmit
  const handleSubmit = (e) => {
    console.log("banana");
    e.preventDefault();
    handleAddPurchase();
    setPurchase((purchase) => EmptyForm);
  };

  return (
    <div id="add-purchase">
      <h2>Add Purchase</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="add-purchase-row">
          <Col xs={7}>
            <Form.Control
              name="vender"
              value={vender}
              onChange={(e) => handleInputChange(e)}
              placeholder="Vendor"
            />
          </Col>
          <Col>
            <Form.Control
              type="date"
              name="date"
              value={date}
              onChange={(e) => handleInputChange(e)}
              placeholder="Date"
            ></Form.Control>
          </Col>
          <Col>
            <Form.Control
              name="order_num"
              value={order_num}
              onChange={(e) => handleInputChange(e)}
              placeholder="Order #"
            />
          </Col>
        </Row>
        <Row className="add-purchase-row">
          <Col>
            <Form.Control
              name="description"
              value={description}
              onChange={(e) => handleInputChange(e)}
              placeholder="Description (optional)"
            />
          </Col>
        </Row>
        <Row className="add-purchase-row">
          <Col xs={7}>
            <Form.Control
              name="payment_type"
              value={payment_type}
              onChange={(e) => handleInputChange(e)}
              placeholder="Payment Type"
            />
          </Col>
          <Col>
            <Form.Control
              name="items"
              value={items}
              onChange={(e) => handleInputChange(e)}
              placeholder="# Items"
            />
          </Col>
          <Col>
            <Form.Control
              name="total"
              value={total}
              onChange={(e) => handleInputChange(e)}
              placeholder="Total ($)"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Form.Check
              name="reimb_submitted"
              value={reimb_submitted}
              onChange={(e) => handleInputChange(e)}
              type="checkbox"
              id={`default-checkbox reimb_submitted `}
              label={`Submitted`}
            />
          </Col>
          <Col xs={2}>
            <Form.Check
              name="reimb_received"
              value={reimb_received}
              onChange={(e) => handleInputChange(e)}
              type="checkbox"
              id={`default-checkbox reimb_received`}
              label={`Received`}
            />
          </Col>
        </Row>
        <Row className="submit-purchase-button-row">
          <Button
            className="submit-purchase-button"
            type="submit"
            variant="info"
          >
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default AddPurchasesForm;
