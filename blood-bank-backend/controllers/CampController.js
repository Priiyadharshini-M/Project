
const { Camp } = require('../models/BloodCamp')
const { bloodCampValidation } = require('../validation/ValidationSchema')

//view all camps
const viewCamps = async (req, res) => {
    let camps
    try {
        camps = await Camp.find()
        if(camps.length <= 0)
        {
            throw "No camps found"
        }
        return res.status(200).json({ camps })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//add new camp
const addCamp = async (req, res) => {
    let camp
    try {
        let options = { abortEarly: false }
        const campResult = await bloodCampValidation.validateAsync(req.body, options)
        camp = await Camp.findOne({ campName: campResult.campName, hospitalName: campResult.hospitalName })
        if (camp)
            throw "This camp has already been registered in the given hospital"
        if (campResult != null)
            camp = new Camp(campResult)
        await camp.save()
        return res.status(201).json({ message: "Succesfully camp has been added", camp })
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }
}

//view particular camp
const viewCamp = async (req, res) => {
    let camps
    try {
        camps = await Camp.findById(req.params.id)
        return res.status(200).json({ camps })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//delete camp
const deleteCamp = async (req, res) => {
    let camps
    try {
        camps = await Camp.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Deleted", camps })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//update camp details
const updateCamp = async (req, res) => {
    let camp
    try {
        if (req.params.id.length == 24)
            camp = await Camp.findById(req.params.id)
        else throw `Invalid Object Id`
        if (camp != null) {
            const updateResult = await bloodCampValidation.validateAsync(req.body, { abortEarly: false })
            const { campName, hospitalName, address, startDate, endDate } = updateResult
            camp = await Camp.findByIdAndUpdate(req.params.id, {
                campName,
                hospitalName,
                address,
                startDate,
                endDate
            })
            await camp.save()
            return res.status(200).json({ message: "Successfully updated", camp })
        }
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            if (err) return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }
}
module.exports = { addCamp, viewCamp, viewCamps, deleteCamp, updateCamp }