module.exports = (sequelize, dataTypes) => {
    let alias = 'Brands'; // en plural.
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(120),
            allowNull: false
        },
     
    };
    let config = {
        tableName: 'brand',
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        createdAt:false
    }
    const Brand = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS

    return Brand;
}