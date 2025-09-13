import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./landingPage/LandingPage";
<<<<<<< HEAD
=======
import Dashboard from "./pages/Dashboard";
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Home from "./pages/dashboard/Home";
import IntroductionPage from "./pages/dashboard/IntroductionPage";
import SkillsPage from "./pages/dashboard/SkillsPage";
import EducationPage from "./pages/dashboard/EducationPage";
import ExperiencePage from "./pages/dashboard/ExperiencePage";
import ProjectsPage from "./pages/dashboard/ProjectsPage";
import PreviewPage from "./pages/dashboard/PreviewPage";
import LinkPage from "./pages/dashboard/LinkPage";
import Portfolio from "./pages/portfolio/Portfolio";
import Settings from "./pages/dashboard/Settings";
import ProtectedRoute from "./component/ProtectedRoute";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="preview" element={<PreviewPage />} />
            <Route path="link" element={<LinkPage />} />
<<<<<<< HEAD
            <Route path="settings" element={<Settings />} />
=======
            
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
          </Route>
        </Route>

        <Route path="/portfolio/:userName" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
