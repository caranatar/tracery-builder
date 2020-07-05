import React from "react";
import PropTypes from "prop-types";

const AddRules = ({ rules, setRules, onFinished }) => {
  // Manages the rule name being added
  const [ruleName, setRuleName] = React.useState("");

  const handleRuleInEditChange = (e) => {
    const v = e.target.value;
    // This conditional block prevents rule name clashes
    if (!rules.find((r) => r.name === v)) {
      // If the current rule name is unique, set it in the global rules...
      const mod = [...rules];
      mod.push({ name: v, contents: [] });
      setRules(mod);
    } else {
      // ... otherwise, use the existing rules unchanged
      setRules(rules);
    }
    setRuleName(v);
  };

  // When the form is submitted, close the popover
  const handleSubmit = (e) => {
    if (onFinished) onFinished();
    e.preventDefault();
  };

  // Focus the input box on load
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div id="AddRulesPopover" className="AddPopover">
      <h2>Add Rules</h2>
      <p>
        Enter a rule name below to create a new Tracery rule. The rule can then
        be reference using the format <code>#ruleName#</code>
      </p>
      <form id="addRuleForm" onSubmit={handleSubmit}>
        <label htmlFor="ruleInput">Rule name:</label>
        <input
          id="ruleInput"
          ref={inputRef}
          type="text"
          value={ruleName}
          onChange={handleRuleInEditChange}
          className="addInput"
        />
      </form>
      <div id="bottomButtons">
        <button type="submit" form="addRuleForm">
          Finished
        </button>
      </div>
    </div>
  );
};

AddRules.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRules: PropTypes.func.isRequired,
  onFinished: PropTypes.func,
};

export default AddRules;
