import React from "react";
import "./App.css";
import PopoverButtonHOC from "./PopoverButtonHOC.js";
import * as util from "./util.js";
import Sidebar from "./Sidebar.js";
import Viewport from "./Viewport.js";

const App = () => {
  // Manages whether the popover is being displayed
  const [isPopoverActive, setIsPopoverActive] = React.useState(false);

  // Manages the content of the popover
  const [popoverContent, setPopoverContent] = React.useState(null);

  // Manages the id of the button that activated the popover, if active
  const [activeButton, setActiveButton] = React.useState("");

  // Tracks if the popover is currently in its closing animation
  const [slidingOut, setSlidingOut] = React.useState(false);

  // Manages the top level tracery rule. Stored as an array for ease of interop
  // with things that handle `rules`
  const [originRule, setOriginRule] = React.useState([
    {
      name: "origin",
      contents: ["Start editing rules to generate text"],
    },
  ]);

  // Manages all non-origin tracery rules
  const [rules, setRules] = React.useState([]);

  // Prunes empty rules
  const pruneRules = () => util.pruneRules(setRules);

  // Hides the popover
  const hidePopover = async (e) =>
    await util.hidePopover(
      e,
      setSlidingOut,
      setIsPopoverActive,
      setActiveButton,
      pruneRules
    );

  // Displays the popover
  const displayPopover = async (name, content) =>
    await util.displayPopover(
      name,
      content,
      isPopoverActive,
      hidePopover,
      setPopoverContent,
      setIsPopoverActive,
      setActiveButton
    );

  // Bind common values of the PopoverButtonHOC
  const PopoverButtonWrapper = PopoverButtonHOC({
    displayPopover: displayPopover,
    isPopoverActive: isPopoverActive,
    activeButton: activeButton,
    hidePopover: hidePopover,
  });

  return (
    <div className="App">
      <Sidebar
        hidePopover={hidePopover}
        PopoverButtonWrapper={PopoverButtonWrapper}
        originRule={originRule}
        setOriginRule={setOriginRule}
        rules={rules}
        setRules={setRules}
      />

      <Viewport
        slidingOut={slidingOut}
        isPopoverActive={isPopoverActive}
        hidePopover={hidePopover}
        popoverContent={popoverContent}
        rules={rules}
        setRules={setRules}
        originRule={originRule}
        setOriginRule={setOriginRule}
      />
    </div>
  );
};

export default App;
