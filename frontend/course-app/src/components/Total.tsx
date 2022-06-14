import React from 'react'
import { CoursePart } from '../App'

export default function Total({coursePart}: {coursePart: CoursePart[]}) {
  return (
    <p>
    Number of exercises{" "}
    {coursePart.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}
