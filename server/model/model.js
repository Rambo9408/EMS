import mongoose from 'mongoose';

const { Schema } = mongoose;

function validateMobileNumber(mobile) {
    return /^\d{10}$/.test(mobile); // Regular expression to match 10 digits
}

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true, // Require name field
        match: [/^[A-Za-z ]+$/, 'Name can only contain alphabets and spaces']
    },
    email: {
        type: String,
        required: true, // Require email field
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
        match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address']
    },
    mobile: {
        type: String, 
        required: true, // Require mobile field
        validate: [validateMobileNumber, 'Mobile number must be exactly 10 digits']
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
