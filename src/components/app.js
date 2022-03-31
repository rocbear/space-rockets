import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesDrawer from "./favorites-drawer";
import { useUI } from "./ui-context";
import { Sidebar } from "react-feather";

export default function App() {
  const { drawer } = useUI();
  return (
    <div>
      <NavBar onOpenDrawer={drawer.onOpen} />
      <FavoritesDrawer {...drawer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar({ onOpenDrawer }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
        color="white"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <Button
        leftIcon={() => <Box as={Sidebar} mr={2} />}
        variant="link"
        color="gray.200"
        onClick={onOpenDrawer}
      >
        <Box display={["none", "inline"]}>favourites</Box>
      </Button>
    </Flex>
  );
}
