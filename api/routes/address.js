import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Address from '../entities/address';

const router = Router();
router.route('/address')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.todos);
  })
  .post((req, res) => {
    const { done, title, category } = req.body;
    const manager = getManager();
    const todo = manager.create(ToDo, { done, title, category });
    todo.user = req.user;
    manager.save(todo).then((savedTodo) => {
      res.send(savedTodo);
    });
  });

  
router.route('/todos/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(ToDo).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTodo) => {
      req.todo = _foundTodo;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    debugger
    const foundTodo = req.todo;
    const { title, done, category } = req.body;
    foundTodo.title = title;
    foundTodo.done = done;
    foundTodo.category = category;
    getManager().save(foundTodo).then((updatedTodo) => {
      res.send(updatedTodo);
    });
  })
  .get((req, res) => {
    res.send(req.todo);
  })
  .delete((req, res) => {
    getManager().delete(ToDo, req.todo.id).then(() => {
      res.send(200);
    });
  });

export default router;
