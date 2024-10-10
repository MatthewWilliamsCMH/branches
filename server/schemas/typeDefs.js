const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    dateOfBirth: String
    dateOfDeath: String
    gender: String
    birthPlace: String
    burialSite: String
    img: String
    fatherId: ID
    motherId: ID
    pids: [ID]  # Partner IDs
  }
    type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    persons: [Person!]!            # Query to get all persons
    person(id: ID!): Person        # Query to get a specific person by ID
  }

  type Mutation {
    createPerson(
      firstName: String!,
      middleName: String,
      lastName: String!,
      dateOfBirth: String,
      dateOfDeath: String,
      gender: String,
      birthPlace: String,
      burialSite: String,
      img: String,
      fatherId: ID,
      motherId: ID,
      pids: [ID]  # Partner IDs for new person
    ): Person!

    updatePerson(
      id: ID!,
      firstName: String,
      middleName: String,
      lastName: String,
      dateOfBirth: String,
      dateOfDeath: String,
      gender: String,
      birthPlace: String,
      burialSite: String,
      img: String,
      fatherId: ID,
      motherId: ID,
      pids: [ID]  # Partner IDs to update
    ): Person!

    deletePerson(id: ID!): Person   # Mutation to delete a person

    signup(
      name: String!,
      email: String!,
      password: String!
    ): AuthPayload!                 # Sign up mutation

    login(
      email: String!,
      password: String!
    ): AuthPayload!                 # Login mutation
  }
`;

module.exports = typeDefs;