const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

router.get('/post/:id', async (req, res) => {
    try{
      const postData =await Post.findByPk(req.params.id, {
        include: [User, Comment, User]
      });
  
      if (postData) {
        res.render('single-post', {
          post: postData.get({
            plain: true })
          });
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(500).json(err);
      }
        });
  
    router.get('/login', (req, res) => {
      if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
        res.render('login');
    });
  
    router.get('/signup', (req, res) => {
      if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
  
        res.render('signup');
    });

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        res.render('all-posts', { posts: postData });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;