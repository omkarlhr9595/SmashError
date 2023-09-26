import { gql } from "apollo-server";

export const typeDefs = gql`
  type QuestionId {
    quesId: ID!
  }
  scalar DateTime
  type AnswerId {
    ansId: ID!
  }
  type User {
    id: ID!
    username: String!
    questions: [QuestionId]!
    answers: [AnswerId]!
    createdAt: DateTime!
    totalQuestions: Int!
    totalAnswers: Int!
  }
  type LoggedUser {
    id: ID!
    username: String!
    token: String!
  }
  type UserList {
    id: ID!
    username: String!
    createdAt: DateTime!
  }
  type Query {
    getUser(username: String!): User!
    getAllUsers: [UserList]!
  }
  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
    getUser(username: String!): User!
  }
`;
