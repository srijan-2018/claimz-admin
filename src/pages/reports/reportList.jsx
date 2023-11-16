import React from 'react';
import { Grid, GridItem, Box, Heading } from '@chakra-ui/react';
import ReportListItem from '../reports/reportListItem';
import { Link } from 'react-router-dom';
import DepartmentSalaryIcon from '../../assets/images/department-wise-salary.png';
import AgeDiversityIcon from '../../assets/images/employee-age-diversity.png';
import DesignationDiversityIcon from '../../assets/images/employee-designation-diversity.png';
import GenderDiversityIcon from '../../assets/images/employee-gender-diversity.png';
import GradeDiversityIcon from '../../assets/images/employee-grade-diversity.png';
import MonthlyAttendanceIcon from '../../assets/images/monthly-attendance.png';
import MonthlySalaryIcon from '../../assets/images/mothly-salary.png';
import EmployeeAttendance from '../../assets/images/Employee_Attendance.png';
import AllEmployeeAttendance from '../../assets/images/AllEmployee_Attendance.png';
import AllEmployeePayroll from '../../assets/images/AllEmployee_Payroll.png';
import LeaveIcon from '../../assets/images/leave-icon.png';
import ScheduleIcon from '../../assets/images/schedule-icon.png';
import ChecklistIcon from '../../assets/images/checklist-icon.png';

const ReportList = () => {
	return (
		<>
			<Box
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'
				marginBottom='30px'>
				<Heading>Attendance Report</Heading>
			</Box>
			<Grid templateColumns='repeat(3, 1fr)' gap={39} mb='30px'>
				<GridItem>
					<Link to='monthly-attendance-report'>
						<ReportListItem
							icon={MonthlyAttendanceIcon}
							title={'Monthly Attendance'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-attendance'>
						<ReportListItem
							icon={EmployeeAttendance}
							title={'Employee Attendance'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='all-employee-attendance'>
						<ReportListItem
							icon={AllEmployeeAttendance}
							title={'All Employee Attendance'}
						/>
					</Link>
				</GridItem>
			</Grid>

			<Grid templateColumns='repeat(3, 1fr)' gap={39} mb='30px'>
				<GridItem>
					<Link to='compoff-list'>
						<ReportListItem
							icon={LeaveIcon}
							title={'Compoff List'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='regularizaton-list'>
						<ReportListItem
							icon={ScheduleIcon}
							title={'regularisation-list'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='leave-list'>
						<ReportListItem
							icon={ChecklistIcon}
							title={'Leave List'}
						/>
					</Link>
				</GridItem>
			</Grid>

			<Box
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'
				marginBottom='30px'>
				<Heading>Salary Reports</Heading>
			</Box>
			<Grid templateColumns='repeat(3, 1fr)' gap={39} mb='30px'>
				<GridItem>
					<Link to='monthly-salary-report'>
						<ReportListItem
							icon={MonthlySalaryIcon}
							title={'Monthly Salary'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='department-wise-salary-report'>
						<ReportListItem
							icon={DepartmentSalaryIcon}
							title={'Department Wise Salary'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='all-employee-payroll'>
						<ReportListItem
							icon={AllEmployeePayroll}
							title={'All Employee Payroll'}
						/>
					</Link>
				</GridItem>
			</Grid>

			<Box
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'
				marginBottom='30px'>
				<Heading>Others Report</Heading>
			</Box>
			<Grid templateColumns='repeat(3, 1fr)' gap={39} mb='30px'>
				<GridItem>
					<Link to='employee-designation-wise-diversity-report'>
						<ReportListItem
							icon={DesignationDiversityIcon}
							title={'Employee Designation Wise Diversity'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-grade-wise-diversity-report'>
						<ReportListItem
							icon={GradeDiversityIcon}
							title={'Employee Grade Wise Diversity'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-gender-wise-diversity-report'>
						<ReportListItem
							icon={GenderDiversityIcon}
							title={'Employee Gender Wise Diversity'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-age-wise-diversity-report'>
						<ReportListItem
							icon={AgeDiversityIcon}
							title={'Employee Age Wise Diversity'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-joining-date-wise-diversity-report'>
						<ReportListItem
							icon={AgeDiversityIcon}
							title={'Employee Joining Date Wise Diversity'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-age-wise-attrition-report'>
						<ReportListItem
							icon={AgeDiversityIcon}
							title={'Employee Age Wise Attrition'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='employee-gender-wise-attrition-report'>
						<ReportListItem
							icon={GenderDiversityIcon}
							title={'Employee Gender Wise Attrition'}
						/>
					</Link>
				</GridItem>
				<GridItem>
					<Link to='month-wise-attrition-report'>
						<ReportListItem
							icon={MonthlyAttendanceIcon}
							title={'Month Wise Attrition'}
						/>
					</Link>
				</GridItem>
			</Grid>
		</>
	);
};

export default ReportList;
