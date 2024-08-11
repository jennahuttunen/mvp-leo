import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const PurchasesTable = ({ purchases }) => {
  return (
    <div id="purchases-table">
      <h2>Purchases</h2>

      <div id="filter-button">
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="Filter By"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#">Payment</Dropdown.Item>
            <Dropdown.Item href="#">Vendor</Dropdown.Item>
            <Dropdown.Item href="#">Date</Dropdown.Item>
            <Dropdown.Item href="#">Submitted</Dropdown.Item>
            <Dropdown.Item href="#">Received</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            name="filter-by"
            aria-label="Text input with dropdown button"
          />
        </InputGroup>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Payment</th>
            <th>Date</th>
            <th>Order</th>
            <th>Vendor</th>
            <th>Items</th>
            <th>Description</th>
            <th>Total Cost</th>
            <th>Submitted</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((pur) => {
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
            } = pur;
            return (
              <tr key={id}>
                <td>{payment_type}</td>
                <td>{date}</td>
                <td>{order_num}</td>
                <td>{vender}</td>
                <td>{items}</td>
                <td>{description}</td>
                <td>{total}</td>
                <td>{reimb_submitted}</td>
                <td>{reimb_received}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button onClick={() => alert("coming soon!")}>Generate Labels</button>
    </div>
  );
};
export default PurchasesTable;
