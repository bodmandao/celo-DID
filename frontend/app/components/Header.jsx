import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { NavItem } from 'react-bootstrap';

const HeaderContainer = styled.header`
  background-color: #007bff;
  padding: 10px 0;
  color: #ffffff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const NavLink = styled.a`
  color: #ffffff;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const [account, setAccount] = useState();

  // metamask connection
  let connection;
  if (typeof window !== 'undefined') {
    connection = window.ethereum;
  }

  // wallet connection
  const connectWallet = async function () {
    if (connection) {
      try {
        const accounts = await connection.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('Please install metamask');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <HeaderContainer>
      <Nav>
        <Logo>CELO DID</Logo>
        <div>
          <NavItem className='btn btn-success'>
            {account ? `${account.slice(0, 6)}...${account.slice(account.length - 4)}` : 'Connect Wallet'}
          </NavItem>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
