const { Employee } = require('../models');

//get employees
const getEmployees = async (req, res) => {
  try {
    // Get filter criteria from query parameters
    const { department, jobTitle } = req.query;

    // Build the filter options
    const where = {};
    if (department) {
      where.department = department;
    }
    if (jobTitle) {
      where.jobTitle = jobTitle;
    }

    // Find employees with filtering
    const employees = await Employee.findAll({ where });

    // Check if employees are found
    if (!employees.length) {
      return res.status(404).json({
        status: 'failure',
        message: 'No employees found matching the criteria.',
      });
    }

    // Respond with the filtered employee data
    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched employees',
      data: {
        employees,
      },
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({
      status: 'failure',
      message:
        'An error occurred while fetching the employees. Please try again later.',
      error: error.message,
    });
  }
};

//create an employee
const createEmployee = async (req, res) => {
  try {
    //parse body
    const { name, department, jobTitle, salary } = req.body;
    //basic validation
    if (!name || !department || !jobTitle || salary == null || salary <= 0) {
      return res.status(400).json({
        status: 'failure',
        error:
          'Missing required fields: name, department, jobTitle, or salary.',
      });
    }
    //resource creation
    const newEmployee = await Employee.create({
      name,
      department,
      jobTitle,
      salary,
    });

    //error when creating an employee
    if (!newEmployee) {
      return res.status(404).json({
        status: 'failure',
        error:
          'An error occurred while creating the employee. Please try again later.',
      });
    }

    //sucessful resource creation
    return res.status(201).json({
      status: 'success',
      message: 'Successfully created an employee',
      data: {
        newEmployee,
      },
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({
      status: 'failure',
      message:
        'An error occurred while creating the employee. Please try again later.',
      error: error.message,
    });
  }
};

//update an employee
const updateEmployee = async (req, res) => {
  try {
    // Parse body
    const { id } = req.params; // Expecting employee ID in the route parameters
    const { name, department, jobTitle, salary } = req.body;

    // Basic validation
    if (!name && !department && !jobTitle && (salary == null || salary <= 0)) {
      return res.status(400).json({
        status: 'failure',
        error: 'At least one field must be provided for update.',
      });
    }

    // Find the employee by ID
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        status: 'failure',
        error: 'Employee not found.',
      });
    }

    // Update employee details
    const updatedEmployee = await employee.update({
      name: name || employee.name,
      department: department || employee.department,
      jobTitle: jobTitle || employee.jobTitle,
      salary: salary != null ? salary : employee.salary,
    });

    // Successful resource update
    return res.status(200).json({
      status: 'success',
      message: 'Successfully updated the employee',
      data: {
        updatedEmployee,
      },
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({
      status: 'failure',
      message:
        'An error occurred while updating the employee. Please try again later.',
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    // Extract the employee ID from the request parameters
    const { id } = req.params;

    // Find the employee by ID
    const employee = await Employee.findByPk(id);

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({
        status: 'failure',
        message: 'Employee not found.',
      });
    }

    // Delete the employee
    await employee.destroy();

    // Respond with success message
    return res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the employee.',
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({
      status: 'failure',
      message:
        'An error occurred while deleting the employee. Please try again later.',
      error: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
