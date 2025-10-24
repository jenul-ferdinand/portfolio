import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { extractImageColors } from "../utils/extractImageColors";

function WorkExperience({
  companyImage,
  role,
  companyName,
  location,
  startDate,
  endDate,
  description,
}) {
  // Gradients and colours
  const [gradient, setGradient] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const colors = await extractImageColors(companyImage, 3);
        const gradientString = `linear-gradient(135deg, ${colors.join(", ")})`;
        setGradient(gradientString);
      } catch (error) {
        console.warn("Failed to extract colors from image:", error);
        // Fallback gradient
        setGradient("linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)");
      }
    };

    loadColors();
  }, [companyImage]);

  return (
    <div className="group relative mb-8 max-w-4xl rounded-2xl p-[2px]">
      <div
        className="absolute inset-0 rounded-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: gradient || "transparent",
        }}
      />
      <div className="relative rounded-2xl bg-neutral-800 p-4 drop-shadow-2xl">
        {/* Header section with image and basic info - clickable */}
        <div
          className="flex cursor-pointer gap-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Company Image */}
          <div className="flex-shrink-0 select-none">
            <img
              src={companyImage}
              alt={`${companyName} logo`}
              className="h-12 w-12 rounded object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 pr-0 md:pr-8">
            {/* Role */}
            <h3 className="select-none font-poppins text-lg text-white">
              {role}
            </h3>
            {/* Company name */}
            <p className="mb-1 select-none font-poppins text-base text-gray-200">
              {companyName}
            </p>
            {/* Location and dates */}
            <p className="select-none font-poppins text-sm text-gray-400">
              {location} • {startDate} - {endDate}
            </p>
          </div>

          {/* Expand/Collapse Icon */}
          <div className="flex items-center">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Bullet points - collapsible */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-2 space-y-1 font-poppins text-sm leading-relaxed text-gray-200 md:text-base">
            {Array.isArray(description) ? (
              description.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 select-none text-gray-300">•</span>
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
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default WorkExperience;
