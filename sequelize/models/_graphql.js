var { buildSchema } = require('graphql');

const User = require('../../sequelize/models/User');
const Data = require('../../sequelize/models/Data');
const Icon = require('../../sequelize/models/Icon');


// Construct a schema, using GraphQL schema language
exports.schema = buildSchema(`
  type Query {
    user(id : Int) : User
    data(id : Int) : Data
    test : String
  }
  type User {
    id: ID,
    email : String,
    password : String,
    Given_name : String,
    Last_name : String,
    createdAt : String,
    updatedAt : String,
    deletedAt : String
  }
  type Data {
    id: ID,
    Etitle : String,
    Esubtitle : String,
    Ecomment : String,
    Edtitle : String,
    Edsubtitle : String,
    Edcomment : String,
    Ilist : String,
    AClist : String
    createdAt : String,
    updatedAt : String,
    deletedAt : String,
    UserId : Int
  }
`);


exports.rootValue = {
    user : async (user) => { return await User.findOne({where : {id : user.id}})},
    data : async (user) => { return (await Data.findAll({where : {UserId : user.id}}))[0]},
    test : () => { return "hello"}
  };

exports.source = '{data(id:1) {id} user(id:1) {id}}'