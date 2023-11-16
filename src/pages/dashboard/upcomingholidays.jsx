import React from 'react';
import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Spinner,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const CssWrapper = styled.div`
	.table-wrapper::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	.table-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.table-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}
`;

const UpcomingHolidays = ({ UpComingEvent, Loader }) => {
	return (
		<CssWrapper>
			<Box>
				<Heading mb='15px' color='claimzTextBlueColor'>
					Up Coming Events
				</Heading>
				{Loader ? (
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						height='380px'>
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
					</Box>
				) : (
					<Box
						height='380px'
						overflowY='scroll'
						className='table-wrapper'>
						<Table>
							<Thead
								bg='#EAEAEA'
								sx={{
									'& tr th': {
										fontSize: '1.4rem',
										fontWeight: '700',
										textTransform: 'capitalize',
										p: '15px 10px',
									},
									'& tr th:nth-of-type(3),th:nth-of-type(4)':
										{
											textAlign: 'center',
										},
								}}>
								<Tr>
									<Th>Name</Th>
									<Th textAlign='center'>Event Title</Th>
									<Th textAlign='center'>Days</Th>
									<Th textAlign='center'>Date</Th>
								</Tr>
							</Thead>
							<Tbody
								sx={{
									'& tr td': {
										fontSize: '1.4rem',
										fontWeight: '500',
										textTransform: 'capitalize',
										p: '15px 10px',
										color: 'gray.500',
									},
									'& tr td:nth-of-type(3),td:nth-of-type(4)':
										{
											textAlign: 'center',
										},
								}}>
								{UpComingEvent?.length <= 0 ? (
									<Tr>
										<Td colSpan={4} textAlign='center'>
											No record found
										</Td>
									</Tr>
								) : (
									<>
										{UpComingEvent?.map((data, index) => {
											const currentDate = new Date();

											const targetDate = new Date();
											const [month, day] =
												data.date.split('-');

											targetDate.setMonth(
												parseInt(month) - 1
											); // Set the month (zero-based index)
											targetDate.setDate(parseInt(day)); // Set the day of the month

											// Set the time to midnight to avoid discrepancies caused by different times of the day
											currentDate.setHours(0, 0, 0, 0);
											targetDate.setHours(0, 0, 0, 0);

											// Calculate the time difference in milliseconds
											const timeDiff =
												targetDate.getTime() -
												currentDate.getTime();

											// Convert the time difference to days
											const daysLeft = Math.ceil(
												timeDiff / (1000 * 60 * 60 * 24)
											);

											return (
												<Tr key={index}>
													<Td>{data.ocassion}</Td>
													<Td textAlign='center'>
														{data.type}
													</Td>
													<Td>{daysLeft} Days</Td>
													<Td textAlign='center'>
														{data.date}
													</Td>
												</Tr>
											);
										})}
									</>
								)}
							</Tbody>
						</Table>
					</Box>
				)}
			</Box>
		</CssWrapper>
	);
};

export default UpcomingHolidays;
