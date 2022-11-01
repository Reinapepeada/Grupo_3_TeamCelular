module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'; // en plural.
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        //email: {
            //type: dataTypes.VARCHAR(45),
            //allowNull: false
        //},
        //password: {
           // type: dataTypes.VARCHAR(45),
            //allowNull: false
        //},
        //usersCategoryId: {
            //type: dataTypes.INTEGER(11),
            //allowNull: false
//},
        create_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER(11),
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