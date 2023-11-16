import React from 'react'
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';

const LastCompany = () => {
    return (
        <>
            <Heading w="100%" fontWeight="600" mb="2%" color='claimzTextBlueColor'>
                <Box as='span' pr='15px'><i className="fa-solid fa-building"></i></Box>  Last Company Documents (If Any)

            </Heading>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' mb='20px'>
                <FormControl w='31%' sx={{
                    '& [type="file"]::-webkit-file-upload-button':
                    {
                        bg: '#F3F6FC',
                        color: 'inputplaceholderColor',
                        border: 'none',
                        borderRight: '1px solid',
                        borderColor: 'inputStrokeColor',
                        borderRadius: '2px 0px 0px 2px',
                        fontWeight: '500',
                        fontSize: '1.3rem',
                        height: '35px',
                        lineHeight: '2.2rem',
                        padding: '0px 10px',
                        marginRight: '15px'
                    },
                    '& [type="file"]::-webkit-file-upload-button:hover':
                    {
                        bg: 'dataTableRowBorder'
                    }
                }}>
                    <FormLabel >
                        Offer Letter
                    </FormLabel>
                    <Input type='file'
                        placeholder="Logo"
                        p='0px'
                        sx={{
                            '::file-selector-button': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid',
                                borderRightColor:
                                    'var(--chakra-colors-inputStrokeColor);',
                                outline: 'none',
                                mr: 2,
                                p: '12px 14px',
                                color: 'var(--chakra-colors-inputplaceholderColor)',
                                backgroundColor: '#f3f3f3'
                            }
                        }} />
                </FormControl>

                <FormControl w='31%' sx={{
                    '& [type="file"]::-webkit-file-upload-button':
                    {
                        bg: '#F3F6FC',
                        color: 'inputplaceholderColor',
                        border: 'none',
                        borderRight: '1px solid',
                        borderColor: 'inputStrokeColor',
                        borderRadius: '2px 0px 0px 2px',
                        fontWeight: '500',
                        fontSize: '1.3rem',
                        height: '35px',
                        lineHeight: '2.2rem',
                        padding: '0px 10px',
                        marginRight: '15px'
                    },
                    '& [type="file"]::-webkit-file-upload-button:hover':
                    {
                        bg: 'dataTableRowBorder'
                    }
                }}>
                    <FormLabel >
                        Resignation Letter
                    </FormLabel>
                    <Input type='file'
                        placeholder="Logo"
                        p='0px'
                        sx={{
                            '::file-selector-button': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid',
                                borderRightColor:
                                    'var(--chakra-colors-inputStrokeColor);',
                                outline: 'none',
                                mr: 2,
                                p: '12px 14px',
                                color: 'var(--chakra-colors-inputplaceholderColor)',
                                backgroundColor: '#f3f3f3'
                            }
                        }} />
                </FormControl>

                <FormControl w='31%' sx={{
                    '& [type="file"]::-webkit-file-upload-button':
                    {
                        bg: '#F3F6FC',
                        color: 'inputplaceholderColor',
                        border: 'none',
                        borderRight: '1px solid',
                        borderColor: 'inputStrokeColor',
                        borderRadius: '2px 0px 0px 2px',
                        fontWeight: '500',
                        fontSize: '1.3rem',
                        height: '35px',
                        lineHeight: '2.2rem',
                        padding: '0px 10px',
                        marginRight: '15px'
                    },
                    '& [type="file"]::-webkit-file-upload-button:hover':
                    {
                        bg: 'dataTableRowBorder'
                    }
                }}>
                    <FormLabel >
                        Appointment Letter
                    </FormLabel>
                    <Input type='file'
                        placeholder="Logo"
                        p='0px'
                        sx={{
                            '::file-selector-button': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid',
                                borderRightColor:
                                    'var(--chakra-colors-inputStrokeColor);',
                                outline: 'none',
                                mr: 2,
                                p: '12px 14px',
                                color: 'var(--chakra-colors-inputplaceholderColor)',
                                backgroundColor: '#f3f3f3'
                            }
                        }} />
                </FormControl>
            </Box>
            <Box display='flex' flexWrap='wrap' mb='20px'>
                <FormControl mr='30px' w='31%' sx={{
                    '& [type="file"]::-webkit-file-upload-button':
                    {
                        bg: '#F3F6FC',
                        color: 'inputplaceholderColor',
                        border: 'none',
                        borderRight: '1px solid',
                        borderColor: 'inputStrokeColor',
                        borderRadius: '2px 0px 0px 2px',
                        fontWeight: '500',
                        fontSize: '1.3rem',
                        height: '35px',
                        lineHeight: '2.2rem',
                        padding: '0px 10px',
                        marginRight: '15px'
                    },
                    '& [type="file"]::-webkit-file-upload-button:hover':
                    {
                        bg: 'dataTableRowBorder'
                    }
                }}>
                    <FormLabel >
                        Release Letter
                    </FormLabel>
                    <Input type='file'
                        placeholder="Logo"
                        p='0px'
                        sx={{
                            '::file-selector-button': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid',
                                borderRightColor:
                                    'var(--chakra-colors-inputStrokeColor);',
                                outline: 'none',
                                mr: 2,
                                p: '12px 14px',
                                color: 'var(--chakra-colors-inputplaceholderColor)',
                                backgroundColor: '#f3f3f3'
                            }
                        }} />
                </FormControl>
                <FormControl w='31%' sx={{
                    '& [type="file"]::-webkit-file-upload-button':
                    {
                        bg: '#F3F6FC',
                        color: 'inputplaceholderColor',
                        border: 'none',
                        borderRight: '1px solid',
                        borderColor: 'inputStrokeColor',
                        borderRadius: '2px 0px 0px 2px',
                        fontWeight: '500',
                        fontSize: '1.3rem',
                        height: '35px',
                        lineHeight: '2.2rem',
                        padding: '0px 10px',
                        marginRight: '15px'
                    },
                    '& [type="file"]::-webkit-file-upload-button:hover':
                    {
                        bg: 'dataTableRowBorder'
                    }
                }}>
                    <FormLabel >
                        Payslip
                    </FormLabel>
                    <Input type='file'
                        placeholder="Logo"
                        p='0px'
                        sx={{
                            '::file-selector-button': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid',
                                borderRightColor:
                                    'var(--chakra-colors-inputStrokeColor);',
                                outline: 'none',
                                mr: 2,
                                p: '12px 14px',
                                color: 'var(--chakra-colors-inputplaceholderColor)',
                                backgroundColor: '#f3f3f3'
                            }
                        }} />
                </FormControl>
            </Box>
        </>
    );
}

export default LastCompany