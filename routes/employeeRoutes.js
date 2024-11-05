const route = require('express').Router();
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controller/employeeController');

route.get('/', getEmployees);
route.post('/', createEmployee);
route.patch('/:id', updateEmployee);
route.delete('/:id', deleteEmployee);

module.exports = route;
