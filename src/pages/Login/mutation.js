import { gql } from '@apollo/client';

const login = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(payload: { email: $email, password: $password }) {
    message
    data {
      generated_token
    }
    status
  }

  }
`;

export default login;
