import React from "react";
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Text,
  Flex,
  useDisclosure,
  Button,
} from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceX, useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoriteButton from "./favorite-button";
import { useFavorites } from "../utils/use-favorites";
import FavoritesDrawer from "./favorites-drawer";
import { Sidebar } from "react-feather";
import FavoriteCard, { FavoriteCardSkeleton } from "./favorite-card";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleFavorite, favorites } = useFavorites("launches");

  return (
    <div>
      <FavoritesDrawer type="launches" isOpen={isOpen} onClose={onClose}>
        {(id, toggleFavorite) => (
          <Box mb={6}>
            <FavoriteLaunchCard
              key={id}
              flightNumber={id}
              toggleFavorite={() => toggleFavorite(id)}
            />
          </Box>
        )}
      </FavoritesDrawer>
      <Flex justify="space-between" align="center" pr={6}>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <Button
          leftIcon={() => <Box as={Sidebar} mr={2} />}
          size="sm"
          onClick={onOpen}
        >
          favourites
        </Button>
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                key={launch.flight_number}
                isFavorited={favorites.includes(
                  launch.flight_number.toString()
                )}
                toggleFavorite={() =>
                  toggleFavorite(launch.flight_number.toString())
                }
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

function FavoriteLaunchCard({ flightNumber, toggleFavorite }) {
  const {
    data: launch,
    error,
    isValidating,
  } = useSpaceX(`/launches/${flightNumber}`);
  const loading = !launch || isValidating;
  return (
    <FavoriteCardSkeleton isLoaded={!loading}>
      {launch && (
        <FavoriteCard
          title={launch.mission_name}
          meta={`${launch.rocket.rocket_name} • ${launch.launch_site.site_name}`}
          error={error}
          href={`/launches/${launch.flight_number.toString()}`}
          imageSrc={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          loading={loading}
          toggleFavorite={toggleFavorite}
          badge={
            launch.launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
              </Badge>
            )
          }
        />
      )}
    </FavoriteCardSkeleton>
  );
}

export function LaunchItem({ launch, isFavorited, toggleFavorite }) {
  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p={6}>
        <Flex justify="space-between">
          <Box>
            <Box d="flex" alignItems="baseline">
              {launch.launch_success ? (
                <Badge px="2" variant="solid" variantColor="green">
                  Successful
                </Badge>
              ) : (
                <Badge px="2" variant="solid" variantColor="red">
                  Failed
                </Badge>
              )}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {launch.rocket.rocket_name} &bull;{" "}
                {launch.launch_site.site_name}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {launch.mission_name}
            </Box>
            <Flex>
              <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
              <Text color="gray.500" ml="2" fontSize="sm">
                {timeAgo(launch.launch_date_utc)}
              </Text>
            </Flex>
          </Box>
          <Box alignSelf="flex-start">
            <FavoriteButton
              sticker
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
