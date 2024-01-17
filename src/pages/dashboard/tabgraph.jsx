import React from 'react';
import {
	Box,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	Image,
} from '@chakra-ui/react';
import TabGraphTotal from './tabgraphtotal';
import LoaderImg from '../../assets/images/loader.gif';

const TabGraph = ({ AttendanceList, Loader }) => {
	console.log(AttendanceList, 'AttendanceList');
	return (
		<Box mb='45px' mt='20px'>
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
							bg: 'var(--chakra-colors-claimzMainGeadientColor)',
						},
					}}>
					<Tab>Total Employee</Tab>
					{/* <Tab>
                        IT Department
                    </Tab>
                    <Tab>
                        HR Department
                    </Tab> */}
				</TabList>
				<TabIndicator
					mt='-2px'
					height='3px'
					bg='white'
					borderRadius='1px'
				/>
				<TabPanels
					borderWidth='1px'
					borderRadius='0px 0px 5px 5px'
					shadow='1px 1px 3px rgba(0,0,0,0.3)'
					bg='white'>
					<TabPanel
						minH='470px'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						{Loader ? (
							<Image src={LoaderImg} alt='Loader' />
						) : (
							<TabGraphTotal AttendanceList={AttendanceList} />
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default TabGraph;
