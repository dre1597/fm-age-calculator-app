const $dayInput = document.querySelector('#day');
const $monthInput = document.querySelector('#month');
const $yearInput = document.querySelector('#year');
const $submitButton = document.querySelector('#submit-button');

const errorMessages = {
  required: 'This field is required',
  validDay: 'Must be a valid day',
  validMonth: 'Must be a valid month',
  validYear: 'Must be a valid year',
  pastYear: 'Must be in the past',
  validDate: 'Must be a valid date',
};

const getInputValues = () => {
  const day = $dayInput.value;
  const month = $monthInput.value;
  const year = $yearInput.value;

  return { day, month, year };
};

const getCurrentDay = () => {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return { currentDay, currentMonth, currentYear };
};

const addFieldErrorMessage = (input, message) => {
  const $input = document.querySelector(`#${input}`);
  const $label = document.querySelector(`#${input}-label`);
  const $errorMessage = document.querySelector(`#${input}-error`);

  $input.style.border = '1px solid var(--light-red)';
  $label.style.color = 'var(--light-red)';
  $errorMessage.textContent = message;
};

const removeFieldErrorMessage = (input) => {
  const $input = document.querySelector(`#${input}`);
  const $label = document.querySelector(`#${input}-label`);
  const $errorMessage = document.querySelector(`#${input}-error`);

  $input.style.border = '0.1rem solid var(--light-gray)';
  $label.style.color = 'var(--smokey-gray)';
  $errorMessage.textContent = '';
};

const clearInputFields = () => {
  removeFieldErrorMessage('day');
  removeFieldErrorMessage('month');
  removeFieldErrorMessage('year');
};

const validateForm = (day, month, year) => {

  let hasError = false;
  const errors = new Map();

  if (day === '' && month === '' && year === '') {
    errors.set('day', errorMessages.required);
    errors.set('month', errorMessages.required);
    errors.set('year', errorMessages.required);
    hasError = true;
  }

  year = covertToNumber(year);
  month = covertToNumber(month);
  day = covertToNumber(day);

  if (year < 1) {
    errors.set('year', errorMessages.validYear);
    hasError = true;
  }

  if (year > new Date().getFullYear()) {
    errors.set('year', errorMessages.pastYear);
    hasError = true;
  }

  if (month < 1 || month > 12) {
    errors.set('month', errorMessages.validMonth);
    hasError = true;
  }

  const lastDayOfMonth = getLastDayOfMonth(month, year);

  if (day < 1) {
    errors.set('day', errorMessages.validDay);
    hasError = true;
  }

  if (day > lastDayOfMonth) {
    errors.set('day', errorMessages.validDate);
    hasError = true;
  }

  clearInputFields();

  if (errors.size > 0) {
    errors.forEach((value, key) => {
      addFieldErrorMessage(key, value);
    });
  }

  return hasError;
};

const birthdayAlreadyPassedThisYear = (day, month, currentDay, currentMonth) => {
  return currentMonth < month || (currentMonth === month && currentDay < day);
};

const calculateAge = (day, month, year) => {
  const { currentDay, currentMonth, currentYear } = getCurrentDay();

  let yearsDiff = currentYear - year;
  let monthsDiff = currentMonth - month;
  let daysDiff = currentDay - day;

  if (currentMonth < month) {
    yearsDiff--;
    monthsDiff = 12 + (currentMonth - month);
  }

  if (currentDay < day) {
    monthsDiff--;
    daysDiff = getLastDayOfMonth(getLastMonth(month), year) + (currentDay - day);

    if (monthsDiff < 0) {
      monthsDiff = 12 + (monthsDiff);
      yearsDiff--;
    }
  }

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff
  };
};

const displayResult = (years, months, days) => {
  const $years = document.querySelector('#years');
  const $months = document.querySelector('#months');
  const $days = document.querySelector('#days');

  $years.textContent = years;
  $months.textContent = months;
  $days.textContent = days;
};

const submitForm = () => {
  const { day, month, year } = getInputValues();

  const hasError = validateForm(day, month, year);

  if (hasError) {
    return;
  }

  const { years, months, days } = calculateAge(day, month, year);

  displayResult(years, months, days);
};


$submitButton.addEventListener('click', submitForm);

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    submitForm();
  }
});
