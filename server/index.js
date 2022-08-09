const express = require("express");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// We create our GraphQL HTTP server. Note that the GraphQL API only has one endpoint: /graphql.
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // This enables us to use the Graphiql UI (GraphQL graphical user interface (GUI)) on our browser to run test queries, just like API testers like Postman.
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});
