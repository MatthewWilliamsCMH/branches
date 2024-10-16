import { gql } from '@apollo/client';

export const XXX = gql`
  mutation createMatchup($xxx: String!, $xxx: String!) {
    createMatchup(x: $xxx, xxx: $xxx) {
      _id
      xxx
      xxx
    }
  }
`;

// Define the GraphQL mutation
export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password ) {
      token
    }
  }
`;