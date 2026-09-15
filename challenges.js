const challenges = [
  {
    id: 1,
    title: "Sales Insights Dashboard",
    track: "Data Analytics",
    difficulty: "Beginner",

    description:
      "A growing retail business has months of sales data, but no clear picture of what is driving its performance.",

    outcome:
      "A clear dashboard showing sales performance, trends and useful business insights.",

    scenario:
      "A retail company has been collecting sales records across different products and months. The information exists, but the team is struggling to understand what is performing well and where attention is needed.",

    objective:
      "Clean and analyse a small sales dataset to identify revenue patterns, top-performing products and meaningful monthly trends.",

    skills: [
      "Data Cleaning",
      "Basic Analysis",
      "Data Visualization",
      "Insight Writing"
    ],

    tools: [
      "Excel",
      "Google Sheets"
    ],

    deliverable:
      "A sales dashboard containing key metrics, useful charts and at least three written insights from the data.",

    estimatedTime: "2–3 hours"
  },


  {
    id: 2,
    title: "Customer Behaviour Analysis",
    track: "Data Analytics",
    difficulty: "Intermediate",

    description:
      "A business has customer information but needs help understanding the different people behind the numbers.",

    outcome:
      "A customer analysis that identifies useful segments, patterns and behavioural differences.",

    scenario:
      "A growing business wants to understand its customers better. It has collected useful customer information, but the data has not yet been organised into meaningful groups or observations.",

    objective:
      "Explore customer information, identify useful segments and explain the behavioural patterns that separate one group from another.",

    skills: [
      "Data Cleaning",
      "Segmentation",
      "Data Analysis",
      "Visualization"
    ],

    tools: [
      "Excel",
      "Google Sheets",
      "Power BI"
    ],

    deliverable:
      "A customer analysis containing visualisations, meaningful customer segments and actionable observations.",

    estimatedTime: "3–4 hours"
  },


  {
    id: 3,
    title: "Customer Churn Investigation",
    track: "Data Analytics",
    difficulty: "Advanced",

    description:
      "Customers are leaving a service and the team needs more than assumptions. They need evidence.",

    outcome:
      "A churn investigation that highlights patterns, possible causes and recommendations.",

    scenario:
      "A subscription-based service has noticed an increase in customers leaving. Management wants to understand whether particular behaviours or customer characteristics are connected to churn.",

    objective:
      "Investigate the dataset, compare customers who stayed with those who left and communicate the strongest patterns you discover.",

    skills: [
      "Data Exploration",
      "Data Cleaning",
      "Comparative Analysis",
      "Data Storytelling"
    ],

    tools: [
      "Excel",
      "Power BI"
    ],

    deliverable:
      "A churn analysis containing visualisations, major findings and practical recommendations based on the evidence.",

    estimatedTime: "4–5 hours"
  },


  {
    id: 4,
    title: "Responsive Product Launch",
    track: "Web Development",
    difficulty: "Beginner",

    description:
      "A small startup is preparing to launch a product and needs a landing page that works beyond a desktop screen.",

    outcome:
      "A responsive product landing page with a strong structure, clear content and mobile-friendly layout.",

    scenario:
      "A startup has a new digital product ready for launch. They need a simple landing page that introduces the product clearly and encourages visitors to take action on any device.",

    objective:
      "Build a responsive landing page that presents the product, communicates its benefits and guides users towards one clear call to action.",

    skills: [
      "HTML",
      "CSS",
      "Responsive Design",
      "Layout"
    ],

    tools: [
      "VS Code",
      "Browser DevTools"
    ],

    deliverable:
      "A responsive landing page containing a hero, product benefits, call to action and mobile navigation.",

    estimatedTime: "2–3 hours"
  },


  {
    id: 5,
    title: "Interactive Contact Experience",
    track: "Web Development",
    difficulty: "Intermediate",

    description:
      "A company's contact form looks fine, but users can submit incomplete information without knowing what went wrong.",

    outcome:
      "A responsive contact experience with useful validation, errors and successful submission feedback.",

    scenario:
      "A service company receives enquiries through its website. The current contact form provides almost no feedback, creating confusion when visitors enter incorrect or incomplete information.",

    objective:
      "Build a contact form that validates user input and communicates clearly when information is missing, incorrect or successfully submitted.",

    skills: [
      "HTML Forms",
      "CSS",
      "JavaScript",
      "DOM Manipulation",
      "Validation"
    ],

    tools: [
      "VS Code",
      "Browser DevTools"
    ],

    deliverable:
      "A responsive contact form with input validation, useful error states and a clear success state.",

    estimatedTime: "3–4 hours"
  },


  {
    id: 6,
    title: "Internship Application Dashboard",
    track: "Web Development",
    difficulty: "Advanced",

    description:
      "An internship team needs a simple interface for viewing applicants and quickly separating them by application status.",

    outcome:
      "A dynamic dashboard that renders applicant information and filters records without refreshing the page.",

    scenario:
      "An internship programme is receiving multiple applications. The team wants a lightweight dashboard where applicant information can be viewed and filtered by status.",

    objective:
      "Use JavaScript data to dynamically display applicants and allow users to filter the dashboard without reloading the page.",

    skills: [
      "JavaScript",
      "Arrays",
      "Objects",
      "DOM Manipulation",
      "Filtering",
      "Responsive Design"
    ],

    tools: [
      "VS Code",
      "Browser DevTools"
    ],

    deliverable:
      "A responsive dashboard that dynamically renders applicants and filters them by application status.",

    estimatedTime: "4–5 hours"
  }
];


const challengeGrid =
  document.querySelector("#challenge-grid");

const challengeCount =
  document.querySelector("#challenge-count");

const emptyState =
  document.querySelector("#empty-state");

const resetButton =
  document.querySelector("#reset-filters");

const emptyResetButton =
  document.querySelector("#empty-reset");

const trackButtons =
  document.querySelectorAll("[data-track]");

const difficultyButtons =
  document.querySelectorAll("[data-difficulty]");

const heroTrackButtons =
  document.querySelectorAll("[data-hero-track]");

const challengePanel =
  document.querySelector("#challenge-panel");

const challengeOverlay =
  document.querySelector("#challenge-overlay");

const panelContent =
  document.querySelector("#challenge-panel-content");

const panelIndex =
  document.querySelector("#panel-index");

const panelHeaderTrack =
  document.querySelector("#panel-header-track");

const closePanelButton =
  document.querySelector("#close-panel");


let selectedTrack = "All";
let selectedDifficulty = "All";

let activeChallengeId = null;

let filteredChallenges = [
  ...challenges
];

let lastFocusedButton = null;
let revealObserver = null;


/* =========================
   CARD TEMPLATE
========================= */

function createChallengeCard(
  challenge,
  position
) {
  const number =
    String(challenge.id).padStart(2, "0");

  const alignment =
    position % 2 === 0
      ? "card-left"
      : "card-right";

  const activeClass =
    challenge.id === activeChallengeId
      ? "is-active"
      : "";

  return `
    <article
      class="challenge-card ${alignment} ${activeClass}"
      data-challenge-card="${challenge.id}"
      data-difficulty="${challenge.difficulty}"
    >

      <div
        class="challenge-card__giant-number"
        aria-hidden="true"
      >
        ${number}
      </div>

      <div
        class="challenge-card__reveal"
        aria-hidden="true"
      ></div>


      <div class="challenge-card__top">

        <span class="challenge-card__track">
          ${challenge.track.toUpperCase()}
        </span>

        <span class="challenge-card__difficulty">
          ${challenge.difficulty.toUpperCase()}
        </span>

      </div>


      <div class="challenge-card__body">

        <span class="challenge-card__number">
          CH / ${number}
        </span>

        <h3>
          ${challenge.title}
        </h3>

        <p class="challenge-card__description">
          ${challenge.description}
        </p>

      </div>


      <div class="challenge-card__outcome">

        <span>
          EXPECTED OUTPUT
        </span>

        <p>
          ${challenge.outcome}
        </p>

      </div>


      <div class="challenge-card__footer">

        <span class="challenge-card__time">
          ${challenge.estimatedTime.toUpperCase()}
        </span>

        <button
          type="button"
          class="challenge-card__button"
          data-challenge-id="${challenge.id}"
        >
          VIEW BRIEF
          <b>↗</b>
        </button>

      </div>

    </article>
  `;
}


/* =========================
   FILTERING
========================= */

function getFilteredChallenges() {
  return challenges.filter((challenge) => {

    const matchesTrack =
      selectedTrack === "All" ||
      challenge.track === selectedTrack;

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      challenge.difficulty ===
        selectedDifficulty;

    return (
      matchesTrack &&
      matchesDifficulty
    );
  });
}


function renderChallenges() {
  filteredChallenges =
    getFilteredChallenges();

  challengeGrid.innerHTML =
    filteredChallenges
      .map(createChallengeCard)
      .join("");

  challengeCount.textContent =
    String(
      filteredChallenges.length
    ).padStart(2, "0");

  const hasChallenges =
    filteredChallenges.length > 0;

  challengeGrid.hidden =
    !hasChallenges;

  emptyState.hidden =
    hasChallenges;

  observeChallengeCards();
}


/* =========================
   SCROLL REVEAL
========================= */

function observeChallengeCards() {

  if (revealObserver) {
    revealObserver.disconnect();
  }

  const cards =
    document.querySelectorAll(
      ".challenge-card"
    );

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    cards.forEach((card) => {
      card.classList.add(
        "is-visible"
      );
    });

    return;
  }


  revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.14,
        rootMargin:
          "0px 0px -35px 0px"
      }
    );


  cards.forEach((card, index) => {

    card.style.transitionDelay =
      `${Math.min(
        index * 70,
        210
      )}ms`;

    revealObserver.observe(card);

  });
}


/* =========================
   FILTER BUTTON STATE
========================= */

function updateActiveButtons(
  buttons,
  selectedValue,
  dataName
) {

  buttons.forEach((button) => {

    const isActive =
      button.dataset[dataName] ===
      selectedValue;

    button.classList.toggle(
      "active",
      isActive
    );

  });
}


function selectTrack(track) {

  selectedTrack = track;

  updateActiveButtons(
    trackButtons,
    selectedTrack,
    "track"
  );

  renderChallenges();
}


function selectDifficulty(
  difficulty
) {

  selectedDifficulty =
    difficulty;

  updateActiveButtons(
    difficultyButtons,
    selectedDifficulty,
    "difficulty"
  );

  renderChallenges();
}


function resetFilters() {

  selectedTrack = "All";
  selectedDifficulty = "All";

  updateActiveButtons(
    trackButtons,
    selectedTrack,
    "track"
  );

  updateActiveButtons(
    difficultyButtons,
    selectedDifficulty,
    "difficulty"
  );

  renderChallenges();
}


/* =========================
   PANEL HELPERS
========================= */

function createTags(items) {

  return items
    .map(
      (item) =>
        `<span>${item}</span>`
    )
    .join("");
}


function updateActiveCard() {

  const cards =
    document.querySelectorAll(
      "[data-challenge-card]"
    );

  cards.forEach((card) => {

    const cardId =
      Number(
        card.dataset.challengeCard
      );

    card.classList.toggle(
      "is-active",
      cardId === activeChallengeId
    );

  });
}


/* =========================
   PANEL CONTENT
========================= */

function renderChallengePanel(
  challengeId
) {

  const challenge =
    challenges.find(
      (item) =>
        item.id === challengeId
    );


  if (!challenge) {
    return;
  }


  activeChallengeId =
    challenge.id;


  const number =
    String(
      challenge.id
    ).padStart(2, "0");


  const currentIndex =
    filteredChallenges.findIndex(
      (item) =>
        item.id === challenge.id
    );


  const previousChallenge =
    currentIndex > 0
      ? filteredChallenges[
          currentIndex - 1
        ]
      : null;


  const nextChallenge =
    currentIndex !== -1 &&
    currentIndex <
      filteredChallenges.length - 1
      ? filteredChallenges[
          currentIndex + 1
        ]
      : null;


  panelIndex.textContent =
    `CH / ${number}`;

  panelHeaderTrack.textContent =
    challenge.track.toUpperCase();


  panelContent.innerHTML = `

    <section class="panel-hero">

      <span
        class="panel-hero__number"
        aria-hidden="true"
      >
        ${number}
      </span>


      <div class="panel-meta">

        <span>
          ${challenge.difficulty.toUpperCase()}
        </span>

        <span>
          ${challenge.estimatedTime.toUpperCase()}
        </span>

        <span>
          CHALLENGE ${number}
        </span>

      </div>


      <h2
        class="panel-title"
        id="panel-title"
      >
        ${challenge.title}
      </h2>

    </section>


    <section class="panel-scenario">

      <span>
        THE SCENARIO
      </span>

      <p>
        ${challenge.scenario}
      </p>

    </section>


    <div class="panel-brief-grid">


      <section class="panel-section">

        <span class="panel-section__number">
          01
        </span>

        <div class="panel-section__body">

          <span>
            YOUR OBJECTIVE
          </span>

          <p>
            ${challenge.objective}
          </p>

        </div>

      </section>


      <section class="panel-section">

        <span class="panel-section__number">
          02
        </span>

        <div class="panel-section__body">

          <span>
            SKILLS
          </span>

          <div class="panel-tags">
            ${createTags(
              challenge.skills
            )}
          </div>

        </div>

      </section>


      <section class="panel-section">

        <span class="panel-section__number">
          03
        </span>

        <div class="panel-section__body">

          <span>
            TOOLS
          </span>

          <div class="panel-tags">
            ${createTags(
              challenge.tools
            )}
          </div>

        </div>

      </section>


      <section class="panel-section">

        <span class="panel-section__number">
          04
        </span>

        <div class="panel-section__body">

          <span>
            DELIVERABLE
          </span>

          <p>
            ${challenge.deliverable}
          </p>

        </div>

      </section>


    </div>


    <nav
      class="panel-navigation"
      aria-label="Challenge navigation"
    >

      <button
        type="button"
        class="panel-navigation__button"
        data-panel-previous
        ${previousChallenge
          ? ""
          : "disabled"}
      >
        ← PREVIOUS
      </button>


      <span class="panel-navigation__position">

        <strong>
          ${
            currentIndex === -1
              ? "01"
              : String(
                  currentIndex + 1
                ).padStart(2, "0")
          }
        </strong>

        /

        ${String(
          filteredChallenges.length
        ).padStart(2, "0")}

      </span>


      <button
        type="button"
        class="panel-navigation__button"
        data-panel-next
        ${nextChallenge
          ? ""
          : "disabled"}
      >
        NEXT →
      </button>

    </nav>


    <div class="panel-end">

      <span>
        EXPECTED RESULT
      </span>

      <p>
        ${challenge.outcome}
      </p>

    </div>
  `;


  updateActiveCard();
}


/* =========================
   OPEN PANEL
========================= */

function openChallenge(
  challengeId,
  triggerButton
) {

  if (triggerButton) {
    lastFocusedButton =
      triggerButton;
  }


  renderChallengePanel(
    challengeId
  );


  challengePanel.classList.add(
    "active"
  );

  challengeOverlay.classList.add(
    "active"
  );


  challengePanel.setAttribute(
    "aria-hidden",
    "false"
  );

  challengeOverlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "panel-open"
  );


  challengePanel.scrollTop = 0;

  closePanelButton.focus();
}


/* =========================
   PREVIOUS / NEXT
========================= */

function moveChallenge(direction) {

  const currentIndex =
    filteredChallenges.findIndex(
      (challenge) =>
        challenge.id ===
        activeChallengeId
    );


  if (currentIndex === -1) {
    return;
  }


  const newIndex =
    currentIndex + direction;


  if (
    newIndex < 0 ||
    newIndex >=
      filteredChallenges.length
  ) {
    return;
  }


  const newChallenge =
    filteredChallenges[newIndex];


  renderChallengePanel(
    newChallenge.id
  );


  challengePanel.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   CLOSE PANEL
========================= */

function closeChallenge() {

  challengePanel.classList.remove(
    "active"
  );

  challengeOverlay.classList.remove(
    "active"
  );


  challengePanel.setAttribute(
    "aria-hidden",
    "true"
  );

  challengeOverlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "panel-open"
  );


  activeChallengeId = null;

  updateActiveCard();


  if (lastFocusedButton) {
    lastFocusedButton.focus();
  }
}


/* =========================
   EVENTS
========================= */

trackButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      selectTrack(
        button.dataset.track
      );

    }
  );

});


difficultyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        selectDifficulty(
          button.dataset.difficulty
        );

      }
    );

  }
);


heroTrackButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        selectTrack(
          button.dataset.heroTrack
        );


        document
          .querySelector(
            "#challenge-board"
          )
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  }
);


challengeGrid.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        "[data-challenge-id]"
      );


    if (!button) {
      return;
    }


    openChallenge(
      Number(
        button.dataset.challengeId
      ),
      button
    );

  }
);


panelContent.addEventListener(
  "click",
  (event) => {

    const previousButton =
      event.target.closest(
        "[data-panel-previous]"
      );

    const nextButton =
      event.target.closest(
        "[data-panel-next]"
      );


    if (
      previousButton &&
      !previousButton.disabled
    ) {
      moveChallenge(-1);
    }


    if (
      nextButton &&
      !nextButton.disabled
    ) {
      moveChallenge(1);
    }

  }
);


resetButton.addEventListener(
  "click",
  resetFilters
);


emptyResetButton.addEventListener(
  "click",
  resetFilters
);


closePanelButton.addEventListener(
  "click",
  closeChallenge
);


challengeOverlay.addEventListener(
  "click",
  closeChallenge
);


document.addEventListener(
  "keydown",
  (event) => {

    const panelIsOpen =
      challengePanel.classList.contains(
        "active"
      );


    if (!panelIsOpen) {
      return;
    }


    if (event.key === "Escape") {
      closeChallenge();
    }


    if (event.key === "ArrowLeft") {
      moveChallenge(-1);
    }


    if (event.key === "ArrowRight") {
      moveChallenge(1);
    }

  }
);


/* =========================
   INITIAL RENDER
========================= */

renderChallenges();