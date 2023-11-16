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
import PendingList from './pendinglist';
import Approve from './approve';
import Decline from './decline';

const LeaveList = () => {
	return (
		<Tabs position='relative' variant='solid-rounded'>
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
				<Tab>Pending Leave</Tab>
				<Tab>Approve Leave</Tab>
				<Tab>Decline Leave</Tab>
			</TabList>
			<TabIndicator
				mt='-2px'
				height='3px'
				bg='white'
				borderRadius='1px'
			/>
			<TabPanels>
				<TabPanel p='0'>
					<PendingList />
				</TabPanel>
				<TabPanel p='0'>
					<Approve />
				</TabPanel>
				<TabPanel p='0'>
					<Decline />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default LeaveList;
