type dataType = {
  index: number;
  back(): void;
};

const BackButton = ({ index, back }: dataType) => {
  if (index > 0) {
    return (
      <button type="button" className="backBtn" onClick={back}>
        Go Back
      </button>
    );
  } else {
    return null;
  }
};

export default BackButton;
