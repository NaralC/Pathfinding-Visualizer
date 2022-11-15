import React from "react";
import { BsGithub, DiReact, SiTypescript, SiTailwindcss, GiDaisy } from "react-icons/all";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer-center flex flex-col justify-center px-12 gap-y-3 p-4 bg-neutral text-neutral-content">
      <div className="flex gap-5 tooltip">
        <div className="tooltip" data-tip="React">
          <DiReact className="hover:animate-spin transition-all delay-150 hover:mx-5 text-4xl md:text-6xl hover:text-cyan-400 text-white" />
        </div>
        <div className="tooltip" data-tip="TypeScript">
          <SiTypescript className="transition-all delay-150 hover:mx-5 text-3xl md:text-5xl hover:text-blue-500 text-gray-300 bg-white rounded-btn" />
        </div>
        <div className="tooltip" data-tip="Tailwind CSS">
          <SiTailwindcss className="transition-all delay-150 hover:mx-5 text-4xl md:text-6xl hover:text-sky-400 text-white "/>
        </div>
        <div className="tooltip" data-tip="daisyUI">
          <GiDaisy className="transition-all delay-150 hover:mx-5 text-4xl md:text-6xl hover:text-purple-600 text-white" />
        </div>
        <a
          className="tooltip"
          data-tip="Check out the code!"
          href="https://github.com/NaralC/Pathfinding-Visualizer"
          target="_blank"
        >
          <BsGithub className="text-3xl md:text-5xl w-20 transition-all delay-150 hover:mx-5" />
        </a>
      </div>
      <p className="text-xs lg:text-sm 2xl:text-lg">
        From Naral Chaler © 2022 — Built With These Lovely Tools! 👆
      </p>
    </footer>
  );
};

export default Footer;
