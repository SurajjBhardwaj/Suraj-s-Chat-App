import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/ChatProvider';

const ProfileModel = ({ user, children }) => {

      const { isOpen, onOpen, onClose } = useDisclosure();
// const { user } = ChatState();




    return (
      
    <>
      {children ? (
        <span onClick={onOpen}> {children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h='410px' >
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="work-sans"
                        justifyContent="center"
                        display="flex"
                    >{user.name}</ModalHeader>
          <ModalCloseButton />
                    <ModalBody
                    
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        
                        
                        <Image
                        
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}
                        
                        />
                        <Text fontSize={{base:"28px", md:"30px"}} fontFamily="work-sans">
                            {user.email}
                            
                        </Text>


           </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModel
