import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
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
            <Dropdown.Item href="#">Reimbursement (?)</Dropdown.Item>
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
            <th>Order #</th>
            <th>Vendor</th>
            <th># Items</th>
            <th>Description</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((pur) => {
            const {
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
              <tr>
                <td>{payment_type}</td>
                <td>{date}</td>
                <td>{order_num}</td>
                <td>{vender}</td>
                <td>{items}</td>
                <td>{description}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button>Generate Labels</button>
    </div>
  );
};
export default PurchasesTable;
