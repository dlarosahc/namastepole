const classRouter = require('express').Router();
const Class = require('../models/class');
const Schedule = require('../models/schedule');
const Payment = require('../models/payments');

classRouter.get('/', async (request, response) => {

  try {
      // Find all packages using Package.find()
      
     
     
      const classes = await Class.find().populate({
        path: 'payments',
        populate: {path: 'package'}
      }).populate({
        path: 'payments',
        populate: {path: 'user'}
      });
      
    
  
      // Check if any packages were found
      if (!classes.length) {
        return response.status(204).json({ message: 'No se encontraron clases' });
      }
  
      // Send the array of packages in the response
      return response.status(200).json(classes);
      
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar clases' });
    }
 
});

classRouter.get('/two', async (request, response) => {

  try {
      // Find all packages using Package.find()
      
     
     
      const classes = await Class.find().populate({
        path: 'payments',
        populate: {path: 'package'}
      }).populate({
        path: 'payments',
        populate: {path: 'user'}
      }).populate('schedule');
      
    
  
      // Check if any packages were found
      if (!classes.length) {
        return response.status(204).json({ message: 'No se encontraron clases' });
      }
  
      // Send the array of packages in the response
      return response.status(200).json(classes);
      
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar clases' });
    }
 
});


classRouter.post('/', async (request, response) => {
  
    
    const { date, schedule, payments, name } = request.body; 
    if (!date || !schedule || !payments ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newClass = new Class ({
       date,
       schedule,
       payments,
       name,
       
    });
    
   
    const savedClass = await newClass.save();

    
    const paymentToUpdate = await Payment.findById(payments);
    paymentToUpdate.class = paymentToUpdate.class.concat(savedClass._id)
    await paymentToUpdate.save();
    return response.status(201).json('Clase agendada exitosamente');
   });

classRouter.patch("/:id/attended", async (request, response) => {
    
    
    const { attended } = request.body;
    
    await Class.findByIdAndUpdate(request.params.id, { attended });
    
    return response.sendStatus(200);
  });
    

module.exports = classRouter;