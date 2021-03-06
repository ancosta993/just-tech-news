const router = require('express').Router();
const Comment  = require('../../models/Comment');

router.get('/', (req, res) => {
   Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         res.status(500).json(err)
      });
});

router.post('/', (req, res) => {
   // check the session
   if (req.session){
      Comment.create({
         comment_text: req.body.comment_text,
         user_id: req.session.user_id,
         post_id: req.body.post_id
      })
         .then(dbCommentData => res.json(dbCommentData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   }
   
});

router.delete('/:id', (req, res) => {
   Comment.destroy({
      where:{
         id: req.params.id
      }
   })
      .then(dbCommentData => {
         if(!dbCommentData){
            res.status(400).json({ message: "No comment with this id was found"});
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         res.status(500).json(err);
      })
});

module.exports = router;