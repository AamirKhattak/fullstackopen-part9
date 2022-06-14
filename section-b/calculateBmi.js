"use strict";
exports.__esModule = true;
/*
Write a function calculateBmi that calculates a BMI based on a
given height (in centimeters) and weight (in kilograms)
and then returns a message that suits the results.

*/
var calculateBmi = function (heightInCm, weightInKg) {
    var heightInMeter = heightInCm / 100; //100 cm === 1 meter
    //bmi = kg / m^2
    var bmi = Number((weightInKg / Math.pow(heightInMeter, 2)).toFixed(1));
    console.log('bmi :', bmi);
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    }
    else if (bmi >= 16.0 && bmi <= 16.9) {
        return "Underweight (Moderate thinness)";
    }
    else if (bmi >= 17.0 && bmi <= 18.4) {
        return "Underweight (Mild thinness)";
    }
    else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (healthy weight)";
    }
    else if (bmi >= 25.0 && bmi <= 29.9) {
        return "Overweight (Pre-obese)";
    }
    else if (bmi >= 30.0 && bmi <= 34.9) {
        return "Obese (Class I)	30.0 – 34.9";
    }
    else if (bmi >= 35.0 && bmi <= 39.9) {
        return "Obese (Class II)	35.0 – 39.9";
    }
    else {
        return "Obese (Class III)";
    }
};
var parseArguments = function (args) {
    console.log(args);
    return { height: 0, weight: 0 };
};
parseArguments(process.argv);
exports["default"] = calculateBmi;
// console.log(calculateBmi(180, 74)); //=> Normal (healthy weight)
