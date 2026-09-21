const STORAGE_KEY = "techbridge-dashboard-progress";
const THEME_KEY = "techbridge-dashboard-theme";

const tasks = [
  {
    number: 1,
    title: "Build the TechBridge Homepage",
    description:
      "Build the main TechBridge homepage using semantic HTML and responsive CSS.",
    difficulty: "Beginner",
    skills: ["HTML5", "CSS3", "Layout"],
    defaultStatus: "completed",
  },
  {
    number: 2,
    title: "Build the TechBridge Programs Experience",
    description:
      "Create a responsive programs experience that clearly presents TechBridge learning opportunities.",
    difficulty: "Beginner",
    skills: ["HTML5", "CSS3", "Responsive Design"],
    defaultStatus: "completed",
  },
  {
    number: 3,
    title: "Build the Internship Tasks Experience",
    description:
      "Design an internship tasks experience that presents practical assignments clearly and responsively.",
    difficulty: "Beginner → Intermediate",
    skills: ["HTML5", "CSS3", "Information Design"],
    defaultStatus: "completed",
  },
  {
    number: 4,
    title: "Build an Interactive Internship Roadmap",
    description:
      "Use JavaScript and DOM manipulation to create an interactive roadmap with multiple internship tracks.",
    difficulty: "Beginner → Intermediate",
    skills: ["JavaScript", "DOM", "Events"],
    defaultStatus: "completed",
  },
  {
    number: 5,
    title: "Build the TechBridge Challenge Hub",
    description:
      "Create an interactive challenge hub where interns can explore practical challenges by track and difficulty.",
    difficulty: "Intermediate",
    skills: ["JavaScript", "Filtering", "Dynamic UI"],
    defaultStatus: "completed",
  },
  {
    number: 6,
    title: "Build the TechBridge Intern Dashboard",
    description:
      "Build an interactive dashboard where interns can track tasks, update progress and explore modern web technologies.",
    difficulty: "Intermediate",
    skills: [
      "JavaScript",
      "DOM",
      "LocalStorage",
      "Responsive UI",
    ],
    defaultStatus: "in-progress",
  },
  {
    number: 7,
    title: "Upcoming Internship Task",
    description:
      "Your next practical internship assignment will appear here when it becomes available.",
    difficulty: "Upcoming",
    skills: ["Coming Soon"],
    defaultStatus: "not-started",
  },
  {
    number: 8,
    title: "Final Internship Project",
    description:
      "The final practical milestone of your TechBridge internship journey.",
    difficulty: "Upcoming",
    skills: ["Integration", "Product Building"],
    defaultStatus: "not-started",
  },
];

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

let progress = loadProgress();
let activeFilter = "all";
let searchQuery = "";
let selectedTaskNumber = null;
let toastTimer = null;

const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#task-search");
const taskFilters = document.querySelector("#task-filters");

const drawer = document.querySelector("#task-drawer");
const drawerOverlay = document.querySelector(
  "#task-drawer-overlay"
);
const drawerBody = document.querySelector(
  "#task-drawer-body"
);
const drawerNumber = document.querySelector(
  "#drawer-number"
);

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(
  "#sidebar-overlay"
);

function createDefaultProgress() {
  return tasks.reduce((state, task) => {
    state[task.number] = task.defaultStatus;
    return state;
  }, {});
}

function loadProgress() {
  const defaults = createDefaultProgress();

  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

    if (!saved || typeof saved !== "object") {
      return defaults;
    }

    tasks.forEach((task) => {
      const savedStatus = saved[task.number];

      if (
        ["completed", "in-progress", "not-started"]
          .includes(savedStatus)
      ) {
        defaults[task.number] = savedStatus;
      }
    });

    return defaults;
  } catch {
    return defaults;
  }
}

function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );
}

function getTaskStatus(taskNumber) {
  return progress[taskNumber] || "not-started";
}

function getStats() {
  const completed = tasks.filter(
    (task) =>
      getTaskStatus(task.number) === "completed"
  ).length;

  const inProgress = tasks.filter(
    (task) =>
      getTaskStatus(task.number) === "in-progress"
  ).length;

  const notStarted =
    tasks.length - completed - inProgress;

  const percentage = Number(
    ((completed / tasks.length) * 100).toFixed(1)
  );

  return {
    completed,
    inProgress,
    notStarted,
    remaining: tasks.length - completed,
    percentage,
  };
}

function formatPercentage(value) {
  return Number.isInteger(value)
    ? `${value}%`
    : `${value.toFixed(1)}%`;
}

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function formatStatus(status) {
  const labels = {
    completed: "Completed",
    "in-progress": "In Progress",
    "not-started": "Not Started",
  };

  return labels[status] || "Not Started";
}

function getCurrentTask() {
  const inProgressTask = tasks.find(
    (task) =>
      getTaskStatus(task.number) === "in-progress"
  );

  if (inProgressTask) {
    return inProgressTask;
  }

  const nextTask = tasks.find(
    (task) =>
      getTaskStatus(task.number) === "not-started"
  );

  if (nextTask) {
    return nextTask;
  }

  return tasks[tasks.length - 1];
}

function getFilteredTasks() {
  const query = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const status = getTaskStatus(task.number);

    const matchesFilter =
      activeFilter === "all" ||
      status === activeFilter;

    const searchableText = [
      task.title,
      task.description,
      task.difficulty,
      ...task.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    return matchesFilter && matchesSearch;
  });
}

function renderTasks() {
  const visibleTasks = getFilteredTasks();

  taskList.innerHTML = visibleTasks
    .map((task) => {
      const status = getTaskStatus(task.number);

      return `
        <article
          class="task-row"
          data-status="${status}"
        >
          <div class="task-row__number">
            ${formatNumber(task.number)}
          </div>

          <div class="task-row__title">
            <span>
              TASK ${formatNumber(task.number)}
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
              data-open-task="${task.number}"
              aria-label="View ${task.title}"
            >
              →
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = visibleTasks.length !== 0;
}

function renderProgress() {
  const stats = getStats();
  const percentage =
    formatPercentage(stats.percentage);

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
  ).textContent = stats.completed;

  document.querySelector(
    "#profile-percentage"
  ).textContent = percentage;

  document.querySelector(
    "#sidebar-percentage"
  ).textContent = percentage;

  document.querySelector(
    "#sidebar-progress-text"
  ).textContent =
    `${stats.completed} of ${tasks.length} tasks completed`;

  document.querySelector(
    "#main-progress-fill"
  ).style.width = percentage;

  document.querySelector(
    "#sidebar-progress-fill"
  ).style.width = percentage;

  document.querySelector(
    "#all-count"
  ).textContent = tasks.length;

  document.querySelector(
    "#completed-filter-count"
  ).textContent = stats.completed;

  document.querySelector(
    "#progress-filter-count"
  ).textContent = stats.inProgress;

  document.querySelector(
    "#not-started-filter-count"
  ).textContent = stats.notStarted;
}

function renderCurrentTask() {
  const task = getCurrentTask();
  const status = getTaskStatus(task.number);

  document.querySelector(
    "#current-task-number"
  ).textContent =
    formatNumber(task.number);

  document.querySelector(
    "#welcome-task-number"
  ).textContent =
    formatNumber(task.number);

  document.querySelector(
    "#current-task-day"
  ).textContent =
    `TASK ${formatNumber(task.number)}`;

  document.querySelector(
    "#current-task-title"
  ).textContent = task.title;

  document.querySelector(
    "#current-task-description"
  ).textContent = task.description;

  const statusElement = document.querySelector(
    "#current-task-status"
  );

  statusElement.textContent =
    formatStatus(status).toUpperCase();

  statusElement.className =
    `status-badge status-badge--${status}`;

  document.querySelector(
    "#current-task-skills"
  ).innerHTML = task.skills
    .map((skill) => `<span>${skill}</span>`)
    .join("");
}

function renderDashboard() {
  renderProgress();
  renderCurrentTask();
  renderTasks();

  if (selectedTaskNumber !== null) {
    renderDrawer(selectedTaskNumber);
  }
}

function renderDrawer(taskNumber) {
  const task = tasks.find(
    (item) => item.number === taskNumber
  );

  if (!task) return;

  const status = getTaskStatus(task.number);

  drawerNumber.textContent =
    `${formatNumber(task.number)} / ${formatNumber(tasks.length)}`;

  drawerBody.innerHTML = `
    <span class="drawer-day">
      TASK ${formatNumber(task.number)}
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
        <strong>${task.difficulty}</strong>
      </div>

      <div>
        <span>STATUS</span>
        <strong>${formatStatus(status)}</strong>
      </div>
    </div>

    <div class="drawer-skills">
      ${task.skills
        .map(
          (skill) =>
            `<span>${skill}</span>`
        )
        .join("")}
    </div>

    <div class="status-editor">
      <span>UPDATE PROGRESS</span>

      <h3>
        Change task status
      </h3>

      <p>
        Choose the status that reflects your actual
        progress. You can change it again at any time.
      </p>

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
        Accidentally marked this task complete?
        Select In Progress or Not Started and your
        dashboard will recalculate automatically.
      </p>
    </div>
  `;
}

function openTask(taskNumber) {
  selectedTaskNumber = Number(taskNumber);

  renderDrawer(selectedTaskNumber);

  drawer.classList.add("open");
  drawerOverlay.classList.add("open");

  drawer.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );
}

function closeTask() {
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("open");

  drawer.setAttribute(
    "aria-hidden",
    "true"
  );

  selectedTaskNumber = null;

  document.body.classList.remove(
    "no-scroll"
  );
}

function updateTaskStatus(taskNumber, status) {
  const previousStatus =
    getTaskStatus(taskNumber);

  if (previousStatus === status) {
    return;
  }

  if (status === "in-progress") {
    tasks.forEach((task) => {
      if (
        task.number !== taskNumber &&
        progress[task.number] === "in-progress"
      ) {
        progress[task.number] = "not-started";
      }
    });
  }

  progress[taskNumber] = status;

  saveProgress();
  renderDashboard();

  const task = tasks.find(
    (item) => item.number === taskNumber
  );

  showToast(
    "Progress updated",
    `${task.title} is now ${formatStatus(status).toLowerCase()}.`
  );

  const stats = getStats();

  if (
    status === "completed" &&
    stats.completed === tasks.length
  ) {
    setTimeout(openCompletion, 350);
  }
}

function showToast(title, message) {
  const toast = document.querySelector("#toast");

  document.querySelector(
    "#toast-title"
  ).textContent = title;

  document.querySelector(
    "#toast-message"
  ).textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function openCompletion() {
  const completion =
    document.querySelector("#completion");

  completion.classList.add("open");

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
    document.querySelector("#completion");

  completion.classList.remove("open");

  completion.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );
}

function renderTechnology(key) {
  const technology = technologies[key];

  if (!technology) return;

  const content = document.querySelector(
    "#technology-content"
  );

  const backendMarkup =
    technology.backend
      ? `
        <div class="backend-technologies">
          ${technology.backend
            .map(
              (item, index) => `
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
    <span class="technology-content__label">
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

function setActiveTechnology(button) {
  document
    .querySelectorAll(".technology-tab")
    .forEach((tab) => {
      tab.classList.remove("active");
    });

  button.classList.add("active");

  renderTechnology(
    button.dataset.technology
  );
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("open");

  document.body.classList.add(
    "no-scroll"
  );
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("open");

  document.body.classList.remove(
    "no-scroll"
  );
}

function updateDate() {
  const formatter = new Intl.DateTimeFormat(
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
    formatter.format(new Date());
}

function loadTheme() {
  const savedTheme =
    localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const theme =
    document.body.classList.contains("dark")
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
    document.body.classList.contains("dark")
      ? "☀"
      : "◐";
}

function updateActiveNavigation() {
  const sections = [
    "overview",
    "tasks",
    "technologies",
    "profile",
  ];

  let activeSection = "overview";

  sections.forEach((sectionId) => {
    const section =
      document.getElementById(sectionId);

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    if (
      rect.top <= 150 &&
      rect.bottom > 150
    ) {
      activeSection = sectionId;
    }
  });

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
    technologies: "Technology Explorer",
    profile: "My Profile",
  };

  document.querySelector(
    "#page-heading"
  ).textContent =
    headingNames[activeSection];
}

taskList.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest(
      "[data-open-task]"
    );

    if (!button) return;

    openTask(
      button.dataset.openTask
    );
  }
);

drawerBody.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest(
      "[data-set-status]"
    );

    if (
      !button ||
      selectedTaskNumber === null
    ) {
      return;
    }

    updateTaskStatus(
      selectedTaskNumber,
      button.dataset.setStatus
    );
  }
);

searchInput.addEventListener(
  "input",
  (event) => {
    searchQuery = event.target.value;

    renderTasks();
  }
);

taskFilters.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest(
      "[data-filter]"
    );

    if (!button) return;

    activeFilter =
      button.dataset.filter;

    document
      .querySelectorAll(".task-filter")
      .forEach((filter) => {
        filter.classList.remove(
          "active"
        );
      });

    button.classList.add("active");

    renderTasks();
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
      .querySelectorAll(".task-filter")
      .forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.filter === "all"
        );
      });

    renderTasks();
  }
);

document.querySelector(
  "#continue-task"
).addEventListener(
  "click",
  () => {
    openTask(
      getCurrentTask().number
    );
  }
);

document.querySelector(
  "#open-current-task"
).addEventListener(
  "click",
  () => {
    openTask(
      getCurrentTask().number
    );
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
  .querySelectorAll(".technology-tab")
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        setActiveTechnology(button);
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
          window.innerWidth <= 1000
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
    if (event.key !== "Escape") {
      return;
    }

    if (
      drawer.classList.contains("open")
    ) {
      closeTask();
      return;
    }

    if (
      sidebar.classList.contains("open")
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
  { passive: true }
);

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 1000) {
      closeSidebar();
    }
  }
);

function initializeDashboard() {
  loadTheme();
  updateDate();

  renderTechnology("nextjs");
  renderDashboard();

  updateActiveNavigation();
}

initializeDashboard();