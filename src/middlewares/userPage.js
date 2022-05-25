const User = require('../../sequelize/models/User');
const Data = require('../../sequelize/models/Data');
const Icon = require('../../sequelize/models/Icon');


exports.userGet = async (req,res,next) => {
    user = req.params.user;
    userIdData = await User.findOne({where : {email : user}});
    contentData = await Data.findAll({where : {UserId : userIdData.id}});
    iconData = await Icon.findOne({where : {UserId : userIdData.id}});
    iconArrayData = Object.entries(iconData.dataValues);
    temp = JSON.stringify(contentData);
    contentData = JSON.parse(temp);
    userData = { user : userIdData , contents : contentData, icons : iconArrayData};
    res.render('user', userData);
}

exports.userGetEdit = async (req,res,next) => {
    user = req.params.user;
    userIdData = await User.findOne({where : {email : user}})
    contentData = await Data.findAll({where : {UserId : userIdData.id}});
    temp = JSON.stringify(contentData)
    contentData = JSON.parse(temp)
    iconData =await Icon.findOne({where : {UserId : userIdData.id}})
    iconArrayData = Object.entries(iconData.dataValues)
    userData = { user :userIdData , contents : contentData, icons : iconArrayData}
    res.render('edit', userData)
}

exports.userPostEdit = async (req,res) => {
    user = req.params.user;
    input = req.body;
    try {
        userData = await User.findOne({where : {email : user}});
        await Data.create({ Etitle : input.Etitle ,Esubtitle : input.Esubtitle ,Ecomment : input.Ecomment ,Edtitle : input.Edtitle ,Edsubtitle : input.Edsubtitle ,Edcomment : input.Edcomment ,Ilist : input.Ilist ,AClist : input.AClist, UserId : userData.id});
        await Icon.update({ linkedin : input.linkedin, github : input.github, twitter : input.twitter, facebook : input.facebook}, { where : {UserId : userData.id }} );
    } catch(error) {
        console.log(error)
    }
   
    res.redirect(`/${user}`);
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
            }
        );
        res.send(contentData)
}