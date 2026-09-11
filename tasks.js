const webDevelopmentTasks = [
  {
    number: 1,
    day: 1,
    title: "Build the TechBridge Homepage",
    description:
      "Create the first version of the TechBridge website using HTML and CSS.",
    difficulty: "Beginner",
    skills: ["HTML5", "CSS3", "Layout"],
  },
  {
    number: 2,
    day: 4,
    title: "Build the TechBridge Programs Experience",
    description:
      "Create a Programs experience presenting TechBridge's available learning programs.",
    difficulty: "Beginner",
    skills: ["HTML5", "CSS3", "Responsive Design"],
  },
  {
    number: 3,
    day: 8,
    title: "Build the Internship Tasks Experience",
    description:
      "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    difficulty: "Beginner → Intermediate",
    skills: ["HTML5", "CSS3", "Information Design"],
  },
  {
    number: 4,
    day: 11,
    title: "Build an Interactive Internship Roadmap",
    description:
      "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    difficulty: "Beginner → Intermediate",
    skills: ["JavaScript", "DOM", "Events"],
  },
  {
    number: 5,
    day: 15,
    title: "Build the Intern Registration Experience",
    description:
      "Create a professional registration and onboarding interface for TechBridge interns.",
    difficulty: "Intermediate",
    skills: ["Forms", "Validation", "UX"],
  },
  {
    number: 6,
    day: 19,
    title: "Build the Task Submission System",
    description:
      "Create an interface through which interns can prepare and submit their task work.",
    difficulty: "Intermediate",
    skills: ["Forms", "Workflow", "Data"],
  },
  {
    number: 7,
    day: 22,
    title: "Build the Intern Dashboard",
    description:
      "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
    difficulty: "Intermediate",
    skills: ["Dashboard", "UI Systems", "State"],
  },
  {
    number: 8,
    day: 26,
    title: "Build the Complete TechBridge Internship Platform",
    description:
      "Combine the different components created during the internship into a complete TechBridge platform.",
    difficulty: "Intermediate",
    skills: ["HTML", "CSS", "JavaScript", "Product Building"],
  },
];


const dataAnalyticsTasks = [
  {
    number: 1,
    day: 1,
    title: "Data Cleaning Basics",
    description:
      "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
    difficulty: "Beginner",
    skills: ["Excel", "Google Sheets", "Data Cleaning"],
  },
  {
    number: 2,
    day: 4,
    title: "Formulas & Pivot Tables",
    description:
      "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
    difficulty: "Beginner",
    skills: ["Formulas", "Pivot Tables", "Analysis"],
  },
  {
    number: 3,
    day: 8,
    title: "Data Visualization",
    description:
      "Create charts and a simple dashboard that communicate useful insights from a dataset.",
    difficulty: "Beginner → Intermediate",
    skills: ["Charts", "Dashboard", "Visualization"],
  },
  {
    number: 4,
    day: 11,
    title: "Introduction to SQL",
    description:
      "Practice basic SQL queries and use them to answer real-world questions about data.",
    difficulty: "Beginner → Intermediate",
    skills: ["SQL", "Queries", "Databases"],
  },
  {
    number: 5,
    day: 15,
    title: "SQL Joins & Aggregations",
    description:
      "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
    difficulty: "Intermediate",
    skills: ["SQL", "Joins", "Aggregations"],
  },
  {
    number: 6,
    day: 19,
    title: "Lookup Functions & Data Wrangling",
    description:
      "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
    difficulty: "Intermediate",
    skills: ["VLOOKUP", "XLOOKUP", "Wrangling"],
  },
  {
    number: 7,
    day: 22,
    title: "Mini Analysis Project",
    description:
      "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
    difficulty: "Intermediate",
    skills: ["Cleaning", "Analysis", "Recommendations"],
  },
  {
    number: 8,
    day: 26,
    title: "Capstone Project",
    description:
      "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
    difficulty: "Intermediate",
    skills: ["SQL", "Spreadsheets", "Capstone"],
  },
];


const trackContent = {
  web: {
    name: "WEB DEVELOPMENT",

    journeyDescription:
      "Each task introduces a new challenge. The Web Development track moves from foundational interfaces into JavaScript, forms, workflows, dashboards and a complete platform.",

    milestoneDescription:
      "By the final task, interns combine the different interfaces, interactions, registration flows, submissions and dashboard experiences into one complete TechBridge internship platform.",

    milestoneSteps: ["LEARN", "BUILD", "CONNECT", "SHIP"],

    difficulty: [
      {
        range: "01—02",
        stage: "FOUNDATION",
        level: "Beginner",
        description:
          "Learn structure, styling, responsive design and foundational web development thinking.",
      },
      {
        range: "03—04",
        stage: "INTERACTION",
        level: "Beginner → Intermediate",
        description:
          "Organize more complex interfaces and introduce JavaScript-driven interaction.",
      },
      {
        range: "05—07",
        stage: "SYSTEMS",
        level: "Intermediate",
        description:
          "Build forms, workflows, submissions and dashboard experiences.",
      },
      {
        range: "08",
        stage: "INTEGRATION",
        level: "Intermediate",
        description:
          "Bring separate experiences together into one complete internship platform.",
      },
    ],
  },

  data: {
    name: "DATA ANALYTICS",

    journeyDescription:
      "Each task builds stronger analytical thinking. The Data Analytics track moves from cleaning spreadsheets into formulas, visualization, SQL, data wrangling and complete analysis projects.",

    milestoneDescription:
      "By the final task, interns combine spreadsheet analysis and SQL to investigate related datasets, uncover useful insights and communicate their findings.",

    milestoneSteps: ["CLEAN", "ANALYZE", "CONNECT", "PRESENT"],

    difficulty: [
      {
        range: "01—02",
        stage: "FOUNDATION",
        level: "Beginner",
        description:
          "Learn how to clean datasets and use spreadsheet formulas and Pivot Tables.",
      },
      {
        range: "03—04",
        stage: "EXPLORATION",
        level: "Beginner → Intermediate",
        description:
          "Turn information into visual insights and begin querying structured data with SQL.",
      },
      {
        range: "05—07",
        stage: "ANALYSIS",
        level: "Intermediate",
        description:
          "Work across tables, combine datasets and complete an end-to-end analysis.",
      },
      {
        range: "08",
        stage: "CAPSTONE",
        level: "Intermediate",
        description:
          "Combine spreadsheet analysis and SQL into a larger practical data project.",
      },
    ],
  },
};


let currentTrack = "web";


const roadmapList = document.querySelector("#roadmap-list");

const difficultyTrack =
  document.querySelector("#difficulty-track");

const trackButtons =
  document.querySelectorAll(".track-button");

const currentTrackName =
  document.querySelector("#current-track-name");

const journeyDescription =
  document.querySelector("#journey-description");

const milestoneDescription =
  document.querySelector("#milestone-description");

const milestoneSteps =
  document.querySelector("#milestone-steps");


function getTasksForTrack(track) {
  if (track === "data") {
    return dataAnalyticsTasks;
  }

  return webDevelopmentTasks;
}


function renderTasks(track) {
  const tasks = getTasksForTrack(track);

  roadmapList.innerHTML = "";

  tasks.forEach((task, index) => {
    const position =
      index % 2 === 0 ? "task--left" : "task--right";

    const finalClass =
      task.number === 8 ? "task--final" : "";

    const taskNumber =
      String(task.number).padStart(2, "0");

    const taskDay =
      String(task.day).padStart(2, "0");

    const skills = task.skills
      .map((skill) => `<span>${skill}</span>`)
      .join("");

    roadmapList.innerHTML += `
      <article
        class="task ${position} ${finalClass}"
        id="task-${task.number}"
      >

        <div
          class="task__marker"
          aria-hidden="true"
        >
          ${taskNumber}
        </div>

        <div class="task__card">

          <div class="task__top">

            <span class="task__day">
              DAY ${taskDay}
            </span>

            <span class="task__status">
              ${task.number === 8 ? "FINAL MILESTONE" : `TASK ${taskNumber}`}
            </span>

          </div>

          <div class="task__number">
            ${taskNumber}
          </div>

          <p class="task__difficulty">
            ${task.difficulty.toUpperCase()}
          </p>

          <h3>
            ${task.title}
          </h3>

          <p class="task__description">
            ${task.description}
          </p>

          <div class="task__skills">
            ${skills}
          </div>

        </div>

      </article>
    `;
  });
}


function renderDifficulty(track) {
  const difficulty =
    trackContent[track].difficulty;

  difficultyTrack.innerHTML = "";

  difficulty.forEach((item) => {
    difficultyTrack.innerHTML += `
      <article>

        <span>
          ${item.range}
        </span>

        <div>

          <small>
            ${item.stage}
          </small>

          <h3>
            ${item.level}
          </h3>

          <p>
            ${item.description}
          </p>

        </div>

      </article>
    `;
  });
}


function renderMilestone(track) {
  const content = trackContent[track];

  milestoneDescription.textContent =
    content.milestoneDescription;

  milestoneSteps.innerHTML = content.milestoneSteps
    .map((step, index) => {
      const arrow =
        index < content.milestoneSteps.length - 1
          ? "<b>→</b>"
          : "";

      return `
        <span>${step}</span>
        ${arrow}
      `;
    })
    .join("");
}


function updateTrackUI(track) {
  const content = trackContent[track];

  trackButtons.forEach((button) => {
    const buttonTrack =
      button.dataset.track;

    button.classList.toggle(
      "active",
      buttonTrack === track
    );
  });

  currentTrackName.textContent =
    content.name;

  journeyDescription.textContent =
    content.journeyDescription;
}


function selectTrack(track) {
  currentTrack = track;

  renderTasks(currentTrack);

  renderDifficulty(currentTrack);

  renderMilestone(currentTrack);

  updateTrackUI(currentTrack);
}


trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTrack =
      button.dataset.track;

    selectTrack(selectedTrack);
  });
});


selectTrack(currentTrack);