export interface ExercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
}

enum Rating {
  LOW = 1,
  MEDIUM,
  HIGH
}

class MissingParameterError extends Error {
  name = 'MissingParameterError';
}

class MalformattedParameterError extends Error {
  name = 'MalformattedParameterError';
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): ExercisesResult => {
  if (!dailyExerciseHours || !target) throw new MissingParameterError();

  target = Number(target);
  dailyExerciseHours = dailyExerciseHours.map(Number);
  if (isNaN(target) || dailyExerciseHours.some(isNaN)) throw new MalformattedParameterError();

  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours
    .filter(day => day !== 0)
    .length;

  const average = periodLength === 0 ? 0 : dailyExerciseHours.reduce((acc, n) => acc + n, 0) / periodLength;

  const success = average >= target;

  const rating = success
    ? Rating.HIGH
    : (target - average) <= 1
      ? Rating.MEDIUM
      : Rating.LOW;
    
  const ratingDescription = {
    3: 'very good',
    2: 'not too bad but could be better',
    1: 'you can do better'
  }[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

};

// const parseArguments = (args: string[]): [number[], number] => {
//   if (args.length < 3) throw new Error('not enough arguments; at least provide a target value');

//   const target: number = +args[2];
//   if (isNaN(target)) throw new Error('provided argument "target" is not a number');

//   const dailyExerciseHours: number[] = args
//     .slice(3)
//     .map(hours => {
//       if (isNaN(+hours)) throw new Error('provided arguments "dailyExerciseHours" must be numbers');
//       return +hours;
//     });
  
//   return [
//     dailyExerciseHours,
//     target
//   ];
// };

// try {
//   const [dailyExerciseHours, target] = parseArguments(process.argv);
//   console.log(calculateExercises(dailyExerciseHours, target));
// } catch (error) {
//   if (error instanceof Error) console.log('Error:', error.message);
// }

export default calculateExercises;
