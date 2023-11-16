import React from "react";
// import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {
    Box
} from '@chakra-ui/react';
import WeekofVariant from "./weekofvariant";
import LeavePolicies from "./leavepolicies";
import HolidayPolicies from "./holidaypolicies";
import TrackManagement from "./trackmanagement";



const AttendanceSettings = () => {
    let location = useLocation();

    return (
        <Box borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth='100%'
            minH='100%'
            p='20px 15px'
            bg='white'
            m="0px auto">

            {location.pathname === '/master-setting/attendance-settings/week-of-variant' && (
                <WeekofVariant />)}
            {location.pathname === '/master-setting/attendance-settings/leave-policies' && (
                <LeavePolicies />)}
            {location.pathname === '/master-setting/attendance-settings/holiday-policies' && (
                <HolidayPolicies />)}
            {location.pathname === '/master-setting/attendance-settings/track-managment' && (
                <TrackManagement />)}

        </Box>
    )
}


export default AttendanceSettings