import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  Text,
  HStack,
  VStack,
  Link
} from '@chakra-ui/react'

export const RestaurantDetail = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Center>
      <Modal
        size={{ base: "md", md: "xl" }}
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered
      >
        <ModalOverlay 
          bg='rgba(0, 0, 0, 0.7)'
        />
        <ModalContent>
          <ModalHeader>{props.restaurant.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Image
                src={props.restaurant.photo.pc.l}
                alt={props.restaurant.name}
              />
              <VStack 
                align='center'
                ml={4}  
              >
                <Text
                  fontWeight='bold'
                >
                  予算
                </Text>
                <Text>{props.restaurant.budget.name}</Text>
                <Text
                  fontWeight='bold'
                >
                  住所
                </Text>
                <Text>{props.restaurant.address}</Text>
                <Text
                  fontWeight='bold'
                >
                  営業時間
                </Text>
                <Text>{props.restaurant.open}</Text>
                <Text
                  fontWeight='bold'
                >
                  定休日
                </Text>
                <Text>{props.restaurant.close}</Text>
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Link
              color='teal.500'
              href={props.restaurant.urls.pc}
              isExternal
            >
              ホットペッパーグルメで予約する
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}