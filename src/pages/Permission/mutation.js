import { gql } from '@apollo/client';

const UPDATE_PERMISSION = gql`
    mutation UpdatePermission($originalId: ID!, $resources: JSON!) {
      updatePermission(data: {
        originalId: $originalId, resources: $resources}) {
        message
        status
    }
  }
`;

export default UPDATE_PERMISSION;
