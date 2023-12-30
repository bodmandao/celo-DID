import { Container } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledContainer>{children}</StyledContainer>
      <Footer />
    </>
  );
}
