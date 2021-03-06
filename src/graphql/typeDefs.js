import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userId: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    phone: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    phone: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
