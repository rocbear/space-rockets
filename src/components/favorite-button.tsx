import { MouseEvent, useRef } from "react";
import { Box, Button, Flex, ToastId, useToast } from "@chakra-ui/react";
import { Star } from "react-feather";
import { BoundToggleFavoriteFn } from "../utils/use-favorites";

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
  const toastIdRef = useRef<ToastId | undefined>();
  const fill = isFavorited ? "yellow.300" : "none";
  const color = isFavorited ? "black" : "gray.300";
  const onCloseToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite();
    if (isFavorited) {
      toastIdRef.current = toast({
        title: (
          <Flex alignItems="center">
            <Box mr={2}>Favourite removed</Box>
            <Button
              variant="link"
              fontWeight="400"
              color="gray.100"
              onClick={() => {
                toggleFavorite(true);
                onCloseToast();
              }}
              textDecoration="underline"
            >
              click here to undo
            </Button>
          </Flex>
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
