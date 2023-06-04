import { useContext, useEffect, useState } from "react";
import { CLASS_LIST } from "../consts.js";
import { AttributeContext } from "../contexts/AttributeContext";

// Display classes on the screen (see CLASS_LIST) and visually change the UI when the character meets the minimum requirements for that class, that is, all attributes are greater than or equal to the class minimums.
// When clicking on a class, display the minimum required statistics for that class.
function ClassList() {
  const { classes, skills } = useContext(AttributeContext);
  const [classInfo, setClassInfo] = useState("");
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => setOpenInfo(false), [classes, skills]);

  const handleClick = (c) => {
    setOpenInfo(!openInfo);
    setClassInfo(CLASS_LIST[c]);
  };

  return (
    <div className="Class-List">
      <h2>Available classes</h2>
      {classes &&
        classes.map((c) => (
          <div key={c} onClick={() => handleClick(c)}>
            {c}
          </div>
        ))}
      {openInfo && (
        <div>
          <h2>Class info:</h2>
          {Object.entries(classInfo).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassList;
