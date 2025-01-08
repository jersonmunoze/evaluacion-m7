const { sequelize } = require('./app/models');
const bootcampController = require('./app/controllers/bootcamp.controller');
const userController = require('./app/controllers/user.controller');


// Jerson Muñoz Espinoza FINAL DRILLING - M7

const main = async () => {
    try {
        //Sincroniza la base de datos
        await sequelize.sync({ force: true })
            .then(() => console.log('Eliminando y resincronizando la base de datos.'));

        //Crear usuarios
        const usuarioUno = await userController.createUser({ firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' });
        console.log(`>>Se ha creado el usuario: ${JSON.stringify(usuarioUno, null, 2)}`);
        const usuarioDos = await userController.createUser({ firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' });
        console.log(`>>Se ha creado el usuario: ${JSON.stringify(usuarioDos, null, 2)}`);
        const usuarioTres = await userController.createUser({ firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' });
        console.log(`>>Se ha creado el usuario: ${JSON.stringify(usuarioTres, null, 2)}`);
        const usuarioCuatro = await userController.createUser({ firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com' });
        console.log(`>>Se ha creado el usuario: ${JSON.stringify(usuarioCuatro, null, 2)}`);

        //Crear Bootcamps 
        const bootcampUno = await bootcampController.createBootcamp({ title: 'Introduciendo El Bootcamp De React.', cue: 10, description: 'React es la librería más usada en JavaScript para el desarrollo deinterfaces.' });
        console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcampUno, null, 2)}`);
        const bootcampDos = await bootcampController.createBootcamp({ title: 'Bootcamp Desarrollo Web Full Stack.', cue: 12, description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como:JavaScript, nodeJS, Angular,MongoDB, ExpressJS.' });
        console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcampDos, null, 2)}`);
        const bootcampTres = await bootcampController.createBootcamp({ title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.', cue: 18, description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.' });
        console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcampTres, null, 2)}`);
        //Agrega al bootcamp uno
        await bootcampController.addUser(usuarioUno.id, bootcampUno.id);
        await bootcampController.addUser(usuarioDos.id, bootcampUno.id);
        //Agrega al bootcamp dos
        await bootcampController.addUser(usuarioUno.id, bootcampDos.id);
        // //Agrega al bootcamp tres
        await bootcampController.addUser(usuarioUno.id, bootcampTres.id);
        await bootcampController.addUser(usuarioDos.id, bootcampTres.id);
        await bootcampController.addUser(usuarioTres.id, bootcampTres.id);

        //--------------------- Consultas --------------------------
        //Consulta bootcamp por id incluyendo los usuarios
        console.log('***************************** Consulta bootcamp por id con sus usuarios *****************************');

        const bootcampIdUno = await bootcampController.findById(1);
        console.log(JSON.stringify(bootcampIdUno, null, 2));

        //Listar todos los Bootcamp con sus usuarios
        console.log('***************************** Consulta todos los bootcamps con sus usuarios *****************************');

        const bootcamps = await bootcampController.findAll();
        console.log(JSON.stringify(bootcamps, null, 2));

        //Consultar un usuario por id, incluyendo los Bootcamp
        console.log('***************************** Consulta usuario con bootcamps por id *****************************');

        const usuarioIdTres = await userController.findUserById(3);
        console.log(JSON.stringify(usuarioIdTres, null, 2));

        //Listar los usuarios con sus Bootcamp
        console.log('***************************** Consulta todos los usuarios con sus bootcamps *****************************');

        const usuarios = await userController.findAll();
        console.log(JSON.stringify(usuarios, null, 2));

        //Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.
        console.log('***************************** Actualiza usuario por id *****************************');
        await userController.updateUserById(1, {firstName: 'Pedro', lastName: 'Sánchez', email: 'pedro.sanchez@correo.com'})
        .then(() => console.log('Usuario actualizado'));

        //Para verificar la actualización
        // const usuarioActualizado = await userController.findUserById(1);
        // console.log(JSON.stringify(usuarioActualizado, null, 2));
        console.log('***************************** Elimina usuario por id *****************************');
        await userController.deleteUserById(1);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();