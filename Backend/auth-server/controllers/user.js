const User = require('../models/user')

var Out = module.exports;

//GET
Out.consultar = (email) => {
    return User.findOne({where:{'email': email}})
}

Out.consultar_id = (id) => {
    return User.findOne({where:{'idUser': id}})
}

Out.activate = (email) => {
    return User.update(
        {active: 1},
        {where: { 'email' : email}}
    )
}

Out.deactivate = (email) => {
    return User.update(
        {active: 0},
        {where: { 'email' : email}}
    )
}

Out.changeType = (email) => {
    return User.update(
        {type: 3},
        {where: { 'email' : email}}
    )
}

Out.adicionarUser = (body) => {
    return User.create({
        name: body.name,
        password: body.password,
        email: body.email,
        phoneNumber: body.phoneNumber,
        sex: body.sex,
        type: body.type,
        createdAt: new Date(),
        lastActivity: new Date(),
        active: 0,
        idLocation: body.location
    })
}

//PUT
Out.testeCreate = () => {
    User.create({
        name: "Tohru",
        password: "12345",
        email: "theTest@gmail.com",
        phoneNumber: "910905213",
        sex: "M",
        type: "1",
        createdAt: '2020-01-09 07:30:40',
        lastActivity: '2020-04-29 14:48:37',
        active: 1,
        idLocation: 1
    })

    return User
}