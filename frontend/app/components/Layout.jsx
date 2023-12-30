import { Container } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';

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
      <StyledContainer>{children}</StyledContainer>
    </>
  );
}
