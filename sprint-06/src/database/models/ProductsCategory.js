module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductsCategorys'; // en plural.
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
        status: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
     
    };
    let config = {
        tableName: 'product_category',
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        createdAt:false
    }
    const ProductsCategory = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS

    return ProductsCategory;
}