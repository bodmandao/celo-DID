"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import IdentityForm from './components/IdentityForm';
import IdentityList from './components/IdentityList';
import Layout from './components/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADDRESS, ABI } from '../constants/index.js';
import {ethers} from 'ethers'


// metamask connection
let connection
if (typeof window !== 'undefined') {
    connection = window.ethereum
}


export default function Home() {
  const [identities, setIdentities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [currentIdentity, setCurrentIdentity] = useState(null);
  


  useEffect(() => {
      fetchIdentities()
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []); // Include dependencies if needed

  useEffect(()=>{
    connectWallet()
  },[])

  useEffect(()=>{
    UserIdentity()
  },[account,identities])
  // wallet connection 
  const connectWallet = async function () {
    if (connection) {
        const accounts = await connection.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
    }
    else {
        console.log('please install metamask')
    }
  }

  // fetch all users identities
  const fetchIdentities = async()=>{
    try {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ADDRESS,ABI,signer)
      const result = await contract.getAllIdentities() 
      const newIdentity = result.map(innerArray => {
        return {
          name: innerArray[0],
          age: innerArray[1].toNumber(),
          exists: innerArray[2],
          verified: innerArray[3],
          revoked: innerArray[4],
          owner: innerArray[5],
        };
      });
      setIdentities(newIdentity);
    } catch (error) {
      console.log(error);
    }
  } 

  // fetch current user identity
  const UserIdentity = () => {
    if (account && identities) {
      const data = identities?.filter((identity) => Number(identity.owner) === Number(account));
      setCurrentIdentity(data[0]);
    }
  };
  

  // create new identity
  const handleCreate = async(newIdentity) => {

    // sending the new identity to the blockchain
    try {
      setLoading(true);
      
      const {name,age} = newIdentity
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ADDRESS,ABI,signer)
      const tx = await contract.createIdentity(name,age)
      await tx.wait(1)
      fetchIdentities()

      setTimeout(() => {
      setLoading(false);
      toast.success('Identity created successfully!');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 3000);
    } catch (error) {
         setLoading(false);
        toast.error('Unable to create identity!');
    }

  };

 // update identity
const handleUpdate = async (newIdentity) => {
  try {
    setLoading(true);
    // Update the state variables with the new identity values
    setCurrentIdentity((prevIdentity) => ({
      ...prevIdentity,
      age: newIdentity.age,
      name: newIdentity.name,
    }));

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ADDRESS, ABI, signer);
    const tx = await contract.updateIdentity(newIdentity.name, newIdentity.age);
    await tx.wait(1)
    fetchIdentities();

    setTimeout(() => {
      setLoading(false);
      toast.success('Identity updated successfully!');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 3000);
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error('Unable to update identity!');
  }
};

// verify identity
  const handleVerifyIdentity = async() => {
   try {
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ADDRESS, ABI, signer);
    const tx = await contract.verifyIdentity()
    await tx.wait(1)

    setTimeout(() => {
      setLoading(false);
      toast.success('Identity verified successfully!');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 3000);
   } catch (error) {
    console.log(error);
    toast.error('Unable to verify identity!');
   }
  };

  // revoke identity
  const handleRevokeIdentity = async() => {
    try {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);
      const tx = await contract.revokeIdentity(account.toString())
        await tx.wait(1)
  
      setTimeout(() => {
        setLoading(false);
        toast.success('Identity revoked successfully!');
  
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, 3000);
     } catch (error) {
          if(error.message.includes('Not a verified identity')){
              toast.error('Your identity is not verified!');
            }
              
          else if(error.message.includes('Identity not valid for revocation')){
              toast.error('Identity not valid for revocation');
            }
         else{
          toast.error('Unable to revoke identity!');
         }
     }
  };

  const handleDeleteIdentity = async(owner) => {
    try {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);
      const tx = await contract.deleteIdentity()
      await tx.wait(1)
  
      setTimeout(() => {
        setLoading(false);
        toast.success('Identity deleted successfully!');
  
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 2000);
     } catch (error) {
        if(error.message.includes('Not a verified identity')){
            toast.error('Your identity is not verified!');
        }
            else if(error.message.includes('Identity not valid for deletion')){
              toast.error('Identity not valid for deletion');
            }
         else{
           toast.error('Unable to delete identity!');
         }
         
     }
  };

  return (
    <Layout>
      <Row>
        <Col md={6}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Create/Update Identity</h2>
          <IdentityForm onSubmit={handleCreate} onUpdate={handleUpdate}
           identity={currentIdentity} onVerify={handleVerifyIdentity}
           onRevoke={handleRevokeIdentity} onDelete={handleDeleteIdentity}
           />
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
              connection = {account}
            />
          )}
        </Col>
      </Row>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </Layout>
  );
}
