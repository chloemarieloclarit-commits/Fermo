import mongoose from 'mongoose';

const types = ['Irrigation Activation', 'Data Submission', 'Seedling Sow', 'Seedling Ready'];


const EventSchema = new mongoose.Schema({
    device:{
        type: mongoose.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    eventDate:{
        type: Number,
        required: true,
        default: Date.now()
    },
    eventType:{
        type: String,
        enum: types,
        required: true,
        default: 'Data Submission'
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

const Event=mongoose.model('Event', EventSchema);

export default Event;