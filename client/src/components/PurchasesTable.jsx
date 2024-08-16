import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

const PurchasesTable = ({ purchases, deletePurchase }) => {
  //const filters = ["Filter by", "Payment", "Vendor", "Date", "Submitted", "Received"]
  const [filterBy, setFilterBy] = useState("Filter by");

  return (
    <div id="purchases-table">
      <h2>Purchases</h2>

      <div id="filter-button">
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={filterBy}
            id="input-group-dropdown-1"
            onChange={(e) => setFilterBy(e.target.value)}
            defaultValue={filterBy}
          >
            <Dropdown.Item href="#">Vendor</Dropdown.Item>
            <Dropdown.Item href="#">Date</Dropdown.Item>
            <Dropdown.Item href="#">Submitted</Dropdown.Item>
            <Dropdown.Item href="#">Received</Dropdown.Item>
          </DropdownButton>
          <FormControl
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

            console.log(date.slice(0, -14));
            // You can use JS in the curly braces including variables destructured out of objects

            return (
              <tr key={id}>
                <td>{payment_type}</td>
                <td>{date.slice(0, -14)}</td>
                <td>{order_num}</td>
                <td>{vender}</td>
                <td>{items}</td>
                <td>{description}</td>
                <td>${total}</td>
                <td>{reimb_submitted}</td>
                <td>{reimb_received}</td>
                <td>
                  <button
                    onClick={() => deletePurchase(id)}
                    className="delete-purchase-btn"
                  >
                    x
                  </button>
                </td>
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
