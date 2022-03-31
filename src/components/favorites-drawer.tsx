import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Star } from "react-feather";
import { Favorite, useFavorites } from "../utils/use-favorites";
import FavoriteCard from "./favorite-card";

const types = ["launch", "launchpad"];
const typeLabels: { [key: string]: string } = {
  launch: "Launches",
  launchpad: "Launch Pads",
};

export default function FavoritesDrawer(drawerProps: UseDisclosureReturn) {
  const { favorites, toggleFavorite } = useFavorites();
  const groupedFavorites = useMemo(
    () =>
      favorites
        ? favorites.reduce<{ [key: string]: Favorite[] }>(
            (groups, favorite) => {
              const { type } = favorite;
              return {
                ...groups,
                [type]: [...(groups[type] || []), favorite],
              };
            },
            {}
          )
        : {},
    [favorites]
  );
  const empty = (
    <Box textAlign="center">
      <Box mb={2}>No favourites yet</Box>
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
            Favourites
          </Flex>
        </DrawerHeader>
        <DrawerBody overflow="auto">
          {!favorites?.length ? (
            empty
          ) : (
            <Accordion allowMultiple defaultIndex={[0, 1]}>
              {types.map((type) => {
                const typeFavorites = groupedFavorites[type] || [];
                return (
                  <AccordionItem
                    key={type}
                    _first={{
                      borderTop: 0,
                    }}
                    _last={{
                      borderBottom: 0,
                    }}
                  >
                    <AccordionButton alignItems="center">
                      <Box flexGrow={1} fontSize="lg">
                        {typeLabels[type]} ({typeFavorites.length})
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      {typeFavorites.length ? (
                        typeFavorites.map(({ id, type }) => (
                          <Box mb={4} key={id}>
                            <FavoriteCard
                              id={id}
                              type={type}
                              toggleFavorite={(value) =>
                                toggleFavorite(type, id, value)
                              }
                            />
                          </Box>
                        ))
                      ) : (
                        <Box color="gray.500" textAlign="center">
                          No {typeLabels[type].toLowerCase()} favourited yet
                        </Box>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay onClick={drawerProps.onClose} />
    </Drawer>
  );
}
