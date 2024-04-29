import Client from '../models/client.model.js';

export const getAllClients = async (req, res, next) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
};

export const getClientById = async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const createClient = async (req, res, next) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        next(error);
    }
};

export const updateClient = async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            await client.update(req.body);
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteClient = async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            await client.destroy();
            res.status(200).json({ message: 'Client supprimé' });
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        next(error);
    }
};