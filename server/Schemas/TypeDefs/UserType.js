const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql; // We imported various schema types from graphql.

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

// we export the User object to use the schema where required.
module.exports = UserType;
