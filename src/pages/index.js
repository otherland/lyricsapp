import { Box, Spinner, Flex, Text } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fireAuth } from "../service/firebase";
import Nav from "../components/nav"
import Form from "../components/form"
import Poems from "../components/poems"

export default function Index() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);


  // const router = useRouter();

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        console.log("user found");
        setUser(user);
        setLoading(false);
      } else {
        console.log(user)
        console.log("no user");
        setUser(null);
        // setLoading(false);
        Router.push('/login')
      }
    });
  }, []);

  const onLogout = () => {
    fireAuth.signOut();
  };

  if (loading) {
    return (
      <Box>
        <Flex w="full" h="full" minH="100vh" align="center" justify="center">
          <Spinner color="brand.blue" />
        </Flex>
      </Box>
    )
  }
  else {
    return (
      <Box h="100vh">
        <Nav user={user} onLogout={onLogout}></Nav>
        <Flex minH={"100vh"} py={10} justifyContent={"center"} alignItems={"center"}>
          <Poems></Poems>
        </Flex>
      </Box >
    );
  }

}
