import React from "react";
import { BsGithub, FaFileCode, GiMaze, SiOpenstreetmap } from "react-icons/all";

const Hero: React.FC = () => {
  return (
    <div className="modal modal-open modal-middle backdrop-blur-sm">
      <div className="modal-box flex flex-col gap-4 overflow-visible items-center max-w-xl">
        <SiOpenstreetmap className="text-6xl font-extrabold" />

        <div className="text-3xl font-semibold text-center">
          Pathfinding Visualizer
        </div>
        <div className="font-medium text-center">
          This project was made to practice React, TypeScript, and Tailwind
        </div>
        <div className="flex">
          <GiMaze className="text-3xl mx-2" />
          <pre className="font-bold">Step 1 </pre>Pick a maze generation
          algorithm!
        </div>
        <div className="flex">
          <FaFileCode className="text-3xl mx-2" />
          <pre className="font-semibold">Step 2 </pre>Pick a pathfinding
          algorithm!
        </div>
        <div className="flex">
          <pre className="font-bold">Step 3 </pre>Eureka!
        </div>
        <a
          className="tooltip tooltip-bottom"
          data-tip="Check out the code!"
          href="https://github.com/NaralC/Pathfinding-Visualizer"
          target="_blank"
        >
          <BsGithub className="text-3xl md:text-5xl w-20 transition-all delay-150 hover:mx-5" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
