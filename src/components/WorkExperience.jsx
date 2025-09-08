import PropTypes from 'prop-types';

function WorkExperience({ 
  companyImage, 
  role, 
  companyName, 
  location, 
  startDate, 
  endDate, 
  description 
}) {
  return (
    <div className="flex gap-4 mb-8">
      {/* Company Image */}
      <div className="flex-shrink-0">
        <img 
          src={companyImage} 
          alt={`${companyName} logo`}
          className="w-12 h-12 rounded object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-tiempos text-lg text-gray-900">{role}</h3>
        <p className="font-poppins text-base text-gray-700 mb-1">{companyName}</p>
        <p className="font-poppins text-sm text-gray-500 mb-2">
          {location} • {startDate} - {endDate}
        </p>
        <ul className="font-poppins text-sm text-gray-600 leading-relaxed space-y-1">
          {Array.isArray(description) ? (
            description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">•</span>
              <span>{description}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

WorkExperience.propTypes = {
  companyImage: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
};

export default WorkExperience;