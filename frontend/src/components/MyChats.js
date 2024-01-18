import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();


  const fetchChats = async () => {
    try {

      const config = {
        headers: {
         Authorization:`Bearer ${user.token}`,
        },
      }


      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      



      
    } catch (error) {
      console.log(error);
      toast({
        tittle: "error in chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
    }
  }



  return (
    <div>
      my chats
    </div>
  )
}

export default MyChats
