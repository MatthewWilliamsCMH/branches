const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: String
    firstName: String
    middleName: String
    lastName: String
    dateOfBirth: String
    dateOfDeath: String
    gender: String
    birthPlace: String
    burialSite: String
    img: String
    fatherId: String
    motherId: String
    pids: [String]  # Partner IDs
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
    person(id: String): Person        # Query to get a specific person by ID
  }

  type Mutation {
    createPerson(
      firstName: String,
      middleName: String,
      lastName: String,
      dateOfBirth: String,
      dateOfDeath: String,
      gender: String,
      birthPlace: String,
      burialSite: String,
      img: String,
      fatherId: String,
      motherId: String,
      pids: [String]  # Partner IDs for new person
    ): Person!

    updatePerson(
      id: String,
      firstName: String,
      middleName: String,
      lastName: String,
      dateOfBirth: String,
      dateOfDeath: String,
      gender: String,
      birthPlace: String,
      burialSite: String,
      img: String,
      fatherId: String,
      motherId: String,
      pids: [String]  # Partner IDs to update
    ): Person!

    deletePerson(id: String!): Person   # Mutation to delete a person

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