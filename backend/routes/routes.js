const express = require("express");
const mongoose = require("mongoose");
const Flights = require("../models/Flights");
const Reservation = require("../models/Reservation")
const alert = require('alert')

const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const isAvailable = "Your flight is available."
const notAvailable = "We are sorry, but we cannot offer you flight in this time. Try again to find another one, please."

//login and start page
router.get("/", (req, res) =>{
 
  res.render("index" );
});

router.get("/register", (req, res) =>{
  res.render("register");
});


router.get('/form', (req,res) => {

  const sDestination = req.query.destination;
  const sDate = req.query.date;
  const sPassengers = req.query.passengers;
 
  req.session.destination = sDestination;
  req.session.date = sDate;
 

  console.log(sDate, sDestination);

    
  Flights.find({date:`${sDate}`, destination:`${sDestination}`, emptySeats:{$gt: `${sPassengers}`}} )
  
  
  
  
  
  .exec((err, data) => {
    if (data == false) {
      console.log('brak takiego lotu');          
      alert(notAvailable)
    } else {
        console.log(data)
        res.render('checkflights', {isAvailable, data, }) ; 
      
        
      }
        });  
      });    
    
router.get("/rozbraer20", ensureAuthenticated, (req, res) => {
  const lDestination = req.session.destination 
  const lDate = req.session.date;


   
  Flights.find({date: `${lDate}`, destination: `${lDestination}`}).exec((err, dane) => {
    if (dane ==false) {
      console.log('upps. coś poszło nie tak');
    } else {
      console.log(dane);
      res.render("rozbraer20", { user: req.user, dane});
    }
    

    })
  });


  router.post("/rozbraer20", (req,res)=> {

    const lDestination = req.session.destination 
    const lDate = req.session.date;
    const lbookingDate = new Date();
          
    Reservation.insertMany({date:`${lDate}`, destination: `${lDestination}`, bookingDate: `${lbookingDate}`})
  
    console.log('działa');
    res.render('payment', {user:req.user})
  })



router.get("/embraer170", ensureAuthenticated, (req, res) => {
  const lDestination = req.session.destination 
  const lDate = req.session.date;

  

  Flights.find({date: `${lDate}`, destination: `${lDestination}`}).exec((err, dane) => {
    if (dane ==false) {
      console.log('upps. coś poszło nie tak');
    } else {
      console.log(dane);
      res.render("embraer170", { user: req.user, dane});
    }
    }) 
});


router.post("/embraer170", (req,res)=> {

  const lDestination = req.session.destination 
  const lDate = req.session.date;
  const lbookingDate = new Date();
          
  Reservation.insertMany({date:`${lDate}`, destination: `${lDestination}`, bookingDate: `${lbookingDate}`})
  
  console.log('działa');
  res.render('payment', {user:req.user})

})

      
router.get("/boeing737", ensureAuthenticated, (req, res) => {
  const lDestination = req.session.destination 
  const lDate = req.session.date;

  Flights.find({date: `${lDate}`, destination: `${lDestination}`}).exec((err, dane) => {
    if (dane ==false) {
      console.log('upps. coś poszło nie tak');
    } else {
      console.log(dane);

      res.render("boeing737", { user: req.user, dane});
    }
    })

});


router.post("/boeing737", (req, res) => {

  const lDestination = req.session.destination 
  const lDate = req.session.date;
  const lbookingDate = new Date();
        
  Reservation.insertMany({date:`${lDate}`, destination: `${lDestination}`, bookingDate: `${lbookingDate}`})

  console.log('działa');
  res.render('payment', {user:req.user})

})


router.get("/payment", (req,res) => {
  console.log("wylogowalem");
  res.render("/")
})

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  
    res.render("dashboard", { user: req.user});
});



module.exports = router;