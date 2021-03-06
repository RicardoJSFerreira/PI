const jwt = require('jsonwebtoken')

const jobOffer_controller = require('../controllers/joboffer')
const user_controller = require('../controllers/user');
const serviceProvider_controller = require('../controllers/serviceProvider')

const bcrypt = require('bcryptjs')

var Out = module.exports;

//Obtem o email do JWT
Out.getEmailFromJWT = (token) => {
    email = null;

    jwt.verify(token, 'Project_PI', (err, payload) => {
        if(!err){
            email = payload.email;
        }else{
            console.log(err);
        }
    })

    return email;
}

//Obtem o type do JWT
Out.getTypeFromJWT = (token) => {
    type = null;

    jwt.verify(token, 'Project_PI', (err, payload) => {
        if(!err){
            type = payload.level;
        }else{
            console.log(err);
        }
    })

    return type;
}

Out.validToken = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            next()
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Verifica se token fornecido tem autorização de Admin.
Out.checkAdminLevel = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            level = payload.level;
            if(level == 1){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Verifica se token fornecido tem autorização de Admin ou Consumer ou Service Provider.
Out.checkAdminOrUserOrSP = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err,payload) => {
        if(!err){
            level = payload.level;
            if(level == 1 || level == 2 || level == 3){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Verifica se token fornecido tem autorização de consumer.
Out.checkUserLevel = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err,payload) => {
        if(!err){
            level = payload.level;
            if(level == 1 || level == 3){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Verifica se token fornecido tem autorização de company.
Out.checkCompanyLevel = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err,payload) => {
        if(!err){
            level = payload.level;
            if(level == 1 || level == 4){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Verifica se token fornecido tem autorização de service provider.
Out.checkServiceProviderLevel = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err,payload) => {
        if(!err){
            level = payload.level;
            if(level == 1 || level == 2){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

Out.checkOwnershipJobOffer = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            level = payload.level;
            if(level == 2 || 3){
                jobOffer_controller.consultar_id(req.body.id_job_offer)
                .then((job) => {
                    user_controller.consult(payload.email)
                    .then((user) => {
                        if(user.idUser == job.idUser){
                            next()
                        }else{
                            res.status(401).jsonp({message: "No permission."})
                        }
                    })
                    .catch((error) => res.status(401).jsonp({message: "No permission: " + error}))
                })
                .catch((error) => res.status(401).jsonp({message: "No permission: " + error}))

            }else if(level == 1){
                next()
            }else{
                res.status(401).jsonp({message: "No permission."})
            }
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

//Vai verificar se o id do User que está a tentar ser alterado é o mesmo do id do User logged in
Out.matchUsers = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            user_controller.consult(payload.email)
            .then((user) => {
                if(user.idUser == req.body.idUser){
                    next()
                }else{
                    res.status(401).jsonp("No permission.")
                }
            })
        }else{
            res.status(400).jsonp("Invalid JWT token.")
        }
    })
}

Out.matchReview = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            user_controller.consult(payload.email)
            .then((user) => {
                if(user.idUser == req.body.idGive){
                    next()
                }else{
                    res.status(401).jsonp("No permission.")
                }
            })
        }else{
            res.status(400).jsonp("Invalid JWT token.")
        }
    })
}

Out.matchPasswords = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            user_controller.consult(payload.email)
            .then((user) => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    next()
                } else {
                    res.status(400).jsonp({error: "Password Inválida"})
                }
            })
            .catch((err) => res.status(400).jsonp({ error: err }))
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

Out.check3MonthSubscription = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            user_controller.consult(payload.email)
            .then((user) => {
                serviceProvider_controller.consult_id(user.idUser)
                .then((sp) => {
                    if (sp.idSubscription == 3 || sp.idSubscription == 4 || sp.idSubscription == 6 || sp.idSubscription == 7){
                        next();
                    }
                    else{
                        res.status(400).jsonp({error : "A sua subscrição não lhe garante privilegios para visualizar esta pagina."})
                    }
                })
            })
            .catch((err) => res.status(400).jsonp({ error: err }))
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}

Out.checkSubscription = (req, res, next) => {
    jwt.verify(req.body.token, 'Project_PI', (err, payload) => {
        if(!err){
            user_controller.consult(payload.email)
            .then((user) => {
                serviceProvider_controller.consult_id(user.idUser)
                .then((sp) => {
                    if (sp.idSubscription > 1 || Date(user.freeTrial) > Date.now()){
                        next();
                    }
                    else{
                        res.status(400).jsonp({error : "A sua subscrição não lhe garante privilegios para adicionar Agenda."})
                    }
                })
            })
            .catch((err) => res.status(400).jsonp({ error: err }))
        }else{
            res.status(400).jsonp({ error: err })
        }
    })
}