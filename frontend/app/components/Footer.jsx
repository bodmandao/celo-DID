import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer className="mt-5">
      <p>&copy; 2023 CELO DID. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
