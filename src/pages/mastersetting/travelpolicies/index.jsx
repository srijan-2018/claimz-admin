import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator
} from "@chakra-ui/react";
import TravelMasterSetting from "./travelmastersetting";
import TravelLimitSetting from "./travellimitsetting";

const TravelPolicies = () => {

  return (
    <Tabs position="relative" variant="unstyled">
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
        <Tab>Travel Master Setting</Tab>
        <Tab>Travel Limit Setting</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="3px"
        bg="claimzTextBlueLightColor"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel p="0px 0px 0px">
          <TravelMasterSetting />
        </TabPanel>
        <TabPanel p="0px 0px 0px">
          <TravelLimitSetting />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TravelPolicies;
