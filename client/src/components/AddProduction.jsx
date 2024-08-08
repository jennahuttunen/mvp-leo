import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AddProduction = (props) => {
  // Initialize useState with an empty object
  const EmptyForm = {
    title: "",
    budget: 0,
  };

  // Create piece of state to change production data
  const [production, setProduction] = useState(EmptyForm);

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
    props.addProduction(production);
    setProduction((production) => EmptyForm);
  };

  return (
    <div>
      <h2>Add Production</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            aria-label="Title"
            aria-describedby="inputGroup-sizing-default"
            name="title"
            value={production.title}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Budget
          </InputGroup.Text>
          <Form.Control
            aria-label="Budget"
            aria-describedby="inputGroup-sizing-default"
            name="budget"
            value={production.budget}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </InputGroup>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddProduction;
