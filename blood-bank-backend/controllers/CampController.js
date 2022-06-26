
let Camp=require('../models/BloodCamp')

const viewCamps = async(req,res) => {
    let camps
    try{
        camps = await Camp.find()
        return res.status(200).json({camps})
    }
    catch(err) {
        return res.status(404).json({message : err.message})
    }
    return res.status(404).json({message : "No camps found"})
}

const addCamp=async(req,res)=>
{
    let camps
        const {hospitalName,address,campName}=req.body
        const startDate=Date.parse(req.body.startDate)
        console.log(startDate)
        const endDate=Date.parse(req.body.endDate)
        try{
    const newCamp=new Camp({
        hospitalName,
        address,
        campName,
        startDate,
        endDate

    })

    camps=await newCamp.save()
    return res.status(200).json({message:'New Blood Camp details added',camps})}

    catch(err) {
        return res.status(404).json({message : err.message})
    }
    return res.status(400).json({message : "Can't add camp"})
}

const viewCamp = async(req,res) => {
    let camps
    try{
        camps = await Camp.findById(req.params.id)
        return res.status(200).json({camps})
    }
    catch(err) {
        return res.status(404).json({message : err.message})
    }
    return res.status(404).json({message : "No camp found"})
}

const deleteCamp = async(req,res) => {
    let camps
    try{
        camps = await Camp.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Deleted",camps})
    }
    catch(err) {
        return res.status(404).json({message : err.message})
    }
    return res.status(400).json({message : "Can't delete camp",camps})
}

const updateCamp=async(req,res)=>
{
    let camps
        const {hospitalName,address,campName}=req.body
        const startDate=Date.parse(req.body.startDate)
        const endDate=Date.parse(req.body.endDate)
        try{
        camps=await Camp.findById(req.params.id,{
        hospitalName,
        address,
        campName,
        startDate,
        endDate

    })

    camps=await camps.save()
    return res.status(200).json('Blood Camp details updated',camps)}

    catch(err) {
        return res.status(404).json({message : err.message})
    }
    return res.status(400).json({message : "Can't update camp"})
}
module.exports={addCamp,viewCamp,viewCamps,deleteCamp,updateCamp};