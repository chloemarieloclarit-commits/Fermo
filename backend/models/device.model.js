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
    
   pH: {
      type: Number,
      required: true,
      default: 0,
    },

    temperature: {
      type: Number,
      required: true,
      default: 0,
    },

    containerType: {
      type: String,
      default: "Clay Jar",
    },

    fermentationStage: {
      type: Number, 
      default: 1,
    },

    stageDescription: {
      type: String,
      default: "Initial Fermentation",
    },

    alerts: [
      {
        message: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],

    
    pHTrend: [
      {
        value: Number,
        timestamp: Number,
      },
    ],

    temperatureTrend: [
      {
        value: Number,
        timestamp: Number,
      },
    ],
  },
  { timestamps: true }

);


const Device = mongoose.model('Device', DeviceSchema);

export default Device;