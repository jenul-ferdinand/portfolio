import { useMemo } from 'react';

import WorkExperience from './components/WorkExperience';
import LoadingOverlay from './components/LoadingOverlay';

import { useWorkExperience } from './hooks/useWorkExperience';
import { useVolunteering } from './hooks/useVolunteering';

const name = 'Jenul Ferdinand';
const currentPosition = 'Bachelor of Computer Science (Advanced) at Monash University';

const aboutMe = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

function App() {
  const { workExperiences, loading: loadingWorkExperiences, error: errorWorkExperiences } = useWorkExperience()
  const { volunteerings, loading: loadingVolunteerings, error: errorVolunteerings } = useVolunteering()

  const getWorkExperiences = useMemo(() => {
    if (errorWorkExperiences) 
      return <p className="font-poppins text-gray-500">Error fetching work experience from resume...</p>;
    if (loadingWorkExperiences) 
      return <p className="font-poppins text-gray-500">Loading work experience...</p>;

    return (
      workExperiences.map((experience, index) => {
        return <WorkExperience key={index} {...experience} />
      })
    );
  }, [workExperiences, loadingWorkExperiences, errorWorkExperiences]);

  const getVolunteerings = useMemo(() => {
    if (errorVolunteerings)
      return <p className="font-poppins text-gray-500">Error fetching volunteering experience from resume...</p>;
    if (loadingVolunteerings)
      return <p className="font-poppins text-gray-500">Loading volunteering experience...</p>;

    return (
      volunteerings.map((experience, index) => {
        return <WorkExperience key={index} {...experience} />
      })
    );
  }, [volunteerings, loadingVolunteerings, errorVolunteerings])

  return (
    <>
      <LoadingOverlay />
      <div className="min-h-screen bg-amber-50 px-8 py-12">
        {/* Name and title */}
        <div className="max-w-4xl">
          <h1 className="text-4xl font-tiempos text-gray-900 mb-2">{name}</h1>
          <h2 className="text-xl font-tiempos text-gray-700 mb-8">{currentPosition}</h2>
        </div>

        {/* About me */}
        <p className="font-poppins">{aboutMe}</p>

        {/* Work experience */}
        <div className="mt-12">
          <h2 className="text-2xl font-tiempos mb-6">Work Experience</h2>
          {getWorkExperiences}
        </div>

        {/* Volunteering */}
        <div className="mt-12">
          <h2 className="text-2xl font-tiempos mb-6">Volunteering</h2>
          {getVolunteerings}
        </div>
      </div>
    </>
  );
}

export default App;
