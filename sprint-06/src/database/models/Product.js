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
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_code: {
            type: dataTypes.INTEGER,
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
        colorId: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        categoryId: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        brandId: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        
    };
    let config = {
        timestamps: true,
       
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.ProductsCategorys, {
              as: "ProductsCategorys",
              foreignKey: "categoryId"
          })
        /*  Product.belongsTo(models.CategorysProducts, {
            as: "ProductsCategorys",
            foreignKey: "categoryId"
        }) /*
         /* Product.belongsToMany(models.Provider, {
              as: "provider",
              //nombre de la tabla intermedia 'mediante traduccion'
              through: 'providerxproduct',
              foreignKey: "idProduct",
              otherKey: "idProvider",
              timestamps:false,
          }) */    
      }
    return Product;
};