import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceX, useSpaceXPaginated } from "../utils/use-space-x";
import { useFavorites } from "../utils/use-favorites";
import FavoriteButton from "./favorite-button";
import FavoritesDrawer from "./favorites-drawer";
import FavoriteCard, { FavoriteCardSkeleton } from "./favorite-card";
import { Sidebar } from "react-feather";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleFavorite, favorites } = useFavorites("launchpads");
  return (
    <div>
      <FavoritesDrawer type="launchpads" isOpen={isOpen} onClose={onClose}>
        {(id, toggleFavorite) => (
          <Box mb={6}>
            <FavoriteLaunchPadCard
              key={id}
              siteId={id}
              toggleFavorite={() => toggleFavorite(id)}
            />
          </Box>
        )}
      </FavoritesDrawer>
      <Flex justify="space-between" align="center" pr={6}>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
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
            .map((launchPad) => (
              <LaunchPadItem
                key={launchPad.site_id}
                launchPad={launchPad}
                isFavorited={favorites.includes(launchPad.site_id.toString())}
                toggleFavorite={() =>
                  toggleFavorite(launchPad.site_id.toString())
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

function FavoriteLaunchPadCard({ siteId, toggleFavorite }) {
  const {
    data: launchPad,
    error,
    isValidating,
  } = useSpaceX(`/launchpads/${siteId}`);
  const loading = !launchPad || isValidating;
  return (
    <FavoriteCardSkeleton isLoaded={!loading}>
      {launchPad && (
        <FavoriteCard
          title={launchPad.name}
          meta={`${launchPad.attempted_launches} attempted • ${launchPad.successful_launches} succeeded`}
          error={error}
          href={`/launch-pads/${launchPad.site_id}`}
          loading={loading}
          toggleFavorite={toggleFavorite}
          badge={
            launchPad.status === "active" ? (
              <Badge px="2" variant="solid" variantColor="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Retired
              </Badge>
            )
          }
        />
      )}
    </FavoriteCardSkeleton>
  );
}

function LaunchPadItem({ launchPad, isFavorited, toggleFavorite }) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Flex justify="space-between">
          <Box>
            <Box d="flex" alignItems="baseline">
              {launchPad.status === "active" ? (
                <Badge px="2" variant="solid" variantColor="green">
                  Active
                </Badge>
              ) : (
                <Badge px="2" variant="solid" variantColor="red">
                  Retired
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
                {launchPad.attempted_launches} attempted &bull;{" "}
                {launchPad.successful_launches} succeeded
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {launchPad.name}
            </Box>
            <Text color="gray.500" fontSize="sm">
              {launchPad.vehicles_launched.join(", ")}
            </Text>
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
