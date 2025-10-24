import PropTypes from "prop-types";

function WorkExperience({
  companyImage,
  role,
  companyName,
  location,
  startDate,
  endDate,
  description,
}) {
  return (
    <div className="mb-8 max-w-4xl bg-neutral-800 rounded-2xl p-4 drop-shadow-2xl "> 
      {/* Header section with image and basic info */}
      <div className="flex gap-4">
        {/* Company Image */}
        <div className="flex-shrink-0">
          <img
            src={companyImage}
            alt={`${companyName} logo`}
            className="h-12 w-12 rounded object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 pr-0 md:pr-8">
          <h3 className="font-poppins text-lg text-white">{role}</h3>
          <p className="mb-1 font-poppins text-base text-gray-200">
            {companyName}
          </p>
          <p className="mb-2 font-poppins text-sm text-gray-400">
            {location} • {startDate} - {endDate}
          </p>
        </div>
      </div>

      {/* Bullet points - full width, aligned with left edge */}
      <ul className="mt-2 space-y-1 font-poppins text-sm leading-relaxed text-gray-200 md:text-base">
        {Array.isArray(description) ? (
          description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-gray-300">•</span>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <li className="flex items-start">
            <span className="mr-2 text-gray-600">•</span>
            <span>{description}</span>
          </li>
        )}
      </ul>
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
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default WorkExperience;
