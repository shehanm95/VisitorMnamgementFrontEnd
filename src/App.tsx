import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { LoginForm } from './components/authentication/LoginForm';
import { RegisterForm } from './components/authentication/RegisterForm';
import ProtectedRoute from './context/ProtectedRoute';
import { UserProfile } from './components/profile/UserProfile';
import { Home } from './components/Home';
import { Unauthorized } from './components/common/Unauthorized';
import { VisitorDashboard } from './components/dashboard/VisitorDashboard';
import { ModeratorDashboard } from './components/dashboard/ModeratorDashboard';
import { OfficerDashboard } from './components/dashboard/OfficerDashboard';
import { ShowTypesNOptionsDashboard } from './components/dashboard/dashboardComponents/visitOptions/ShowTypesNOptionsDashboard';
import VisitorPage from './components/dashboard/dashboardComponents/VisitorPage';
import { CreateVisitOption } from './components/dashboard/dashboardComponents/visitOptions/CreateVisitOption';
import { GoToOptions } from './components/dashboard/dashboardComponents/goToOptions/GoToOptions';
import { DisplayVisitTypes } from './components/frontOfficePage/DisplayVisitTypes';
import { DisplayVisitOptions } from './components/frontOfficePage/DisplayOptionPage';
import { LinkService } from './frontServices/LinkService';
import { FrontRegistration } from './components/frontOfficePage/FrontRegistration';
import { FrontLogin } from './components/frontOfficePage/FrontLogin';
import { EmaiVeryfyPage } from './components/frontOfficePage/EmaiVeryfyPage';
import { FrontTakePhotoPage } from './components/frontOfficePage/FrontTakePhotoPage';
import AddDynamicQuestionForm from './components/dashboard/dashboardComponents/visitOptions/AddDynamicQuestion';
import ButtonAdder from './components/test/ButtonAdder';
import { FrontAskQuestionsPage } from './components/frontOfficePage/FrontAskQuestionsPage';
import FrontDisplayQuestion from './components/frontOfficePage/frontComp/frontDisplayQuestion';
import { FrontShowVisitDetailsPage } from './components/frontOfficePage/FrontShowVisitDetailsPage';
import { FrontThankyouPage } from './components/frontOfficePage/FrontThankyouPage';
import { TimeRangeAdder } from './components/test/TimeRangeAdder';
import { SpecificDateAdder } from './components/dashboard/dashboardComponents/visitOptions/smallComp/SpecificDateAdder';
import { TParent } from './components/test/TParent';
import { ApiTester } from './components/test/ApiTester';
import { PrintTest } from './components/test/PrintTest';
import { PreReg } from './components/preReg/PreReg';
import { PreRegTypes } from './components/preReg/PreRegTypes';
import { PreRegOptions } from './components/preReg/PreRegOptions';
import { PreRegSetVisitRow } from './components/preReg/PreRegSetVisitRow';
import PreRegDisplayQuestion from './components/preReg/PreRegDisplayQuestion';
import { PreRegThankYou } from './components/preReg/PreRegThankYou';
import { AddServicePoint } from './components/dashboard/dashboardComponents/AddServicePoint';
import PointParent from './components/servicePoint/PointParent';
import PointScanVisit from './components/servicePoint/PointScanUser';
import { PointContext, PointProvider } from './context/PointContext';
import { PointAnswering } from './components/servicePoint/PointAnswering';
import { PointFullVisit } from './components/servicePoint/PointFullVisit';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return localStorage.getItem('accessToken') ? element : <Navigate to={LinkService.getInstance().login} />;
};

function App() {
  const links = LinkService.getInstance();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PointProvider>
        <Routes>
          <Route path={links.login} element={<LoginForm />} />
          <Route path={links.register} element={<RegisterForm />} />
          <Route path={links.home} element={<PrivateRoute element={<Home />} />} />
          <Route path={links.unauthorized} element={<PrivateRoute element={<Unauthorized />} />} />
          <Route path={links.root} element={<Navigate to={links.preReg.base} />} />
          <Route path={links.test} element={<PrintTest />} />

          <Route path={links.profile.base} element={<UserProfile />} />


          <Route path={links.preReg.base} element={<PreReg />}>
            <Route path={links.preReg.types} element={<PreRegTypes />} />
            <Route path={links.preReg.preRegOptions} element={<PreRegOptions />} />
            <Route path={links.preReg.setRow} element={<PreRegSetVisitRow />} />
            <Route path={links.preReg.questions} element={<PreRegDisplayQuestion />} />
            <Route path={links.preReg.thankyou} element={<PreRegThankYou />} />
          </Route>


          <Route path={links.frontOffice.visitTypes} element={<DisplayVisitTypes />} />
          <Route path={links.frontOffice.visitOptions} element={<DisplayVisitOptions />} />
          <Route path={links.frontOffice.register} element={<FrontRegistration />} />
          <Route path={links.frontOffice.login} element={<FrontLogin />} />
          <Route path={links.frontOffice.verifyEmail} element={<EmaiVeryfyPage />} />
          <Route path={links.frontOffice.takePhoto} element={<FrontTakePhotoPage />} />
          <Route path={links.frontOffice.answerQuestions} element={<FrontAskQuestionsPage />} />
          <Route path={links.frontOffice.showVisitDetails} element={<FrontShowVisitDetailsPage />} />
          <Route path={links.frontOffice.thankyouAndInstructions} element={<FrontThankyouPage />} />


          <Route path={links.servicePoint.base} element={<PointParent />}>
            <Route path={links.servicePoint.scan} element={<PointScanVisit />} />
            <Route path={links.servicePoint.answerQuestions} element={<PointAnswering />} />
            <Route path={links.servicePoint.showFullVisit} element={<PointFullVisit />} />
          </Route>






          <Route
            path={links.user}
            element={
              <ProtectedRoute roles={['VISITOR', 'ADMIN', 'MODERATOR']}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path={links.visitorDashboard}
            element={
              <ProtectedRoute roles={['VISITOR']}>
                <VisitorDashboard />
              </ProtectedRoute>
            }
          />
          {/* Moderator Dashboard Routes */}
          <Route
            path={links.moderatorDashboard.base}
            element={
              <ProtectedRoute roles={['MODERATOR']}>
                <ModeratorDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path={links.moderatorDashboard.visitOptions}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <ShowTypesNOptionsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={links.moderatorDashboard.goToOptions}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <GoToOptions />
                </ProtectedRoute>
              }
            />
            <Route
              path={links.moderatorDashboard.createVisitOption}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <CreateVisitOption />
                </ProtectedRoute>
              }
            />
            <Route
              path={links.moderatorDashboard.addDynamicQuestion}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <AddDynamicQuestionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path={links.moderatorDashboard.addServicePoint}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <AddServicePoint />
                </ProtectedRoute>
              }
            />
            <Route
              path={links.moderatorDashboard.allVisitors}
              element={
                <ProtectedRoute roles={['MODERATOR']}>
                  <VisitorPage />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* Officer Dashboard Route */}
          <Route
            path={links.officerDashboard}
            element={
              <ProtectedRoute roles={['OFFICER']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PointProvider>
    </>
  );
}

export default App;