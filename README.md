# Celo DID


Celo DID is a decentralized identity application built on the Celo blockchain. It allows users to manage their identities securely on the blockchain.

## Features

- **Create and Update Identity:** Users can create and update their identities on the Celo blockchain.

- **Verification and Revocation:** The app supports the verification and revocation of identities.

- **Connect Wallet:** Users can connect their wallet (Metamask) to interact with the Celo blockchain.

- **Real-Time Identity Updates:** The Identity List component updates in real-time after creating, updating, or deleting an identity, providing a seamless user experience.

- **Copy to Clipboard:** Users can easily copy their identity owner address to the clipboard with a single click for quick sharing.

- **Responsive Design:** The frontend is designed to be responsive, ensuring a consistent user experience across various devices.

- **Loading Spinners:** Loading spinners provide visual feedback to users during data fetching or processing.

- **Toast Notifications:** Informative toast notifications appear for successful or failed identity-related actions, improving user feedback.

- **Secure Connection:** The app connects securely to the Celo blockchain using web3.js and ethers.js libraries, ensuring data integrity.

- **Bootstrap Table:** The Identity List component uses a Bootstrap table for a clean and organized display of identity information.

- **Metamask Integration:** The app seamlessly integrates with Metamask for wallet connections, providing a familiar and secure authentication method.

- **Wallet Connection Check:** Users are prompted to install Metamask if it's not detected, ensuring a smooth onboarding process.

- **Delete Identity Confirmation:** Users are asked to confirm before deleting an identity, preventing accidental deletions.



### Identity Operations

- **Create Identity**: Users can easily create new identities by providing their name and age.
  
- **Update Identity**: Modify your identity details, such as name and age, as needed.

- **Verify Identity**: Securely verify your identity on the blockchain.

- **Revoke Identity**: Revoke access to your identity when necessary, ensuring control over your information.

- **Delete Identity**: Permanently delete your identity when it's no longer needed.



## Demo

Visit the [Celo DID App](https://celo-did.vercel.app/) to explore the features.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/bodmandao/celo-DID.git
    ```
2. Install dependencies:

   ```bash
   cd celo-DID/frontend
   npm install
   cd celo-DID/backend
   yarn
   ```
3. Run the application:

   ```bash
   cd ../frontend
   npm run dev
   ```

   Open http://localhost:3000 in your browser.
