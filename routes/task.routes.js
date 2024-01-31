const taskController = require('../controller/task.controller');
const verifyToken = require('../middlewares/jwt')

module.exports = function (app) {
    app.post('/intern/api/v1/create-task', verifyToken, taskController.createTask);
    app.get('/intern/api/v1/get-all-tasks', verifyToken, taskController.getAllTasks);
    app.get('/intern/api/v1/get-task/:id', verifyToken, taskController.getTaskById);
    app.put('/intern/api/v1/update-task/:id', verifyToken, taskController.updateTaskById);
    app.delete('/intern/api/v1/delete-task/:id', verifyToken, taskController.deleteTaskById);
};
