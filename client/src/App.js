import "./App.css";
import Layout from "./components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "./client";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout />
      </div>
    </ApolloProvider>
  );
}

export default App;
