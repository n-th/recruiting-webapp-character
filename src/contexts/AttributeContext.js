import React, { createContext, useEffect, useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts.js";

export const AttributeContext = createContext();

export const AttributeProvider = ({ children }) => {
  const initialAttributeState = {};
  const initialClassState = [];
  ATTRIBUTE_LIST.forEach(
    (attribute) =>
      (initialAttributeState[attribute] = {
        points: 0,
        modifier: -5,
      })
  );
  const initalSkillState = {};
  SKILL_LIST.forEach(
    (skill) =>
      (initalSkillState[skill.name] = {
        points: 0,
        attributeModifier: skill.attributeModifier,
      })
  );

  const [attributes, setAttributes] = useState(initialAttributeState);
  const [skills, setSkills] = useState(initalSkillState);
  const [classes, setClasses] = useState(initialClassState);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const availableClasses = checkClassAvailability();
    setClasses(availableClasses);
    checkMaximumPoints();
    updateSkillModifier();
  }, [attributes]);

  const handleAdd = (attribute) => {
    if (checkMaximumPoints()) {
      alert("Ops, cannot add more than 70 points");
      return;
    }
    if (attributes.hasOwnProperty(attribute)) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: {
          points: prevAttributes[attribute].points + 1,
          modifier: calculateAbilityModifier(
            prevAttributes[attribute].points + 1
          ),
        },
      }));
    } else {
      console.log(`Attribute ${attribute} does not exist.`);
    }
  };

  const handleRemove = (attribute) => {
    if (attributes.hasOwnProperty(attribute)) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: {
          points: prevAttributes[attribute].points - 1,
          modifier: calculateAbilityModifier(
            prevAttributes[attribute].points - 1
          ),
        },
      }));
    } else {
      console.log(`Attribute ${attribute} does not exist.`);
    }
  };

  const checkClassAvailability = () => {
    const availableClasses = [];

    for (let className in CLASS_LIST) {
      const classAttributes = CLASS_LIST[className];
      let isClassAvailable = true;

      Object.keys(classAttributes).forEach((attribute) => {
        if (attributes[attribute].points < classAttributes[attribute]) {
          isClassAvailable = false;
          return;
        }
      });

      if (isClassAvailable) {
        availableClasses.push(className);
      }
    }

    return availableClasses;
  };

  //Add an “ability modifier” to each attribute row, this is calculated as +1 for each 2 points above 10, for any attribute (let's take Intelligence for example) we would have the following ability modifiers for a given ability
  const calculateAbilityModifier = (value) => {
    return Math.ceil((value - 10) / 2);
  };

  const handleAddSkill = (skill) => {
    if (checkSkillPoints()) {
      alert("Ops, cannot add more than the total skill points");
      return;
    }
    if (skills.hasOwnProperty(skill)) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: {
          ...prevSkills[skill],
          points: prevSkills[skill].points + 1,
        },
      }));
    } else {
      console.log(`Skill ${skill} does not exist.`);
    }
  };

  const handleRemoveSkill = (skill) => {
    if (checkSkillPoints()) {
      alert("Ops, cannot add more than the total skill points");
      return;
    }
    if (skills.hasOwnProperty(skill)) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: {
          ...prevSkills[skill],
          points: prevSkills[skill].points - 1,
        },
      }));
    } else {
      console.log(`Skill ${skill} does not exist.`);
    }
  };

  const updateSkillModifier = () => {
    for (const skill in skills) {
      const attribute = skills[skill].attributeModifier;
      const attributeModifier = attributes[attribute].modifier;
      skills[skill].modifier = attributeModifier;
    }
  };

  //Implement a maximum on all attributes of 70. For example, if a character has 20 strength and 10 for all other attributes, they must decrease one before they can increase another.
  const checkMaximumPoints = () => {
    const points = Object.values(attributes).reduce(
      (total, value) => total + value.points,
      0
    );
    return points >= 70;
  };

  const checkSkillPoints = () => {
    const points = Object.values(attributes).reduce(
      (total, value) => total + value.points,
      0
    );
    return points >= 10 + 4 * Number(attributes["Inteligence"]);
  };

  //Retrieved when the app starts next time
  const fetchData = () => {
    const user = "{n-th}";
    const url = `https://recruiting.verylongdomaintotestwith.ca/api/${encodeURIComponent(
      user
    )}/character`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message !== "Item not found") {
          setSkills(data.body?.skills);
          setAttributes(data.body?.attributes);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <AttributeContext.Provider
      value={{
        attributes,
        classes,
        skills,
        handleAdd,
        handleRemove,
        handleAddSkill,
        handleRemoveSkill,
      }}
    >
      {children}
    </AttributeContext.Provider>
  );
};
