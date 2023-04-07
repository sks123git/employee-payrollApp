window.addEventListener('DOMContentLoaded', () => {
  createInnerHtml();
});

function createInnerHtml() {
  const headerHtml =
    '<tr><th></th>' +
    '<th>Name</th>' +
    '<th>Gender</th>' +
    '<th>Department</th>' +
    '<th>Salary</th>' +
    '<th>Start Date</th>' +
    '<th>Actions</th></tr>';
  let innerHTML = `${headerHtml}`;
  let empPayrollData = createEmployeePayrollJSON();
  for (const iterator of empPayrollData) {
    innerHTML = `${innerHTML}
<tr>
              <td>
                <img src="${iterator._profilePic}" alt="" class="profile" />
              </td>
              <td>${iterator._name}</td>
              <td>${iterator._gender}</td>
              <td>
                ${getDeptHtml(iterator._department)}
              </td>
              <td>${iterator._salary}</td>
              <td>${iterator._startDate}</td>
              <td>
                <img
                  name="${iterator._id}"
                  src="images/delete.png"
                  alt="delete"
                  onclick="remove(this)"
                  width="20"
                />
                <img
                  name="${iterator._id}"
                  src="images/edit.png"
                  alt="edit"
                  onclick="update(this)"
                  width="20"
                />
              </td>
            </tr>
`;
    document.querySelector('#display').innerHTML = innerHTML;
  }
}

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};

const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: 'Shubham',
      _gender: 'male',
      _department: ['Engineering', 'Design'],
      _salary: '500000',
      _startDate: '1 may 2022',
      _note: '',
      _id: new Date().getDate(),
      _profilePic: 'images/profile1.png',
    },
    {
      _name: 'Kundan',
      _gender: 'male',
      _department: ['Engineering', 'Design'],
      _salary: '400000',
      _startDate: '3 june 2022',
      _note: '',
      _id: new Date().getDate(),
      _profilePic: 'images/profile1.png',
    },
  ];
  return empPayrollListLocal;
};
