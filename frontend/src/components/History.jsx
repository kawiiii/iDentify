import React from "react";

const History = ({ name, scans }) => {
  return (
    <div className="my-2">
      <p className="font-inter mb-1 text-gray-400 border-b border-gray-400">
        {name}
      </p>
      {scans.map((scan) => (
        <p className="font-inter cursor-pointer rounded-sm hover:bg-gray-700 text-gray-200 mb-1">
          {scan}
        </p>
      ))}
    </div>
  );
};

export default History;
