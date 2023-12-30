"use client"

import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import React, { createContext, useEffect, useState } from 'react';
import { ADDRESS, ABI } from '../../constants/index.js';
import {ethers} from 'ethers'

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function IdentityForm({ onSubmit, onVerify, onRevoke, onDelete, identity }) {

  const [name, setName] = useState(identity?.name || '');
  const [age, setAge] = useState(identity?.age || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age });
  };

  useEffect(()=>{
    
  })
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
        {identity ? 'Update Identity' : 'Create Identity'}
      </Button>

      {identity && (
        <>
          <Button variant="success" onClick={() => onVerify(identity.owner)}>
            Verify Identity
          </Button>
          <Button variant="warning" onClick={() => onRevoke(identity.owner)}>
            Revoke Identity
          </Button>
          <Button variant="danger" onClick={() => onDelete(identity.owner)}>
            Delete Identity
          </Button>
        </>
      )}
    </StyledForm>
  );
}
