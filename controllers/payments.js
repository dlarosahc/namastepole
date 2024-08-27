const paymentsRouter = require('express').Router();
const nodemailer = require('nodemailer');
const Payment = require('../models/payments');
const Package = require('../models/packages');
const User = require('../models/users');


paymentsRouter.get('/', async (request, response) => {

   try {
       // Find all packages using Package.find()
       const payments = request.user.rol === 'admin'
        ? await Payment.find().populate('user').populate('package')
        : await Payment.find({ user: request.user.id }).populate('user').populate('package').populate('class')
   
       // Check if any packages were found
       if (!payments.length) {
         return response.status(204).json({ message: 'No se encontraron pagos' });
       }
   
       // Send the array of packages in the response
       return response.status(200).json(payments);
       
     } catch (error) {
       // Handle errors gracefully
       console.error(error);
       return response.status(500).json({ message: 'Error al recuperar pagos' });
     }
  
});

paymentsRouter.post('/', async (request, response) => {
    const user = request.user;
    
    const { date, method, ref, amount, package, classQuantity } = request.body; 
    if (!date || !method || !ref || !amount ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newPayment = new Payment ({
       date,
       method,
       ref,
       amount,
       classQuantity,
       package,
       user,
    });
    
    const payingUser = await User.findById(user);
    const savedPayment = await newPayment.save();
    user.payments = user.payments.concat(savedPayment._id)
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: process.env.EMAIL_USER, // list of receivers
      subject: "Nuevo Pago recibido", // Subject line
      html: `<p>Nuevo pago recibido de ${user.name} fecha ${date} por el monto de ${amount}$</p>`, // html body
    });
    return response.status(201).json('Su compra está siendo procesada');
   });

paymentsRouter.delete('/:id', async (request, response) => {
  try {
    const user = request.user;
    const paymentId = request.params.id;
    
    const payment = await Payment.findByIdAndDelete(paymentId);
    if(!payment){
      return response.status(404).json({ error: 'No se encontraron pagos' })
    }

    user.payments = user.payments.filter(payment => payment.toString() !== paymentId );
    await user.save();
    return response.sendStatus(204);
   
  } catch (error) {
    return response.status(500).json({ error: 'Error eliminando el pago' })
  }
  
  
  
  
  
  
  
   });


paymentsRouter.patch("/:id/checked", async (request, response) => {
    const user = request.user;
    
    const { approved } = request.body;
    
    await Payment.findByIdAndUpdate(request.params.id, { approved });
    
    
    return response.sendStatus(200);
  });

  paymentsRouter.patch("/:id/classQuantity", async (request, response) => {
   
    try {
      await Payment.findByIdAndUpdate(request.params.id, { $inc: { classQuantity: -1 } });
      return response.json({ message: 'Cantidad de clase actualizada exitosamente' });
  } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error al actualizar la cantidad de clases' });
  }
  });
module.exports = paymentsRouter;