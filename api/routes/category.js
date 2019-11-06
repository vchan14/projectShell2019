// import { Router } from 'express';
// import { getRepository, getManager } from 'typeorm';
// import isAuthenticated from '../middleware/isAuthenticated';
// import Category from '../entities/category';

// const router = Router();
// router.route('/category')
//   .all(isAuthenticated)
//   // Get information
//   .get((req, res) => {
//     res.send(req.todo.category);
//   })

//   // Post -> create 
//   .post((req, res) => {
//     const { title } = req.body;
//     const manager = getManager();
//     const category = manager.create(Category, { title });
//     category.todo = req.todo;
//     manager.save(category).then((savedCategory) => {
//       res.send(savedCategory);
//     });
//   });

  
// router.route('/category/:id')
//   .all(isAuthenticated)
//   .all((req, res, next) => {
//     getRepository(Category).findOneOrFail(
//       { where: { userId: req.user.id, id: req.params.id } },
//     ).then((_foundCategory) => {
//       req.category = _foundCategory;
//       next();
//     }, () => {
//       res.send(404);
//     });
//   })
//   .put((req, res) => {
//     debugger
//     const foundCategory = req.category;
//     const { title } = req.body;
//     category.title = title;
    
//     getManager().save(foundCategory).then((updatedCategory) => {
//       res.send(updatedCategory);
//     });
//   })
//   .get((req, res) => {
//     res.send(req.category);
//   })
//   .delete((req, res) => {
//     getManager().delete(Category, req.category.id).then(() => {
//       res.send(200);
//     });
//   });

// export default router;
