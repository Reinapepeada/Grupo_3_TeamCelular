module.exports = (sequelize, dataTypes) => {
    let alias = 'Colors'; // en plural.
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
     
    };
    let config = {
        tableName: 'color',
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        createdAt:false
    }
    const Color = sequelize.define(alias,cols,config); // va en singular

    //RELACIONES PROMESAS

    return Color;
}