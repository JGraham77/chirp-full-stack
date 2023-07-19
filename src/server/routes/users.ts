import * as express from 'express';
import Users from '../database/queries/users';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot get all users."});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [user] = await Users.getOneUser(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: "Cannot find a user with that id."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot get that user."});
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, email} = req.body;;

        const results = await Users.createUser({
            name, email,
            id: 0,
            password: null
        });
        const id = results.insertId;

        res.status(201).json({message: "Successfully created a user!", id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot create that user."});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const {email} = req.body;

        await Users.update(id, email);
        res.status(201).json({message: "Successfully updated user!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot update that user."});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Users.destroy(id);
        res.status(200).json({message: "Successfully deleted user!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot delete that user."});
    }
});

export default router;