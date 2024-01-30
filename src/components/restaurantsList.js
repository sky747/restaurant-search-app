import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

export const RestaurantsList = ({ userLocation, searchRange }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      getRestaurants();
    }
  }, [userLocation.latitude, userLocation.longitude]);

  const getRestaurants = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const endpoint = '/api/hotpepper/gourmet/v1/'

      const response = await fetch(
        `${endpoint}?key=${apiKey}&format=json&lat=${userLocation.latitude}&lng=${userLocation.longitude}&range=${searchRange}`
      )

      if (!response.ok) {
        throw new Error('エラーにより、データの取得に失敗しました。')
      }

      const data = await response.json();
      setRestaurants(data.results.shop);
    } catch (error) {
      console.error(`エラーが発生しました: ${error}`);
    }
  }

  return (
    <Flex direction="column" align="center">
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {restaurants.length}件見つかりました。
      </Text>
      {restaurants.map((restaurant) => (
        <Text key={restaurant.id}>{restaurant.name}</Text>
      ))}
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
      </Text>
    </Flex>
  )
}