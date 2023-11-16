import React from 'react';
import {
	Box,
	CircularProgress,
	CircularProgressLabel,
	Text,
} from '@chakra-ui/react';

const Multipleroundbar = () => {
	return (
		<Box
			display='flex'
			fontSize='1.4rem'
			flexWrap='wrap'
			justifyContent='space-between'>
			<Box
				bg='white'
				p='10px'
				borderRadius='10px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='210px'
				display='-webkit-inline-box'
				borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
				pb='10px'
				mb='15px'>
				<Box>
					<Text
						fontSize='1.4rem'
						fontWeight='600'
						color='claimzTextGrayColor'>
						Marketing Coordinator
					</Text>
					<Text fontWeight='600' color='claimzTextBlackColor'>
						30%
					</Text>
				</Box>
				<CircularProgress value={40} color='blue.400'>
					<CircularProgressLabel>40%</CircularProgressLabel>
				</CircularProgress>
			</Box>
			<Box
				bg='white'
				p='10px'
				borderRadius='10px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='210px'
				borderBottom='3px solid #964B00'>
				<Box>
					<Text
						fontSize='1.4rem'
						fontWeight='600'
						color='claimzTextGrayColor'>
						Graphics Designer
					</Text>
					<Text fontWeight='600' color='claimzTextBlackColor'>
						30%
					</Text>
				</Box>
				<CircularProgress value={40} color='#964B00'>
					<CircularProgressLabel>40%</CircularProgressLabel>
				</CircularProgress>
			</Box>
			<Box
				bg='white'
				p='10px'
				borderRadius='10px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='210px'
				borderBottom='3px solid #ED8936'>
				<Box>
					<Text
						fontSize='1.4rem'
						fontWeight='600'
						color='claimzTextGrayColor'>
						Frontend Developer
					</Text>
					<Text fontWeight='600' color='claimzTextBlackColor'>
						30%
					</Text>
				</Box>
				<CircularProgress value={40} color='orange.400'>
					<CircularProgressLabel>40%</CircularProgressLabel>
				</CircularProgress>
			</Box>
			<Box
				bg='white'
				p='10px'
				borderRadius='10px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='210px'
				borderBottom='3px solid #48BB78'>
				<Box>
					<Text
						fontSize='1.4rem'
						fontWeight='600'
						color='claimzTextGrayColor'>
						Project Manager
					</Text>
					<Text fontWeight='600' color='claimzTextBlackColor'>
						30%
					</Text>
				</Box>
				<CircularProgress value={40} color='green.400'>
					<CircularProgressLabel>40%</CircularProgressLabel>
				</CircularProgress>
			</Box>
			<Box
				bg='white'
				p='10px'
				borderRadius='10px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='210px'
				borderBottom='3px solid #ED8936'>
				<Box>
					<Text
						fontSize='1.4rem'
						fontWeight='600'
						color='claimzTextGrayColor'>
						Account Executive
					</Text>
					<Text fontWeight='600' color='claimzTextBlackColor'>
						30%
					</Text>
				</Box>
				<CircularProgress value={40} color='orange.400'>
					<CircularProgressLabel>40%</CircularProgressLabel>
				</CircularProgress>
			</Box>
		</Box>
	);
};

export default Multipleroundbar;
