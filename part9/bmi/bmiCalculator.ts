const calculateBmi = (height: number, weight: number) => {
  height = height / 100;
  const bmi = weight / (height * height);

  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi < 16) {
    return 'Severely underweight';
  } else if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

// const height: number = +process.argv[2];
// const weight: number = +process.argv[3];
// console.log(calculateBmi(height, weight));

export default calculateBmi;
