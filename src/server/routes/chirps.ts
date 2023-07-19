import * as express from 'express';
import Chirps from '../database/queries/chirps';
import Mentions from '../database/queries/mentions';
import Users from '../database/queries/users';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const chirps = await Chirps.getAllChirps();
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot get all chirps."});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [chirp] = await Chirps.getOneChirp(id);
        if (chirp) {
            res.json(chirp);
        } else {
            res.status(404).json({message: "Cannot find a chirp with that id."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot get that chirp."});
    }
});

router.post('/', async (req, res) => {
    try {
        const {userid, content, location} = req.body;

        if (!content || typeof content !== 'string' || content.length > 250) {
            res.status(400).json({message: "Please add a valid chirp."})
            return;
        };

        const results = await Chirps.createChirp({userid, content, location});
        const chirpid = results.insertId;

        const potentialMentions = content.split(' ').filter(word => word[0] === '@').map(mention => mention.replace('@', ''));

        for await (const pU of potentialMentions) {
            const [user] = await Users.searchByName(pU);
            if (user) {
                await Mentions.createMention(user.id, chirpid)
            }
        }

        res.status(201).json({message: "Successfully created a chirp!", id: chirpid});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot create that chirp."});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const chirpid = parseInt(req.params.id);

        const {content} = req.body;

        if (!content || typeof content !== 'string' || content.length > 250) {
            res.status(400).json({message: "Please edit with a valid chirp."})
            return;
        };

        const potentialMentions = content.split(' ').filter(word => word[0] === '@').map(mention => mention.replace('@', ''));

        await Mentions.destroyByChirpId(chirpid)

        for await (const pU of potentialMentions) {
            const [user] = await Users.searchByName(pU);
            if (user) {
                await Mentions.createMention(user.id, chirpid)
            }
        }

        await Chirps.update(chirpid, content);
        res.status(201).json({message: "Successfully updated chirp!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot update that chirp."});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Mentions.destroyByChirpId(id);
        await Chirps.destroy(id);
        res.status(200).json({message: "Successfully deleted chirp!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot delete that chirp."});
    }
});

export default router;