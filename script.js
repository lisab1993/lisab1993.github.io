let startDate = document.querySelector("#start_date");
let endDate = document.querySelector("#end_date");
let firstPercent = document.querySelector("#first_percent");
let secondPercent = document.querySelector("#second_percent");
let thirdPercent = document.querySelector("#third_percent");
let btn = document.querySelector("#btn");
let firstOutput = document.querySelector("#first_output");
let secondOutput = document.querySelector("#second_output");
let thirdOutput = document.querySelector("#third_output");
let allDates = document.querySelector("#all_dates")
let startEnd = document.querySelector("#start_end")
let calcBtn = document.querySelector("#calc_btn")
let classDays = document.querySelector("#class_days")

// console.log(startDate, 'start date input')
// console.log(firstPercent, 'first percent input')

//2023 holidays
let holidays = {
    new_years_24: new Date("January 1, 2024"),
    juneteenth_23: new Date("June 19, 2023"),
    memorial_day_23: new Date("May 29, 2023"),
    fourth_23: new Date("July 4, 2023"),
    labor_day_23: new Date("September 4, 2023"),
    thanksgiving_23: new Date("November 23, 2023"),
    thanksgiving_post_23: new Date("November 24, 2023"),
    christmas_23: new Date("December 25, 2023"),
    new_years_23: new Date("January 1, 2023"),
    juneteenth_22: new Date("June 19, 2022"),
    memorial_day_22: new Date("May 30, 2022"),
    fourth_22: new Date("July 4, 2022"),
    labor_day_22: new Date("September 5, 2022"),
    thanksgiving_22: new Date("November 24, 2022"),
    thanksgiving_post_22: new Date("November 25, 2022"),
    christmas_22: new Date("December 25, 2022"),
    day_one: new Date("December 23, 2022"),
    day_two: new Date("January 27,2023"),
    day_three: new Date("February 10, 2023")
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

let generatePlus = function (start, numDays) {
    //this function takes the start date, the number of class dates needed, and generates 
    //a list of required class dates
    let dates_list = [];
    console.log(start, 'start')
    startDate = new Date(start);

    let i = 0;
    let newDay = new Date(startDate.getTime());
    // Use getTime() to get a copy of the startDate time in milliseconds
    while (dates_list.length < numDays) {
        //chatGPT assisted in troubleshooting this loop; it let me know that I needed to use getTime() and turn that into a new Date object using new date()
        let dateObj = null;
        if (i == 0) {
            dateObj = new Date(startDate.getTime());
            if (isWeekendOrHoliday(dateObj) == false) {
                dates_list.push(new Date(startDate.getTime()));
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

}

let generateDates = function (start, end) {
    //generates a list of dates between two dates, including the start and end dates
    //will not include weekends or holidays
    //enter dates as "January 1, 2023"
    //create date list and turn parameters into Date objects
    let dates_list = [];
    console.log(start, 'start')
    startDate = new Date(start);
    end = new Date(end);

    //determine how many days are between the startDate and end date, including the startDate and end date
    let numDays = daysBetweenDates(startDate, end);
    let i = 0;
    let newDay = new Date(startDate.getTime());
    // Use getTime() to get a copy of the startDate time in milliseconds
    while (i < numDays) {
        //chatGPT assisted in troubleshooting this loop; it let me know that I needed to use getTime() and turn that into a new Date object using new date()
        let dateObj = null;
        if (i == 0) {
            dateObj = new Date(startDate.getTime());
            if (isWeekendOrHoliday(dateObj) == false) {
                dates_list.push(new Date(startDate.getTime()));
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
    console.log(dates_list)
    return dates_list;
};


//now I need to find the percentages
let findPercentages = function (p1, p2, p3, start, end) {
    //using the dates_list, I need to find what indices match the percentages and return them
    //The percentage calculations came from stackoverflow:
    //https://stackoverflow.com/questions/4372902/javascript-calculate-x-of-a-number
    //aqui also
    //I can make the number of class dates be an argument,
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

calcBtn.addEventListener("click", function () {
    console.log('yeppers')
    let startInput = startEnd.value + ' 00:00:01';
    let startEntered = new Date(startInput);

    console.log(generatePlus(startEntered, classDays.value))
})

// console.log(findPercentages(25, 45, 75, "January 1, 2023", "January 31, 2023"));
btn.addEventListener("click", function () {
    let startInput = startDate.value + ' 00:00:01';
    let startEntered = new Date(startInput);
    let endInput = endDate.value + ' 00:00:01';
    let endEntered = new Date(endInput);

    // console.log(startDate.value, "start date input");
    console.log(cleanDate('Wed Mar 01 2023 00:00:01 GMT-0800 (Pacific Standard Time)'), 'clean date')
    //aqui
    //get the class dates, when end date known, in variable

    let currentClassList = generateDates(startEntered, endEntered)
    let list = document.createElement('ol')
    for (let i = 0; i < currentClassList.length; ++i) {
        let listItem = document.createElement('li')
        listItem.innerHTML = cleanDate(currentClassList[i].toString())
        list.appendChild(listItem)
    }
    allDates.appendChild(list)


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