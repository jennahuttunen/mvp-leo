import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AddProduction = ({ getProductions }) => {
  // Initialize useState with an empty object
  const EmptyForm = {
    title: "",
    description: "",
    budget: 0,
  };

  // Create piece of state to change production data
  const [production, setProduction] = useState(EmptyForm);

  const handleAddProduction = async () => {
    try {
      let response = await fetch("/api/productions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      });

      if (response.ok) {
        getProductions();
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
    handleAddProduction(production);
    setProduction((production) => EmptyForm);
  };

  return (
    <div id="add-production">
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
            Description
          </InputGroup.Text>
          <Form.Control
            aria-label="Description"
            aria-describedby="inputGroup-sizing-default"
            name="description"
            value={production.description}
            onChange={(e) => handleInputChange(e)}
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
