let empPayrollList;

window.addEventListener('DOMContentLoaded', () => {
  empPayrollList = getEmployeePayrollDataFromLocalStorage();
  createInnerHtml();
});

const getEmployeePayrollDataFromLocalStorage = () => {
  return localStorage.getItem('employeePayrollData')
    ? JSON.parse(localStorage.getItem('employeePayrollData'))
    : [];
};

function createInnerHtml() {
  const headerHtml =
    '<tr><th></th>' +
    '<th>Name</th>' +
    '<th>Gender</th>' +
    '<th>Department</th>' +
    '<th>Salary</th>' +
    '<th>Start Date</th>' +
    '<th>Actions</th></tr>';
  if (empPayrollList.length == 0) return;
  let innerHTML = `${headerHtml}`;
  for (const iterator of empPayrollList) {
    innerHTML = `${innerHTML}
<tr>
              <td>
                <img src="${iterator.profileImg}" alt="" class="profile" />
              </td>
              <td>${iterator.name}</td>
              <td>${iterator.gender}</td>
              <td>
                ${getDeptHtml(iterator.department)}
              </td>
              <td>${iterator.salary}</td>
              <td>${iterator.startDate}</td>
              <td>
                <img
                  name="${iterator.id}"
                  src="images/delete.png"
                  alt="delete"
                  onclick="remove(this)"
                  width="20"
                />
                <img
                  name="${iterator.id}"
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
