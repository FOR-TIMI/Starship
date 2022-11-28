import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Signup from "./pages/Signup.js"
import Login from "./pages/Login.js"
import React from "react"


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes >
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
