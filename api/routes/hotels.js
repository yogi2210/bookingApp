import express from "express"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

const router = express.Router()

//create
router.post("/", async (req,res)=>{
    
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
        // res.sendStatus(500);
        // return;
    }
})

//update
router.put("/:id", async (req,res)=>{
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
})
//delete
router.delete("/:id", async (req,res)=>{
    
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get

router.get("/:id", async (req,res)=>{
    
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }
})
//get all

router.get("/", async (req,res, next)=>{
    try {
        const hotels = await Hotel.find()
        return res.status(200).json(hotels)
    } catch (err) {
        next(err)
        
    }
})


export default router