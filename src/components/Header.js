import {
  Center,
  Heading,
  Container,
  Box
} from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box bg="gray.100" p={4}>
      <Container maxW="container.lg">
        <Center>
          <Heading as="h1">
            <a href="/">Restaurant Search App</a>
          </Heading>
        </Center>
      </Container>
    </Box>
  );
}
