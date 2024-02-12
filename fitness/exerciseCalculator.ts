let TARGET_AVG: number;

interface exerciseSummary { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

interface ratings {
  rating: number;
  ratingDescription: string;
}

const RATINGS: {[threshold: number] : ratings} = {
  1: {rating: 1, ratingDescription: "you are better than this"},
  2: {rating: 2, ratingDescription: "not too bad but could be better"},
  3: {rating: 3, ratingDescription: "well done"},
}

const exerciseCalculator = (data: number[]) : exerciseSummary => {
  console.log(`data is: ${data}`)

  if (data.length === 0) {
    throw new Error("please input at least one day of data")
  }

  
  let ret = { 
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: 0,
    average: 0
  }

  ret.target = TARGET_AVG;
  ret.periodLength = data.length;
  ret.trainingDays = data.reduce((acc, curr) => curr > 0 ? acc+=1 : acc, 0);
  ret.average = data.reduce((acc, curr) => acc + curr, 0) / ret.periodLength;
  ret.success = ret.average >= TARGET_AVG;
  
  const diff = ret.average - TARGET_AVG;

  if (diff > 0) {
    ret.rating = RATINGS[3].rating;
    ret.ratingDescription = RATINGS[3].ratingDescription
  }
  else if (diff < 0 && diff > -0.1) {
    ret.rating = RATINGS[2].rating;
    ret.ratingDescription = RATINGS[2].ratingDescription
  }
  else {
    ret.rating = RATINGS[1].rating;
    ret.ratingDescription = RATINGS[1].ratingDescription
  }

  return ret
}

const getExerciseData = () : number[]=> {
  const args = process.argv;

  TARGET_AVG = Number(args[2])
  

  if (args.length < 4) throw new Error('Not enough arguments');
  //if (args.length > 4) throw new Error('Too many arguments');

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }
  return args.slice(3).map(a => Number(a))
}


try {
  console.log(exerciseCalculator(getExerciseData()))
} catch (e) {
  if (e instanceof Error) {
    console.log("error: " + e.message)
  }
}