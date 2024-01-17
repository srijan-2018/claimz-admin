import {
	Box,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Image,
} from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BadgeGif from '../../assets/images/new-badge.gif';
const CssWrapper = styled.div`
	h2 {
		font-weight: 600;
		width: 100%;
		margin-bottom: 5px;
	}
`;

const MasterSetting = () => {
	let location = useLocation();
	return (
		<Box position='relative' width='100%' bg='rgba(230, 237, 239, 1)'>
			{location.pathname === '/master-setting' && (
				<CssWrapper>
					<Box>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							width='300px'
							pb='5px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Master Settings
							</Text>
						</Box>
						<Box
							display='flex'
							flexWrap='wrap'
							justifyContent='space-between'
							alignItems='center'
							pt='28px'
							mb='34px'
							sx={{
								'& .manage_items': {
									width: '48%',
								},
							}}>
							<Link
								to='manage-company/company-profile'
								className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-building fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Manage Company
									</Text>
								</Box>
							</Link>
							<Link to='travel-policies' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-location-dot fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Travel Policies
									</Text>
								</Box>
							</Link>
							<Link
								to='conveyance-policies'
								className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-shield-halved fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Conveyance Policies
									</Text>
								</Box>
							</Link>
							<Link to='payroll-details' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-sack-dollar fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Payroll Details
									</Text>
								</Box>
							</Link>
							<Link
								to='attendance-settings/week-of-variant'
								className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-clipboard-user fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Attendance Settings
									</Text>
								</Box>
							</Link>
							<Link to='question-master' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-user-plus fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Question Master
									</Text>
								</Box>
							</Link>
							<Link
								to='business-location'
								className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-building fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Business Location
									</Text>
								</Box>
							</Link>
							<Link to='assets-master' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-laptop-file fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Assets Master
									</Text>
								</Box>
							</Link>
							<Link
								to='approval-mechanism'
								className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-users fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Approval Mechanism
									</Text>
								</Box>
							</Link>
							<Link to='tds-calculator' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-calculator fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Tds Calculator
									</Text>
								</Box>
							</Link>
							<Link to='my-template' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-file fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										My Template
									</Text>
								</Box>
							</Link>
							<Link to='duty-roster' className='manage_items'>
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									border='2px solid var(--chakra-colors-claimzBorderColor)'
									p='20px 15px'
									borderRadius='15px'
									mb='15px'
									color='claimzTextBlueColor'
									cursor='pointer'
									transition='0.3s ease all'
									_hover={{
										bgGradient:
											'linear(180deg, #256DAA, #01325B)',
										color: 'white',
									}}>
									<i className='fa-solid fa-briefcase fa-2x'></i>
									<Text
										fontSize='2.2rem'
										fontWeight='700'
										pl='10px'>
										Duty Roster
									</Text>
								</Box>
							</Link>
						</Box>

						<Box
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							mb='15px'
							width='300px'
							pb='5px'
							display='flex'
							alignItems='center'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='30px'>
								Important Steps{' '}
							</Text>
							<Image src={BadgeGif} w='40px' h='40px' />
						</Box>

						<Box display='flex' mt='15px' pb='30px'>
							<Accordion
								w='100%'
								sx={{
									'& .chakra-accordion__item': {
										w: '100%',
									},
									'& .chakra-accordion__item h2 button': {
										fontSize: '1.6rem',
										fontWeight: 600,
										padding: '10px',
										w: '100%',
									},
								}}>
								<AccordionItem>
									<h2>
										<AccordionButton
											bg='var(--chakra-colors-claimzMainGeadientColor)'
											color='white'
											_hover={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}
											_expanded={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Manage Company
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel>
										<Box>
											<h2>Step 1: Easy access</h2>
											<p>
												Find the "Master Settings"
												option on the left-hand side and
												click on it. You'll see "Manage
												Company" as the first option.
												Give it a click!
											</p>

											<h2>Step 2: Employee Code</h2>
											<p>
												Now, focus on the "Employee
												Code" step. This is where you
												create a unique code format for
												your employees.
											</p>
											<ol>
												<li>
													Enter a letter of your
													choice as the "Prefix" to
													represent your employees.
												</li>
												<li>
													For "Start From," enter a
													number that aligns with your
													management needs.
												</li>
												<li>
													Once you're done, hit that
													"Submit" button and watch
													the magic happen!
												</li>
											</ol>
											<p>
												Don't forget to check out the
												employee code details, like the
												prefix, starting number, and the
												generated employee code itself.
												For example, Prefix: EMP, Start
												From: 100, Employee Code: 100.
												Easy peasy!
											</p>

											<h2>Step 3: Department Setting</h2>
											<p>
												You've conquered the Employee
												Code step, so let's move on to
												"Department Setting."
											</p>
											<ol>
												<li>
													Click on the "Add
													Department" button and
													provide the necessary
													information:
												</li>
												<ul>
													<li>
														Department Name: Name
														your department.
													</li>
													<li>
														Select Head of
														Department: Choose the
														leader of the
														department.
													</li>
													<li>
														Add Cost Center: Specify
														the cost center
														associated with the
														department.
													</li>
												</ul>
											</ol>

											<h2>Step 4: Grade Settings</h2>
											<p>
												Ready for the next step? Just
												hit "Next" and jump straight
												into "Grade Settings."
											</p>
											<ol>
												<li>
													Here, you'll find the option
													to "Add Grade Value." Go
													ahead and do it!
												</li>
												<li>
													Once you've entered the
													grade value, click "Submit"
													to save your changes.
												</li>
											</ol>

											<h2>Step 5: Designation</h2>
											<p>
												We're almost there! The final
												step in the "Manage Company"
												module is "Designation."
											</p>
											<ol>
												<li>
													Click on "Add Designation"
													and provide the required
													details.
												</li>
												<li>
													Don't forget to "Add Grade"
													to complete the process.
												</li>
												<li>
													Finally, hit "Submit" to
													wrap it all up!
												</li>
											</ol>

											<p>
												Congratulations! You've
												completed the "Manage Company"
												module. Give yourself a pat on
												the back!
											</p>
											<p>
												Now, head back to the "Menu Bar"
												and click on the second option,
												"Master Settings," to continue
												with the next set of exciting
												steps.
											</p>
											<p>
												Well done! The "Manage Company"
												module is completed.
											</p>
											<p>
												Now, go back to the "Menu Bar"
												and click the second option,
												"Master Settings," to complete
												the next few steps.
											</p>

											<h2>Master Settings</h2>
											<h2>Step 1: Manage Holidays</h2>
											<p>
												After clicking on "Master
												Settings" in the menu bar, you
												will be presented with a list of
												options. Click on "Manage
												Holidays" to proceed.
											</p>

											<h2>Step 2: Add Holiday</h2>
											<p>
												In the "Manage Holidays"
												section, you can add holidays
												that are observed by your
												company. Click on the "Add
												Holiday" button.
											</p>
											<p>
												Provide the following details
												for the holiday:
											</p>
											<ul>
												<li>
													Holiday Name: Enter the name
													of the holiday.
												</li>
												<li>
													Holiday Date: Specify the
													date when the holiday will
													be observed.
												</li>
											</ul>
											<p>
												Once you have filled in the
												details, click on "Submit" to
												save the holiday.
											</p>

											<h2>
												Step 3: View and Edit Holidays
											</h2>
											<p>
												After adding holidays, you can
												view the list of holidays in the
												"Manage Holidays" section. It
												will display the holiday name
												and date.
											</p>
											<p>
												To edit a holiday, click on the
												pencil icon next to the holiday
												you want to modify. You can
												change the holiday name or date,
												and then click "Submit" to save
												your changes.
											</p>

											<h2>Step 4: Delete Holidays</h2>
											<p>
												If you need to remove a holiday
												from the list, locate the trash
												bin icon next to the respective
												holiday and click on it. Confirm
												the deletion when prompted.
											</p>

											<h2>Step 5: Configure Weekends</h2>
											<p>
												To configure weekends, go back
												to the "Master Settings" section
												by clicking on the second option
												in the menu bar.
											</p>
											<p>
												Look for the "Configure
												Weekends" option and click on
												it.
											</p>
											<p>
												Here, you can select the days of
												the week that are considered
												weekends for your company.
												Simply toggle the buttons for
												the desired days to mark them as
												weekends, and click on "Submit"
												to save the changes.
											</p>

											<p>
												Congratulations! You have
												completed the steps in the
												"Master Settings" module. Keep
												up the great work! If you have
												any further instructions or need
												assistance with anything else,
												feel free to let me know.
											</p>
										</Box>
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton
											bg='var(--chakra-colors-claimzMainGeadientColor)'
											color='white'
											_hover={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}
											_expanded={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Attendance Setting
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel>
										<h2>Step 1: Week-Off Variant</h2>
										<p>
											Now, it's time to create your
											Week-Off Variant!
										</p>
										<p>
											Fill in the details for the Regular
											Variant and Alternative Variant,
											including the Alternate Week Off
											schedule.
										</p>
										<p>
											Once you're done, click on "Submit."
										</p>
										<p>
											Don't forget to check the "Weekoff
											Variant List" side by side for easy
											reference.
										</p>

										<h2>Step 2: Leave Policies</h2>
										<p>
											Click the "Next" button to proceed
											with the "Leave Policies" process.
										</p>
										<p>
											Get ready to set up your
											organisation's leave policies!
										</p>
										<p>
											Fill in the details for each Leave
											Type, including the Total Leave,
											Carry Forward, and Encashment
											options.
										</p>
										<p>
											Click on "Add Leave Type" to save
											the details.
										</p>
										<p>Need to make changes? No worries!</p>
										<p>
											You can edit the "Leave Type List"
											and update the Variant Details by
											clicking on the "Edit" button.
										</p>
										<p>
											Note: Keep in mind that there are
											customised options available for
											specific settings, such as Calendar
											Type (Calendar Year or Financial
											Year), Rule Type (One Time or
											Incremental), and Leave Type (Apply
											Sandwich Rule or Skip Sandwich
											Rule).
										</p>

										<h2>Step 3: Holiday Policies</h2>
										<p>
											Click the "Next" button to proceed
											to the final step: Holiday Policies.
										</p>
										<p>
											Here, you'll find a list of existing
											Holiday Policies.
										</p>
										<p>
											Click on "Add Holiday" to create a
											new holiday.
										</p>
										<p>
											Enter the Holiday Name, set the
											Holiday Date, and choose a Holiday
											Image to add some flair!
										</p>
										<p>
											Finally, set the Holiday Type as
											Common or Optional, depending on
											your organisation's policy.
										</p>
										<p>
											Click on "Add Holiday" to save the
											details.
										</p>
										<p>
											Congratulations! You've successfully
											set up your holiday policies.
										</p>

										<h2>
											Back to Master Settings: Business
											Location
										</h2>
										<p>
											Let's head back to "Master
											Settings." You'll find "Business
											Location" as the fourth option on
											the left-hand side.
										</p>
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton
											bg='var(--chakra-colors-claimzMainGeadientColor)'
											color='white'
											_hover={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}
											_expanded={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Business Location
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel>
										<h1>
											Step-by-Step Guide to Adding a
											Business Location on Claimz
											Dashboard
										</h1>

										<h2>
											Step 1: Click on the "Business
											Location" tab
										</h2>
										<p>
											Look for the button that says "Add
											Business Location" and give it a
											click.
										</p>

										<h2>Step 2: Enter the latitude</h2>
										<p>
											First, enter the latitude, which
											tells us how far north or south the
											location is from the equator.
										</p>

										<h2>Step 3: Enter the longitude</h2>
										<p>
											Next up, it's time for the
											longitude. This helps us determine
											the east-west position of the
											location.
										</p>

										<h2>Step 4: Specify the radius</h2>
										<p>
											We want to make sure we cover the
											right area, so let's specify the
											radius. This tells us how big of a
											circle should be drawn around the
											location.
										</p>

										<h2>Step 5: Select the location</h2>
										<p>
											Now, select the location from the
											available options. Choose the one
											that matches your business
											accurately.
										</p>

										<h2>Step 6: Submit</h2>
										<p>
											Awesome! Let's move forward by
											clicking on the "Submit" button.
											It's time to wrap up this process.
										</p>
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton
											bg='var(--chakra-colors-claimzMainGeadientColor)'
											color='white'
											_hover={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}
											_expanded={{
												bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												color: 'white',
											}}>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Shift Management
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel>
										<h1>Create a New Shift Schedule</h1>

										<h2>Step 1: Access the Menu Bar</h2>
										<p>
											Look for the fifth option called
											"Shift Management" and click on it.
										</p>

										<h2>Step 2: Add a New Shift</h2>
										<p>
											Fill in the "Shift Name" to give it
											a unique identifier that makes sense
											for your team.
										</p>

										<h2>
											Step 3: Set the Shift Schedule Time
										</h2>
										<p>
											Select the specific "Day" for the
											shift.
										</p>
										<p>
											Enter the "IN Time" when your
											employees should start their shifts.
										</p>
										<p>
											Specify the "OUT Time" for when the
											shift should end.
										</p>
										<p>
											Add a "Grace Time" if you'd like to
											allow a buffer period before
											considering someone late.
										</p>

										<h2>Step 4: Submit the Shift</h2>
										<p>
											Once you've entered all the
											necessary details, click on the
											"Submit" button.
										</p>

										<p>
											Congrats! You've completed the
											entire onboarding process.
										</p>

										<p>
											Pro tip: If you want to customize
											the Shift Schedule Time for
											additional days, simply click on
											"Add Others Day" and follow the same
											steps as before.
										</p>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Box>
					</Box>
				</CssWrapper>
			)}

			<Outlet />
		</Box>
	);
};

export default MasterSetting;
