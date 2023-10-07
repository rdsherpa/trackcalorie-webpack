class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit')
    }
    return calorieLimit;
  } 

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories')
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      // we don't want to parse into a number. Return as string
      meals = JSON.parse(localStorage.getItem('meals'))
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    // put back in local storage
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id) {
    // getting meals from local storage
    const meals = Storage.getMeals();
    // looping through 
    meals.forEach((meal, index) => {
      // check to see if meal id is = id that is passed in
      if (meal.id === id) {
        // we want to splice at index and take away 1
        meals.splice(index, 1);
      }
    }); 

    // we are going outside of the For Each and resave to local storage without that meal
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      // we don't want to parse into a number. Return as string
      workouts = JSON.parse(localStorage.getItem('workouts'))
    }
    return workouts;
  }

  static saveWorkout(workout) {
    // getting the workouts from storage
    const workouts = Storage.getWorkouts();
    // put back in local storage
    workouts.push(workout);
    // resaving it
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  // Removing workout from local Storage, so that when it is loaded it does not stay in local Storage
  static removeWorkout(id) {
    // getting meals from local storage
    const workouts = Storage.getWorkouts();
    // looping through 
    workouts.forEach((workout, index) => {
      // check to see if meal id is = id that is passed in
      if (workout.id === id) {
        // we want to splice at index and take away 1
        workouts.splice(index, 1);
      }
    }); 

    // we are going outside of the For Each and resave to local storage without that meal
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  // Removing seprate categories instead of clearing the whole thing
  static clearAll() {
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');

    // if we want to clear the limit, then we can use:
    // localStorage.clear();
  }
}

export default Storage;