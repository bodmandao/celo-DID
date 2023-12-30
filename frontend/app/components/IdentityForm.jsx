"use client"

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function IdentityForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Identity
      </Button>
    </StyledForm>
  );
}
