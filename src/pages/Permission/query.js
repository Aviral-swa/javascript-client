import { gql } from '@apollo/client';

const GET_PERMISSIONS = gql`
query GetPermission($email: String) {
  getPermission(id: { email: $email }) {
    data {
      originalId
      email
      resources
    }
  }

  }
`;

export default GET_PERMISSIONS;
