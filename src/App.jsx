import WorkExperience from './components/WorkExperience'
import { useWorkExperience } from './hooks/useWorkExperience'

const name = 'Jenul Ferdinand'
const currentPosition = 'Computer Science Student at Monash University'

const aboutMe = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

function App() {
  const { workExperiences, loading } = useWorkExperience()

  return (
    <div className="min-h-screen bg-amber-50 px-8 py-12">
      {/* Name and title */}
      <div className="max-w-4xl">
        <h1 className="text-4xl font-tiempos text-gray-900 mb-2">{name}</h1>
        <h2 className="text-xl font-tiempos italic text-gray-600 mb-8">{currentPosition}</h2>
      </div>

      {/* About me */}
      <p className="font-poppins">{aboutMe}</p>

      {/* Work experience */}
      <div className="mt-12">
        <h2 className="text-2xl font-tiempos mb-6">Work Experience</h2>
        {loading ? (
          <p className="font-poppins text-gray-500">Loading work experience...</p>
        ) : (
          workExperiences.map((experience, index) => (
            <WorkExperience
              key={index}
              companyImage={experience.companyImage}
              role={experience.role}
              companyName={experience.companyName}
              location={experience.location}
              startDate={experience.startDate}
              endDate={experience.endDate}
              description={experience.description}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
