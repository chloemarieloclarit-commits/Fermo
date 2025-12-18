import Device from "../models/device.model.js";
import mongoose from "mongoose";

export const registerNewDevice = async(req, res) =>{
    const deviceID =  req.body.deviceID;
    
    try{
        var newDevice = new Device();
        newDevice.deviceID = deviceID;

        await newDevice.save();
        res.status(200).json({success: true, data: [newDevice]});
    }catch(error){
        res.status(500).json({success: false, message:"Server Error"});
    }
    
    return res;
}

export const getDevices = async(req, res) =>{
    try{
        const devices = await Device.find({});
        if(!devices){
            res.status(500).json({success: false, message:"No device found!"});
        }else{
            res.status(200).json({success: true, data: devices});
        }
    }catch(error){
        res.status(500).json({success: false, message:"Server Error"});
    }

    return res;
}
export const updateDevice = async(req, res)=>{}


export const deviceOnline = async(req, res) =>{
    const deviceID =  req.body.deviceID;
    const temperature = req.body.temperature;
    const pH1 = req.body.pH1;
    const pH2 = req.body.pH2;
    const pH3 = req.body.pH3;

    try{
        const result = await Device.find({deviceID});
        if(!result){
            res.status(500).json({success: false, message:"Device Not found!"});    
        }else{
            const device=result[0];
            device.isOnline = true;
            device.pH1 = pH1;
            device.pH2 = pH2;
            device.pH3 = pH3;
            device.temperature = temperature;
            device.lastUpdate = Date.now();
            const updatedDevice = await Device.findByIdAndUpdate(device._id, device, {new: true});
            res.status(200).json({success: true, data: [updatedDevice]});
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
    
    return res;
}