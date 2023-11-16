import React from 'react'
import { 
    Box,
    Heading, 
    Image, 
    Text, 
    Button,  
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { Editor } from "primereact/editor";


const Privacy = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>

            <Box
                width='100%'
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth='100%'
                minH='100%'
                p='20px 15px'
                m="0px auto"
                bg='white'
            >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus vitae aperiam eius aspernatur repudiandae modi ipsam voluptate beatae commodi qui, rem voluptas excepturi praesentium quas sunt aut vero vel, sapiente, consectetur porro? Consequuntur sit ex laudantium, ratione nam voluptas, repudiandae, doloribus sed quaerat quibusdam cupiditate aperiam perspiciatis. Consequatur, enim veritatis!
            </Box>


        
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent minW='50%'>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="card">
                            <Editor value="Always bet on Prime!" readOnly style={{ height: '320px' }} />
                        </Box> 
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </div>
  )
}

export default Privacy