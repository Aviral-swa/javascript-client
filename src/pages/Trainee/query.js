import { gql } from '@apollo/client';

const getAllTrainees = gql`
query GetAllTrainees($skip: Int, $limit: Int) {
  getAllTrainees(options: { skip: $skip, limit: $limit }) {
    message
    data {
      total
      showing
      traineesList {
        name
        role
        email
        originalId
        createdAt
      }
    }
    status
  }

  }
`;

export default getAllTrainees;
