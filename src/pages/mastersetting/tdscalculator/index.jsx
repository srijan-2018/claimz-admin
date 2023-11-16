import React from 'react';
import {
	Box,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	TabIndicator,
} from '@chakra-ui/react';
import TdsList from './tdslist';
import TDSListStatus from './tdsliststatus';
import TdsListEdit from './tdslistedit';

const TDSCalculator = () => {
	return (
		<Tabs position='relative' variant='unstyled'>
			<TabList
				sx={{
					'& .chakra-tabs__tab': {
						borderRadius: '15px 15px 0px 0px',
						color: 'claimzTextBlueLightColor',
						fontSize: '1.6rem',
						fontWeight: '700',
						pb: '10px',
						pt: '10px',
					},
					'& .chakra-tabs__tab[aria-selected=true]': {
						borderRadius: '15px 15px 0px 0px',
						color: 'white',
						bg: 'claimzMainGeadientColor',
					},
				}}>
				<Tab>Pending Declaration</Tab>
				<Tab>TDS Calculation</Tab>
				<Tab>TDS Calculation Update</Tab>
			</TabList>
			<TabIndicator
				mt='-2.5px'
				height='3px'
				bg='claimzTextBlueLightColor'
				borderRadius='1px'
			/>
			<TabPanels>
				<TabPanel p='0px 0px 0px'>
					<Box
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px'
						padding='0px'>
						<TDSListStatus />
					</Box>
				</TabPanel>
				<TabPanel p='0px 0px 0px'>
					<Box
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px'
						padding='0px'>
						<TdsList />
					</Box>
				</TabPanel>
				<TabPanel p='0px 0px 0px'>
					<Box
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px'
						padding='0px'>
						<TdsListEdit />
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default TDSCalculator;
