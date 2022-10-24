module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategorys'; // en plural.
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING(120),
            allowNull: false
        },
        create_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
      
    };
    let config = {
        timestamps: true,
      //  createdAt: 'create_date',
        tableName: "user_category", 
        updatedAt: false,
        deletedAt: false,
        createdAt:false
    }
    const UserCategory = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS
    return UserCategory;
};