import React from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoriteButton from "./favorite-button";
import { useFavorites } from "../utils/use-favorites";

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
  const { toggleFavorite, isFavorited } = useFavorites();

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                key={launch.flight_number}
                isFavorited={isFavorited(
                  "launch",
                  launch.flight_number.toString()
                )}
                toggleFavorite={(value) =>
                  toggleFavorite(
                    "launch",
                    launch.flight_number.toString(),
                    value
                  )
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
                {DateTime.fromISO(launch.launch_date_utc).toRelative()}
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
