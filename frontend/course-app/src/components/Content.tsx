import React from "react";
import { CoursePart } from "../App";
import Part from "./Part";


export default function Content({
  courseContent,
}: {
  courseContent: CoursePart[];
}) {
  return (
      <div>
    {
        courseContent.map(part =>{
          return <div><Part coursePart={part}/> <br/></div>
        })
    }
    </div>
  );
}