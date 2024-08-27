const usersRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');
const { userExtractor } = require('../middleware/auth');


usersRouter.post('/', async (request, response) => {
    const { idNumber, name, email, phone, password } = request.body;
    
    if (!idNumber || !name || !email || !phone || !password ){
        return response.status(400).json({ error: 'Todos los datos son requeridos' });
    }

    const userExist = await User.findOne({ email });

    if (userExist){
      return response.status(400).json({ error: 'EL correo electronico ya está en uso' });
    }

    const saltRounds = 10;
    
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({
        idNumber,
        name,
        email,
        phone,
        passwordHash,
    });

    const savedUser = await newUser.save();
    
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    }); 
    

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
        to: savedUser.email, // list of receivers
        subject: "Verificación de Usuario ✔", // Subject line
        html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar Correo</a>`, // html body
      });

      return response.status(201).json('Usuario creado por favor verifica tu correo'); 
   
});

usersRouter.get('/', async (request, response) => {

  try {
      // Find all packages using Package.find()
      const users = await User.find().populate('payments');
  
      // Check if any packages were found
      if (!users.length) {
        return response.status(204).json({ message: 'No se encontraron usuarios' });
      }
  
      // Send the array of packages in the response
      return response.status(200).json(users);
      
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar usuarios' });
    }
 
});

usersRouter.get('/logged', userExtractor ,async (request, response) => {

  try {
      return response.status(200).json(request.user);
      
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar usuarios' });
    }
 
});

usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);
  } catch (error) {
    //Encontrar el email del usuario
    const id = request.params.id;
    const { email } = await User.findById

      //Firmar nuevo token
      const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      }); 
    
      //Enviar correo
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
        to: email, // list of receivers
        subject: "Verificación de Usuario ✔", // Subject line
        html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar Correo</a>`, // html body
      });
  
    return response.status(400).json({ error: 'El link ya expiró. Un nuevo link ha sido enviado' });
  }
});

module.exports = usersRouter;  