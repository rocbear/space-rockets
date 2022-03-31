import React from "react";
import { Link } from "react-router-dom";
import {
  AlertDescription,
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
} from "@chakra-ui/core";
import FavoriteButton from "./favorite-button";

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

export default function FavoriteCard({
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
