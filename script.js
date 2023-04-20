class NewEmployee {
  id;
  name;
  profileImg;
  gender;
  department;
  salary;
  startDate;
  notes;
  get id() {
    return this.id;
  }
  set id(id) {
    this.id = id;
  }

  set name(name) {
    this.name = name;
  }
  get name() {
    return this.name;
  }
  get profileImg() {
    return this.profileImg;
  }

  set profileImg(profileImg) {
    this.profileImg = profileImg;
  }

  get gender() {
    return this.gender;
  }

  set gender(gender) {
    this.gender = gender;
  }

  get department() {
    return this.department;
  }

  set department(department) {
    this.department = department;
  }
  get salary() {
    return this.salary;
  }
  set salary(salary) {
    this.salary = salary;
  }
  get startDate() {
    return this.startDate;
  }
  set startDate(startDate) {
    this.startDate = startDate;
  }
  get notes() {
    return this.notes;
  }
  set notes(notes) {
    this.notes = notes;
  }
  toString() {
    return (
      this.id +
      ' ' +
      this.name +
      ' ' +
      this.department +
      ' ' +
      this.gender +
      ' ' +
      this.notes +
      ' ' +
      this.profileImg +
      ' ' +
      this.salary +
      ' ' +
      this.startDate
    );
  }
}
let newEmployee = new NewEmployee();
let departmentValues = [];
let employeePayrollList = [];

let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', () => {
  const salary = document.querySelector('.salary-output');
  const salRange = document.querySelector('#salary');
  const username = document.querySelector('#name');
  const nameError = document.querySelector('#errormsg');

  username.addEventListener('input', () => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (nameRegex.test(username.value)) {
      username.style.border = '2px solid green';
      nameError.style.visibility = 'hidden';
    } else {
      nameError.style.visibility = 'visible';
      username.style.border = 'none';
    }
  });
  salRange.addEventListener('input', () => {
    salary.innerHTML = salRange.value;
  });

  checkForUpdate();
});

function setForm() {
  document.querySelector('#name').value = employeePayrollObj.name;
  setSelectedValues("input[name='profile']", employeePayrollObj.profileImg);
  setSelectedValues("input[name='gender']", employeePayrollObj.gender);
  setSelectedValues("input[class='checkbox']", employeePayrollObj.department);
  document.querySelector('#salary').value = employeePayrollObj.salary;
  document.querySelector('.salary-output').innerHTML =
    employeePayrollObj.salary;
  document.querySelector('#notes').value = employeePayrollObj.notes;
  let date = employeePayrollObj.startDate.split('-');
  document.querySelector('#day').value = date[0];
  document.querySelector('#month').value = date[1];
  document.querySelector('#year').value = date[2];
}

function setSelectedValues(properties, value) {
  let allItems = document.querySelectorAll(properties);
  allItems.forEach((item) => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) item.checked = true;
    } else if (item.value === value) {
      item.checked = true;
    }
  });
}

function reset() {
  let str = 40000;
  document.querySelector('salary-output').innerHTML = str;
}
// onform submit function save
function save() {
  const username = document.querySelector('#name');
  const profileImage = document.querySelector('input[name="profile"]:checked');
  const gender = document.querySelector('input[name="gender"]:checked');
  const checkbox = document.querySelectorAll('input[class="checkbox"]:checked');
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  const notes = document.querySelector('#notes');
  const salRange = document.querySelector('#salary');
  let startDate = day.value + '-' + month.value + '-' + year.value;
  checkbox.forEach((dept) => {
    departmentValues.push(dept.value);
  });

  // //Adding data from localstorage to array
  if (window.localStorage.key(0) !== null) {
    employeePayrollList = JSON.parse(
      window.localStorage.getItem('employeePayrollData')
    );
  }

  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find(
      (empData) => empData.id == employeePayrollObj.id
    );
    if (!empPayrollData) {
      //new data to be pushed
      if (newEmployee.id == null) newEmployee.id = Date.now().toString(36);
      newEmployee.name = username.value;
      newEmployee.profileImg = profileImage.value;
      newEmployee.gender = gender.value;
      newEmployee.department = departmentValues;
      newEmployee.salary = salRange.value;
      newEmployee.startDate = startDate;
      newEmployee.notes = notes.value;
      employeePayrollList.push(newEmployee);
    } else {
      //modify  data and push
      const index1 = employeePayrollList
        .map((empData) => empData.id)
        .indexOf(empPayrollData.id);
      employeePayrollList.splice(index1, 1);
      newEmployee.id = empPayrollData.id;
      newEmployee.name = username.value;
      newEmployee.profileImg = profileImage.value;
      newEmployee.gender = gender.value;
      newEmployee.department = departmentValues;
      newEmployee.salary = salRange.value;
      newEmployee.startDate = startDate;
      newEmployee.notes = notes.value;
      employeePayrollList.push(newEmployee);
    }
  } else {
    //1st data
    if (newEmployee.id == null) newEmployee.id = Date.now().toString(36);
    newEmployee.name = username.value;
    newEmployee.profileImg = profileImage.value;
    newEmployee.gender = gender.value;
    newEmployee.department = departmentValues;
    newEmployee.salary = salRange.value;
    newEmployee.startDate = startDate;
    newEmployee.notes = notes.value;
    employeePayrollList.push(newEmployee);
  }

  window.alert(employeePayrollList);
  window.localStorage.setItem(
    'employeePayrollData',
    JSON.stringify(employeePayrollList)
  );
  let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.log(
          'State changed called ready state: ' +
            xhr.readyState +
            ' Status:' +
            xhr.status
        );
        if (xhr.status.toString().match('^[2][0-9]{2}$')) {
          resolve(xhr.responseText);
        } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
          reject({ status: xhr.status, statusText: xhr.statusText });
          console.log('xhr failed');
        }
      };

      xhr.open(methodType, url, async);
      if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else xhr.send();
      console.log(methodType + ' request sent to server');
    });
  }

  const postURL = 'http://localhost:3000/employeesPayrollDB';
  const newDetail = {
    id: newEmployee.id,
    name: newEmployee.name,
    salary: newEmployee.salary,
    profileImg: newEmployee.profileImg,
    gender: newEmployee.gender,
    department: newEmployee.department,
    startDate: newEmployee.startDate,
    notes: newEmployee.notes,
  };
  makePromiseCall('POST', postURL, true, newDetail)
    .then((responseText) => {
      console.log('data is inserted: ' + responseText);
    })
    .catch((error) => {
      console.log('Post error caught: ' + error);
    });
}

function checkForUpdate() {
  const empPayrollJSON = localStorage.getItem('editEmp');
  isUpdate = empPayrollJSON ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(empPayrollJSON);
  setForm();
}
