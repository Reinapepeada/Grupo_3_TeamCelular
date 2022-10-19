module.exports = (sequelize, dataTypes) => {
    let alias = 'Products'; // en plural.
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        stock: {
            type: dataTypes.INT(11).UNSIGNED,
            allowNull: false
        },
        product_code: {
            type: dataTypes.INT(11).UNSIGNED,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(120),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        brand: {
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
    const Product = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS
    return Product;
};