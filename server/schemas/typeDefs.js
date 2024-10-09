const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
<<<<<<< HEAD
    parents: [ID]
    dateOfBirth: String!
=======
    dateOfBirth: String
>>>>>>> c6d3f25d3b101dec71b54d6afabbfa62a1359718
    dateOfDeath: String
    gender: String
    birthPlace: String
    burialSite: String
    img: String
    fatherId: ID
    motherId: ID
    pids: [ID]  # Partner IDs
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
  }
`;

module.exports = typeDefs;
