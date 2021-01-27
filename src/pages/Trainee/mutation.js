import { gql } from '@apollo/client';

export const CREATE_TRAINEE = gql`
    mutation CreateTrainee($name: String!,
    $email: String!,
    $role: String,
    $password: String!) {
    createTrainee(user: {
      name: $name, email: $email, role: $role, password: $password}) {
        message
        status
    }
  }
`;

export const EDIT_TRAINEE = gql`
    mutation UpdateTrainee($id: ID!, $name: String!, $email: String!) {
    updateTrainee(user: {id: $id, name: $name, email: $email}) {
        message
        status
    }
  }
`;

export const DELETE_TRAINEE = gql`
    mutation DeleteTrainee($id: ID!) {
    deleteTrainee(id: $id) {
      message
      status
    }
  }
`;
