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

classRouter.delete('/:id', async (request, response) => {
    try {
      //const user = request.user;
      const classId = request.params.id;
      console.log(classId);
      
      const classSelected = await Class.findById(classId).populate('payments');
      console.log(classSelected);
      
      if(!classSelected){
        return response.status(404).json({ error: 'No se encontraron pagos' })
      }
      const paymentId = classSelected.payments._id; // ID del pago con que se reserva la clase
  
      // Eliminar el pago
      await Class.findByIdAndDelete(classId);
  
      // Actualizar al usuario
      const payment = await Payment.findById(paymentId);
      payment.class = payment.class.filter(classes => classes.toString() !== classSelected.id.toString());
      await payment.save();
      return response.sendStatus(204);
     
    } catch (error) {
      return response.status(500).json({ error: 'Error eliminando clase' })
    }
    
    
    
    
    
    
    
     });   



classRouter.patch("/:id/attended", async (request, response) => {
    
    
    const { attended } = request.body;
    
    await Class.findByIdAndUpdate(request.params.id, { attended });
    
    return response.sendStatus(200);
  });
    

module.exports = classRouter;