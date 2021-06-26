import { gql } from "@apollo/client";

export const EDIT_TASK = gql`
  mutation editTask(
    $id: Int!
    $dashboard: Int!
    $name: String!
    $description: String!
  ) {
    editTask(
      id: $id
      dashboard: $dashboard
      name: $name
      description: $description
    ) {
      id
    }
  }
`;

export const EDIT_DASHBOARD = gql`
  mutation editDashboard($id: Int!, $name: String!, $description: String!) {
    editDashboard(id: $id, name: $name, description: $description) {
      id
    }
  }
`;

export const CHANGE_TASK_STATUS = gql`
  mutation changeTaskStatus($id: Int!, $status: Int!, $dashboard: Int!) {
    changeTaskStatus(id: $id, status: $status, dashboard: $dashboard) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!, $dashboard: Int!) {
    deleteTask(id: $id, dashboard: $dashboard) {
      id
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation addMembersToDashboard($id: Int!, $memberId: Int!) {
    addMembersToDashboard(id: $id, memberId: $memberId) {
      id
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstname
      lastname
    }
  }
`;

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
      creator {
        id
        firstname
        lastname
      }
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
          assigned_to {
            id
            firstname
            lastname
          }
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
