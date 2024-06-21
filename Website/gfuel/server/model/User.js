const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // roles: {
    //     Admin: {
    //         type: Number,
    //         default: 5150
    //     },
    //     User: Number,
    //     Editor: Number
    // },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    EmployerId: {
        type: String,
        required: true
    },
    EmployeeId: {
        type: String,
        default: "null"
    },
    EmployeePassword: {
        type: String,
        required: true
    },
    EmployeeName: {
        type: String,
        required: true
    },
    EmployeeEmail: {
        type: String,
        required: true
    },
    EmployeePhone: {
        type: String,
        required: true
    },
    EmployeePosition: {
        type: String,
        required: true
    },
    EmployeeMonthlyAllowance: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
