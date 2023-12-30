import Link from 'next/link';
import styled from 'styled-components';

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
  return (
    <HeaderContainer>
      <Nav>
        <Logo>Your Logo</Logo>
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
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
