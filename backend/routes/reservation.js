const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const fs = require('fs');
const emailValidator= require('email-validator');

const ReservationModel = require('../models/Reservation');


router.get("/",(req,res)=>{
    ReservationModel.getAllReservations(
        (err,result)=>{
            if(!err){
                res.json(result);
            }else{
                res.json(err);
            }
        }
    )
});
router.post("/dashboard",(req,res)=>{
    
    reservation = req.body;

     
    if(!emailValidator.validate(reservation.email)){ 
     
        res.json({message:"unvalid email"});
    
    }
    else if (! /^\d{11}$/.test(reservation.telephone)) {
    
        res.json({message:"unvalid phone number - should be 11 numbers"});
    }
    else{
        ReservationModel.add(reservation,(err,doc)=>{
            if(!err){
                SeatsModel.reserveSeat(reservationObj.seat_number,(error,seatDoc)=>{
                    if(!error){
                        res.send({message:"success" ,code :200 , data:doc});
                    }else{
                        res.send({message:"error",error});
                    }
                });
            }else{
                res.send({message:"error",err});
            }
        });
    }
    
});

module.exports = router;

