const mongoose = require('mongoose');

const reservations = new mongoose.Schema(
    {    
      date: {
            type: String,
            required: true},  

      destination: {
              type: String,
              required: true}, 

      bookingDate: {
              type: String,
              required: true,
              unique:true
                         
      },

//       luggage:{
//             type: String,
//             // required:true,
//       },

//       name:{
//             type:String,
//             // required:true
//           },
         
//       email:{
//             type:String,
//             // required:true,
//             unique:true
//           },
   
//       seat_number:{
//               type:String,
//               // required:true,
//               unique:true,
//               ref:"seats",
//               conditions: {} // Enables ref validation
//       },
          
//         seat_quantity: {
//             type: Number,
//             // required:true,

//           },

//           totalPayment: {
//             type: Number,
//             // required:true,

//           },
      
            }
)

module.exports = mongoose.model(`Reservations`,reservations);
