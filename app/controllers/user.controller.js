const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

module.exports = {
    async createUser(data) {
        return await User.create(data);
    },
    async findUserById(id) {
        return await User.findByPk(id, {
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamps',
                    attributes: ['id', 'title', 'cue', 'description'],
                    through: {
                        attributes: [],
                    },
                }
            ],
        });
    },
    async findAll() {
        return await User.findAll({
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamps',
                    attributes: ['id', 'title', 'cue', 'description'],
                    through: {
                        attributes: [],
                    },
                }
            ],
        });
    },
   
    async updateUserById(id, data) {
        return await User.update(data, { where: { id } });
    },
    async deleteUserById(userId) {
        await User.destroy({ where: { id: userId } });
        console.log(`Usuario con id ${userId} eliminado`);
    }
}