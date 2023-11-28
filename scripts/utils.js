const covertToNumber = (input) => {
  return Number(input);
};

const monthsWith2829Days = [2];
const monthsWith30Days = [4, 6, 9, 11];
const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

const isLeapYear = (year) => {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

const getLastDayOfMonth = (month, year) => {
  if (!month) {
    return 31;
  }

  if (monthsWith30Days.includes(month)) {
    return 30;
  }

  if (monthsWith31Days.includes(month)) {
    return 31;
  }

  if (monthsWith2829Days.includes(month)) {
    if (!year) {
      return 29;
    }

    if (isLeapYear(year)) {
      return 29;
    }
  }

  return 28;
};

const getLastMonth = (month) => {
  if (month === 1) {
    return 12;
  }
  return month - 1;
};

