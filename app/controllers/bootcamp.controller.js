const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

module.exports = {
    async createBootcamp(data) {
        return await Bootcamp.create(data);
    },
    async addUser (userId, bootcampId) {
        const user = await User.findByPk(userId);
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (user && bootcamp) {
          await bootcamp.addUser(user);
          console.log(`*****************************\nAgregado el usuario id=${userId} al bootcamp con id=${bootcampId}\n*****************************`);
        }
    },
    async findById(id) {
        return await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    through: {
                        attributes: [],
                    },
                }
            ],
        });
    },
    async findAll() {
        return await Bootcamp.findAll({
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    through: {
                        attributes: [],
                    },
                }
            ],
        });
    },
};