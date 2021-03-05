import { gql } from '@apollo/client';

export const UPDATE_TRAINEE = gql`
  subscription {
  traineeUpdated {
    message
    data {
      name
      email
      createdAt
      originalId
    }
    status
  }
}
`;

export const TRAINEE_DELETED = gql`
  subscription {
    traineeDeleted {
    message
    data
    status
  }
}
`;

export const TRAINEE_ADDED = gql`
  subscription {
    traineeAdded {
    message
    data {
      name
      email
      createdAt
      originalId
    }
    status
  }
}
  `;
