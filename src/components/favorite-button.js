import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  PseudoBox,
  useToast,
} from "@chakra-ui/core";
import { Star } from "react-feather";

function UndoToast({ toggleFavorite, onClose }) {
  return (
    <Alert bg="gray.700" shadow="lg" rounded="lg" mb={4}>
      <Flex direction="column" justifyContent="center" pb={1}>
        <Flex alignItems="center">
          <AlertIcon color="white" mr={2} />
          <Box fontWeight="bold" color="white">
            Favourite removed
          </Box>
        </Flex>
        <Box textAlign="center">
          <Button
            variant="link"
            fontWeight="400"
            color="gray.100"
            onClick={() => {
              toggleFavorite(true);
              onClose();
            }}
            textDecoration="underline"
          >
            undo
          </Button>
        </Box>
      </Flex>
    </Alert>
  );
}

export default function FavoriteButton({
  isFavorited,
  toggleFavorite,
  sticker,
}) {
  const toast = useToast();
  const fill = isFavorited ? "yellow.300" : "none";
  const color = isFavorited ? "black" : "gray.300";
  const onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite();
    if (isFavorited) {
      toast({
        render: ({ onClose }) => (
          <UndoToast
            onClose={onClose}
            isFavorited={isFavorited}
            toggleFavorite={toggleFavorite}
          />
        ),
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box cursor="pointer">
      {sticker ? (
        <PseudoBox
          _hover={{
            transform: "scale(1.2)",
          }}
        >
          <Box as={Star} color={color} fill={fill} onClick={onClick} />
        </PseudoBox>
      ) : (
        <Button
          cursor="pointer"
          type="button"
          size="sm"
          leftIcon={() => <Box as={Star} color={color} fill={fill} mr={1} />}
          iconSpacing=""
          onClick={onClick}
          title={isFavorited ? "unfavourite" : "favourite"}
        >
          {isFavorited ? "favourited" : "favourite"}
        </Button>
      )}
    </Box>
  );
}
