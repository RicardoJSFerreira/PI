const User = require('../models/user')
const dbconfig = require('../models/Config/Database_Info')

var Out = module.exports;

//GET by email
Out.consult = (email) => {
    return User.findOne({ where: { 'email': email } });
}

//GET by id
Out.consult_id = (id) => {
    return User.findOne({ where: { 'idUser': id } });
}

//GET all users
Out.list = () => {
    return User.findAll();
}

//GET all users of a type
Out.type = (type) => {
    return User.findAll({ where: { 'type': type } });
}

//GET all users of a type
Out.active = (active) => {
    return User.findAll({ where: { 'active': active } });
}

//Creates a new user
Out.insert = (user) => {
    return User.create({
        idUser: user.idUser,
        name: user.name,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        sex: user.sex,
        type: user.type,
        createdAt: user.createdAt,
        lastActivity: user.createdAt,
        active: user.active,
        idLocation: user.idLocation
    });
}

// Update user
Out.update = (id, user) => {
        return User.update({
            name: user.name,
            password: user.password,
            email: user.email,
            phoneNumber: user.phoneNumber,
            sex: user.sex,
            type: user.type,
            createdAt: user.createdAt,
            lastActivity: user.createdAt,
            active: user.active,
            idLocation: user.idLocation
        }, {
            where: { 'idUser': id },
            returning: true,
        });
    }

Out.updateConsumer = (body) => {
    return dbconfig.sequelize.query('CALL update_consumer (:idU, :name, :email, :locationID, :contact)',
        {replacements: {
            idU: body.idUser,
            name: body.name,
            email: body.email,
            locationID: body.location,
            contact: body.phoneNumber,
        }})
}

Out.updateServiceProvider = (body) => {
    return dbconfig.sequelize.query('CALL update_serviceProvider (:idSP, :name, :email, :locationID, :contact, :descricao,  :raio, :quali, :sol)',
        {replacements: {
            idSP: body.idUser,
            name: body.name,
            email: body.email,
            locationID: body.location,
            contact: body.phoneNumber,
            quali: body.qualifications,
            raio: body.distance,
            descricao: body.description,
            sol: body.solidarity
        }})
}

Out.updateCompany = (body) => {
    return dbconfig.sequelize.query('CALL update_company (:idCP, :name, :email, :contact, :locationID, :link, :firm, :nipc, :descricao)',
        {replacements: {
            idCP: body.idUser,
            name: body.name,
            email: body.email,
            contact: body.phoneNumber,
            locationID: body.location,
            link: body.link,
            firm: body.firm,
            nipc: body.nipc,
            descricao: body.description
        }})
}

Out.updatePassword = (email, pass) => {
    return User.update(
        {password: pass},
        {where: { 'email' : email}}
    )
}

Out.updatePhoto = (userId, photo) => {
    return dbconfig.sequelize.query('CALL update_file (:id, :photo)',
    {replacements: {
        id: userId,
        photo: photo
    }})
}

Out.getPerfil = (email) => {
    return dbconfig.sequelize.query('CALL get_consumer_profile (:em)',
    {replacements: {
        em: email,
    }})
}

Out.getPerfilCP = (email) => {
    return dbconfig.sequelize.query('CALL get_company_profile (:em)',
    {replacements: {
        em: email
    }})
}

    //Delete user by email
Out.remove = (id) => {
    return User.destroy({ where: { 'idUser': id } });
}

Out.changeType = (email) => {
    return User.update(
        {type: 3},
        {where: { 'email' : email}}
    )
}

Out.getImage = (email) => {
    return dbconfig.sequelize.query('CALL get_user_image (:em)',
    {replacements:{
        em: email
    }})
}

Out.deleteUser = (id) => {
    return dbconfig.sequelize.query('CALL remove_user (:id)',
    {replacements: {
        id: id
    }})
}