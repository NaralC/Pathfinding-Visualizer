import React from "react";
import "./Button.css";

type Props = {
  text: string;
  isAnimating: boolean;
  extraClassName: string;
  handleClick: () => void;
};

const Button: React.FC<Props> = ({
  text,
  isAnimating,
  extraClassName,
  handleClick,
}) => {
  return (
    <button
      className={`button ${isAnimating ? extraClassName : ""}`}
      onClick={() => {
        if (!isAnimating) handleClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
