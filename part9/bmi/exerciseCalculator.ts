interface Result {
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

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours
    .filter(day => day !== 0)
    .length;

  const average = dailyExerciseHours.reduce((acc, n) => acc + n, 0) / periodLength;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
