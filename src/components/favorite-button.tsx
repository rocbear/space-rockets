import { MouseEvent } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Star } from "react-feather";
import { BoundToggleFavoriteFn } from "../utils/use-favorites";

function UndoToast({
  toggleFavorite,
  onClose,
}: {
  toggleFavorite: BoundToggleFavoriteFn;
  onClose: () => void;
}) {
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
}: {
  isFavorited: boolean;
  toggleFavorite: BoundToggleFavoriteFn;
  sticker?: boolean;
}) {
  const toast = useToast();
  const fill = isFavorited ? "yellow.300" : "none";
  const color = isFavorited ? "black" : "gray.300";
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite();
    if (isFavorited) {
      toast({
        render: ({ onClose }) => (
          <UndoToast onClose={onClose} toggleFavorite={toggleFavorite} />
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
        <Box
          _hover={{
            transform: "scale(1.2)",
          }}
        >
          <Box as={Star} color={color} fill={fill} onClick={onClick} />
        </Box>
      ) : (
        <Button
          cursor="pointer"
          type="button"
          size="sm"
          leftIcon={<Box as={Star} color={color} fill={fill} mr={1} />}
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
