import Jeu from '../models/jeu.model.js';

export const getAllJeux = async (req, res, next) => {
    try {
        const jeux = await Jeu.findAll();
        res.status(200).json(jeux);
    } catch (error) {
        next(error);
    }
};

export const getJeuById = async (req, res, next) => {
    try {
        const jeu = await Jeu.findByPk(req.params.id);
        if (jeu) {
            res.status(200).json(jeu);
        } else {
            res.status(404).json({ message: 'Jeu non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const createJeu = async (req, res, next) => {
    try {
        const jeu = await Jeu.create(req.body);
        res.status(201).json(jeu);
    } catch (error) {
        next(error);
    }
};

export const updateJeu = async (req, res, next) => {
    try {
        const jeu = await Jeu.findByPk(req.params.id);
        if (jeu) {
            await jeu.update(req.body);
            res.status(200).json(jeu);
        } else {
            res.status(404).json({ message: 'Jeu non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteJeu = async (req, res, next) => {
    try {
        const jeu = await Jeu.findByPk(req.params.id);
        if (jeu) {
            await jeu.destroy();
            res.status(200).json({ message: 'Jeu supprimé' });
        } else {
            res.status(404).json({ message: 'Jeu non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};