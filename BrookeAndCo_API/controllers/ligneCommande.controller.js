import LigneCommande from '../models/ligneCommande.model.js';

export const getAllLigneCommandes = async (req, res, next) => {
    try {
        const ligneCommandes = await LigneCommande.findAll();
        res.status(200).json(ligneCommandes);
    } catch (error) {
        next(error);
    }
};

export const getLignesCommandeByNumero = async (req, res, next) => {
    try {
        const { numeroCommande } = req.params;

        const lignesCommande = await LigneCommande.findAll({
            where: { numeroCommande }
        });

        if (lignesCommande && lignesCommande.length > 0) {
            res.status(200).json(lignesCommande);
        } else {
            res.status(404).json({ message: 'Aucune ligne de commande trouvée pour ce numéro de commande' });
        }
    } catch (error) {
        next(error);
    }
};

export const createLigneCommande = async (req, res, next) => {
    try {
        const ligneCommande = await LigneCommande.create(req.body);
        res.status(201).json(ligneCommande);
    } catch (error) {
        next(error);
    }
};

export const updateLigneCommande = async (req, res, next) => {
    try {
        const ligneCommande = await LigneCommande.findByPk(req.params.id);
        if (ligneCommande) {
            await ligneCommande.update(req.body);
            res.status(200).json(ligneCommande);
        } else {
            res.status(404).json({ message: 'Ligne de commande non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteLigneCommande = async (req, res, next) => {
    try {
        const ligneCommande = await LigneCommande.findByPk(req.params.id);
        if (ligneCommande) {
            await ligneCommande.destroy();
            res.status(200).json({ message: 'Ligne de commande supprimée' });
        } else {
            res.status(404).json({ message: 'Ligne de commande non trouvée' });
        }
    } catch (error) {
        next(error);
    }
};