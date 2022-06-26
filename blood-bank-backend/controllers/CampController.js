
let Camp = require('../models/BloodCamp')
const { bloodCampValidation } = require('../helpers/ValidationSchema')
const Joi = require('@hapi/joi')

const viewCamps = async(req,res) => {
    let camps
    try{
        camps = await Camp.find()
        return res.status(200).json({ camps })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No camps found" })
}

const addCamp = async(req,res)=>
{
    let camps
    console.log("req body : ",req.body)
    try{
        const result = await bloodCampValidation.validateAsync(req.body,{abortEarly : false})
        console.log("result : ",registerResult)
        camps = new Camp(result)
        await camps.save()
        return res.status(201).json({message : "Succesfully added camp",camps})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            console.log(error)
            errors.push(error)
        })
        if(err) return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 

    // let camps
    // const { hospitalName, address, campName } = req.body
    // const startDate = Date.parse(req.body.startDate)
    // console.log(startDate)
    // const endDate = Date.parse(req.body.endDate)
    // try{
    // const newCamp = new Camp({
    //     hospitalName,
    //     address,
    //     campName,
    //     startDate,
    //     endDate

    // })
    // camps = await newCamp.save()
    // return res.status(200).json({ message : 'New Blood Camp details added',camps })}

    // catch(err) {
    //     return res.status(404).json({ message : err.message })
    // }
    //return res.status(400).json({ message : "Can't add camp" })
}

const viewCamp = async(req,res) => {
    let camps
    try{
        camps = await Camp.findById(req.params.id)
        return res.status(200).json({ camps })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No camp found" })
}

const deleteCamp = async(req,res) => {
    let camps
    try{
        camps = await Camp.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message : "Deleted",camps })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message : "Can't delete camp",camps })
}

const updateCamp = async(req,res)=>
{
    let camp
    console.log("req body : ",req.body)
    try{
        const result = await bloodCampValidation.validateAsync(req.body,{abortEarly : false})
        console.log("result : ",result)
        camp = new Camp(result)
        await camp.save()
        return res.status(201).json({message : "Succesfully updated camp",camp})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            console.log(error)
            errors.push(error)
        })
        if(err) return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 

    // let camps
    // const { hospitalName, address, campName } = req.body
    // const startDate = Date.parse(req.body.startDate)
    // const endDate = Date.parse(req.body.endDate)
    // try{
    //     camps = await Camp.findById(req.params.id,{
    //     hospitalName,
    //     address,
    //     campName,
    //     startDate,
    //     endDate

    // })

    // camps = await camps.save()
    // return res.status(200).json({ message : 'Blood Camp details updated',camps })}

    // catch(err) {
    //     return res.status(404).json({ message : err.message })
    // }
    // return res.status(400).json({ message : "Can't update camp" })
}
module.exports = { addCamp, viewCamp, viewCamps, deleteCamp, updateCamp }