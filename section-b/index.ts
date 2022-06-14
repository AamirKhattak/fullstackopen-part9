import express from "express";
import calculateBmi from "./calculateBmi";
import calculateExercises from "./calculateExercises";

// TODO: 9.6 ESLINT CONFIGURATION

const app = express();
app.use(express.json())

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);

  if (!height || !weight) {
    res
      .json({
        error: "malformatted parameters",
      })
      .send()
      .end();
  } else if (typeof height !== "number" || typeof weight !== "number") {
    res
      .json({
        error: "malformatted parameters",
      })
      .send()
      .end();
  }

  const bmi = calculateBmi(height, weight);

  res
    .send({
      weight,
      height,
      bmi,
    })
    .end();
});

app.post("/exercises", (req, res) => {

  if(!req.body.dailyTarget || !req.body.dailyExcerciseHours){
    res.json({error: "parameters missing"}).end();
    return;
  }

  const dailyTarget = Number(req.body.dailyTarget)

  const dailyExcerciseHours: number[] = [];

  if(!isNaN(dailyTarget)){
    req.body.dailyExcerciseHours.forEach( (val:unknown) => {
      const hoursInNumber = Number(val);
      if (!isNaN(hoursInNumber)) {
        dailyExcerciseHours.push(hoursInNumber);
      } else {
        res.json({error: "malformatted parameters"}).end();
        return
      }
    })
  }else{
    res.json({error: "malformatted parameters"}).end();
    return;
  }
  res.send(calculateExercises(dailyTarget, dailyExcerciseHours)).end();
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
