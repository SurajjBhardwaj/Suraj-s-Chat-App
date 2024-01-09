import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();
  const userName = user ? user.name : "";

  useEffect(() => {
    // This code will run after the component has mounted
    console.log("Component mounted");

    // You can perform other side effects here

    // This return statement defines a cleanup function that will run before the component unmounts
    return () => {
      console.log("Component will unmount");
      // Perform cleanup or unsubscribe here if needed
    };
  }, []); // The empty dependency array [] means this effect will only run once after the initial render

  console.log(userName);

  return (
    <div style={{ width: "100%" }}>
      {userName && <SideDrawer />}

      <Box
        display="flex"
        w="100%"
        justifyContent={"space-between"}
        h="90vh"
        p="10px"
      >
        {userName && <MyChats />}
        {userName && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
