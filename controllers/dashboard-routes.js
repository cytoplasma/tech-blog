const router = require('express').Router();
const withAuth = require('../utils/auth');


// post to get plain object representation of orig object rather than the orig object itself
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({ where: {
            userId: req.session.userId,
        },
    });

    const posts = postData.map((post) => post.get ({
        plain: true}));
        // grab the posts & catch err
        res.render('all-posts-admin', {
            layout: 'dashboard', posts,
        });
    } catch (err) {
        res.redirect('login')
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// find post in database w/ matching pk value. found obj assigned to postData. not found = null
router.get('/edit/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('edit-post', { layout: 'dashboard', post
        });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;