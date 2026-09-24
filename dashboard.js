const THEME_KEY =
  "techbridge-dashboard-theme";

const API_BASE_URL =
  "https://tech-bridge-nc4g.onrender.com/api";

let tasks = [];

let activeFilter = "all";
let searchQuery = "";
let selectedTaskId = null;
let toastTimer = null;
let tasksLoaded = false;


// ---------------------------------------
// TECHNOLOGIES
// ---------------------------------------

const technologies = {
  nextjs: {
    number: "01",
    label: "REACT FRAMEWORK",
    title: "Next.js",
    description:
      "Next.js is a React framework for building modern web applications. It provides routing, server rendering, API capabilities, performance optimizations and a structured approach to building larger React products.",
    tags: [
      "React",
      "Routing",
      "Server Rendering",
      "App Router",
      "Full-Stack",
    ],
  },

  vue: {
    number: "02",
    label: "JAVASCRIPT FRAMEWORK",
    title: "Vue.js",
    description:
      "Vue.js is a progressive JavaScript framework for building user interfaces. It uses a component-based architecture and reactive state system while remaining approachable for developers moving beyond vanilla JavaScript.",
    tags: [
      "Components",
      "Reactivity",
      "Templates",
      "State",
      "JavaScript",
    ],
  },

  angular: {
    number: "03",
    label: "WEB APPLICATION FRAMEWORK",
    title: "Angular",
    description:
      "Angular is a structured framework for building large web applications. It includes routing, forms, dependency injection, TypeScript support and many tools required for complex frontend systems.",
    tags: [
      "TypeScript",
      "Components",
      "Routing",
      "Forms",
      "Enterprise Apps",
    ],
  },

  backend: {
    number: "04",
    label: "SERVER DEVELOPMENT",
    title: "Backend",
    description:
      "Backend development handles application logic, databases, authentication, APIs and communication between the frontend and server. It is what allows an interface to work with real application data.",
    tags: [
      "APIs",
      "Databases",
      "Authentication",
      "Servers",
      "Business Logic",
    ],
    backend: [
      {
        name: "Node.js",
        description:
          "Runs JavaScript outside the browser and is commonly used for server-side applications.",
      },
      {
        name: "Express",
        description:
          "A lightweight Node.js framework commonly used for APIs and web servers.",
      },
      {
        name: "Django",
        description:
          "A Python framework designed for secure and structured backend applications.",
      },
    ],
  },
};


// ---------------------------------------
// ELEMENTS
// ---------------------------------------

const taskList =
  document.querySelector("#task-list");

const emptyState =
  document.querySelector("#empty-state");

const searchInput =
  document.querySelector("#task-search");

const taskFilters =
  document.querySelector("#task-filters");

const drawer =
  document.querySelector("#task-drawer");

const drawerOverlay =
  document.querySelector(
    "#task-drawer-overlay"
  );

const drawerBody =
  document.querySelector(
    "#task-drawer-body"
  );

const drawerNumber =
  document.querySelector(
    "#drawer-number"
  );

const sidebar =
  document.querySelector("#sidebar");

const sidebarOverlay =
  document.querySelector(
    "#sidebar-overlay"
  );

const apiStatus =
  document.querySelector("#api-status");

const apiStatusText =
  document.querySelector(
    "#api-status-text"
  );


// ---------------------------------------
// API
// ---------------------------------------

async function apiRequest(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type":
          "application/json",

        ...(options.headers || {}),
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed with status ${response.status}.`
    );
  }

  return data;
}


async function checkApiHealth() {
  setApiStatus("checking");

  try {
    await apiRequest("/health");

    setApiStatus("connected");
  } catch {
    setApiStatus("offline");
  }
}


function setApiStatus(state) {
  if (!apiStatus || !apiStatusText) {
    return;
  }

  apiStatus.dataset.state = state;

  const labels = {
    checking: "Checking...",
    connected: "Connected",
    offline: "Offline",
  };

  apiStatusText.textContent =
    labels[state] || state;
}


// ---------------------------------------
// LOAD TASKS
// ---------------------------------------

async function loadTasks({
  showLoading = true,
} = {}) {
  if (showLoading) {
    renderTaskLoading();
  }

  try {
    const data =
      await apiRequest("/tasks");

    if (!Array.isArray(data)) {
      throw new Error(
        "Invalid task data received."
      );
    }

    tasks = data;
    tasksLoaded = true;

    setApiStatus("connected");

    renderDashboard();
  } catch (error) {
    console.error(
      "Unable to load tasks:",
      error
    );

    tasks = [];
    tasksLoaded = false;

    setApiStatus("offline");
    renderTaskError();
    renderUnavailableDashboard();
  }
}


function renderTaskLoading() {
  emptyState.hidden = true;

  taskList.innerHTML = `
    <div class="task-api-state">
      <div
        class="task-api-state__loader"
        aria-hidden="true"
      ></div>

      <span>
        CONNECTING TO API
      </span>

      <h3>
        Loading tasks...
      </h3>

      <p>
        Your internship tasks are being
        requested from the TechBridge backend.
      </p>
    </div>
  `;
}


function renderTaskError() {
  emptyState.hidden = true;

  taskList.innerHTML = `
    <div class="task-api-state">

      <span>
        BACKEND OFFLINE
      </span>

      <h3>
        Unable to load tasks.
      </h3>

      <p>
        Please make sure the TechBridge
        Node.js server is running and
        try again.
      </p>

      <button
        type="button"
        data-retry-tasks
      >
        Try Again
      </button>

    </div>
  `;
}


function renderUnavailableDashboard() {
  const unavailable = "—";

  document.querySelector(
    "#progress-percentage"
  ).textContent = unavailable;

  document.querySelector(
    "#progress-fraction"
  ).textContent = "— / —";

  document.querySelector(
    "#completed-count"
  ).textContent = "—";

  document.querySelector(
    "#remaining-count"
  ).textContent = "—";

  document.querySelector(
    "#task-summary-completed"
  ).textContent = "—";

  document.querySelector(
    "#profile-percentage"
  ).textContent = unavailable;

  document.querySelector(
    "#sidebar-percentage"
  ).textContent = unavailable;

  document.querySelector(
    "#sidebar-progress-text"
  ).textContent =
    "Unable to load progress";

  document.querySelector(
    "#main-progress-fill"
  ).style.width = "0%";

  document.querySelector(
    "#sidebar-progress-fill"
  ).style.width = "0%";
}


// ---------------------------------------
// HELPERS
// ---------------------------------------

function getTaskStatus(task) {
  return task?.status || "not-started";
}


function getStats() {
  const completed = tasks.filter(
    (task) =>
      task.status === "completed"
  ).length;

  const inProgress = tasks.filter(
    (task) =>
      task.status === "in-progress"
  ).length;

  const notStarted = tasks.filter(
    (task) =>
      task.status === "not-started"
  ).length;

  const percentage = tasks.length
    ? Number(
        (
          (completed / tasks.length) *
          100
        ).toFixed(1)
      )
    : 0;

  return {
    completed,
    inProgress,
    notStarted,
    remaining:
      tasks.length - completed,
    percentage,
  };
}


function formatPercentage(value) {
  return Number.isInteger(value)
    ? `${value}%`
    : `${value.toFixed(1)}%`;
}


function formatNumber(value) {
  return String(value).padStart(
    2,
    "0"
  );
}


function formatStatus(status) {
  const labels = {
    completed: "Completed",
    "in-progress": "In Progress",
    "not-started": "Not Started",
  };

  return (
    labels[status] ||
    "Not Started"
  );
}


function getCurrentTask() {
  const inProgressTask =
    tasks.find(
      (task) =>
        task.status === "in-progress"
    );

  if (inProgressTask) {
    return inProgressTask;
  }

  const nextTask =
    tasks.find(
      (task) =>
        task.status === "not-started"
    );

  if (nextTask) {
    return nextTask;
  }

  return tasks[tasks.length - 1];
}


function getFilteredTasks() {
  const query =
    searchQuery
      .trim()
      .toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "all" ||
      task.status === activeFilter;

    const searchableText = [
      task.title,
      task.description,
      task.difficulty,
      ...(task.skills || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query ||
      searchableText.includes(query);

    return (
      matchesFilter &&
      matchesSearch
    );
  });
}


// ---------------------------------------
// TASK LIST
// ---------------------------------------

function renderTasks() {
  const visibleTasks =
    getFilteredTasks();

  taskList.innerHTML =
    visibleTasks
      .map((task) => {
        const status =
          getTaskStatus(task);

        return `
          <article
            class="task-row"
            data-status="${status}"
          >

            <div class="task-row__number">
              ${formatNumber(task.id)}
            </div>

            <div class="task-row__title">

              <span>
                TASK ${formatNumber(task.id)}
              </span>

              <h3>
                ${task.title}
              </h3>

            </div>

            <div class="task-row__difficulty">
              ${task.difficulty}
            </div>

            <div class="task-row__status">

              <span
                class="row-status
                row-status--${status}"
              >
                ${formatStatus(status)}
              </span>

            </div>

            <div class="task-row__action">

              <button
                type="button"
                data-open-task="${task.id}"
                aria-label="View ${task.title}"
              >
                →
              </button>

            </div>

          </article>
        `;
      })
      .join("");

  emptyState.hidden =
    visibleTasks.length !== 0;
}


// ---------------------------------------
// PROGRESS
// ---------------------------------------

function renderProgress() {
  const stats = getStats();

  const percentage =
    formatPercentage(
      stats.percentage
    );

  document.querySelector(
    "#progress-percentage"
  ).textContent = percentage;

  document.querySelector(
    "#progress-fraction"
  ).textContent =
    `${stats.completed} / ${tasks.length}`;

  document.querySelector(
    "#completed-count"
  ).textContent =
    formatNumber(stats.completed);

  document.querySelector(
    "#remaining-count"
  ).textContent =
    formatNumber(stats.remaining);

  document.querySelector(
    "#task-summary-completed"
  ).textContent =
    stats.completed;

  document.querySelector(
    "#profile-percentage"
  ).textContent =
    percentage;

  document.querySelector(
    "#sidebar-percentage"
  ).textContent =
    percentage;

  document.querySelector(
    "#sidebar-progress-text"
  ).textContent =
    `${stats.completed} of ${tasks.length} tasks completed`;

  document.querySelector(
    "#main-progress-fill"
  ).style.width =
    percentage;

  document.querySelector(
    "#sidebar-progress-fill"
  ).style.width =
    percentage;

  document.querySelector(
    "#all-count"
  ).textContent =
    tasks.length;

  document.querySelector(
    "#completed-filter-count"
  ).textContent =
    stats.completed;

  document.querySelector(
    "#progress-filter-count"
  ).textContent =
    stats.inProgress;

  document.querySelector(
    "#not-started-filter-count"
  ).textContent =
    stats.notStarted;
}


// ---------------------------------------
// CURRENT TASK
// ---------------------------------------

function renderCurrentTask() {
  const task =
    getCurrentTask();

  if (!task) {
    return;
  }

  const status =
    getTaskStatus(task);

  document.querySelector(
    "#current-task-number"
  ).textContent =
    formatNumber(task.id);

  document.querySelector(
    "#welcome-task-number"
  ).textContent =
    formatNumber(task.id);

  document.querySelector(
    "#current-task-day"
  ).textContent =
    `TASK ${formatNumber(task.id)}`;

  document.querySelector(
    "#current-task-title"
  ).textContent =
    task.title;

  document.querySelector(
    "#current-task-description"
  ).textContent =
    task.description;

  const statusElement =
    document.querySelector(
      "#current-task-status"
    );

  statusElement.textContent =
    formatStatus(status)
      .toUpperCase();

  statusElement.className =
    `status-badge status-badge--${status}`;

  document.querySelector(
    "#current-task-skills"
  ).innerHTML =
    (task.skills || [])
      .map(
        (skill) =>
          `<span>${skill}</span>`
      )
      .join("");
}


// ---------------------------------------
// DASHBOARD
// ---------------------------------------

function renderDashboard() {
  renderProgress();
  renderCurrentTask();
  renderTasks();
}


// ---------------------------------------
// TASK DRAWER
// ---------------------------------------

function renderDrawerLoading(
  taskId
) {
  drawerNumber.textContent =
    `${formatNumber(taskId)} / ${formatNumber(
      tasks.length || 8
    )}`;

  drawerBody.innerHTML = `
    <div class="drawer-loading">

      <div>

        <div
          class="task-api-state__loader"
          aria-hidden="true"
        ></div>

        <span class="drawer-day">
          REQUESTING TASK
        </span>

        <p class="drawer-description">
          Loading task information
          from the API...
        </p>

      </div>

    </div>
  `;
}


function renderDrawerError(
  message
) {
  drawerBody.innerHTML = `
    <div class="task-api-state">

      <span>
        REQUEST FAILED
      </span>

      <h3>
        Unable to load task.
      </h3>

      <p>
        ${message}
      </p>

    </div>
  `;
}


function renderDrawer(task) {
  const status =
    getTaskStatus(task);

  drawerNumber.textContent =
    `${formatNumber(task.id)} / ${formatNumber(
      tasks.length
    )}`;

  const markCompleteButton =
    status !== "completed"
      ? `
        <button
          type="button"
          class="mark-complete-button"
          data-mark-completed
        >
          Mark as Completed
          <span>✓</span>
        </button>
      `
      : "";

  drawerBody.innerHTML = `
    <span class="drawer-day">
      TASK ${formatNumber(task.id)}
    </span>

    <h2>
      ${task.title}
    </h2>

    <p class="drawer-description">
      ${task.description}
    </p>

    <div class="drawer-info">

      <div>
        <span>DIFFICULTY</span>
        <strong>
          ${task.difficulty}
        </strong>
      </div>

      <div>
        <span>STATUS</span>
        <strong>
          ${formatStatus(status)}
        </strong>
      </div>

    </div>

    <div class="drawer-skills">

      ${(task.skills || [])
        .map(
          (skill) =>
            `<span>${skill}</span>`
        )
        .join("")}

    </div>

    <div class="status-editor">

      <span>
        UPDATE PROGRESS
      </span>

      <h3>
        Change task status
      </h3>

      <p>
        Changes made here are sent
        to the TechBridge backend
        and saved in tasks.json.
      </p>

      ${markCompleteButton}

      <div class="status-options">

        <button
          type="button"
          class="status-option ${
            status === "not-started"
              ? "active"
              : ""
          }"
          data-set-status="not-started"
        >
          Not Started
        </button>

        <button
          type="button"
          class="status-option ${
            status === "in-progress"
              ? "active"
              : ""
          }"
          data-set-status="in-progress"
        >
          In Progress
        </button>

        <button
          type="button"
          class="status-option ${
            status === "completed"
              ? "active"
              : ""
          }"
          data-set-status="completed"
        >
          Completed
        </button>

      </div>

      <p class="status-note">
        Status changes are now
        persisted by the backend API,
        not browser localStorage.
      </p>

    </div>
  `;
}


async function openTask(taskId) {
  selectedTaskId =
    Number(taskId);

  drawer.classList.add("open");

  drawerOverlay.classList.add(
    "open"
  );

  drawer.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );

  renderDrawerLoading(
    selectedTaskId
  );

  try {
    const task =
      await apiRequest(
        `/tasks/${selectedTaskId}`
      );

    if (
      selectedTaskId === task.id
    ) {
      renderDrawer(task);
      setApiStatus("connected");
    }
  } catch (error) {
    setApiStatus("offline");

    renderDrawerError(
      error.message
    );
  }
}


function closeTask() {
  drawer.classList.remove("open");

  drawerOverlay.classList.remove(
    "open"
  );

  drawer.setAttribute(
    "aria-hidden",
    "true"
  );

  selectedTaskId = null;

  document.body.classList.remove(
    "no-scroll"
  );
}


// ---------------------------------------
// UPDATE TASK
// ---------------------------------------

async function updateTaskStatus(
  taskId,
  status
) {
  const existingTask =
    tasks.find(
      (task) =>
        task.id === taskId
    );

  if (
    !existingTask ||
    existingTask.status === status
  ) {
    return;
  }

  setStatusButtonsDisabled(true);

  try {
    await apiRequest(
      `/tasks/${taskId}`,
      {
        method: "PUT",

        body: JSON.stringify({
          status,
        }),
      }
    );

    // Re-fetch from the API so the
    // dashboard reflects backend truth.
    const freshTasks =
      await apiRequest("/tasks");

    tasks = freshTasks;

    renderDashboard();

    const updatedTask =
      tasks.find(
        (task) =>
          task.id === taskId
      );

    if (updatedTask) {
      renderDrawer(updatedTask);
    }

    setApiStatus("connected");

    showToast(
      "Progress updated",
      `${updatedTask?.title || "Task"} is now ${formatStatus(
        status
      ).toLowerCase()}.`
    );

    const stats = getStats();

    if (
      status === "completed" &&
      stats.completed ===
        tasks.length
    ) {
      setTimeout(
        openCompletion,
        350
      );
    }
  } catch (error) {
    console.error(
      "Unable to update task:",
      error
    );

    setApiStatus("offline");

    showToast(
      "Update failed",
      error.message ||
        "Unable to update task."
    );

    setStatusButtonsDisabled(
      false
    );
  }
}


function setStatusButtonsDisabled(
  disabled
) {
  drawerBody
    .querySelectorAll(
      "[data-set-status], [data-mark-completed]"
    )
    .forEach((button) => {
      button.disabled =
        disabled;
    });
}


// ---------------------------------------
// TOAST
// ---------------------------------------

function showToast(
  title,
  message
) {
  const toast =
    document.querySelector(
      "#toast"
    );

  document.querySelector(
    "#toast-title"
  ).textContent =
    title;

  document.querySelector(
    "#toast-message"
  ).textContent =
    message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {
      toast.classList.remove(
        "show"
      );
    }, 3200);
}


// ---------------------------------------
// COMPLETION
// ---------------------------------------

function openCompletion() {
  const completion =
    document.querySelector(
      "#completion"
    );

  completion.classList.add(
    "open"
  );

  completion.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );
}


function closeCompletion() {
  const completion =
    document.querySelector(
      "#completion"
    );

  completion.classList.remove(
    "open"
  );

  completion.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );
}


// ---------------------------------------
// TECHNOLOGIES
// ---------------------------------------

function renderTechnology(key) {
  const technology =
    technologies[key];

  if (!technology) {
    return;
  }

  const content =
    document.querySelector(
      "#technology-content"
    );

  const backendMarkup =
    technology.backend
      ? `
        <div class="backend-technologies">

          ${technology.backend
            .map(
              (
                item,
                index
              ) => `
                <article>

                  <span>
                    0${index + 1}
                  </span>

                  <h4>
                    ${item.name}
                  </h4>

                  <p>
                    ${item.description}
                  </p>

                </article>
              `
            )
            .join("")}

        </div>
      `
      : "";

  content.innerHTML = `
    <span
      class="technology-content__label"
    >
      ${technology.label}
    </span>

    <div
      class="technology-content__number"
      aria-hidden="true"
    >
      ${technology.number}
    </div>

    <h3>
      ${technology.title}
    </h3>

    <p>
      ${technology.description}
    </p>

    <div class="technology-tags">

      ${technology.tags
        .map(
          (tag) =>
            `<span>${tag}</span>`
        )
        .join("")}

    </div>

    ${backendMarkup}
  `;
}


function setActiveTechnology(
  button
) {
  document
    .querySelectorAll(
      ".technology-tab"
    )
    .forEach((tab) => {
      tab.classList.remove(
        "active"
      );
    });

  button.classList.add(
    "active"
  );

  renderTechnology(
    button.dataset.technology
  );
}


// ---------------------------------------
// SIDEBAR
// ---------------------------------------

function openSidebar() {
  sidebar.classList.add("open");

  sidebarOverlay.classList.add(
    "open"
  );

  document.body.classList.add(
    "no-scroll"
  );
}


function closeSidebar() {
  sidebar.classList.remove(
    "open"
  );

  sidebarOverlay.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "no-scroll"
  );
}


// ---------------------------------------
// DATE
// ---------------------------------------

function updateDate() {
  const formatter =
    new Intl.DateTimeFormat(
      "en-GB",
      {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  document.querySelector(
    "#current-date"
  ).textContent =
    formatter.format(
      new Date()
    );
}


// ---------------------------------------
// THEME
// ---------------------------------------

function loadTheme() {
  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );

  if (
    savedTheme === "dark"
  ) {
    document.body.classList.add(
      "dark"
    );
  }

  updateThemeIcon();
}


function toggleTheme() {
  document.body.classList.toggle(
    "dark"
  );

  const theme =
    document.body.classList.contains(
      "dark"
    )
      ? "dark"
      : "light";

  localStorage.setItem(
    THEME_KEY,
    theme
  );

  updateThemeIcon();
}


function updateThemeIcon() {
  document.querySelector(
    "#theme-icon"
  ).textContent =
    document.body.classList.contains(
      "dark"
    )
      ? "☀"
      : "◐";
}


// ---------------------------------------
// NAVIGATION
// ---------------------------------------

function updateActiveNavigation() {
  const sections = [
    "overview",
    "tasks",
    "technologies",
    "profile",
  ];

  let activeSection =
    "overview";

  sections.forEach(
    (sectionId) => {
      const section =
        document.getElementById(
          sectionId
        );

      if (!section) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      if (
        rect.top <= 150 &&
        rect.bottom > 150
      ) {
        activeSection =
          sectionId;
      }
    }
  );

  document
    .querySelectorAll(
      ".sidebar__link[data-section]"
    )
    .forEach((link) => {
      link.classList.toggle(
        "active",
        link.dataset.section ===
          activeSection
      );
    });

  const headingNames = {
    overview: "Overview",
    tasks: "My Tasks",
    technologies:
      "Technology Explorer",
    profile: "My Profile",
  };

  document.querySelector(
    "#page-heading"
  ).textContent =
    headingNames[
      activeSection
    ];
}


// ---------------------------------------
// EVENTS
// ---------------------------------------

taskList.addEventListener(
  "click",
  (event) => {
    const retryButton =
      event.target.closest(
        "[data-retry-tasks]"
      );

    if (retryButton) {
      loadTasks();
      checkApiHealth();
      return;
    }

    const button =
      event.target.closest(
        "[data-open-task]"
      );

    if (!button) {
      return;
    }

    openTask(
      button.dataset.openTask
    );
  }
);


drawerBody.addEventListener(
  "click",
  (event) => {
    if (
      selectedTaskId === null
    ) {
      return;
    }

    const completeButton =
      event.target.closest(
        "[data-mark-completed]"
      );

    if (completeButton) {
      updateTaskStatus(
        selectedTaskId,
        "completed"
      );

      return;
    }

    const statusButton =
      event.target.closest(
        "[data-set-status]"
      );

    if (!statusButton) {
      return;
    }

    updateTaskStatus(
      selectedTaskId,
      statusButton.dataset.setStatus
    );
  }
);


searchInput.addEventListener(
  "input",
  (event) => {
    searchQuery =
      event.target.value;

    if (tasksLoaded) {
      renderTasks();
    }
  }
);


taskFilters.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-filter]"
      );

    if (!button) {
      return;
    }

    activeFilter =
      button.dataset.filter;

    document
      .querySelectorAll(
        ".task-filter"
      )
      .forEach((filter) => {
        filter.classList.remove(
          "active"
        );
      });

    button.classList.add(
      "active"
    );

    if (tasksLoaded) {
      renderTasks();
    }
  }
);


document.querySelector(
  "#reset-filters"
).addEventListener(
  "click",
  () => {
    activeFilter = "all";
    searchQuery = "";

    searchInput.value = "";

    document
      .querySelectorAll(
        ".task-filter"
      )
      .forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.filter ===
            "all"
        );
      });

    if (tasksLoaded) {
      renderTasks();
    }
  }
);


document.querySelector(
  "#continue-task"
).addEventListener(
  "click",
  () => {
    const currentTask =
      getCurrentTask();

    if (currentTask) {
      openTask(
        currentTask.id
      );
    }
  }
);


document.querySelector(
  "#open-current-task"
).addEventListener(
  "click",
  () => {
    const currentTask =
      getCurrentTask();

    if (currentTask) {
      openTask(
        currentTask.id
      );
    }
  }
);


document.querySelector(
  "#close-task-drawer"
).addEventListener(
  "click",
  closeTask
);


drawerOverlay.addEventListener(
  "click",
  closeTask
);


document
  .querySelectorAll(
    ".technology-tab"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        setActiveTechnology(
          button
        );
      }
    );
  });


document.querySelector(
  "#theme-toggle"
).addEventListener(
  "click",
  toggleTheme
);


document.querySelector(
  "#open-sidebar"
).addEventListener(
  "click",
  openSidebar
);


document.querySelector(
  "#close-sidebar"
).addEventListener(
  "click",
  closeSidebar
);


sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


document
  .querySelectorAll(
    ".sidebar__link[data-section]"
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        if (
          window.innerWidth <=
          1000
        ) {
          closeSidebar();
        }
      }
    );
  });


document
  .querySelectorAll(
    "[data-close-completion]"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      closeCompletion
    );
  });


document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key !== "Escape"
    ) {
      return;
    }

    if (
      drawer.classList.contains(
        "open"
      )
    ) {
      closeTask();
      return;
    }

    if (
      sidebar.classList.contains(
        "open"
      )
    ) {
      closeSidebar();
      return;
    }

    closeCompletion();
  }
);


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  {
    passive: true,
  }
);


window.addEventListener(
  "resize",
  () => {
    if (
      window.innerWidth >
      1000
    ) {
      closeSidebar();
    }
  }
);


// ---------------------------------------
// INITIALIZE
// ---------------------------------------

async function initializeDashboard() {
  loadTheme();
  updateDate();

  renderTechnology(
    "nextjs"
  );

  updateActiveNavigation();

  checkApiHealth();

  await loadTasks();
}


initializeDashboard();