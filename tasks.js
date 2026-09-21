let currentTrack = "web";

const roadmapList = document.querySelector("#roadmap-list");
const difficultyTrack = document.querySelector("#difficulty-track");
const trackButtons = document.querySelectorAll(".track-button");
const currentTrackName = document.querySelector("#current-track-name");
const journeyDescription = document.querySelector("#journey-description");
const milestoneDescription = document.querySelector("#milestone-description");
const milestoneSteps = document.querySelector("#milestone-steps");


function renderTasks(track) {
  const tasks = getInternshipTasks(track);

  roadmapList.innerHTML = tasks
    .map((task, index) => {
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

      return `
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
                ${
                  task.number === 8
                    ? "FINAL MILESTONE"
                    : `TASK ${taskNumber}`
                }
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
    })
    .join("");
}


function renderDifficulty(track) {
  const content = getInternshipTrack(track);

  difficultyTrack.innerHTML = content.difficulty
    .map(
      (item) => `
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
      `
    )
    .join("");
}


function renderMilestone(track) {
  const content = getInternshipTrack(track);

  milestoneDescription.textContent =
    content.milestoneDescription;

  milestoneSteps.innerHTML =
    content.milestoneSteps
      .map((step, index) => {
        const isLast =
          index ===
          content.milestoneSteps.length - 1;

        return `
          <span>${step}</span>
          ${isLast ? "" : "<b>→</b>"}
        `;
      })
      .join("");
}


function updateTrackUI(track) {
  const content = getInternshipTrack(track);

  trackButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.track === track
    );
  });

  currentTrackName.textContent =
    content.name;

  journeyDescription.textContent =
    content.journeyDescription;
}


function selectTrack(track) {
  if (!TECHBRIDGE_INTERNSHIP.tracks[track]) {
    return;
  }

  currentTrack = track;

  renderTasks(currentTrack);
  renderDifficulty(currentTrack);
  renderMilestone(currentTrack);
  updateTrackUI(currentTrack);
}


trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectTrack(button.dataset.track);
  });
});


selectTrack(currentTrack);