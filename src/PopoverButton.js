import React from "react";
import "./App.css";
import PropTypes from "prop-types";

// A button that manages displaying content in the popover
const PopoverButton = ({
  name,
  displayPopover,
  isPopoverActive,
  activeButton,
  hidePopover,
  content,
  children,
  injectCallback,
}) => {
  const isSelected = isPopoverActive && activeButton === name;
  const selectedClass = isSelected ? "selectedButton" : "unselectedButton";
  const classes = `ruleButton ${selectedClass}`;

  // If there is content to display, clone it and inject a callback that closes
  // the popover
  const toClone = content || children;
  var cloned = null;
  if (toClone && injectCallback) {
    cloned = React.cloneElement(toClone, { onFinished: hidePopover });
  }

  return (
    <div className="ruleButtonDiv">
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isSelected) {
            hidePopover(e);
          } else {
            if (isPopoverActive) hidePopover();
            displayPopover(name, cloned || toClone || "");
          }
        }}
        className={classes}
      >
        {name}
      </button>
    </div>
  );
};

PopoverButton.propTypes = {
  name: PropTypes.string.isRequired,
  displayPopover: PropTypes.func.isRequired,
  isPopoverActive: PropTypes.bool.isRequired,
  activeButton: PropTypes.string.isRequired,
  hidePopover: PropTypes.func.isRequired,
  content: PropTypes.node,
  children: PropTypes.node,
  injectCallback: PropTypes.bool,
};

export default PopoverButton;
