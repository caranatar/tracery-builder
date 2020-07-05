import React from "react";
import PropTypes from "prop-types";
import { loadChicken, loadAdvanced } from "./examples.js";
import FreezeButton from "./FreezeButton.js";
import tracery from "tracery-grammar";

const Viewport = ({
  slidingOut,
  isPopoverActive,
  hidePopover,
  popoverContent,
  rules,
  setRules,
  originRule,
  setOriginRule,
}) => {
  // Manages the frozen/unfrozen state of text generation in the viewport
  const [isFrozen, setIsFrozen] = React.useState(false);

  // Manages the generated text shown in the viewport
  const [traceryOutput, setTraceryOutput] = React.useState([]);

  // If rules, originRule, or isFrozen change, generate a new tracery output, if
  // not currently frozen
  React.useEffect(() => {
    if (!isFrozen) {
      // Convert from internal format to JSON format expected by tracery
      const inGrammar = rules.reduce((acc, curr) => {
        acc[curr.name] = curr.contents;
        return acc;
      }, {});
      inGrammar["origin"] = originRule[0].contents;

      // Create the tracery grammar
      var grammar = tracery.createGrammar(inGrammar);

      // Add the base English modifiers
      grammar.addModifiers(tracery.baseEngModifiers);

      // Generate the text and split on newlines so the rendering code can
      // easily insert line breaks
      setTraceryOutput(grammar.flatten("#origin#").split("\n"));
    }
  }, [rules, originRule, isFrozen]);

  // Set the popover's className based on whether it's currently sliding out
  const popoverClass = slidingOut ? "slide-out" : "slide-in";

  return (
    <div id="viewport" onClick={(e) => hidePopover(e)}>
      {isPopoverActive ? (
        <div id="popover" className={popoverClass}>
          {popoverContent}
        </div>
      ) : null}
      <div id="viewport-contents">
        <h2>Tracery Builder</h2>
        <p>
          This is a react app that can be used to build grammars for Kate
          Compton&apos;s{" "}
          <a href="https://github.com/galaxykate/tracery">Tracery language</a>.
          The origin rule is always the starting point and cannot be deleted.
          Additional rules can be added using the Add Rule button at the bottom
          of the sidebar. Clicking a rule in the sidebar will allow you to edit
          or delete the rule.
        </p>
        <p>
          To generate a new expansion, click Generate. To prevent the current
          expansion from being overwritten, click the Freeze button. Click it
          again to resume generating expansions.
        </p>
        <p>
          To load a simple example grammar:{" "}
          <a href="#" onClick={(e) => loadChicken(e, setOriginRule, setRules)}>
            click here
          </a>
          .
          <br />
          To load a complex example grammar:{" "}
          <a href="#" onClick={(e) => loadAdvanced(e, setOriginRule, setRules)}>
            click here
          </a>
          .
        </p>
        <div id="tracery-container">
          <div id="tracery-contents">
            {traceryOutput.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
            <div id="bottomButtons">
              <FreezeButton isFrozen={isFrozen} setIsFrozen={setIsFrozen} />
              <button type="button" onClick={() => setRules((old) => [...old])}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Viewport.propTypes = {
  slidingOut: PropTypes.bool.isRequired,
  isPopoverActive: PropTypes.bool.isRequired,
  hidePopover: PropTypes.func.isRequired,
  popoverContent: PropTypes.node,
  setRules: PropTypes.func.isRequired,
  setOriginRule: PropTypes.func.isRequired,
  originRule: PropTypes.arrayOf(PropTypes.object).isRequired,
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Viewport;
