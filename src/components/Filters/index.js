import React from "react";
import cn from "classnames";
import "./style.css";

function Filters({ tasks, selected, handleRadio }) {
  return (
    <div className="filters">
      <label className={cn("all", { active: selected === "all" })}>
        <input type="radio" onClick={() => handleRadio("all")} />
        all
      </label>
      <label className={cn("complete", { active: selected === "complete" })}>
        <input
          type="radio"
          name="complete"
          onClick={() => handleRadio("complete")}
        />
        complete
      </label>
      <label
        className={cn("incomplete", { active: selected === "incomplete" })}
      >
        <input
          type="radio"
          name="incomplete"
          onClick={() => handleRadio("incomplete")}
        />
        incomplete
      </label>
    </div>
  );
}

export default Filters;
