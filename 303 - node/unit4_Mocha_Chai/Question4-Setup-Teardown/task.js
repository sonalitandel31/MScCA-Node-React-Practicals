let tasks = [];

function addTask(task) {
    tasks.push(task);
}

function getTasks() {
    return tasks;
}

function clearTasks() {
    tasks = [];
}

module.exports = {
    addTask,
    getTasks,
    clearTasks
};