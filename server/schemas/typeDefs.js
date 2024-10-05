// server/schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    middleName: String!
    lastName: String!
    parents: [ID]
    dateOfBirth: String!
    dateOfDeath: String!
    gender: String!
    birthPlace: String!
    burialSite: String!
    img: String # Add the img field here
  }

  type Query {
    person(id: ID!): Person
    persons: [Person]
  }

  type Mutation {
    addPerson(
      firstName: String!
      middleName: String!
      lastName: String!
      dateOfBirth: String!
      dateOfDeath: String!
      gender: String!
      birthPlace: String!
      burialSite: String!
      img: String # Include img field in the addPerson mutation
    ): Person

    updatePerson(
      id: ID!
      firstName: String
      middleName: String
      lastName: String
      dateOfBirth: String
      dateOfDeath: String
      gender: String
      birthPlace: String
      burialSite: String
      img: String # Include img field in the updatePerson mutation
    ): Person

    deletePerson(id: ID!): Person
  }
`;

module.exports = typeDefs;
