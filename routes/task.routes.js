const taskController = require('../controller/task.controller');

module.exports = function (app) {
    app.post('/intern/api/v1/create-task', taskController.createTask);
    app.get('/intern/api/v1/get-all-tasks', taskController.getAllTasks);
    app.get('/intern/api/v1/get-task/:id', taskController.getTaskById);
    app.put('/intern/api/v1/update-task/:id', taskController.updateTaskById);
    app.delete('/intern/api/v1/delete-task/:id', taskController.deleteTaskById);
};
