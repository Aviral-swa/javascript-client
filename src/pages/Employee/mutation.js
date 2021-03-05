import { gql } from '@apollo/client';

const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($name: String!,
    $role: String!,
    $parent: String!) {
    createEmployee(
    employee: { name: $name, role: $role, parent: $parent }
  ) {
    message
    name
    role
    parent
    ancestors
  }
  }
`;

export default CREATE_EMPLOYEE;
