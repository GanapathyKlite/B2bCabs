import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FaLocationArrow } from "react-icons/fa";

type NextButtonProps = {
  index: number;
  onClick: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["onClick"];
};

const NextButton: React.FC<NextButtonProps> = ({ index, onClick }) => {
  return (
    <button
      type="submit"
      className={`primaryBtn ${index === 3 ? "btn-success" : ""}`}
      onClick={onClick}
    >
      {index === 3 ? <FaLocationArrow /> : ""}&nbsp;
      {index === 3 ? "Submit" : "Next"}
    </button>
  );
};

export default NextButton;
