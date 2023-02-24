let startDate = document.querySelector("#start_date");
let endDate = document.querySelector("#end_date");
let firstPercent = document.querySelector("#first_percent");
let secondPercent = document.querySelector("#second_percent");
let thirdPercent = document.querySelector("#third_percent");
let btn = document.querySelector("#btn");
let firstOutput = document.querySelector("#first_output");
let secondOutput = document.querySelector("#second_output");
let thirdOutput = document.querySelector("#third_output");

// console.log(startDate, 'start date input')
// console.log(firstPercent, 'first percent input')

let holidays = {
  fourth: new Date("July 4, 2023"),
  thanksgiving: new Date("November 23, 2023"),
  christmas_eve: new Date("December 23, 2023"),
  christmas: new Date("December 25, 2023"),
  new_years: new Date("January 1, 2024"),
};

//days of the week:
//0 = Sunday
//6 = Saturday

let daysBetweenDates = function (start, end) {
  //this method was taken from stackoverflow:
  // https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
  const oneDay = 24 * 60 * 60 * 1000; //hrs*mins*s*ms
  return Math.round(Math.abs((start - end) / oneDay)) + 1;
};

let isWeekendOrHoliday = function (date) {
  //this function will take in a date and determine if it is a weekend or holiday
  //if it returns positive, it's a weekend or holiday
  //if it returns negative, it's not a weekend or holiday
  let dayofWeek = date.getDay();
  let holidayArr = Object.values(holidays).map((day) => day.toDateString());
  if (dayofWeek == 0 || dayofWeek == 6) {
    //day is a weekend
    return true;
  }
  if (holidayArr.includes(date.toDateString())) {
    //day is a holiday
    return true;
  }
  return false;
};

let generateDates = function (start, end) {
  //generates a list of dates between two dates, including the start and end dates
  //will not include weekends or holidays
  //enter dates as "January 1, 2023"
  //create date list and turn parameters into Date objects
  let dates_list = [];
  start = new Date(start);
  end = new Date(end);

  //determine how many days are between the start and end date, including the start and end date
  let numDays = daysBetweenDates(start, end);
  let i = 0;
  let newDay = new Date(start.getTime());
  // Use getTime() to get a copy of the start time in milliseconds
  while (i < numDays) {
    //chatGPT assisted in troubleshooting this loop; it let me know that I needed to use getTime() and turn that into a new Date object using new date()
    let dateObj = null;
    if (i == 0) {
      dateObj = new Date(start.getTime());
      if (isWeekendOrHoliday(dateObj) == false) {
        dates_list.push(new Date(start.getTime()));
      }
    } else {
      newDay.setDate(newDay.getDate() + 1);
      if (isWeekendOrHoliday(newDay) == false) {
        dates_list.push(new Date(newDay.getTime()));
      }
      //   dateDay = newDay.getDay();
      //   if (dateDay !== 0 && dateDay !== 6) {
      //   }
      // Use getTime() to get a copy of the newDay time in milliseconds
    }
    i++;
  }

  return dates_list;
};
// console.log(
//   generateDates("January 1, 2023", "January 14, 2023"),
//   "final console log"
// );

//now I need to find the percentages
let findPercentages = function (p1, p2, p3, start, end) {
  //using the dates_list, I need to find what indices match the percentages and return them
  //The percentage calculations came from stackoverflow:
  //https://stackoverflow.com/questions/4372902/javascript-calculate-x-of-a-number
  let classCalendar = generateDates(start, end);
  let classLength = classCalendar.length;
  let percOne = Math.floor((p1 / 100) * classLength);
  let percTwo = Math.floor((p2 / 100) * classLength);
  let percThree = Math.floor((p3 / 100) * classLength);

  let p1Date = classCalendar[percOne];
  let p2Date = classCalendar[percTwo];
  let p3Date = classCalendar[percThree];
  let outputStr = `1st: ${p1Date} ${"\n"}2nd: ${p2Date} ${"\n"}3rd: ${p3Date}`;
  let outputObj = {
    first_percent: p1Date,
    second_percent: p2Date,
    third_percent: p3Date,
  };
  return outputObj;
};

let cleanDate = function (stringDate) {
  stringDate = stringDate.split(" ");
  return `${stringDate[0]} ${stringDate[1]} ${stringDate[2]}, ${stringDate[3]}`;
};

// console.log(findPercentages(25, 45, 75, "January 1, 2023", "January 31, 2023"));
btn.addEventListener("click", function () {
  let startInput = startDate.value;
  let startEntered = new Date(startInput);
  let endInput = endDate.value;
  let endEntered = new Date(endInput);

  // console.log(startDate.value, "start date input");
  //   console.log(firstPercent.value, "first percent input");
  let outputObj = findPercentages(
    firstPercent.value,
    secondPercent.value,
    thirdPercent.value,
    startEntered,
    endEntered
  );
  //   console.log(outputObj)
  let firstPercentDate = outputObj.first_percent.toString();
  let secondPercentDate = outputObj.second_percent.toString();
  let thirdPercentDate = outputObj.third_percent.toString();

  firstPercentDate = cleanDate(firstPercentDate);
  secondPercentDate = cleanDate(secondPercentDate);
  thirdPercentDate = cleanDate(thirdPercentDate);

  firstOutput.innerHTML = firstPercentDate
  secondOutput.innerHTML = secondPercentDate
  thirdOutput.innerHTML = thirdPercentDate
});
