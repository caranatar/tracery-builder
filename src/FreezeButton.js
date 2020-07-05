import React from "react";
import PropTypes from "prop-types";

const FreezeButton = ({ isFrozen, setIsFrozen }) => {
  const toggle = () => setIsFrozen(!isFrozen);
  const text = isFrozen ? "Unfreeze" : "Freeze";
  return (
    <button type="button" onClick={toggle}>
      {text}
    </button>
  );
};
FreezeButton.propTypes = {
  isFrozen: PropTypes.bool.isRequired,
  setIsFrozen: PropTypes.func.isRequired,
};

export default FreezeButton;
