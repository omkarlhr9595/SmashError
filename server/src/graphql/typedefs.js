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
  type Author {
    id: ID!
    username: String!
  }
  type Comment {
    id: ID!
    author: Author!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Answer {
    id: ID!
    author: Author!
    body: String!
    comments: [Comment]!
    points: Int!
    upvotedBy: [ID]!
    downvotedBy: [ID]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Question {
    id: ID!
    author: Author!
    title: String!
    body: String!
    aiAnswer: String!
    tags: [String!]!
    acceptedAnswer: ID
    comments: [Comment]!
    answers: [Answer]!
    upvotedBy: [ID]!
    downvotedBy: [ID]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getUser(username: String!): User!
    getAllUsers: [UserList]!
    getAllQuestions: [Question]!
  }
  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
    getUser(username: String!): User!
    postQuestion(title: String!, body: String!, tags: [String!]!): Question!
    getQuestion(id: ID!): Question!
  }
`;
