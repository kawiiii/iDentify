import React from "react";

const Tech = ({ img }) => {
  return (
    <div className="w-44 h-28 flex justify-center items-center rounded-md border border-slate-600 bg-slate-800">
      <img src={img} alt="" className="flex w-20" />
    </div>
  );
};

export default Tech;
