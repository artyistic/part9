interface bmiData {
  height: number;
  weight: number
}

const bmiCategories: {[threshold: number] : string} = {
  16.0: "Underweight (Severe thinness)",
  17: "Underweight (Moderate thinness)",
  18.5: "Underweight (Mild thinness)",
  25.0: "Normal (healthy weight)",
  30.0: "Overweight (Pre-obese)",
  35.0: "Obese (Class I)",
  40.0: "Obese (Class II)",
}


// height in cm, weight in kgs
const calculateBMI = (bmidata: bmiData) : String => {

  if (bmidata.height < 0 || bmidata.weight < 0) {
    return "please provide positive numbers for both height and weight";
  }

  const bmi = (bmidata.weight / Math.pow(bmidata.height/100, 2));

  for (const [threshold, category] of Object.entries(bmiCategories)) {
    if (bmi < parseFloat(threshold)) {
      return category;
    }
  }
  return "Obese (Class III)";
}

const getCliArgs = () : bmiData=> {
  const args = process.argv;

  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

console.log(calculateBMI(getCliArgs()))