import React from "react";
import PropTypes from "prop-types";
import AddContents from "./AddContents.js";
import AddRules from "./AddRules.js";

const Sidebar = ({
  hidePopover,
  PopoverButtonWrapper,
  originRule,
  setOriginRule,
  rules,
  setRules,
}) => {
  return (
    <div id="sidebar" onClick={(e) => hidePopover(e)}>
      <div id="dynamicContent">
        <PopoverButtonWrapper name={originRule[0].name} injectCallback={true}>
          <AddContents
            contents={originRule[0].contents}
            setRules={setOriginRule}
            index={0}
            isDeleteable={false}
          />
        </PopoverButtonWrapper>
        {rules.map((rule, i) => (
          <PopoverButtonWrapper key={i} name={rule.name} injectCallback={true}>
            <AddContents
              contents={rule.contents}
              setRules={setRules}
              index={i}
              isDeleteable={true}
            />
          </PopoverButtonWrapper>
        ))}
      </div>
      <div id="staticContent">
        <div className="ruleButtonDiv">
          <button
            type="button"
            className="ruleButton unselectedButton"
            onClick={() => {
              setOriginRule([
                {
                  name: "origin",
                  contents: ["Start editing rules to generate text"],
                },
              ]);
              setRules([]);
              hidePopover();
            }}
          >
            Clear Rules
          </button>
        </div>
        <PopoverButtonWrapper name="Add Rule" injectCallback={true}>
          <AddRules rules={rules} setRules={setRules} />
        </PopoverButtonWrapper>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  hidePopover: PropTypes.func.isRequired,
  PopoverButtonWrapper: PropTypes.func.isRequired,
  originRule: PropTypes.arrayOf(PropTypes.object).isRequired,
  setOriginRule: PropTypes.func.isRequired,
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRules: PropTypes.func.isRequired,
};

export default Sidebar;
