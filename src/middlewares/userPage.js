const User = require('../../sequelize/models/User');
const Data = require('../../sequelize/models/Data');
const Icon = require('../../sequelize/models/Icon');

var { schema, rootValue, source } = require('../../sequelize/models/_graphql')
var { graphql } = require('graphql');
const { redirect } = require('express/lib/response');



exports.userGet = async (req,res,next) => {
    user = req.params.user;
    try{
        userData = await User.findOne({where : {email : user}});
        contentData = await userData.getData();
        iconData = await userData.getIcon();
        iconArrayData = Object.entries(iconData.dataValues);
        temp = JSON.stringify(contentData);
        contentData = JSON.parse(temp);
        userData = { user : userData , contents : contentData, icons : iconArrayData};
        res.render('user', userData);
    } catch(e) {
        console.log(e)
    }
}

exports.userGetEdit = async (req,res,next) => {
    user = req.params.user;
    try {
        userData = await User.findOne({where : {email : user}});
        contentData = await userData.getData();
        iconData = await userData.getIcon();
        iconArrayData = Object.entries(iconData.dataValues);
        temp = JSON.stringify(contentData);
        contentData = JSON.parse(temp);
        userData = { user : userData , contents : contentData, icons : iconArrayData};
        res.render('edit', userData)
    } catch (e) {
        console.log(e)
    }
}

exports.userPostEdit = async (req,res) => {
    user = req.params.user;
    input = req.body;
    try {
        userData = await User.findOne({where : {email : user}});
        if(input.Etitle== '' && input.Esubtitle == '' && input.Ecomment == '' && input.Edtitle == '' && input.Edsubtitle == '' && input.Edcomment == '' && input.Ilist == '' && input.AClist == '')  {
            res.redirect(`/${user}`);
        } else {
            data = await Data.create({ Etitle : input.Etitle ,Esubtitle : input.Esubtitle ,Ecomment : input.Ecomment ,Edtitle : input.Edtitle ,Edsubtitle : input.Edsubtitle ,Edcomment : input.Edcomment ,Ilist : input.Ilist ,AClist : input.AClist});
            userData.addData(data);
        }
        await Icon.update({ linkedin : input.linkedin || "0", github : input.github || "0", twitter : input.twitter || "0", facebook : input.facebook || "0"}, { where : {UserId : userData.id }} );
        res.redirect(`/${user}`);
    } catch(error) {
        console.log(error)
    }
}

exports.userPostRemove = async (req,res) => {
    user = req.params.user;
    input = req.body;
    try {
        userData = await User.findOne({where : {email : user}});
        await Data.remove({where : {UserId : userData.id}});
    } catch(error) {
        console.log(error)
    }
   
    res.redirect(`/${user}`);
}

exports.joinTest = async (req,res) =>{
        contentData =  await User.findAll(
            {
              include: [
            { 
                model: Data,
                required : true,
                as :"UserData"
            },
                { 
                    model : Icon,
                }
              ]
            },
        );
        res.send(contentData)
}

exports.graphqlTest = async (req, res) => {
  var result =  await graphql({ schema,source,rootValue })
  res.send(result)
}