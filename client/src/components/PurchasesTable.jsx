import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const PurchasesTable = () => {
  return (
    <div id="purchases-table">
      <h2>Purchases</h2>
      <h3>FILTER BUTTON GOES HERE</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Payment</th>
            <th>Date</th>
            <th>Vendor</th>
            <th># Items</th>
            <th>Description</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="warning">Generate Labels</Button>
    </div>
  );
};
export default PurchasesTable;
