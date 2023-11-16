import React from "react";
import {
    Box,
    Image,
    Center,
    Text
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const CssWrapper = styled.div`
     .chakra-card {
        flex-direction: row;
        padding: 3px;
        align-items: center;
        max-height: 100%;
        height: 100px;
     }
     .chakra-card__header {
        padding: 2px;
     }
     .chakra-card__header img {
        width: 70px;
     }

     .chakra-card__body p {
        font-size: 13px;
        font-weight: 700;
     }

`

function ReportListItem({ icon, title }) {
    return (
        <CssWrapper>
            <Box bg='white' display='flex' gap='15px' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' alignItems='center' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                color: 'white'
            }}>
                <Box>
                    <Image
                        width="50px"
                        src={icon}
                        alt="icon..."
                    />
                </Box>
                <Box>
                    <Text fontSize="16px" fontWeight='700' >{title}</Text>
                </Box>
            </Box>
        </CssWrapper>
    );
}



export default ReportListItem;
