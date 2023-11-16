import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import TravelMaster from './travelMaster'
import TravelLimit from './travelLimit'
import FoodLimit from './foodLimit'
import IncidentalLimit from './incidentalLimit'

const ConveyancePolicies = () => {
    return (
        <Box>
            <Tabs position="relative" variant='solid-rounded'>
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
                            bg: 'claimzMainGeadientColor'
                        }
                    }}
                >
                    <Tab>
                        Mode of Travel Master
                    </Tab>
                    <Tab>
                        Travel Limit
                    </Tab>
                    <Tab>
                        Food Limit
                    </Tab>
                    <Tab>
                        Incidental Limit
                    </Tab>
                </TabList>
                <TabIndicator
                    mt="-2px"
                    height="3px"
                    bg="white"
                    borderRadius="1px"
                />
                <TabPanels
                    borderWidth="1px"
                    borderRadius='0px 0px 5px 5px'
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    bg='white'
                >
                    <TabPanel>
                        <TravelMaster />
                    </TabPanel>
                    <TabPanel>
                        <TravelLimit />
                    </TabPanel>
                    <TabPanel>
                        <FoodLimit />
                    </TabPanel>
                    <TabPanel>
                        <IncidentalLimit />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box >
    )
}

export default ConveyancePolicies