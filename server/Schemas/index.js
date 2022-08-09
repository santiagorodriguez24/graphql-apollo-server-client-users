const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const userData = require("../users.json");

const UserType = require("./TypeDefs/UserType");

// Queries are statements containing rules that specify how to retrieve data and what fields to retrieve for each record.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      // getAllUsers the query for getting all users
      type: new GraphQLList(UserType), // we specify that we want to get a list of users
      args: { id: { type: GraphQLInt } }, // The args property specifies the arguments to pass in query (id)
      resolve(parent, args) {
        return userData; // resolve function returns our actual data source. userData will be substituted with the URL of an actual database in a real production environment.
      },
    },
  },
});

// mutations are statements that specify how to mutate data on the API (that is, create, update, and delete).
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        // In the resolve function, we push the new user data object into our data store.
        userData.push({
          id: userData.length + 1, // for the user id, we automatically increment the value based on the list’s length.
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          gender: args.gender,
          address: args.address,
        });
        return args;
      },
    },
  },
});

// export our schema with the query and mutation
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// QUERY EXAMPLE:
// query {
//   getAllUsers{
//     firstName
//     lastName
//     email
//     address
//   }
// }

// MUTATION EXAMPLE:
// mutation {
//   createUser(firstName: "Kingsley", lastName: "Ubah", email: "ubahthebuilder@gmail.com", gender: "Male", address: "Lagos"){
//     firstName
//     lastName
//     email
//   }
// }
