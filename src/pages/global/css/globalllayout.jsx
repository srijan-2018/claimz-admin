import {
	Box,
	Image,
	Text,
	Menu,
	MenuItem,
	Button,
	useBoolean,
	keyframes,
	MenuButton,
	MenuList,
} from '@chakra-ui/react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';
import React, { useState } from 'react';
import UserLogo from '../../../assets/images/user.jpg';

const navigations = [
	{
		name: 'Dashboard',
		link: '/',
		path: 'fa-solid fa-chart-line',
		disabled: false,
		available: true,
		parent: '',
	},
	{
		name: 'Master Setting',
		link: '/master-setting',
		path: 'fa-solid fa-gears',
		disabled: false,
		available: true,
		parent: '',
	},
	{
		name: 'All Employee',
		link: '/manage-employee/all-employee',
		path: 'fa-solid fa-users',
		disabled: false,
		available: true,
		parent: '',
	},
	{
		name: 'Onboarding Candidate',
		link: '/onboarding-candidate',
		path: 'fa-solid fa-user-plus',
		disabled: false,
		available: true,
		parent: '',
	},
	{
		name: 'Shift Management',
		link: '/shift-management',
		path: 'fa-solid fa-business-time',
		disabled: false,
		available: true,
		parent: '',
	},
	{
		name: 'Reports',
		link: '/reports',
		path: 'fa-solid fa-square-poll-vertical',
		disabled: false,
		available: true,
		parent: '',
	},
];

const Globalllayout = () => {
	const userDetails = localStorage.getItem('user');
	const [user] = useState(JSON.parse(window.atob(userDetails)));
	let navigate = useNavigate();
	const [flag, setFlag] = useBoolean();
	const [isFullScreen, setIsFullScreen] = useState(false);
	const imageUrl = user?.profile_photo;
	const defaultImageUrl = UserLogo;

	const handleImageError = (event) => {
		event.target.src = defaultImageUrl;
	};

	const logOut = () => {
		localStorage.clear();
		navigate('/login');
	};

	const bellshake = keyframes`
        0% { transform: rotate(0); }
        25% { transform: rotate(8deg); }
        50% { transform: rotate(-8deg); }
        45% { transform: rotate(6deg); }
        60% { transform: rotate(-6deg); }
        75% { transform: rotate(4deg); }
        85% { transform: rotate(-4deg); }
        92% { transform: rotate(2deg); }
        100% { transform: rotate(0); }
    `;

	const animation = `${bellshake} .5s cubic-bezier(.36,.07,.19,.97) both`;

	const toggleFullScreen = () => {
		if (
			!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement &&
			!document.webkitFullscreenElement &&
			!document.msFullscreenElement
		) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				// Firefox
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				// Chrome, Safari and Opera
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				// IE/Edge
				document.documentElement.msRequestFullscreen();
			}
			setIsFullScreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				// Firefox
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				// Chrome, Safari and Opera
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				// IE/Edge
				document.msExitFullscreen();
			}
			setIsFullScreen(false);
		}
	};

	return (
		<Box display='flex'>
			<Box
				width={flag ? '80px' : '300px'}
				overflowX='hidden'
				height='100vh'
				bg='var(--chakra-colors-claimzMainGeadientColor)'
				transition='0.2s ease all'
				p='0px 10px'>
				<Link to='/'>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						height='75px'>
						<Image src={Logo} alt='logo' w='150px' />
					</Box>
				</Link>
				<Box
					pt='15px'
					sx={{
						'& .chakra-menu__menuitem a': {
							color: 'white',
							height: '100%',
							width: '100%',
							padding: `${
								flag
									? '10px 10px 10px 10px'
									: '10px 10px 10px 35px'
							}`,
							borderRadius: '10px',
							fontSize: '1.6rem',
							fontWeight: 500,
							transition: 'none',
						},
						'& .chakra-menu__menuitem a:hover': {
							borderRadius: '10px',
							backgroundColor: 'var(--chakra-colors-gray-200)',
							color: 'var(--chakra-colors-pmsTextDarkBlueColor)',
						},
						'& .chakra-menu__menuitem a.active': {
							borderRadius: '10px',
							backgroundColor: 'var(--chakra-colors-gray-200)',
							color: 'var(--chakra-colors-pmsTextDarkBlueColor)',
						},
					}}>
					<Menu>
						{navigations.map((navlinks) => {
							return (
								<MenuItem
									_hover={{ bg: 'none' }}
									_active={{ bg: 'none' }}
									_focus={{ bg: 'none' }}
									key={navlinks.name}>
									<NavLink to={navlinks.link}>
										<Box
											display='flex'
											alignItems='center'
											justifyContent={
												flag ? 'center' : 'flex-start'
											}>
											<i className={navlinks.path}></i>
											{flag ? (
												''
											) : (
												<Text
													lineHeight='2.4rem'
													pl='10px'
													fontWeight='600'>
													{navlinks.name}
												</Text>
											)}
										</Box>
									</NavLink>
								</MenuItem>
							);
						})}
					</Menu>
				</Box>
			</Box>
			<Box
				width={flag ? 'calc(100% - 80px)' : 'calc(100% - 300px)'}
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				transition='0.2s ease all'>
				<Box
					height='75px'
					bg='white'
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 6px - 1px, rgba(0, 0, 0, 0.06) 0px 2px 4px - 1px'>
					<Box display='flex' alignItems='center'>
						<Button
							padding='10px'
							bg='none'
							_hover={{ bg: 'none' }}
							_active={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							outline='none'
							onClick={setFlag.toggle}>
							<HamburgerIcon boxSize={8} />
						</Button>

						<Text
							fontSize='20px'
							fontWeight='600'
							color='claimzTextBlueColor'>
							Dashboard
						</Text>
					</Box>

					<Box display='flex' alignItems='center' pr='15px'>
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<ChevronDownIcon boxSize={8} />}
								h='60px'
								bg='none'
								_hover={{ bg: 'none' }}
								_active={{ bg: 'none' }}
								_focus={{ bg: 'none' }}>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'>
									<Box
										display='flex'
										justifyContent='center'
										alignItems='center'
										m='0 auto'
										height='40px'
										width='40px'
										border='4px solid #2d689b'
										bg='#2d689b'
										color='white'
										borderRadius='50px'>
										{/* {user?.profile_photo ? (
											<Image
												src={user?.profile_photo}
												borderRadius='50px'
											/>
										) : (
											<Text fontWeight='600'>
												{user.emp_name?.slice(0, 1)}
											</Text>
										)} */}
										<Image
											src={imageUrl}
											borderRadius='50px'
											onError={handleImageError}
										/>
									</Box>
									<Box
										display='flex'
										flexDirection='column'
										alignItems='flex-start'
										ml='15px'>
										<Text
											background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
											backgroundClip='text'
											fontWeight='700'
											fontSize='20px'
											lineHeight='36px'>
											{user.user.emp_name}
										</Text>
									</Box>
								</Box>
							</MenuButton>
							<MenuList
								minW='230px'
								sx={{
									'& .chakra-menu__menuitem': {
										padding: '10px 15px',
									},
								}}>
								{/* <Link to='/profile'>
                                    <MenuItem display='flex' justifyContent='space-between'>
                                        <Text fontWeight='600' color='claimzTextBlackColor'>My Account</Text>
                                        <Text color='claimzTextBlueColor'><i className="fa-solid fa-user"></i></Text>
                                    </MenuItem>
                                </Link> */}
								<MenuItem
									display='flex'
									justifyContent='space-between'
									onClick={logOut}>
									<Text
										fontWeight='600'
										color='claimzTextBlackColor'>
										Logout
									</Text>
									<Text color='claimzTextBlueColor'>
										<i className='fa-solid fa-right-from-bracket'></i>
									</Text>
								</MenuItem>
							</MenuList>
						</Menu>

						<Box
							px='15px'
							color='claimzTextBlackColor'
							_hover={{
								animation: `${animation}`,
								transformOrigin: 'top',
							}}>
							<i className='fa-solid fa-bell fa-2x'></i>
						</Box>

						<Button
							onClick={toggleFullScreen}
							background='none'
							_hover={{ bg: 'none' }}
							_active={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							px='15px'
							color='claimzTextBlackColor'>
							<i className='fa-solid fa-expand fa-2x'></i>
						</Button>
					</Box>
				</Box>
				<Box
					height='calc(100vh - 75px)'
					width='100%'
					bg='rgba(230, 237, 239, 1)'
					padding='20px'
					overflowY='scroll'>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default Globalllayout;
