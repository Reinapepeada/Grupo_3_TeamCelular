module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // en plural.
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
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_code: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(2),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        img_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        create_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        
    };
    let config = {
            tableName: 'product',
            timestamps: true,
            updatedAt: false,
            deletedAt: false,
            createdAt:false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.ProductsCategorys, {
              as: "ProductsCategorys",
              foreignKey: "category_id"
          })
          Product.belongsTo(models.Colors, {
            as: "Colors",
            foreignKey: "color_id"
        })
        Product.belongsTo(models.Brands, {
            as: "Brands",
            foreignKey: "brand_id"
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