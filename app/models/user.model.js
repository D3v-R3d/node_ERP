const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        avatarUrl: {
            type: DataTypes.STRING,   // maxLength: 5 * 1024 * 1024, // 5 Mo if BLOB
        },
        // AdresseId: { type: DataTypes.INTEGER},
        firstConnexion:{type:DataTypes.BOOLEAN}
    };

    const options = {
        hooks: {
            afterSync: async () => {
                const User = sequelize.models.User;
                const existingUser = await User.findOne({ where: { email: 'default@user.com' } });
                if (!existingUser) {
                    const hashedPassword = await bcrypt.hash('azerty', 10);
                    await User.create({
                        title: 'Default',
                        firstName: 'Default',
                        lastName: 'User',
                        role: 'Super Admin',
                        email: 'ajendouz.redwan@gmail.com',
                        password: hashedPassword,
                        avatarUrl: 'default.jpg',
                        firstConnexion: true
                    });
                }
            }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}