import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import IdentityForm from '../components/IdentityForm';
import IdentityList from '../components/IdentityList';
import Layout from '../components/Layout';

export default function Home() {
  const [identities, setIdentities] = useState([]);

  useEffect(() => {
    // Fetch identities from the blockchain or your API
    // Example: fetchIdentities().then((data) => setIdentities(data));
  }, []); // Include dependencies if needed

  const handleCreateIdentity = (newIdentity) => {
    // Send the new identity to the blockchain or your API
    // Example: createIdentity(newIdentity).then(() => setIdentities([...identities, newIdentity]));
  };

  return (
    <Layout>
      <Row>
        <Col md={6}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Create Identity</h2>
          <IdentityForm onSubmit={handleCreateIdentity} />
        </Col>
        <Col md={6}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>All Identities</h2>
          <IdentityList identities={identities} />
        </Col>
      </Row>
    </Layout>
  );
}
