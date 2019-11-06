import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import ToDo from '../entities/order';

const router = Router();
router.route('/order')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.order); //@@ why todos?
  })
  .post((req, res) => {
    const { total_cost, total_weight, order_status, staff, user, order_item } = req.body;
    const manager = getManager();
    const order = manager.create(ToDo, { total_cost, total_weight, order_status, staff, user, order_item });
    order.user = req.user;
    manager.save(order).then((savedOrder) => {
      res.send(savedOrder);
    });
  });

  
router.route('/order/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(ToDo).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundOrder) => {
      req.todo = _foundOrder;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    const foundOrder = req.order;
    const {  total_cost, total_weight, order_status, staff, user, order_item } = req.body;
    foundOrder.total_cost = total_cost;
    foundOrder.total_weight = total_weight;
    foundOrder.order_status = order_status;
    foundOrder.staff = staff;
    foundOrder.user = user; 
    foundOrder.order_item = order_item;

    getManager().save(foundOrder).then((updatedOrder) => {
      res.send(updatedOrder);
    });
  })
  .get((req, res) => {
    res.send(req.order);
  })
  .delete((req, res) => {
    getManager().delete(Order, req.order.id).then(() => {
      res.send(200);
    });
  });

export default router;
