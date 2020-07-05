// Use to wait for popover close animation to finish
function timeout(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Trims rules with empty names from the rules list
const pruneRules = (setRules) => {
  setRules((old) => {
    return old.filter((o) => o.name !== "");
  });
};

// Hides the popover
const hidePopover = async (
  e,
  setSlidingOut,
  setIsPopoverActive,
  setActiveButton,
  pruneRules
) => {
  if (!e || e.target === e.currentTarget) {
    setSlidingOut(true);
    await timeout(201);
    setIsPopoverActive(false);
    setSlidingOut(false);
    setActiveButton("");
    pruneRules();
  }
};

// Displays the popover using the given button id and content
const displayPopover = async (
  name,
  content,
  isPopoverActive,
  hidePopover,
  setPopoverContent,
  setIsPopoverActive,
  setActiveButton
) => {
  if (isPopoverActive) await hidePopover();
  setPopoverContent(content);
  setIsPopoverActive(true);
  setActiveButton(name);
};

export { displayPopover, hidePopover, pruneRules };
