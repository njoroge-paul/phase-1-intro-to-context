// Your code here
function createEmployeeRecord(data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

function createTimeInEvent(employee, time) {
  employee.timeInEvents.push({
    type: "TimeIn",
    date: time.substring(0, 10),
    hour: parseInt(time.substring(11, 13)) * 100 + parseInt(time.substring(14, 16))
  });
  return employee;
}

function createTimeOutEvent(employee, time) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: time.substring(0, 10),
    hour: parseInt(time.substring(11, 13)) * 100 + parseInt(time.substring(14, 16))
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIns = employee.timeInEvents.filter(event => event.date === date);
  const timeOuts = employee.timeOutEvents.filter(event => event.date === date);
  let hours = 0;
  timeIns.forEach((timeIn, index) => {
    hours += (timeOuts[index].hour - timeIn.hour) / 100;
  });
  return hours;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let totalWages = 0;
  employee.timeInEvents.forEach(timeIn => {
    const date = timeIn.date;
    const timeOut = employee.timeOutEvents.find(
      timeOut => timeOut.date === date && timeOut.hour >= timeIn.hour);
    if (timeOut) {
      totalWages += wagesEarnedOnDate(employee, date);
    }
  });
  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}