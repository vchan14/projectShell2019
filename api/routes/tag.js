import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Tag from '../entities/tag';

const router = Router();
router.route('/tag')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.tag); //@@ why todos?
  })
  .post((req, res) => {
    const { title, item } = req.body;
    const manager = getManager();
    const tag = manager.create(Tag, { title, item });
    tag.user = req.user;
    manager.save(tag).then((savedTag) => {
      res.send(savedTag);
    });
  });

  
router.route('/tag/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Tag).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTodo) => {
      req.tag = _foundTag;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    const foundTag = req.tag;
    const { title, item } = req.body;

    foundTag.title = title; 
    foundTag.item = item; 
    
  
    getManager().save(foundTag).then((updatedTag) => {
      res.send(updatedTag);
    });
  })
  .get((req, res) => {
    res.send(req.tag);
  })
  .delete((req, res) => {
    getManager().delete(ToDo, req.tag.id).then(() => {
      res.send(200);
    });
  });

export default router;
