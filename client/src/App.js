import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, ApolloLink, concat } from '@apollo/client';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './App.css';

const URI = process.env.REACT_APP_HTTP_LINK || 'http://localhost:3001/graphql';
const httpLink = new HttpLink({ uri: URI });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwt') || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}
