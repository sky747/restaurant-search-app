import React, { useState, useEffect } from "react";
import { 
  Flex, 
  Text, 
  Card, 
  CardBody, 
  CardFooter,
  Image,
  Stack,
  Heading,
  Button  
} from "@chakra-ui/react";
import { RestaurantDetail } from './restaurantDetail';

export const RestaurantsList = ({ userLocation, searchRange }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      getRestaurants();
    }
  }, [userLocation.latitude, userLocation.longitude]);

  const getRestaurants = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const endpoint = '/api/hotpepper/gourmet/v1/';

      const response = await fetch(
        `${endpoint}?key=${apiKey}&format=json&count=100&lat=${userLocation.latitude}&lng=${userLocation.longitude}&range=${searchRange}`
      );

      if (!response.ok) {
        throw new Error('データの取得に失敗しました。');
      }

      const data = await response.json();
      setRestaurants(data.results.shop);
    } catch (error) {
      console.error(`エラーが発生しました: ${error}`);
    }
  };

  const getCurrentRestaurants = () => {
    const pageLastRestaurant = currentPage * perPage;
    const pageFirstRestaurant = pageLastRestaurant - perPage;
    return restaurants.slice(pageFirstRestaurant, pageLastRestaurant);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex direction="column" align="center">
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {restaurants.length}件見つかりました。
      </Text>
      {getCurrentRestaurants().map((restaurant) => (
        <Card 
          key={restaurant.id} 
          direction={{ base: "column", sm: "row" }}
          overflow="hidden" 
          minW={{ base: "100%", md: " 100%" }}
          mt={4}
        >
          <Image 
            objectFit='contain'
            w={{ base: "40%", md: "15%" }}
            pt={4}
            pl={4}
            src={restaurant.logo_image} 
            alt={restaurant.name} 
          />
          <Stack>
            <CardBody>
              <Heading size="md">{restaurant.name}</Heading>
              <Text py={2}>{restaurant.access}</Text>
            </CardBody>
            <CardFooter>
              <Button 
                colorScheme="teal" 
                size="sm" 
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                詳細情報を見る
              </Button>
            </CardFooter>
          </Stack>
          <RestaurantDetail
            isOpen={selectedRestaurant === restaurant} 
            onClose={() => setSelectedRestaurant(null)}
            restaurant={restaurant}
          />
        </Card>
      ))}
      <Pagination 
        perPage={perPage} 
        totalRestaurants={restaurants.length} 
        currentPage={currentPage}
        onPageChange={handlePageChange} 
      />
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
      </Text>
    </Flex>
  );
};

const Pagination = ({ perPage, totalRestaurants, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1 ; i <= Math.ceil(totalRestaurants / perPage) ; i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex mt={4}>
      {pageNumbers.map((number) => (
        <Button 
          key={number}
          colorScheme={currentPage === number ? "teal" : "gray"}
          onClick={() => onPageChange(number)}
          mr={2}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};
