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
}
let newEmployee = new NewEmployee();

const salary = document.querySelector('.salary-output');
const salRange = document.querySelector('#salary');
const username = document.querySelector('#name');
const nameError = document.querySelector('#errormsg');
const notes = document.querySelector('#notes');
let departmentValues = [];
let employeePayrollList = [];

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
function reset() {
  let str = 40000;
  document.querySelector('salary-output').innerHTML = str;
}
// onform submit function save
function save() {
  const profileImage = document.querySelector('input[name="profile"]:checked');
  const gender = document.querySelector('input[name="gender"]:checked');
  const checkbox = document.querySelectorAll('input[class="checkbox"]:checked');
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  let startDate = day.value + '-' + month.value + '-' + year.value;
  checkbox.forEach((dept) => {
    departmentValues.push(dept.value);
  });

  // //Adding data from localstorage to array
  if (window.localStorage.key(1) !== null) {
    employeePayrollList = JSON.parse(
      window.localStorage.getItem('employeePayrollData')
    );
  }
  newEmployee.id = employeePayrollList.length;
  newEmployee.name = username.value;
  newEmployee.profileImg = profileImage.value;
  newEmployee.gender = gender.value;
  newEmployee.department = departmentValues;
  newEmployee.salary = salRange.value;
  newEmployee.startDate = startDate;
  newEmployee.notes = notes.value;

  employeePayrollList.push(newEmployee);

  window.alert(employeePayrollList);

  window.localStorage.setItem(
    'employeePayrollData',
    JSON.stringify(employeePayrollList)
  );
}
