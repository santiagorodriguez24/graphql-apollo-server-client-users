import "./App.css";
import {
  ApolloClient, // ApolloClient will be used to create the Apollo provider.
  InMemoryCache, // inMemoryCache enables page caching
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"; // onError provides us with a way to catch errors
import Users from "./Components/Users";
import Form from "./Components/Form";

// For GraphQL errors, display an alert with the error message(s):
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

// ApolloProvider: will provide both nested components with access to the GraphQL API
function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <Users />
      <Form />
    </ApolloProvider>
  );
}

export default App;
