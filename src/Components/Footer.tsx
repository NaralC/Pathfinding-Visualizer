import React from "react";
import { default as react_logo } from "../assets/react.svg";
import { default as ts_logo } from "../Assets/ts.svg";
import { default as tailwind_logo } from "../Assets/tailwind.svg";
import { default as daisy_logo } from "../Assets/daisy.svg";
import { BsGithub } from "react-icons/all";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer-center flex flex-col justify-center px-12 gap-y-3 p-4 bg-neutral text-neutral-content">
      <div className="flex gap-5 tooltip">
        <div className="tooltip" data-tip="React">
          <img
            className="w-8 md:w-12 hover:animate-spin transition-all delay-150 hover:mx-5"
            src={react_logo}
          />
        </div>
        <div className="tooltip" data-tip="TypeScript">
          <img
            className="w-8 md:w-12 transition-all delay-150 hover:mx-5"
            src={ts_logo}
          />
        </div>
        <div className="tooltip" data-tip="Tailwind CSS">
          <img
            className="w-8 md:w-14 transition-all delay-150 hover:mx-5"
            src={tailwind_logo}
          />
        </div>
        <div className="tooltip" data-tip="daisyUI">
          <img
            className="w-8 md:w-20 transition-all delay-150 hover:mx-5"
            src={daisy_logo}
          />
        </div>
        <a className="tooltip" data-tip="Check out the code!" href="https://github.com/NaralC/Pathfinding-Visualizer" target="_blank">
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
