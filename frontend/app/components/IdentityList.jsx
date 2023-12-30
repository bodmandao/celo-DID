"use client"

import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

const StyledListGroup = styled(ListGroup)`
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function IdentityList({ identities }) {
  return (
    <StyledListGroup>
      {identities.map((identity, index) => (
        <ListGroup.Item key={index}>
          {identity.name}, Age: {identity.age}
        </ListGroup.Item>
      ))}
    </StyledListGroup>
  );
}
