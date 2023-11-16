import React from 'react';
import {
	Box,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';

const Tdsform = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				onClick={onOpen}
				bg='none'
				_hover={{ bg: 'none' }}
				_active={{ bg: 'none' }}>
				<i className='fa-solid fa-eye fa-2x'></i>
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				size='xl'>
				<DrawerOverlay />
				<DrawerContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<DrawerCloseButton size='lg' />
					<DrawerHeader pt='28px'>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							pb='10px'
							mb='15px'
							width='400px'
							pb='10px'
							mb='15px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								TDS Value Submit Form
							</Text>
						</Box>
					</DrawerHeader>

					<DrawerBody>
						<Box
							background='white'
							border='1px solid #CECECE'
							boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='6px'
							padding='0px 10px'
							display='flex'>
							<Text>Particulars</Text>
							<Text>Value</Text>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Tdsform;
