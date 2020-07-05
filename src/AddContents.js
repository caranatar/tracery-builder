import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";

const AddContents = ({
  contents,
  setRules,
  onFinished,
  index,
  isDeleteable,
}) => {
  // Manages the list of content choices associated with a rule
  const [state, setState] = React.useState(contents);

  // Handles the change events for input box number i
  const handleChange = (i) => {
    return (e) => {
      const v = e.target.value;
      // Update the corresponding element in the state array
      setState((old) => {
        const mod = [...old];
        mod[i] = v;
        return mod;
      });
    };
  };

  // Handles the deletion of content choice number i
  const handleDeleteContent = (i) => {
    return () => {
      setState((old) => {
        return old.filter((_, j) => i !== j);
      });
    };
  };

  // Handles the deletion of the entire rule
  const handleDeleteRule = () => {
    setRules((old) => {
      return old.filter((_, i) => i !== index);
    });
    onFinished();
  };

  // Handles adding a new content choice to the rule
  const handleAdd = () => {
    setState((old) => {
      const mod = [...old];
      mod.push("");
      return mod;
    });
  };

  // When the state changes, update the corresponding rule in the global rules
  React.useEffect(() => {
    setRules((old) => {
      const mod = [...old];
      mod[index] = { name: old[index].name, contents: state };
      return mod;
    });
  }, [state, index, setRules]);

  // When the form is submitted, close the popover
  const handleSubmit = (e) => {
    if (onFinished) onFinished();
    e.preventDefault();
  };

  return (
    <div id="AddContentsPopover" className="AddPopover">
      <h2>Add Contents</h2>
      <p>
        Click the button below to add a content choice to the list of contents,
        or edit an existing content choice using the input fields.
      </p>
      <form id="addContentsForm" onSubmit={handleSubmit}>
        {state.map((content, i) => (
          <div className="contentRow" key={i}>
            <TextareaAutosize
              type="text"
              value={state[i]}
              onChange={handleChange(i)}
              className="addInput"
            />
            <button type="button" onClick={handleDeleteContent(i)}>
              Delete
            </button>
          </div>
        ))}
        <div id="bottomButtons">
          <button type="button" onClick={handleAdd}>
            Add content choice
          </button>
          {isDeleteable ? (
            <button type="button" onClick={handleDeleteRule}>
              Delete rule
            </button>
          ) : null}
          <button type="submit" form="addContentsForm">
            Finished
          </button>
        </div>
      </form>
    </div>
  );
};

AddContents.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.string).isRequired,
  setRules: PropTypes.func.isRequired,
  onFinished: PropTypes.func,
  index: PropTypes.number,
  isDeleteable: PropTypes.bool.isRequired,
};

export default AddContents;
