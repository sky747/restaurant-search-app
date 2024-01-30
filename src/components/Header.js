import {
  Flex,
  Spacer,
  Heading,
  Container,
  Box,
} from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box bg="gray.100" p={4}>
      <Container maxW="container.lg">
        <Flex>
          <Heading size="md">
            Restaurant Search App
          </Heading>
          <Spacer />
        </Flex>
      </Container>
    </Box>
  );
}
