// server/schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    middleName: String!
    lastName: String!
    dateOfBirth: String!
    dateOfDeath: String
    gender: String!
    birthPlace: String!
    burialSite: String
    img: String
    mother: Person
    father: Person
    partners: [Person]
    children: [Person]
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
      dateOfDeath: String
      gender: String!
      birthPlace: String!
      burialSite: String
      img: String
      motherId: ID
      fatherId: ID
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
      img: String
      motherId: ID
      fatherId: ID
    ): Person

    deletePerson(id: ID!): Person
  }
`;

module.exports = typeDefs;
