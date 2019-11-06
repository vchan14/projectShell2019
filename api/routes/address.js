import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Address from '../entities/address';

const router = Router();
router.route('/address')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.address);
  })
  .post((req, res) => {
    const { street_name, street_number, zip_code, state, city, user } = req.body;
    const manager = getManager();
    const address = manager.create(Address, { street_name, street_number, zip_code, state, city, user });
    address.user = req.user;
    manager.save(address).then((savedAddress) => {
      res.send(savedAddress);
    });
  });

  
router.route('/address/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(ToDo).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundAddress) => {
      req.address = _foundAddress;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    debugger
    const _foundAddress = req.address;
    const { street_name, street_number, zip_code, state, city, user  } = req.body;
    foundAddress.street_name = street_name;
    foundAddress.street_number = street_number; 
    foundAddress.zip_code = zip_code;
    foundAddress.state = state;
    foundAddress.city = city;
    foundAddress.user = user;



    getManager().save(foundAddress).then((updatedAddress) => {
      res.send(updatedAddress);
    });
  })
  .get((req, res) => {
    res.send(req.address);
  })
  .delete((req, res) => {
    getManager().delete(Address, req.address.id).then(() => {
      res.send(200);
    });
  });

export default router;
