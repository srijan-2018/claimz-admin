import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ExtendedTheme from './pages/global/css/chakraExtendTheme';
import GlobalCss from './pages/global/css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/index';
import MasterSetting from './pages/mastersetting/index';
import Reports from './pages/reports/index';
import AttendanceSettings from './pages/mastersetting/attendancesetting';
import ConveyancePolicies from './pages/mastersetting/conveyancepolicies';
import ManageCompany from './pages/mastersetting/managecompany';
import ManageEmployee from './pages/allemployees';
import PayrollDetails from './pages/mastersetting/payrolldetails';
import TravelPolicies from './pages/mastersetting/travelpolicies';
import Login from './pages/login/login';
import Profile from './pages/profile';
import CompanyProfile from './pages/mastersetting/managecompany/companyprofile';
import BudgetList from './pages/mastersetting/managecompany/budgetlist';
import DepartmentSettings from './pages/mastersetting/managecompany/departmentsettings';
import EmployeeCode from './pages/mastersetting/managecompany/employeecode';
import GradeSetting from './pages/mastersetting/managecompany/gradeSetting';
import Designation from './pages/mastersetting/managecompany/designation';
import AddDepartment from './pages/mastersetting/managecompany/addDepartment';
import MultiStepForm from './pages/allemployees/mulistepform';
import AttendanceReportView from './pages/reports/attendanceReport';
import WeekofVariant from './pages/mastersetting/attendancesetting/weekofvariant';
import LeavePolicies from './pages/mastersetting/attendancesetting/leavepolicies';
import HolidayPolicies from './pages/mastersetting/attendancesetting/holidaypolicies';
import TrackManagement from './pages/mastersetting/attendancesetting/trackmanagement';
import AddTravelMode from './pages/mastersetting/conveyancepolicies/addtravelmode';
import AddNewType from './pages/mastersetting/travelpolicies/addnewtype';
import AddNewTravelMaster from './pages/mastersetting/travelpolicies/addnewtravelmaster';
import AddNewRegion from './pages/mastersetting/travelpolicies/addnewregion';
import EmpGenderWiseDiversityReportView from './pages/reports/employeeGenderWiseDiversityReport';
import EmpGenderWiseAttritionReportView from './pages/reports/employeeGenderWiseAttritionReport';
import EmpGradeWiseDiversityReportView from './pages/reports/employeeGradeWiseDiversityReport';
import EmpGroupWiseDiversityReportView from './pages/reports/employeeGroupWiseDiversityReport';
import EmpAgeWiseDiversityReportView from './pages/reports/employeeAgeWiseDiversityReport';
import EmpAgeWiseAttritionReportView from './pages/reports/employeeAgeWiseAttritionReport';
import MonthWiseAttritionReportView from './pages/reports/monthWiseAttritionReport';
import EmpJoiningDateWiseDiversityReportView from './pages/reports/employeeJoiningDateWiseDiversityReport';
import SalaryReportView from './pages/reports/salaryReport';
import DepartmentWiseSalaryReportView from './pages/reports/departmentWiseSalaryReport';
import OnboardingCandidate from './pages/mastersetting/onboarding';
import EmployeeDataList from './pages/allemployees/employeedatalist';
import ProbationEmployee from './pages/allemployees/probationemployee';
import SeparationEmployee from './pages/allemployees/separationemployee';
import ShiftManagement from './pages/shiftmanagement';
import ShiftAdd from './pages/shiftmanagement/shiftadd';
import ShiftList from './pages/shiftmanagement/shiftList';
import QuestionMaster from './pages/mastersetting/questionmaster.jsx/index';
import SalaryDetails from './pages/mastersetting/payrolldetails/SalaryDetails';
import BusinessLocationDatatable from './pages/mastersetting/businesslocation/businesslocationDatatable';
import AssetsHandover from './pages/mastersetting/assetshandover.jsx';
import NoticePeriodEmployee from './pages/allemployees/noticeperiodEmployee';
import AllEmployeeAttendanceReportView from './pages/reports/allEmployeeAttendance';
import EmployeeAttendancReportView from './pages/reports/employeeAttendanc';
import AllPayrollReportView from './pages/reports/allPayroll';
import PayslipList from './pages/mastersetting/payrolldetails/PayslipList';
import AssetsAdd from './pages/mastersetting/assetshandover.jsx/addAssets';
import CodeOfConduct from './pages/dashboard/template/codeOfConduct';
import Privacy from './pages/dashboard/template/privacy';
import ApprovalMechanism from './pages/mastersetting/approvalmechanism';
import TDSCalculator from './pages/mastersetting/tdscalculator';
import MyTemplate from './pages/mastersetting/mytemplate';
import Compofflist from './pages/reports/compofflist';
import RegularizatonList from './pages/reports/regularizatonlist';
import LeaveList from './pages/reports/leavelist';
import DutyRoster from './pages/mastersetting/dutyroster';
import Privetroute from './privetroute';
import './App.css';

function App() {
	return (
		<ChakraProvider theme={ExtendedTheme}>
			<GlobalCss />
			<Routes>
				<Route element={<Privetroute />}>
					<Route path='/' element={<Dashboard />} />
					<Route path='/privacy' element={<Privacy />} />
					<Route
						path='/code-of-conduct'
						element={<CodeOfConduct />}
					/>
					<Route path='/master-setting' element={<MasterSetting />}>
						<Route
							path='attendance-settings'
							element={<AttendanceSettings />}>
							<Route
								path='week-of-variant'
								element={<WeekofVariant />}
							/>
							<Route
								path='leave-policies'
								element={<LeavePolicies />}
							/>
							<Route
								path='holiday-policies'
								element={<HolidayPolicies />}
							/>
							<Route
								path='track-managment'
								element={<TrackManagement />}
							/>
						</Route>
						<Route
							path='conveyance-policies'
							element={<ConveyancePolicies />}
						/>
						<Route
							path='add-tarvel-mode'
							element={<AddTravelMode />}
						/>
						<Route
							path='manage-company'
							element={<ManageCompany />}>
							<Route
								path='company-profile'
								element={<CompanyProfile />}
							/>
							<Route
								path='employee-code'
								element={<EmployeeCode />}
							/>
							<Route
								path='department-settings'
								element={<DepartmentSettings />}
							/>
							<Route
								path='budget-list'
								element={<BudgetList />}
							/>
							<Route
								path='grade-setting'
								element={<GradeSetting />}
							/>
							<Route
								path='designation-setting'
								element={<Designation />}
							/>
						</Route>
						<Route
							path='add-department'
							element={<AddDepartment />}
						/>
						<Route path='add-new-type' element={<AddNewType />} />
						<Route
							path='add-new-travel-master'
							element={<AddNewTravelMaster />}
						/>
						<Route
							path='add-new-region'
							element={<AddNewRegion />}
						/>
						<Route
							path='payroll-details'
							element={<PayrollDetails />}
						/>
						<Route
							path='salary-details/:empid'
							element={<SalaryDetails />}
						/>
						<Route
							path='payslip-details/:empid'
							element={<PayslipList />}
						/>
						<Route
							path='travel-policies'
							element={<TravelPolicies />}
						/>
						<Route
							path='question-master'
							element={<QuestionMaster />}
						/>
						<Route
							path='business-location'
							element={<BusinessLocationDatatable />}
						/>
						<Route
							path='assets-master'
							element={<AssetsHandover />}
						/>
						<Route path='assets-add' element={<AssetsAdd />} />
						<Route
							path='approval-mechanism'
							element={<ApprovalMechanism />}
						/>
						<Route
							path='tds-calculator'
							element={<TDSCalculator />}
						/>
						<Route path='my-template' element={<MyTemplate />} />
						<Route path='duty-roster' element={<DutyRoster />} />
					</Route>
					<Route path='manage-employee' element={<ManageEmployee />}>
						<Route
							path='create-new-employee'
							element={<MultiStepForm />}
						/>
						<Route
							path='all-employee'
							element={<EmployeeDataList />}
						/>
						<Route
							path='probation-employee'
							element={<ProbationEmployee />}
						/>
						<Route
							path='separation-employee'
							element={<SeparationEmployee />}
						/>
						<Route
							path='notice-period-employee'
							element={<NoticePeriodEmployee />}
						/>
					</Route>
					<Route
						path='onboarding-candidate'
						element={<OnboardingCandidate />}
					/>
					<Route path='/reports' element={<Reports />}>
						<Route
							path='monthly-attendance-report'
							element={<AttendanceReportView />}
						/>
						<Route
							path='employee-attendance'
							element={<EmployeeAttendancReportView />}
						/>
						<Route
							path='all-employee-attendance'
							element={<AllEmployeeAttendanceReportView />}
						/>
						<Route
							path='monthly-salary-report'
							element={<SalaryReportView />}
						/>
						<Route
							path='department-wise-salary-report'
							element={<DepartmentWiseSalaryReportView />}
						/>
						<Route
							path='all-employee-payroll'
							element={<AllPayrollReportView />}
						/>
						{/* <Route path="company-wise-salary-report" element={<CompanyWiseSalaryReportView />} /> */}
						<Route
							path='employee-designation-wise-diversity-report'
							element={<EmpGroupWiseDiversityReportView />}
						/>
						<Route
							path='employee-grade-wise-diversity-report'
							element={<EmpGradeWiseDiversityReportView />}
						/>
						<Route
							path='employee-gender-wise-diversity-report'
							element={<EmpGenderWiseDiversityReportView />}
						/>
						<Route
							path='employee-age-wise-diversity-report'
							element={<EmpAgeWiseDiversityReportView />}
						/>
						<Route
							path='employee-joining-date-wise-diversity-report'
							element={<EmpJoiningDateWiseDiversityReportView />}
						/>
						<Route
							path='employee-age-wise-attrition-report'
							element={<EmpAgeWiseAttritionReportView />}
						/>
						<Route
							path='employee-gender-wise-attrition-report'
							element={<EmpGenderWiseAttritionReportView />}
						/>
						<Route
							path='month-wise-attrition-report'
							element={<MonthWiseAttritionReportView />}
						/>
						<Route path='compoff-list' element={<Compofflist />} />
						<Route
							path='regularizaton-list'
							element={<RegularizatonList />}
						/>
						<Route path='leave-list' element={<LeaveList />} />
					</Route>
					<Route path='/profile' element={<Profile />} />
					<Route
						path='/shift-management'
						element={<ShiftManagement />}>
						<Route
							path='add-shift-management'
							element={<ShiftAdd />}
						/>
						<Route path='shift-list' element={<ShiftList />} />
					</Route>
					<Route path='*' element={<Dashboard />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Login />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
