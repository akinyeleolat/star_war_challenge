import routesList from './v1';

const routes = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, content-type, x-access-token, authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.removeHeader('X-Powered-By');
    next();
  });
  // you can do versioning
  const version1 = '/v1';
  app.use(version1, routesList);
};

export default routes;
