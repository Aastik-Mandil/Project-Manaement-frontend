import { BrowserRouter, Routes, Route } from "react-router";
import ProjectPage from "./pages/ProjectPage.tsx";
import TaskPage from "./pages/TaskPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<ProjectPage />} />
        <Route path="/:projectId" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
