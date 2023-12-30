"use client"

import { useState, useEffect } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import IdentityForm from './components/IdentityForm';
import IdentityList from './components/IdentityList';
import Layout from './components/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MOCK_IDENTITIES = [
  { owner: '0xAddress1', name: 'Alice', age: 25, verified: false, revoked: false },
  { owner: '0xAddress2', name: 'Bob', age: 30, verified: false, revoked: false },
];

export default function Home() {
  const [identities, setIdentities] = useState(MOCK_IDENTITIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading data from the blockchain or your API
    setLoading(true);
    // Example: fetchIdentities()
    //   .then((data) => setIdentities(data))
    //   .catch((err) => setError(err))
    //   .finally(() => setLoading(false));

    // Simulate successful fetch
    setTimeout(() => {
      setIdentities(MOCK_IDENTITIES);
      setLoading(false);
    }, 2000);
  }, []); // Include dependencies if needed

  const handleCreateOrUpdateIdentity = (newIdentity) => {
    // Simulate sending the new identity to the blockchain or your API
    setLoading(true);
    // Example: createOrUpdateIdentity(newIdentity)
    //   .then(() => {
    //     setIdentities([...identities, newIdentity]);
    //     toast.success('Identity created/updated successfully!');
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     toast.error('Error creating/updating identity');
    //   })
    //   .finally(() => setLoading(false));

    // Simulate successful creation/update
    setTimeout(() => {
      const updatedIdentities = identities.map((id) =>
        id.owner === newIdentity.owner ? newIdentity : id
      );
      setIdentities(updatedIdentities);
      setLoading(false);
      toast.success('Identity created/updated successfully!');
    }, 2000);
  };

  const handleVerifyIdentity = (owner) => {
    // Simulate sending the verification request to the blockchain or your API
    setLoading(true);
    // Example: verifyIdentity(owner)
    //   .then(() => {
    //     // Update the identity status
    //     const updatedIdentities = identities.map((id) =>
    //       id.owner === owner ? { ...id, verified: true } : id
    //     );
    //     setIdentities(updatedIdentities);
    //     toast.success('Identity verified successfully!');
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     toast.error('Error verifying identity');
    //   })
    //   .finally(() => setLoading(false));

    // Simulate successful verification
    setTimeout(() => {
      const updatedIdentities = identities.map((id) =>
        id.owner === owner ? { ...id, verified: true } : id
      );
      setIdentities(updatedIdentities);
      setLoading(false);
      toast.success('Identity verified successfully!');
    }, 2000);
  };

  const handleRevokeIdentity = (owner) => {
    // Simulate sending the revocation request to the blockchain or your API
    setLoading(true);
    // Example: revokeIdentity(owner)
    //   .then(() => {
    //     // Update the identity status
    //     const updatedIdentities = identities.map((id) =>
    //       id.owner === owner ? { ...id, revoked: true } : id
    //     );
    //     setIdentities(updatedIdentities);
    //     toast.warning('Identity revoked successfully!');
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     toast.error('Error revoking identity');
    //   })
    //   .finally(() => setLoading(false));

    // Simulate successful revocation
    setTimeout(() => {
      const updatedIdentities = identities.map((id) =>
        id.owner === owner ? { ...id, revoked: true } : id
      );
      setIdentities(updatedIdentities);
      setLoading(false);
      toast.warning('Identity revoked successfully!');
    }, 2000);
  };

  const handleDeleteIdentity = (owner) => {
    // Simulate sending the deletion request to the blockchain or your API
    setLoading(true);
    // Example: deleteIdentity(owner)
    //   .then(() => {
    //     // Remove the identity from the list
    //     const updatedIdentities = identities.filter((id) => id.owner !== owner);
    //     setIdentities(updatedIdentities);
    //     toast.error('Identity deleted successfully!');
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     toast.error('Error deleting identity');
    //   })
    //   .finally(() => setLoading(false));

    // Simulate successful deletion
    setTimeout(() => {
      const updatedIdentities = identities.filter((id) => id.owner !== owner);
      setIdentities(updatedIdentities);
      setLoading(false);
      toast.error('Identity deleted successfully!');
    }, 2000);
  };

  return (
    <Layout>
      <Row>
        <Col md={6}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Create/Update Identity</h2>
          <IdentityForm onSubmit={handleCreateOrUpdateIdentity} />
        </Col>
        <Col md={6}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>All Identities</h2>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <div style={{ color: 'red' }}>Error loading identities. Please try again later.</div>
          ) : (
            <IdentityList
              identities={identities}
              onVerify={handleVerifyIdentity}
              onRevoke={handleRevokeIdentity}
              onDelete={handleDeleteIdentity}
            />
          )}
        </Col>
      </Row>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </Layout>
  );
}
