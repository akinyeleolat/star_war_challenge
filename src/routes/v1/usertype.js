import express from 'express';
import * as UserTypeController from '../../controllers/UserTypeController';


const router = express.Router();

/**
 * implement data validation, available to admin and add as middleware
 */
router.get('/', UserTypeController.getAllUserType);
router.post('/', UserTypeController.createUserType);
router.patch('/', UserTypeController.updateUserType);
router.post('/name', UserTypeController.findUserTypeByName);
router.get('/filter', UserTypeController.filterUserType);
router.get('/:id', UserTypeController.findUserTypeById);
export default router;
