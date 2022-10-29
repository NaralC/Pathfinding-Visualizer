import React from "react";
import "./Button.css";

type Props = {
  text: string;
  isClickable: boolean;
  extraClassName: string;
  handleClick: () => void;
};

const Button: React.FC<Props> = ({
  text,
  isClickable,
  extraClassName,
  handleClick,
}) => {
  return (
    <button
      className={`button ${isClickable ? "" : extraClassName} text-xs sm:text-sm md:text-md lg:text-lg`}
      onClick={() => {
        if (isClickable) handleClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
