const salary = document.querySelector('.salary-output');
const salRange = document.querySelector('#salary');

salRange.addEventListener('input', () => {
  salary.innerHTML = salRange.value;
});
