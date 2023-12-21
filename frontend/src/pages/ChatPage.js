import React from 'react'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
  const { user } = ChatState();
  
    return (
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
       
        <Box>
          
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </div>
    );
   
}

export default ChatPage
