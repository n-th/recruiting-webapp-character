import React, { useContext } from "react";
import { AttributeContext } from "../contexts/AttributeContext";

//Implement skills. See SKILL_LIST for the list of all skills and their attribute modifier.
function SkillList() {
  const { attributes, skills, handleRemoveSkill, handleAddSkill } =
    useContext(AttributeContext);

  const totalPoints = 10 + 4 * Number(attributes["Intelligence"].points);

  return (
    <div className="Skill-List">
      <h2>Skill List</h2>
      <p>Total points: {totalPoints >= 0 ? totalPoints : 0}</p>
      {/* Display each skill in a row in a separate section. For example, Acrobatics. */}
      {skills &&
        Object.keys(skills).map((skill) => {
          const modifier = skills[skill].attributeModifier;
          const attribute = attributes[modifier];
          return (
            <div key={skill}>
              <div>{skill} </div>
              <div>Points: {skills[skill].points}</div>
              <div>{skills[skill].attributeModifier}</div>
              <div>Modifier: {attribute.modifier}</div>
              <button onClick={() => handleAddSkill(skill)}>+</button>
              <button onClick={() => handleRemoveSkill(skill)}>-</button>
              {/* The total value of a skill is the sum of points spent and the skill’s corresponding ability modifier (see SKILL_LIST for what ability modifier affects each skill). */}
              <div> Total: {skills[skill].points + attribute.modifier} </div>
            </div>
          );
        })}
    </div>
  );
}

export default SkillList;
