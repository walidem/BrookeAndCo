import Employe from '../models/employe.model.js';

export const getAllEmployes = async (req, res, next) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        next(error);
    }
};

export const getEmployeById = async (req, res, next) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (employe) {
            res.status(200).json(employe);
        } else {
            res.status(404).json({ message: 'Employe non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const createEmploye = async (req, res, next) => {
    try {
        const employe = await Employe.create(req.body);
        res.status(201).json(employe);
    } catch (error) {
        next(error);
    }
};

export const updateEmploye = async (req, res, next) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (employe) {
            await employe.update(req.body);
            res.status(200).json(employe);
        } else {
            res.status(404).json({ message: 'Employe non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteEmploye = async (req, res, next) => {
    try {
        const employe = await Employe.findByPk(req.params.id);
        if (employe) {
            await employe.destroy();
            res.status(200).json({ message: 'Employe supprimé' });
        } else {
            res.status(404).json({ message: 'Employe non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};