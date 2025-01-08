
const mongoose = require("mongoose");

const student_Schema = new mongoose.Schema({   

    Name: {
        type: String,
        required:  [true,'student must have Name.'],
    },

    Gender: {
        type: String,
        enum: ['ذكر', 'انثي'],
    },

    address: String,
    mobile_Number_1: String,
    mobile_Number_2: String,
    "الصف": String,

},{ 
    timestamps: { createdAt: 'creationTime', updatedAt: 'lastModified' } ,
})


const studentDB = mongoose.model("students_table", student_Schema) ;

module.exports = studentDB;

