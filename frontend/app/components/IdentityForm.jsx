// "use client"

import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ADDRESS, ABI } from '../../constants/index.js';
import { ethers } from 'ethers';

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function IdentityForm({ onSubmit, onUpdate, onVerify, onRevoke, onDelete, identity }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState( '');
useEffect(() => {
    // Set the state values based on the provided identity props only when the component mounts
    if (identity) {
      setName(identity.name || '');
      setAge(identity.age || '');
    }
  }, [identity]);// Empty dependency array
  
  
  
  // identity creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ name, age });
  };

  // identity update
  const handleUpdate = async (e) => {
    e.preventDefault();
    onUpdate({ name, age });
  };

  return (
    <>
      {identity ? (
        <>
          <StyledForm onSubmit={handleUpdate}>
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
              Update Identity
            </Button>

            {identity.verified?(
                <Button variant="success" disabled className='m-1' type='button'>
                Verified
               </Button>
            ):
            (
              <Button variant="success" className='m-1' onClick={() => onVerify()}>
              Verify
             </Button>
            )}
          
              {identity.revoked? (
                  <Button variant="warning" type='button' disabled className='m-1'>
                  Revoked
                </Button>
              ):
              (
                <Button variant="warning" className='m-1' onClick={() => onRevoke()}>
                Revoke Identity
              </Button>
              )}
        
            <Button variant="danger" className='m-1' onClick={() => onDelete()}>
              Delete Identity
            </Button>
          </StyledForm>
        </>
      ) : (
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
      )}
    </>
  );
}
