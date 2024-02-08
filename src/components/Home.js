import { useState } from 'react';
import {
  Flex,
  Text,
  Select,
  Button,
  Spinner,
  Spacer,
  Center,
  Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { RestaurantsList } from './restaurantsList';


export const Home = () => {
  const [userLocation, setUserLocation] = useState({latitude: null, longitude: null});
  const [searchRange, setSearchRange] = useState(1);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    setLoading(true);

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert('お使いのブラウザは現在地を取得できません。');
      setLoading(false);
    }
  }

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation({latitude, longitude});
    setLoading(false);
  }

  const error = () => {
    alert('位置情報取得に失敗しました。');
    setLoading(false);
  }

  return (
    <Flex direction="column" align="center">
      <form onSubmit={(e) => e.preventDefault()}>
        <Text
          fontSize="lg"
          mt={4}
          mb={2}
        >
          検索範囲を選んでください
        </Text>
        <Select
          size="lg"
          value={searchRange}
          onChange={(e) => setSearchRange(e.target.value)}
        >
          <option value={1}>300m</option>
          <option value={2}>500m</option>
          <option value={3}>1000m</option>
          <option value={4}>2000m</option>
          <option value={5}>3000m</option>
        </Select>
        <Button 
          type="submit" 
          colorScheme="teal" 
          size="lg" 
          mt={4}
          ml={4}
          onClick={() => getUserLocation()}
        >
          現在地から検索
        </Button>
      </form>
      {loading && (
        <Center
          mt={4}
          direction="column"
          mb={4}
        >
          <Spinner 
            speed='0.65s'
          />
          <Spacer />
          <Text
            ml={2}
          >
            検索中...
          </Text>
        </Center>
      )}

      {userLocation.latitude && userLocation.longitude && (
        <Link 
          fontSize='lg'
          mt={4}
          href={`https://maps.google.co.jp/maps?q=${userLocation.latitude},${userLocation.longitude}`} 
          isExternal
        >
          緯度：{userLocation.latitude}、経度：{userLocation.longitude}
          <ExternalLinkIcon ml={1} />
        </Link>
      )}

      <RestaurantsList userLocation={userLocation} searchRange={searchRange} />
    </Flex>
  );
}