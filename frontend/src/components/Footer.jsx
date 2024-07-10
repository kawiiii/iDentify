import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 pt-10 pb-6 border-t border-teal-700 mt-6">
      <div className="flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Collaborator 1 */}
          <div className="p-4 border border-teal-700 rounded-md">
            <h3 className="text-lg font-bold mb-2">Kanwal Mehreen</h3>
            <p className="mb-2">Technical Editor at KDNuggets</p>
            <p className="mb-2">
              National University of Sciences and Technology (NUST)
            </p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:kmehreen.bese20seecs@seecs.edu.pk"
                className="text-teal-300 hover:underline"
              >
                kmehreen.bese20seecs@seecs.edu.pk
              </a>
            </p>
          </div>

          {/* Collaborator 2 */}
          <div className="p-4 border border-teal-700 rounded-md">
            <h3 className="text-lg font-bold mb-2">Dr. Hassan Aqeel Khan</h3>
            <p className="mb-2">Senior Lecturer, Applied AI & Robotics</p>
            <p className="mb-2">Aston University</p>
            <p>
              Email:{" "}
              <a
                href="mailto:h.khan54@aston.ac.uk"
                className="text-teal-300 hover:underline"
              >
                h.khan54@aston.ac.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
