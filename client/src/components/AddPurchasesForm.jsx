import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function AddPurchasesForm() {
  return (
    <div id="add-purchase">
      <h2>Add Purchase</h2>
      <Form>
        <Row>
          <Col xs={7}>
            <Form.Control placeholder="Vendor" />
          </Col>
          <Col>
            <Form.Control placeholder="Date" />
          </Col>
          <Col>
            <Form.Control placeholder="# Items" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="Description (optional)" />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Form.Control placeholder="Payment Type" />
          </Col>
          <Col>
            <Form.Control placeholder="Total Cost ($)" />
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Form.Check
              // prettier-ignore
              type="checkbox"
              id={`default-checkbox`}
              label={`Submitted`}
            />
          </Col>
          <Col xs={2}>
            <Form.Check
              // prettier-ignore
              type="checkbox"
              id={`default-checkbox`}
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
