module.exports = (app) => {
    const tasks = require('../controllers/taks.controller.js');

    app.post('/api/tasks', tasks.create);

    app.get('/api/tasks', tasks.findAll);

    app.get('/api/tasks/search/:searchTerm', tasks.findByTitleOrDesc);

    app.get('/api/tasks/:taskId', tasks.findById);

    app.put('/api/tasks/:taskId', tasks.update);

    app.put('/api/tasks/toggle/:taskId', tasks.toggle);

    app.delete('/api/tasks/:taskId', tasks.delete);
}