import React from "react";
import { CoursePart } from "../App";

export default function Part({ coursePart }: { coursePart: CoursePart }) {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {
    case "groupProject":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <span>project exercises {coursePart.groupProjectCount}</span>
        </div>
      );
      break;
    case "normal":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{" "}
          <br />
          <i>{coursePart.description}</i>
        </div>
      );
      break;
    case "submission":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          <span>submit to {coursePart.exerciseSubmissionLink}</span>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          <span>required skills: {coursePart.requirements.toString()}</span>
        </div>
      );
      break;
    default:
      return assertNever(coursePart);
  }
}
