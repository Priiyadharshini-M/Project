let Donor = require('../models/Donor')
const { donorValidation } = require('../helpers/ValidationSchema')
const { sendDonorToken } = require('../util/JwtToken')
const bcryptjs = require('bcryptjs');

const viewDonors = async(req,res) => {
    let donor
    try{
        donor = await Donor.find()
        return res.status(200).json({ donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No donors found" })
}

const addDonor = async(req,res)=>
{
    console.log("adding donor")
    let donor
    try{
        console.log(req.body)
        let options = { abortEarly : false }
        //const result = await userValidation.validateAsync(req.body,{abortEarly : false})
        const result = await donorValidation.validateAsync(req.body, options)
        // console.log("donor validation"+JSON.stringify(result))
        // const donorResult = JSON.stringify(result)
        // console.log(donorResult)
        console.log(result)
        console.log(result.email)
        const { userName, address, city, contact, bloodGroup, gender, age, password, email, lastDonateDate, allergies, disease } = result
        donor = await Donor.findOne({ email : result.email })
        console.log("donor"+donor)
        if(donor) 
           throw "This mail id has already been registered for Donor"
        const hashedPassword = await bcryptjs.hash(password, 10)
        console.log("password"+hashedPassword)
        donor = new Donor({
            userName, 
            address, 
            city,
            contact, 
            bloodGroup,
            gender,
            age,
            password : hashedPassword, 
            email,
            lastDonateDate,
            allergies,
            disease
        })
        await donor.save()
        return res.status(200).json({ donor })
        //sendDonorToken(donor,201,res)
    }
    catch(err) {
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
const loginDonor = async(req,res,next) => {
    let donor
    try{
        // const loginResult = await loginValidationSchema.validateAsync(req.body,{abortEarly : false})
        donor = await Donor.findOne({email : req.body.email})
        console.log("from login",donor)
        if(donor == null) 
           throw "No account exists with this email id"
        if(! bcryptjs.compareSync(req.body.password, donor.password))
            throw "Incorrect Password"
        sendDonorToken(donor,201,res)
    }
    catch(err){
        return res.status(404).json({errorMessage : err})
    }
}
const viewDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findById(req.params.id)
        return res.status(200).json({ donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No Donor found" })
}

const deleteDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message:"Deleted",donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message : "Can't delete donor",donor })
}

const updateDonor = async(req,res)=>
{

    let donor
    console.log("req body : ",req.body)
    try{
        if(req.params.id.length == 24)
        donor = await Donor.findById(req.params.id)
        else throw `Invalid Object Id`
        if(donor != null)
        {
        const updateResult = await donorValidation.validateAsync(req.body,{abortEarly : false})
        const { userName, address, city, password, bloodGroup, gender, age, contact, email, lastDonateDate, allergies, disease } = updateResult
        const hashedPassword = await bcryptjs.hash(password,10) 
        donor = await Donor.findByIdAndUpdate(req.params.id,{
            password : hashedPassword,
            userName,
            address,
            city,
            bloodGroup,
            gender,
            age,
            contact,
            email,
            lastDonateDate,
            allergies,
            disease
        })
        await donor.save()
        return res.status(200).json({message:"Successfully updated profile",donor})
        }
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
}

const viewSpecificDonors = async(req,res) => {
    let donor
    console.log(req.params,"...")
    try{
        donor = await Donor.find({ bloodGroup: req.body.bloodGroup, city:req.body.city })
        //donor=await Donor.find( { "donor.bloodGroup": req.params.bloodGroup, "donor.city": req.params.city } )
        console.log(donor)
        return res.status(200).json({ donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No donors found" })
}
module.exports = { addDonor, viewDonor, viewDonors, deleteDonor, updateDonor, viewSpecificDonors, loginDonor }