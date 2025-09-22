const billsRouter = require('express').Router();
const Bill = require('../models/bills');
const User = require('../models/users');


billsRouter.post('/', async (request, response) => {
    
   try {
    const { date, user, discipline, time } = request.body; 
    if (!date || !user || !discipline || !time ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newBill = new Bill ({
       date,
       user,
       discipline,
       time,
       
       
    });
   
    
    const savedBill = await newBill.save();
    const userToUpdate = await User.findById(user);
    userToUpdate.bills = userToUpdate.bills.concat(savedBill._id)
    await userToUpdate.save();
   
    return response.status(201).json('Clase Registrada con éxito');
   } catch (error) {
    console.log(error);
    
   }
   
   });

billsRouter.get('/', async (request, response) => {

    try {
        // Find all packages using Package.find()
        // const bills = await Bill.find().populate('user');
        const bills = request.user.rol === 'admin'
        ? await Bill.find().populate('user')
        : await Bill.find({ user: request.user.id }).populate('user')
   
    
        // Check if any packages were found
        if (!bills.length) {
          return response.status(204).json({ message: 'No se encontraron clases' });
        }
    
        // Send the array of packages in the response
        return response.status(200).json(bills);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar clases' });
      }
   
});

billsRouter.patch("/:id/paid", async (request, response) => {
  const user = request.user;
  
  const { paid } = request.body;
  
  await Bill.findByIdAndUpdate(request.params.id, { paid });
  
 
  
  return response.sendStatus(200);
});




module.exports = billsRouter;