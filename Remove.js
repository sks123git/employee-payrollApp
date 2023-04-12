function remove(node) {
  let empPayrollData = empPayrollList.find(
    (empData) => empData.id == node.name
  );
  if (!empPayrollData) return;
  const index = empPayrollList
    .map((empdata) => empdata.id)
    .indexOf(empPayrollData.id);
  empPayrollList.splice(index, 1);
  localStorage.setItem('employeePayrollData', JSON.stringify(empPayrollList));
  createInnerHtml();
  window.location.href = 'EmployeePayrollApp.html';
}
