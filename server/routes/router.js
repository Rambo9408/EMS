import express from 'express';
import { homeRoutes, add_employee, update_employee } from '../services/render.js';
import { create, find, update, deleteEmployee } from '../controller/controller.js';
import Employee from '../model/model.js';


const route = express.Router();

route.get('/', homeRoutes);
route.get('/add-employee', add_employee);
route.get('/update-employee', update_employee);

route.post('/api/employees', create);
route.get('/api/employees', find);
route.put('/api/employees/:id', update);
route.delete('/api/employees/:id', deleteEmployee); 

route.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;

        // Used the Employee model to search for employees
        const filteredEmployees = await Employee.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, 
                { email: { $regex: query, $options: 'i' } },
                { mobile: { $regex: query, $options: 'i' } }
            ]
        });

        res.json(filteredEmployees);
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default route;
