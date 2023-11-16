import { extendTheme } from '@chakra-ui/react'

// Checkout the explanation and code sample in https://chakra-ui.com/docs/theming/customize-theme

const ExtendedTheme = extendTheme({
    // style object for base or default style
    baseStyle: {
        fonts: {
            heading: '"Montserrat", sans-serif',
            body: '"Montserrat", sans-serif'
        }
    },
    breakpoints: {
        smallDevice: '560px',
        mediumDevice: '768px',
        lg: '1023px',
        xl: '1368px',
        '2xl': '1536px'
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {},
    // default values for `size` and `variant`
    defaultProps: {
        size: '',
        variant: ''
    },

    styles: {
        global: {
            html: {
                fontSize: '62.5%',
                fontFamily: 'Montserrat, sans-serif'
            },
            body: {
                fontSize: '1.5rem',
                fontFamily: 'Montserrat, sans-serif',
                lineHeight: '2.1rem',
                fontWeight: '400',
                marginRight: '0 !important'
            },
            p: {
                fontSize: '1.5rem',
                lineHeight: '2.1rem',
                fontWeight: '400',
                fontFamily: 'Montserrat, sans-serif'
            },
            img: {
                maxWidth: '100%',
                height: 'auto'
            },
            a: {
                transition: 'all 0.4s ease-in-out',
                _hover: {
                    transition: 'all 0.4s ease-in-out'
                }
            },
            h1: {
                fontSize: '2rem'
            },
            h2: {
                fontSize: '1.5rem'
            }
        }
    },
    colors: {
        claimzMainGeadientColor: 'linear-gradient(rgb(40, 114, 176), rgb(0, 48, 88))',
        claimzBorderColor: 'rgba(39, 112, 174, 1)',
        claimzOrangeColor: 'rgba(235, 50, 35, 1)',
        claimzTextBlueColor: 'rgba(1, 50, 90, 1)',
        claimzTextBlueLightColor: 'rgba(8, 61, 106, 0.8)',
        claimzLightBlueColor: 'rgba(39,112,174,1)',
        claimzTextBlackColor: 'rgba(0, 0, 0, 0.7)',
        claimzTextGrayColor: 'rgba(177, 177, 177, 1)',
        claimzBorderGrayColor: 'rgba(118, 115, 115, 0.6)',
        claimzIconGreentColor: 'rgba(0, 173, 86, 1)',
        statusInactiveStrokeColor: 'rgba(234,236,239,1)',
        boxShadowGrayColor: 'rgba(187, 194, 205, 0.93)',
        statusActiveColor: 'rgba(57, 193, 126, 1)'
    },
    textStyles: {
        h1: {
            // you can also use responsive styles
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 'semibold'
        },
        button: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.5rem',
            transition: 'all 0.4s ease-in-out',
            border: '1px solid transparent',
            _hover: {
                transition: 'all 0.4s ease-in-out'
            }
        },
        input: {
            fontSize: '1.3rem'
        },
        label: {
            fontSize: '1.3rem'
        }
    }
})

export default ExtendedTheme