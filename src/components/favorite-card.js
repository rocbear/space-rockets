import React from "react";
import { Link } from "react-router-dom";
import {
  AlertDescription,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
} from "@chakra-ui/core";
import FavoriteButton from "./favorite-button";
import { useSpaceX } from "../utils/use-space-x";

export function FavoriteCardSkeleton(props) {
  return (
    <Skeleton
      h={["auto", 90]}
      boxShadow="md"
      display="block"
      rounded="lg"
      overflow="hidden"
      {...props}
    />
  );
}

function GenericFavoriteCard({
  title,
  meta,
  badge,
  loading,
  imageSrc,
  href,
  toggleFavorite,
  error,
}) {
  if (!loading && error) {
    return (
      <Box
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
      >
        <AlertDescription>
          We couldn't load this item, if the problem persists after a while the
          data may have been removed. You can remove this item from your
          favorites by clicking{" "}
          <Button variant="link" title="remove" onClick={toggleFavorite}>
            here
          </Button>
        </AlertDescription>
      </Box>
    );
  }
  return (
    <Box
      h={["auto", 90]}
      boxShadow="md"
      display="block"
      rounded="lg"
      overflow="hidden"
    >
      <Link to={href}>
        <Flex h="100%">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              width={[50, 90]}
              objectFit="cover"
              objectPosition="center"
              bg="gray.200"
            />
          )}
          <Box px={4} pr={2} py={2} flexGrow={1}>
            <Box fontWeight="semibold" lineHeight="tight">
              {title}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {meta}
            </Box>
            {badge}
          </Box>
          <Box pr={2} alignSelf="center" justifySelf="flex-end">
            <FavoriteButton
              sticker
              isFavorited={true}
              toggleFavorite={toggleFavorite}
            />
          </Box>
        </Flex>
      </Link>
    </Box>
  );
}

export function FavoriteLaunchPadCard({ id, toggleFavorite }) {
  const {
    data: launchPad,
    error,
    isValidating,
  } = useSpaceX(`/launchpads/${id}`);
  const loading = !launchPad || isValidating;
  return (
    <FavoriteCardSkeleton isLoaded={!loading}>
      {launchPad && (
        <GenericFavoriteCard
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

export function FavoriteLaunchCard({ id, toggleFavorite }) {
  const { data: launch, error, isValidating } = useSpaceX(`/launches/${id}`);
  const loading = !launch || isValidating;
  return (
    <FavoriteCardSkeleton isLoaded={!loading}>
      {launch && (
        <GenericFavoriteCard
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

const supportedComponents = {
  launch: FavoriteLaunchCard,
  launchpad: FavoriteLaunchPadCard,
};

export default function FavoriteCard({ type, id, toggleFavorite }) {
  const Component = supportedComponents[type];
  return Component && <Component id={id} toggleFavorite={toggleFavorite} />;
}
