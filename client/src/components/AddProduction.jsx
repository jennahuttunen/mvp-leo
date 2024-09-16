import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const AddProduction = ({ getProductions }) => {
  const EmptyForm = {
    title: "",
    description: "",
    budget: 0,
  };

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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setProduction((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduction(production);
    setProduction(EmptyForm);
  };

  return (
    <div id="add-production">
      <form className="add-production" onSubmit={handleSubmit}>
      <h2 className="add-production-title">Add Production</h2>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
          <Form.Control
            aria-label="Title"
            aria-describedby="inputGroup-sizing-default"
            name="title"
            value={production.title}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
          <Form.Control
            aria-label="Description"
            aria-describedby="inputGroup-sizing-default"
            name="description"
            value={production.description}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Budget</InputGroup.Text>
          <Form.Control
            aria-label="Budget"
            aria-describedby="inputGroup-sizing-default"
            name="budget"
            value={production.budget}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <Button variant="warning" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddProduction;
