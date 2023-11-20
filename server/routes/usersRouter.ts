import express from 'express';

import usersController from '../controllers/users';
import { validate } from '../middlewares/validate';
import { updateUserSchema, userSchema } from '../schemas/userSchema';
import { emailChecker } from '../middlewares/emailChecker';
import { checkAuth } from '../middlewares/checkAuth';
import { checkRoles } from '../middlewares/checkRoles';
import { ROLE } from '../utils/role';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getSingleUser);
usersRouter.post('/', validate(userSchema), checkAuth, checkRoles(ROLE.USER), emailChecker, usersController.createUser);
usersRouter.put('/:userId',validate(updateUserSchema), emailChecker,usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.post("/signup", emailChecker, usersController.signUp);
usersRouter.post("/login", usersController.logIn);

export default usersRouter;