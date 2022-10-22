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
            type: dataTypes.STRING(45).UNSIGNED,
            allowNull: false
        },
        users_category: {
            type: dataTypes.STRING(11).UNSIGNED,
            allowNull: false
        },
        create_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: dataTypes.INT(11),
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
    const User = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS
    return User;
};