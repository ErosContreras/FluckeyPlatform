import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    displayName: String!
    profileImage: String
    bio: String
    profession: [String!]!
    skills: [String!]!
    portfolioItems: [PortfolioItem!]!
    connections: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type PortfolioItem {
    id: ID!
    title: String!
    description: String!
    mediaUrls: [String!]!
    category: String!
    tags: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  input CreateUserInput {
    email: String!
    password: String!
    displayName: String!
    profession: [String!]!
    skills: [String!]!
  }

  input UpdateUserInput {
    displayName: String
    bio: String
    profession: [String!]
    skills: [String!]
    profileImage: String
  }

  input CreatePortfolioItemInput {
    title: String!
    description: String!
    mediaUrls: [String!]!
    category: String!
    tags: [String!]!
  }

  type Query {
    me: User
    user(id: ID!): User
    searchUsers(query: String!, limit: Int = 10): [User!]!
    portfolioItems(userId: ID!): [PortfolioItem!]!
    discoverUsers(profession: [String!], skills: [String!], limit: Int = 10): [User!]!
  }

  type Mutation {
    register(input: CreateUserInput!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    updateProfile(input: UpdateUserInput!): User!
    createPortfolioItem(input: CreatePortfolioItemInput!): PortfolioItem!
    deletePortfolioItem(id: ID!): Boolean!
    connect(userId: ID!): Boolean!
    disconnect(userId: ID!): Boolean!
  }
`);