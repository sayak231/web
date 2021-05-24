import { gql } from "apollo-boost";

export const LOGIN_ = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstname
        lastname
        email
      }
      accessToken
    }
  }
`;

export const SIGNUP_ = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    signup(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    )
  }
`;

export const PROTECTED_ = gql`
  query {
    protected {
      id
      firstname
    }
  }
`;

export const ME_ = gql`
  query {
    me {
      id
      firstname
      lastname
      email
    }
  }
`;

export const LOGOUT_ = gql`
  mutation {
    logout
  }
`;
