import { AlertDescription, Box, Button, Skeleton } from "@chakra-ui/react";
import { BoundToggleFavoriteFn } from "../utils/use-favorites";
import { useSpaceX } from "../utils/use-space-x";
import { LaunchItem } from "./launches";

export default function LaunchCard({
  flightNumber,
  isFavorited,
  toggleFavorite,
}: {
  flightNumber: string;
  isFavorited: boolean;
  toggleFavorite: BoundToggleFavoriteFn;
}) {
  const {
    data: launch,
    error,
    isValidating,
  } = useSpaceX(`/launches/${flightNumber}`);

  if (!isValidating && error) {
    return (
      <Box
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
      >
        <AlertDescription>
          We couldn't load this launch, if the problem persists after a while
          the data may have been removed. You can remove this item from your
          favorites by clicking{" "}
          <Button variant="link" title="remove" onClick={() => toggleFavorite()}>
            here
          </Button>
        </AlertDescription>
      </Box>
    );
  }
  return (
    <Skeleton isLoaded={!isValidating} h="200px">
      <LaunchItem
        launch={launch}
        isFavorited={isFavorited}
        toggleFavorite={toggleFavorite}
      />
    </Skeleton>
  );
}
