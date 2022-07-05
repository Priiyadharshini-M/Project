
const {Camp} = require('../models/BloodCamp')
const { bloodCampValidation } = require('../helpers/ValidationSchema')

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
    let camp
    try{
        let options = {abortEarly : false}
        const campResult = await bloodCampValidation.validateAsync(req.body,options)
        console.log(campResult)
        //const { campName, hospitalName } = campResult
        camp = await Camp.findOne({campName : campResult.campName, hospitalName : campResult.hospitalName})
        if(camp) 
           throw "This camp has already been registered in the given hospital" 
        if(campResult != null)
        camp = new Camp(campResult)
        await camp.save()
        return res.status(201).json({message : "Succesfully camp has been added",camp})
    }
    catch(err) {
        console.log("catch block")
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            errors.push(error)
        })
        return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 
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
        if(req.params.id.length == 24)
        camp = await Camp.findById(req.params.id)
        else throw `Invalid Object Id`
        if(camp != null)
        {
        const updateResult = await bloodCampValidation.validateAsync(req.body,{abortEarly : false})
        const { campName, hospitalName, address, startDate, endDate } = updateResult 
        camp = await Camp.findByIdAndUpdate(req.params.id,{
            campName,
            hospitalName,
            address,
            startDate,
            endDate
        })
        await camp.save()
        return res.status(200).json({message:"Successfully updated",camp})
        }


        // const result = await bloodCampValidation.validateAsync(req.body,{abortEarly : false})
        // console.log("result : ",result)
        // camp = new Camp(result)
        // await camp.save()
        // return res.status(201).json({message : "Succesfully updated camp",camp})
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