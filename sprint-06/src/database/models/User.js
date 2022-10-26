module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'; // en plural.
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        pàssword: {
            type: dataTypes.STRING,
            allowNull: false
        },
        usersCategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        create_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER(),
            allowNull: false
        },
        full_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        country: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        profile_image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        
    };
    let config = {
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: false,
        deletedAt: false
    }
    const User = sequelize.define(alias, cols, config);

    //RELACIONES PROMESAS
    return User;
};