import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { BsClipboard } from 'react-icons/bs';
import { useState } from 'react';

const StyledTable = styled(Table)`
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function IdentityList({ identities }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    // Reset the copiedIndex state after a brief delay (e.g., 1 second)
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };

  const validIdentities = identities?.filter(
    (identity) => identity.owner !== '0x0000000000000000000000000000000000000000'
  );

  return (
    <StyledTable striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Owner</th>
          <th>Verification</th>
          <th>Revocation</th>
        </tr>
      </thead>
      <tbody>
        {validIdentities?.map((identity, index) => (
          <tr key={index}>
            <td>{identity.name}</td>
            <td>{identity.age}</td>
            <td>
              {`${identity.owner.slice(0, 6)}...${identity.owner.slice(-4)}`}
              <Button
                variant="link"
                size="sm"
                onClick={() => copyToClipboard(identity.owner, index)}
              >
                <BsClipboard size={16} color={copiedIndex === index ? 'green' : 'black'} />
              </Button>
            </td>
            <td>{identity.verified ? 'Verified' : 'Unverified'}</td>
            <td>{identity.revoked ? 'Revoked' : ''}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
