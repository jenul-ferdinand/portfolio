import { useMemo } from "react";

import WorkExperience from "./components/WorkExperience";
import LoadingOverlay from "./components/LoadingOverlay";

import { useWorkExperience } from "./hooks/useWorkExperience";
import { useVolunteering } from "./hooks/useVolunteering";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import avatarImage from "./assets/images/avatar.jpg";

const name = "Jenul Ferdinand";
const currentPosition =
  "Bachelor of Computer Science (Advanced) at Monash University";
const aboutMe = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

function App() {
  const {
    workExperiences,
    loading: loadingWorkExperiences,
    error: errorWorkExperiences,
  } = useWorkExperience();
  const {
    volunteerings,
    loading: loadingVolunteerings,
    error: errorVolunteerings,
  } = useVolunteering();

  const getWorkExperiences = useMemo(() => {
    if (errorWorkExperiences)
      return (
        <p className="font-poppins text-gray-500">
          Error fetching work experience from resume...
        </p>
      );
    if (loadingWorkExperiences)
      return (
        <p className="font-poppins text-gray-500">Loading work experience...</p>
      );

    return workExperiences.map((experience, index) => {
      return <WorkExperience key={index} {...experience} />;
    });
  }, [workExperiences, loadingWorkExperiences, errorWorkExperiences]);

  const getVolunteerings = useMemo(() => {
    if (errorVolunteerings)
      return (
        <p className="font-poppins text-gray-500">
          Error fetching volunteering experience from resume...
        </p>
      );
    if (loadingVolunteerings)
      return (
        <p className="font-poppins text-gray-500">
          Loading volunteering experience...
        </p>
      );

    return volunteerings.map((experience, index) => {
      return <WorkExperience key={index} {...experience} />;
    });
  }, [volunteerings, loadingVolunteerings, errorVolunteerings]);

  return (
    <BrowserRouter>
      <LoadingOverlay />

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-neutral-950 px-8 py-12">
              {/* Header section with text on left, avatar on right */}
              <div className="relative w-full">
                {/* Left column - Text content */}
                <div className="sm:max-w-3xl sm:pr-0 md:max-w-7xl md:pr-52">
                  <h1 className="mb-2 font-tiempos text-4xl text-white">
                    {name}
                  </h1>
                  <h2 className="mb-8 font-tiempos text-xl text-gray-300">
                    {currentPosition}
                  </h2>

                  {/* About me */}
                  <p className="font-poppins text-gray-400">{aboutMe}</p>
                </div>

                {/* Right column - Avatar positioned to far right */}
                <div className="absolute right-0 top-0 hidden md:block">
                  <img
                    src={avatarImage}
                    alt="Jenul Ferdinand"
                    className="h-40 w-40 rounded-full border-2 border-gray-200 object-cover"
                  />
                </div>
              </div>

              {/* Work experience */}
              <div className="mt-12 max-w-4xl">
                <h2 className="mb-6 font-tiempos text-2xl text-gray-100">
                  Work Experience
                </h2>
                {getWorkExperiences}
              </div>

              {/* Volunteering */}
              <div className="mt-12 max-w-4xl">
                <h2 className="mb-6 font-tiempos text-2xl text-gray-100">
                  Volunteering
                </h2>
                {getVolunteerings}
              </div>
            </div>
          }
        />
        <Route path="/testing" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
