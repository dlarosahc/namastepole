const mongoose = require ('mongoose');

const classSchema = new mongoose.Schema({
    
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
    },
    date: String,
    
    payments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    },

    attended: {
        type: Boolean,
        default: false,
    },
    name: String,

    });

    classSchema.set('toJSON', {
        transform: (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

    classSchema.set('toJSON', {
      transform: (document,returnedObject) => {
          returnedObject.id = returnedObject._id.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
      }
  });
  

    const Class = mongoose.model('Class', classSchema);

module.exports = Class;