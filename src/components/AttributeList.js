import React, { useContext } from "react";
import { AttributeContext } from "../contexts/AttributeContext";

// Create state and controls for each of the 6 attributes (see ATTRIBUTE_LIST) so they can be incremented/decremented independently.
function AttributeList() {
  const { attributes, handleAdd, handleRemove } = useContext(AttributeContext);

  return (
    <div className="Attribute-List">
      <h2>Attribute List</h2>
      {attributes &&
        Object.keys(attributes).map((attribute) => (
          <div key={attribute}>
            <div>{attribute} </div>
            <div>Value: {attributes[attribute].points}</div>
            <div>Modifier: {attributes[attribute].modifier} </div>
            <button onClick={() => handleAdd(attribute)}>+</button>
            <button onClick={() => handleRemove(attribute)}>-</button>
          </div>
        ))}
    </div>
  );
}

export default AttributeList;
