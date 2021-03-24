import { gql } from '@apollo/client';

export const PERMISSION_UPDATED = gql`
  subscription {
    updatePermissions {
    message
    data {
      email
      originalId
      resources
    }
    status
  }
}
`;
