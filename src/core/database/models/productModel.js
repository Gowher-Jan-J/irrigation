import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class taxRates extends Model { }

taxRates.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    taxName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    taxPercentage: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class category extends Model { }

category.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    categoryImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taxId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    taxPercentage: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class product extends Model { }

product.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tax: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0",
    },
    productImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    moreInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    availableLocations: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    blogLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

// class recommendedProducts extends Model { }

// recommendedProducts.init(
//   {
//     id: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     productId: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       allowNull: false,
//     },
//   },
//   { sequelize: connection, freezeTableName: true }
// );
// class productVariants extends Model { }

// productVariants.init(
//   {
//     id: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     productId: {
//       type: DataTypes.BIGINT.UNSIGNED,
//       allowNull: false,
//     },
//     productName: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     variantName: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     variantImage: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     altTags: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     variantColor: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     isColor: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//     actualPrice: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     discountPrice: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     tax: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       defaultValue: "0",
//     },
//     availableStock: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       defaultValue: "0"
//     },
//     alternateStock: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       defaultValue: "0"
//     },
//     status: {
//       type: DataTypes.ENUM("active", "inactive", "terminated"),
//       allowNull: false,
//       defaultValue: "active",
//     },
//   },
//   { sequelize: connection, freezeTableName: true }
// );

class productSpecifications extends Model { }

productSpecifications.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    productSpecification: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);
class productTitle extends Model { }

productTitle.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    productTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);



export { taxRates, category, product, productSpecifications, productTitle, };
