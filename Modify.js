function update(node) {
  let toBemodifyElement = empPayrollList.find(
    (empData) => empData.id == node.name
  );
  if (!toBemodifyElement) return;
  const index = empPayrollList
    .map((empdata) => empdata.id)
    .indexOf(toBemodifyElement.id);
  localStorage.setItem('editEmp', JSON.stringify(toBemodifyElement));
  window.location.href = 'EmployeePayrollForm.html';
}
