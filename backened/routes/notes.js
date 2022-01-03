var express = require('express');
var router = express.Router();
var User = require('../models/User');
var auth = require('../middleware/auth');
var Notes = require('../models/Notes');

// Add Note
router.post('/', auth.verifyToken, async (req, res, next) => {

    try {
        req.body.author = req.user.userId;

        const notes = await Notes.create(req.body);

        var notesData = await Notes.findOne({ _id: notes._id }).populate("author", "username email").exec()

        return res.status(200).json({ notes: notesData })
    } catch (error) {
        next(error);
    }
});


router.get('/', auth.optionalAuth, async function (req, res, next) {
    const query = {}
    const { limit, offset } = req.query

    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { $in: [req.query.tag] }
    }

    Promise.all([
        req.query.author ? User.findOne({ username: req.query.author }) : null,

    ]).then(function (results) {
        const [author] = results

        if (author) {
            query.author = author._id
        } else if (req.query.author) {
            query._id = { $in: [] }

        }
        console.log(query);
        return Promise.all([
            Notes.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: -1 }) // -1 means descending order, +1 means ascending order
                .populate('author')
                .exec(),
            Notes.countDocuments(query).exec(),
            req.user ? User.findById(req.user.id) : null
        ]).then((results) => {
            const [notes, notesCount, user] = results

            return res.json({
                notes: notes.map((note) => {
                    return note.toJSONFor(user);

                }),
                notesCount: notesCount
            })
        })
    }).catch(next)
});



// Update Articles 
router.put('/:id', auth.verifyToken, async (req, res, next) => {
    var id = req.params.id;
    try {
        var updatedNotes = await Notes.findOneAndUpdate({ id }, req.body, { new: true }).populate("author", "username email").exec();
        res.status(200).json({ updatedNotes: updatedNotes });
    } catch (err) {
        next(err);
    }
});

// Delete article
router.delete('/:id', auth.verifyToken, async (req, res, next) => {
    var id = req.params.id;
    try {
        await Notes.findOneAndDelete({ id });
        res.status(200).json({ msg: 'Notes is successfully deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;