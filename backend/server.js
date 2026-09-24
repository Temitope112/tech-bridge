const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const tasksFile = path.join(
  __dirname,
  "data",
  "tasks.json"
);


// ---------------------------------------
// MIDDLEWARE
// ---------------------------------------

app.use(express.json());


// Allow our frontend to communicate
// with the API when using Live Server.
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


// ---------------------------------------
// HELPERS
// ---------------------------------------

function readTasks(callback) {
  fs.readFile(
    tasksFile,
    "utf8",
    (error, data) => {
      if (error) {
        return callback(error);
      }

      try {
        const tasks = JSON.parse(data);

        callback(null, tasks);
      } catch (parseError) {
        callback(parseError);
      }
    }
  );
}


function writeTasks(tasks, callback) {
  fs.writeFile(
    tasksFile,
    JSON.stringify(tasks, null, 2),
    "utf8",
    callback
  );
}


// ---------------------------------------
// API HEALTH
// GET /api/health
// ---------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: "connected",
    message: "TechBridge API is running"
  });
});


// ---------------------------------------
// GET ALL TASKS
// GET /api/tasks
// ---------------------------------------

app.get("/api/tasks", (req, res) => {
  readTasks((error, tasks) => {
    if (error) {
      console.error(
        "Unable to read tasks:",
        error
      );

      return res.status(500).json({
        message: "Unable to load tasks."
      });
    }

    res.json(tasks);
  });
});


// ---------------------------------------
// GET ONE TASK
// GET /api/tasks/:id
// ---------------------------------------

app.get("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID."
    });
  }

  readTasks((error, tasks) => {
    if (error) {
      return res.status(500).json({
        message: "Unable to load task."
      });
    }

    const task = tasks.find(
      (item) => item.id === taskId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found."
      });
    }

    res.json(task);
  });
});


// ---------------------------------------
// UPDATE TASK STATUS
// PUT /api/tasks/:id
// ---------------------------------------

app.put("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    "completed",
    "in-progress",
    "not-started"
  ];

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID."
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message:
        "Status must be completed, in-progress or not-started."
    });
  }

  readTasks((error, tasks) => {
    if (error) {
      return res.status(500).json({
        message: "Unable to load tasks."
      });
    }

    const taskIndex = tasks.findIndex(
      (task) => task.id === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found."
      });
    }

    // Keep only one current/in-progress task.
    if (status === "in-progress") {
      tasks.forEach((task) => {
        if (
          task.id !== taskId &&
          task.status === "in-progress"
        ) {
          task.status = "not-started";
        }
      });
    }

    tasks[taskIndex].status = status;

    writeTasks(
      tasks,
      (writeError) => {
        if (writeError) {
          console.error(
            "Unable to save tasks:",
            writeError
          );

          return res.status(500).json({
            message:
              "Unable to update task."
          });
        }

        res.json({
          message:
            "Task updated successfully.",
          task: tasks[taskIndex]
        });
      }
    );
  });
});


// ---------------------------------------
// START SERVER
// ---------------------------------------

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log(
    "TechBridge Task Management API"
  );
  console.log(
    "--------------------------------"
  );
  console.log(
    `Server: http://localhost:${PORT}`
  );
  console.log(
    `Tasks:  http://localhost:${PORT}/api/tasks`
  );
  console.log(
    `Health: http://localhost:${PORT}/api/health`
  );
  console.log("");
});