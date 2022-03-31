import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/core";
import React from "react";
import { Star } from "react-feather";
import { useFavorites } from "../utils/use-favorites";

export default function FavoritesDrawer({ type, children, ...drawerProps }) {
  const { favorites, toggleFavorite } = useFavorites(type);
  const empty = (
    <Box textAlign="center">
      <Box mb={2}>No favorites yet</Box>
      <Button onClick={drawerProps.onClose}>get back to browsing!</Button>
    </Box>
  );
  return (
    <Drawer
      placement="right"
      isOpen={drawerProps.isOpen}
      onClose={drawerProps.onClose}
      size="md"
      isFullHeight
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader alignItems="center">
          <Flex align="center">
            <Box as={Star} mr={2} display="inline" fill="yellow.300" />
            Favorites
          </Flex>
        </DrawerHeader>
        <DrawerBody overflow="auto">
          <>
            {favorites.length
              ? favorites.map((id) => (
                  <Box key={id}>{children(id, () => toggleFavorite(id))}</Box>
                ))
              : empty}
          </>
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay onClick={drawerProps.onClose} />
    </Drawer>
  );
}
