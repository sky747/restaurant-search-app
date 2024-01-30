import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import { Header } from './components/Header';
import { Home } from './components/Home';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Home />
    </ChakraProvider>
  );
}

export default App;