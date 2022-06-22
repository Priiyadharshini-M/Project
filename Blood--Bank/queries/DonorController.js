let Donor=require('../models/Donor')

const viewDonors = async(req,res) => {
    let donor
    try{
        donor = await Donor.find()
        return res.status(200).json({donor})
    }
    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(404).json({message : "No donors found"})
}

const addDonor=async(req,res)=>
{
    let donor
        const {userName,address,city,password,bloodGroup,gender,age,email,lastDonateDate,allergies,disease}=req.body
        const contact=Number(req.body.contact)
        try{
    const newDonor=new Donor({
        userName,
        address,
        city,
        password,
        bloodGroup,
        gender,
        age,
        contact,
        email,
        lastDonateDate,
        allergies,
        disease

    })

    donor=await newDonor.save()
    return res.status(201).json('New Donor details added',donor)}

    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(400).json({message : "Can't add Donor"})
}

const viewDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findById(req.params.id)
        return res.status(200).json({donor})
    }
    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(404).json({message : "No Donor found"})
}

const deleteDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Deleted",donor})
    }
    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(400).json({message : "Can't delete donor",donor})
}

const updateDonor=async(req,res)=>
{
    let donor
        const {userName,address,city,password,bloodGroup,gender,age,email,lastDonateDate,allergies,disease}=req.body
        const contact=Number(req.body.contact)
        try{
        donor=await Donor.findById(req.params.id,{
            userName,
            address,
            city,
            password,
            bloodGroup,
            gender,
            age,
            contact,
            email,
            lastDonateDate,
            allergies,
            disease

    })

    donor=await donor.save()
    return res.status(200).json('Donor details updated',donor)}

    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(400).json({message : "Can't update Donor"})
}

const viewSpecificDonors = async(req,res) => {
    let donor
    try{
        donor = await Donor.find({ bloodGroup: req.params.bloodGroup,city:req.params.city})
        return res.status(200).json({donor:donor.userName})
    }
    catch(err) {
        console.log("Error Found : ",err.message)
    }
    return res.status(404).json({message : "No donors found"})
}
module.exports={addDonor,viewDonor,viewDonors,deleteDonor,updateDonor};