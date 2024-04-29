import User from '../models/user.model.js';
import Client from '../models/client.model.js'
import Employe from '../models/employe.model.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: [
                { model: Client, as: 'client'},
                { model: Employe, as: 'employe'},
            ]
        });

        if (users) {
            res.status(200).json(users)
        }
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Client, as: 'client'},
                { model: Employe, as: 'employe'},
            ]
        });
        
        if (user) {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        let userType = "Client"; //Defaut a client
        
        if (body.employe) {
            userType = "Employe"
        }

        console.log(`USER TYPE: ${userType}`);
    
        if (userType === "Client") {
            const userToCreate = {
                "user_type": "Client",
            }
    
            try {
                const user = await User.create(userToCreate);
    
                const clientToCreate = {
                    id: user.id,
                    nom: body.client.nom,
                    prenom: body.client.prenom,
                    courriel: body.client.courriel,
                    telephone: body.client.telephone,
                    adresse: body.client.adresse,
                    photo: body.client.photo,
                    password: body.client.password
                }
    
                const client = await Client.create(clientToCreate);
    
                res.status(201).json({user, client});
            } catch (err) {
                res.status(500).json({ message: err.message, stack: err.stack });;
            }
        } else {
            const userToCreate = {
                "user_type": "Employe",
            }
    
            try {
                const user = await User.create(userToCreate);
    
                const employeToCreate = {
                    matricule: user.id,
                    nom: body.employe.nom,
                    prenom: body.employe.prenom,
                    courriel: body.employe.courriel,
                    password: body.employe.password
                }
    
                const employe = await Employe.create(employeToCreate);
    
                res.status(201).json({user, employe});
            } catch (err) {
                res.status(500).json({ message: err.message, stack: err.stack });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack });
    }

};

export const updateUser = async (req, res, next) => {
    let userType;
    let body = req.body;

    // DANS SWIFT, ECRIT COMME userType, NOT user_type
    if (body.user_type === "Client") {
        userType = "Client"
    } else {
        userType = "Employe"
    }

    if (userType === "Client") {
        let bodyClient = body.client;
        let clientToChange = {
            "nom": bodyClient.nom,
            "prenom": bodyClient.prenom,
            "courriel": bodyClient.courriel,
            "telephone": bodyClient.telephone,
            "adresse": bodyClient.adresse,
            "photo": bodyClient.photo,
            "password": bodyClient.password,
        }

        try {
            const client = await Client.findByPk(req.params.id);
            await client.update(clientToChange);
            res.status(200).send("Client info updated");
        } catch (err) {
            res.status(500).json({ message: err.message, stack: err.stack });
        }
    } else {
        let bodyEmploye = body.employe;
        let employeToChange = {
            "nom": bodyEmploye.nom,
            "prenom": bodyEmploye.prenom,
            "courriel": bodyEmploye.courriel,
            "password": bodyEmploye.password,
        }

        try {
            const employe = await Employe.findByPk(req.params.id);
            await employe.update(employeToChange);
            res.status(200).send("Employe info updated");
        } catch (err) {
            res.status(500).json({ message: err.message, stack: err.stack });
        }
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User supprimé' });
        } else {
            res.status(404).json({ message: 'User non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};