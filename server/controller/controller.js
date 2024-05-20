import Employee from '../model/model.js';

// create and save new employee
export const create = async (req, res) => {
    try {
        // validate request
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        // new employee
        const { name, email, mobile } = req.body;
        const employee = new Employee({
            name,
            email,
            mobile
        });

        // save employee in the database
        const data = await employee.save();
        res.redirect('/add-employee');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        });
    }
}

// retrieve and return all employees/ retrieve and return a single employee
export const find = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const data = await Employee.findById(id);
            if (!data) {
                res.status(404).send({ message: "Not found employee with id " + id });
            } else {
                res.send(data);
            }
        } else {
            const employees = await Employee.find();
            res.send(employees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving employee information" });
    }
}

// Update a new identified employee by employee id
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const data = await Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!data) {
            res.status(404).send({ message: `Cannot Update employee with ${id}. Maybe employee not found!` });
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send({ message: "Error Update employee information" });
    }
}

// Delete an employee with specified employee id in the request
export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Employee.findByIdAndDelete(id);
        if (!data) {
            res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
            res.send({
                message: "Employee was deleted successfully!"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete employee with id=" + id
        });
    }
}
