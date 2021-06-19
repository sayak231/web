import { gql } from "@apollo/client";

export const CREATE_DASHBOARD = gql`
  mutation createDashboard($name: String!, $description: String!) {
    createDashboard(name: $name, description: $description) {
      id
      name
      description
      isCreated
    }
  }
`;

export const DELETE_DASHBOARD = gql`
  mutation deleteDashboard($id: Int!) {
    deleteDashboard(id: $id)
  }
`;

export const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $description: String!
    $assignTo: Int!
    $dashboard: Int!
  ) {
    createTask(
      name: $name
      description: $description
      assignTo: $assignTo
      dashboard: $dashboard
    ) {
      name
      description
      dashboard_belonging_to_id
      created_by_id
      assigned_to_id
    }
  }
`;

export const GET_DASHBOARD = gql`
  query getDashboardDetails($id: Int) {
    getDashboardDetails(id: $id) {
      id
      name
      description
      creator_id
      members {
        id
        firstname
        lastname
        tasks_assigned {
          id
          name
          description
          status
          assigned_to_id
          dashboard_belonging_to_id
        }
      }
      tasks_in_dashboard {
        id
        name
        description
        assigned_to_id
      }
    }
  }
`;

export const GET_DASHBOARDS = gql`
  query {
    getDashboards {
      id
      name
      description
      creator_id
      isCreated
    }
  }
`;

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
