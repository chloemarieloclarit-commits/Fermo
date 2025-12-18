import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    deviceID:{
        type: String,
        required: true,
    },
    isOnline:{
        type: Boolean,
        default: false,
    },
    lastUpdate:{
        type: Number,
        required: true,
        default: 0
    },
    pH1: {
      type: Number,
      required: true,
      default: 0,
    },
    pH2:{
      type: Number,
      required: true,
      default: 0,
    },
    pH3:{
      type: Number,
      required: true,
      default: 0,
    },
    temperature: {
      type: Number,
      required: true,
      default: 0,
    }   
});


const Device = mongoose.model('Device', DeviceSchema);

export default Device;