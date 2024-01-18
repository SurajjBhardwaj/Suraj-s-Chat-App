import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent,  DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, position, Spinner, Text, Toast, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon  } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { config } from 'dotenv';
import axios from 'axios';
// import ChatLoading from '../chatLoading';
import ChatLoadingStyle from '../chatLoadingStyle';
import UserListItem from '../UserAvatar/UserListItem';



const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false)
  const [chatLoading, setChatloading] = useState()


  const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = React.useRef();
  

  const { user,setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();

  const toast = useToast();
  
  const logoutHandler = function () {
    localStorage.removeItem("userInfo");
    history.push("/");
  }
 




  const handleSearch = async() => {
    if (!search) {
      toast({
          title: "please write something to search",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      console.log("TOken is ", user.token);

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      console.log("Result data",data);
      setSearchResults(data)
    } catch (error) {
      setLoading(false);
       toast({
         title: "failed to load data",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "top-left",
       });
    }

  }

  const accessChat = async (userId) => {
   
    try {
      setChatloading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setChatloading(false);
      onclose();
    } catch (error) {
      setChatloading(false)
      console.log(error);
      toast({
        title: "error while fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

    }



    
 };


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="search users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            ref={btnRef}
            colorScheme="teal"
            onClick={onOpen}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work-sans">
          Suraj's Chat-App
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* // menu list */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>

            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>

              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>

          <DrawerBody>
            <Box display="flex" flexDir="" pb={2}>
              <Input
                mr={2}
                placeholder="Type name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoadingStyle />
            ) : (searchResults && searchResults.length > 0 ? (
              searchResults.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              <Box>
                <Text>No user found</Text>
              </Box>
            ))}

            {chatLoading && <Spinner ml="auto" display="flex" />}



          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer
