// Since we are not using storage.js in app.js, we are only importing here at Tracker.js
import Storage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById('limit').value = this._calorieLimit;

  }

  // Public Methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    // we want to pusn meal into _meals
    this._totalCalories += meal.calories;
     // updating in local storage
     Storage.updateTotalCalories(this._totalCalories);
     Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
    // += means totalCalories = meal.calories
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
     // updating in local storage
     Storage.updateTotalCalories(this._totalCalories);
     Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    // we are burning caloires here -
    this._render();
  }

  removeMeal(id) {
    // basically we are looping through. We want where meal.id is equal to the id that is passed in. 
    const index = this._meals.findIndex((meal) => meal.id === id);

    // We check to make sure it is not equal to -1
    if (index !== -1 ) {
      const meal = this._meals[index];
      // take away calorie meal
      this._totalCalories -= meal.claories;
       // updating in local storage
       Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      // removing from local storage
      Storage.removeMeal(id);
      this._render();
    }
  }


  removeWorkout(id) {
    // basically we are looping through. We want where meal.id is equal to the id that is passed in. 
    const index = this._workouts.findIndex((workout) => workout.id === id);

    // We check to make sure it is not equal to -1
    if (index !== -1 ) {
      const workout = this._workouts[index];
      // take away calorie meal
      this._totalCalories += workout.claories;
       // updating in local storage
       Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      // removing from local storage
      Storage.removeWorkout(id);
      this._render();
    }
  }
   
  // this helps to reset the whole thing
  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    // saving to local Storage
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render()
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }



  // Private Methods //
_displayCaloriesTotal() {
  const totalCaloriesEl = document.getElementById('calories-total');
  totalCaloriesEl.innerHTML = this._totalCalories;
}
_displayCaloriesLimit() {
  const calorieLimitEl = document.getElementById('calories-limit');
  calorieLimitEl.innerHTML = this._calorieLimit;
}

_displayCaloriesConsumed() {
  const caloriesConsumedEl = document.getElementById('calories-consumed');

  const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

  caloriesConsumedEl.innerHTML = consumed;
}

_displayCaloriesBurned() {
  const caloriesBurnedEl = document.getElementById('calories-burned');

  const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);

  caloriesBurnedEl.innerHTML = burned;
}
// loops throght meals and add 1st , 2nd meals and respectively
// that will give the consumed meal

_displayCaloriesRemaining() {
  const caloriesRemainingEl = document.getElementById('calories-remaining');
  const progressEl = document.getElementById('calorie-progress');

  const remaining = this._calorieLimit - this._totalCalories;

  caloriesRemainingEl.innerHTML = remaining;

  if (remaining <= 0) {
    caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
    caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
    progressEl.classList.remove('bg-success');
    progressEl.classList.add('bg-danger');
  } else {
    caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
    caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
    // when it is not exceeding the limit
    progressEl.classList.remove('bg-danger');
    progressEl.classList.add('bg-success');
  }
}

_displayCaloriesProgress() {
  const progressEl = document.getElementById('calorie-progress');
  const precentage = (this._totalCalories / this._calorieLimit) * 100;
  const width = Math.min(precentage, 100);
  progressEl.style.width = `${width}%`;
}

_displayNewMeal(meal) {
  const mealsEl = document.getElementById('meal-items');
  const mealEl = document.createElement('div');
  mealEl.classList.add('card', 'my-2');
  mealEl.setAttribute('data-id', meal.id);
  mealEl.innerHTML = `
  <div class="card-body">
  <div class="d-flex align-items-center justify-content-between">
    <h4 class="mx-1">${meal.name}</h4>
    <div
      class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
    >
    ${meal.calories}
    </div>
    <button class="delete btn btn-danger btn-sm mx-2">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</div>
  `; 

  mealsEl.appendChild(mealEl);
  // adding it to DOM

}

_displayNewWorkout(workout) {
  const workoutsEl = document.getElementById('workout-items');
  const workoutEl = document.createElement('div');
  workoutEl.classList.add('card', 'my-2');
  workoutEl.setAttribute('data-id', workout.id);
  workoutEl.innerHTML = `
  <div class="card-body">
  <div class="d-flex align-items-center justify-content-between">
    <h4 class="mx-1">${workout.name}</h4>
    <div
      class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
    >
    ${workout.calories}
    </div>
    <button class="delete btn btn-danger btn-sm mx-2">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</div>
  `; 

  workoutsEl.appendChild(workoutEl);
  // adding it to DOM

}



_render() {
  this._displayCaloriesTotal();
  this._displayCaloriesConsumed();
  this._displayCaloriesBurned();
  // render once we add meal
  this._displayCaloriesRemaining();
  this._displayCaloriesProgress();


  // need to do more calculation of the calories remaining
}
}

export default CalorieTracker;