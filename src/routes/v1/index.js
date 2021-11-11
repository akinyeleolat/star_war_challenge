import { Router } from 'express';
import userRoute from './user';
import userTypeRoute from './usertype';
import movieRoute from '../../movies/MovieRoute';

const router = Router();

const routeList = [
  { path: '/auth', route: userRoute },
  { path: '/usertype', route: userTypeRoute },
  { path: '/movies', route: movieRoute },
];

routeList.forEach((route) => {
  router.use(route.path, route.route);
});

router.all('/', (req, res) => {
  res.send({ message: 'Hello from templates!' });
});

export default router;
