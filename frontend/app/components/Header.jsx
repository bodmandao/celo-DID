import Link from 'next/link';
import styled from 'styled-components';
import { ADDRESS, ABI } from '../../constants/index.js';
import {ethers} from 'ethers'
import { useEffect,useState } from 'react';
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
  const [account, setAccount] = useState()

  // metamask connection
  let connection
  if (typeof window !== 'undefined') {
      connection = window.ethereum
  }

  // wallet connection
  const connectWallet = async function () {
    if (connection) {
        const accounts = await connection.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        console.log(accounts);
    }
    else {
        console.log('please install metamask')
    }
  }

  useEffect(()=>{
    connectWallet()
  })
  return (
    <HeaderContainer>
      <Nav>
        <Logo>CELO DID</Logo>
        <div>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>
          <Link href="/about">
            <NavLink>About</NavLink>
          </Link>
          <Link href="/contact">
            <NavLink>Contact</NavLink>
          </Link>
          <NavItem className='btn btn-success'>
            
          {account ? `${account.slice(0,6)}...${account.slice(account.length -4)}` : 'connect wallet'}
          </NavItem>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
