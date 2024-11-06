import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read(existing = null) {
            return existing;
          },
        },
      },
    },
  },
});

persistCache({
  cache,
  storage: window.localStorage,
});

const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  cache,
});

export default client;
