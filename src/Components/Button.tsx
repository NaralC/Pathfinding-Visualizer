import React from "react";
import "./Button.css";

type ButtonProps = {
  text: string;
  isClickable: boolean;
  extraClassName: string;
  handleClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  isClickable,
  extraClassName,
  handleClick,
}) => {
  return (
    <button
      className={`button ${isClickable ? "" : extraClassName}`}
      onClick={() => {
        if (isClickable) { handleClick(); }
      }}
    >
      {text}
    </button>
  );
};

export default Button;
