module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductBrands'; // en plural.
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
            tableName: 'products_brand',
            timestamps: true,
            updatedAt: false,
            deletedAt: false,
            createdAt:false
        }
        const ProductBrands = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS

    return ProductBrands;
}