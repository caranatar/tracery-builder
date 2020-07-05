import React from "react";
import PropTypes from "prop-types";
import PopoverButton from "./PopoverButton.js";

// This function binds some common variables used in every PopoverButton so
// only necessary properties are passed in in the JSX
function PopoverButtonHOC({
  displayPopover,
  isPopoverActive,
  activeButton,
  hidePopover,
}) {
  const Wrapper = ({ name, content, children, injectCallback }) => {
    return (
      <PopoverButton
        name={name}
        displayPopover={displayPopover}
        isPopoverActive={isPopoverActive}
        activeButton={activeButton}
        hidePopover={hidePopover}
        content={content}
        injectCallback={injectCallback}
      >
        {children}
      </PopoverButton>
    );
  };
  Wrapper.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.node,
    children: PropTypes.node,
    injectCallback: PropTypes.bool,
  };
  return Wrapper;
}
PopoverButtonHOC.propTypes = {
  displayPopover: PropTypes.func.isRequired,
  isPopoverActive: PropTypes.bool.isRequired,
  activeButton: PropTypes.string.isRequired,
  hidePopover: PropTypes.func.isRequired,
};

export default PopoverButtonHOC;
