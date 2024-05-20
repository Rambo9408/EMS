import axios from 'axios';

export const homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/employees')
        .then(function(response){
            res.render('index', { employees : response.data });
        })
        .catch(err => {
            res.send(err);
        });
}

export const add_employee = (req, res) => {
    res.render('add_employee');
}

export const update_employee = (req, res) => {
    axios.get('http://localhost:3000/api/employees', { params : { id : req.query.id }})
        .then(function(employeedata){
            res.render("update_employee", { employee : employeedata.data });
        })
        .catch(err => {
            res.send(err);
        });
}
