import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Image
} from '@chakra-ui/react';
import CompanyProfile from './companyprofile'
import BudgetList from './budgetlist';
import DepartmentSettings from './departmentsettings';
import EmployeeCode from './employeecode';
import { useLocation } from 'react-router-dom'
import GradeSetting from "./gradeSetting";
import Designation from "./designation";
import Loader from "../../../assets/images/loader.gif"

const ManageCompany = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const [companyData, setCompanyData] = useState([]);
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("userDetails");
        const ManageCompany = async () => {
            try {
                setLoader(true)
                const response1 = await fetch(`${process.env.REACT_APP_API_URL}/company-profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response1.ok) {
                    const data1 = await response1.json();
                    setCompanyData(data1.data)
                    setLoader(false)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        };
        ManageCompany()
    }, []);


    return (
        <Box
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            {loader ?
                <Box
                    height='calc(100vh - 139px)'
                    display='flex'
                    alignItems='center'
                    justifyContent='center' >
                    <Image src={Loader} alt='Loader' />
                </Box>
                :
                <Box
                    width='100%'
                    borderWidth="1px"
                    rounded="lg"
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    maxWidth='100%'
                    minH='100%'
                    p='20px 15px'
                    m="0px auto"
                    bg='white'
                >
                    {location.pathname === '/master-setting/manage-company/company-profile' && (
                        <CompanyProfile companyData={companyData} key={companyData.id} />)}
                    {location.pathname === '/master-setting/manage-company/employee-code' && (
                        <EmployeeCode />)}
                    {location.pathname === '/master-setting/manage-company/department-settings' && (
                        <DepartmentSettings />)}
                    {location.pathname === '/master-setting/manage-company/budget-list' && (
                        <BudgetList />)}
                    {location.pathname === '/master-setting/manage-company/grade-setting' && (
                        <GradeSetting />)}
                    {location.pathname === '/master-setting/manage-company/designation-setting' && (
                        <Designation />)}


                </Box>
            }
        </Box>
    )
}

export default ManageCompany