// =========================================
// KIS - INTERACTIVE QUIZ ENGINE
// =========================================

// Stores the learner's current quiz progress.
let kisQuizState = {
  lessonId: null,
  lessonSource: "local",
  questions: [],
  questionIndex: 0,
  score: 0,
  answered: false,
  answers: [],
  saved: false
};

// =========================================
// KIS - PUBLISHED FIRESTORE QUIZ LOADER
// =========================================

async function kisLoadStudentQuiz(lessonId, lessonSource) {

  const cacheKey =
    "kisPublishedQuiz_" + lessonSource + "_" + lessonId;

  // Read previously downloaded questions.
  function getCachedQuiz() {

    try {
      const saved = localStorage.getItem(cacheKey);

      return saved ? JSON.parse(saved) : null;

    } catch (error) {
      console.error("Quiz cache reading failed:", error);
      return null;
    }
  }

  // Check whether Firebase is available.
  if (
    typeof kisDb !== "undefined" &&
    navigator.onLine
  ) {

    try {

      const snapshot = await kisDb.collection("quizzes")
        .where("lessonId", "==", String(lessonId))
        .where("lessonSource", "==", lessonSource)
        .where("status", "==", "published")
        .get();

      if (!snapshot.empty) {

        const quiz = snapshot.docs[0].data();

        if (
          Array.isArray(quiz.questions) &&
          quiz.questions.length > 0
        ) {

          localStorage.setItem(
            cacheKey,
            JSON.stringify(quiz)
          );

          return quiz;
        }
      }

    } catch (error) {

      console.error("Firestore quiz loading failed:", error);

    }
  }

  // Use the previously downloaded quiz when offline.
  const cachedQuiz = getCachedQuiz();

  if (
    cachedQuiz &&
    cachedQuiz.status === "published" &&
    Array.isArray(cachedQuiz.questions) &&
    cachedQuiz.questions.length > 0
  ) {
    return cachedQuiz;
  }

  return null;
}

// =========================================
// KIS - QUIZ HISTORY STORAGE
// =========================================

// The name used to store quiz history in the browser.
const KIS_QUIZ_HISTORY_KEY = "kisQuizHistory";


// Retrieves saved quiz attempts.
function getKisQuizHistory() {

  try {

    const savedHistory = localStorage.getItem(
      KIS_QUIZ_HISTORY_KEY
    );

    return savedHistory ? JSON.parse(savedHistory) : [];

  } catch (error) {

    console.error("Unable to read quiz history:", error);

    return [];

  }
}


// Saves a completed quiz attempt.
function saveKisQuizAttempt() {

  const lesson = kisLessons.find(
    item => String(item.id) === String(kisQuizState.lessonId)
  );

  const subject = lesson
    ? kisSubjects.find(item => item.id === lesson.subject)
    : null;

  const questions = kisQuizState.questions;

  const total = questions.length;

  if (total === 0) return;

  const score = kisQuizState.score;

  const percentage = Math.round((score / total) * 100);

  const history = getKisQuizHistory();

  const attempt = {

    lessonId: kisQuizState.lessonId,

    lessonSource: kisQuizState.lessonSource,

    lessonTitle:
      kisQuizState.lessonTitle ||
      (lesson ? lesson.title : "Untitled Lesson"),

    subjectId:
      lesson ? lesson.subject : "",

    subjectName:
      kisQuizState.subject ||
      (subject ? subject.name : "Other"),

    score: score,

    total: total,

    percentage: percentage,

    completedAt: new Date().toISOString()

  };

  history.push(attempt);

  try {

    localStorage.setItem(
      KIS_QUIZ_HISTORY_KEY,
      JSON.stringify(history)
    );

  } catch (error) {

    console.error("Unable to save quiz history:", error);

  }
}

// Converts special characters into safe HTML text.
function escapeKisQuizText(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}


// Creates the quiz button and its display area.
window.renderKisQuizButton = function (lessonId, lessonSource = "local") {

  const questions = kisLessonQuizzes[lessonId];

  return `
    <div class="kis-quiz-entry">

      <h3>Test Your Knowledge</h3>

      <p>
        Check what you learned with an interactive quiz.
      </p>

<button
  class="kis-button"
  data-kis-quiz-start="${lessonId}"
  data-kis-quiz-source="${lessonSource}"
>

        Start Quiz
      </button>

      <div id="kis-quiz-area"></div>

    </div>
  `;
};


// Displays the current question and answer choices.
function renderKisQuizQuestion() {

const questions = kisQuizState.questions;

  const question = questions[kisQuizState.questionIndex];

  const area = document.getElementById("kis-quiz-area");

  if (!area) return;

  area.innerHTML = `
    <section class="kis-quiz">

      <div class="kis-quiz-progress">
        Question ${kisQuizState.questionIndex + 1}
        of ${questions.length}
      </div>

      <div
        class="kis-quiz-progress-track"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin="0"
        aria-valuemax="${questions.length}"
        aria-valuenow="${kisQuizState.questionIndex + 1}"
      >
        <div
          class="kis-quiz-progress-fill"
          style="width: ${((kisQuizState.questionIndex + 1) / questions.length) * 100}%"
        ></div>
      </div>

      <h3>
        ${escapeKisQuizText(question.question)}
      </h3>

      <div class="kis-quiz-choices">

        ${question.choices.map((choice, index) => `
          <button
            class="kis-quiz-choice"
            data-kis-quiz-choice="${index}"
          >
            ${String.fromCharCode(65 + index)}.
            ${escapeKisQuizText(choice)}
          </button>
        `).join("")}

      </div>

      <div id="kis-quiz-feedback"></div>

      <div id="kis-quiz-next"></div>

    </section>
  `;
}


// Checks the selected answer and displays feedback.
function answerKisQuizQuestion(selectedIndex) {

  if (kisQuizState.answered) return;

const questions = kisQuizState.questions;

  const question = questions[kisQuizState.questionIndex];

  const area = document.getElementById("kis-quiz-area");

  if (!area) return;

  kisQuizState.answered = true;

const isCorrect = selectedIndex === question.correctAnswer;

// Save the learner's selected answer.
kisQuizState.answers[kisQuizState.questionIndex] = selectedIndex;

if (isCorrect) {
  kisQuizState.score++;
}

  const choices = area.querySelectorAll(
    "[data-kis-quiz-choice]"
  );

  choices.forEach((button, index) => {

    button.disabled = true;

    if (index === question.correctAnswer) {
      button.classList.add("is-correct");
    }

    if (index === selectedIndex && !isCorrect) {
      button.classList.add("is-incorrect");
    }

  });

  const feedback = document.getElementById(
    "kis-quiz-feedback"
  );

  feedback.innerHTML = `
<div class="kis-quiz-explanation ${isCorrect ? "is-correct" : "is-incorrect"}">

      <strong>
        ${isCorrect ? "Correct!" : "Not quite!"}
      </strong>

      <p>
        ${escapeKisQuizText(question.explanation)}
      </p>

    </div>
  `;

  const nextArea = document.getElementById(
    "kis-quiz-next"
  );

  nextArea.innerHTML = `
    <button
      class="kis-button"
      data-kis-quiz-next
    >
      ${kisQuizState.questionIndex === questions.length - 1
        ? "See Results"
        : "Next Question"}
    </button>
  `;
}



// Displays the final quiz score.
function renderKisQuizResults() {

  // Save this completed attempt only once.
  if (!kisQuizState.saved) {
    saveKisQuizAttempt();
    kisQuizState.saved = true;
  }

const questions = kisQuizState.questions;

  const area = document.getElementById("kis-quiz-area");

  if (!area) return;

  const total = questions.length;
  const score = kisQuizState.score;
  const percentage = Math.round((score / total) * 100);

  // Choose a performance message based on the score.
  let message = "";

  if (percentage === 100) {
    message = "Outstanding work!";
  } else if (percentage >= 80) {
    message = "Great work!";
  } else if (percentage >= 60) {
    message = "Good effort!";
  } else {
    message = "Keep practicing!";
  }

  area.innerHTML = `
    <section class="kis-quiz-results">

      <h3>Quiz Completed!</h3>

      <p class="kis-quiz-performance">
        ${message}
      </p>

      <div
        class="kis-quiz-score-ring"
        style="--score-progress: ${percentage}%"
      >
        <div class="kis-quiz-score-ring-inner">
          <strong>${percentage}%</strong>
          <span>Score</span>
        </div>
      </div>

      <div class="kis-quiz-score">
        ${score} / ${total}
      </div>

      <p>
        You answered ${score} out of ${total}
        questions correctly.
      </p>

<div class="kis-quiz-results-actions">

  <button
    class="kis-button"
    data-kis-quiz-review
  >
    Review Answers
  </button>

  <button
    class="kis-button"
    data-kis-quiz-history
  >
    View Quiz History
  </button>

<button
  class="kis-button"
  data-kis-quiz-retry="${kisQuizState.lessonId}"
  data-kis-quiz-source="${kisQuizState.lessonSource}"
>
  Try Again
</button>

</div>

    </section>
  `;
}


// Displays the learner's answers after completing the quiz.
function renderKisQuizReview() {

const questions = kisQuizState.questions;

  const area = document.getElementById("kis-quiz-area");

  if (!area) return;

  area.innerHTML = `
    <section class="kis-quiz-review">

      <h3>Review Your Answers</h3>

      <p>
        Check your answers and understand each explanation.
      </p>

      ${questions.map((question, index) => {

        const selectedIndex = kisQuizState.answers[index];

        const isCorrect = selectedIndex === question.correctAnswer;

        return `
          <article class="kis-quiz-review-item">

            <h4>
              ${index + 1}. ${escapeKisQuizText(question.question)}
            </h4>

            <p class="${isCorrect ? "is-correct" : "is-incorrect"}">
              <strong>Your answer:</strong>
              ${
                selectedIndex === undefined
                  ? "No answer recorded"
                  : escapeKisQuizText(question.choices[selectedIndex])
              }
            </p>

            <p class="is-correct">
              <strong>Correct answer:</strong>
              ${escapeKisQuizText(question.choices[question.correctAnswer])}
            </p>

            <p>
              <strong>Explanation:</strong>
              ${escapeKisQuizText(question.explanation)}
            </p>

          </article>
        `;

      }).join("")}

      <button
        class="kis-button"
        data-kis-quiz-back-results
      >
        Back to Results
      </button>

    </section>
  `;
}


// Handles all quiz button clicks.


// =========================================
// KIS - QUIZ HISTORY DISPLAY
// =========================================

// Displays saved quiz attempts and performance statistics.
function renderKisQuizHistory() {

  const area = document.getElementById("kis-quiz-area");

  if (!area) return;

  const history = getKisQuizHistory();

  const totalAttempts = history.length;

  const averageScore = totalAttempts
    ? Math.round(
        history.reduce((sum, attempt) => sum + attempt.percentage, 0)
        / totalAttempts
      )
    : 0;

  const bestScore = totalAttempts
    ? Math.max(...history.map(attempt => attempt.percentage))
    : 0;

  // Show the newest attempts first.
  const sortedHistory = [...history].reverse();

  area.innerHTML = `
    <section class="kis-quiz-history">

      <h3>Quiz History</h3>

      <p class="kis-quiz-history-description">
        Track your previous quiz attempts and learning progress.
      </p>

      <div class="kis-quiz-history-stats">

        <article class="kis-quiz-history-stat">
          <strong>${totalAttempts}</strong>
          <span>Total Attempts</span>
        </article>

        <article class="kis-quiz-history-stat">
          <strong>${averageScore}%</strong>
          <span>Average Score</span>
        </article>

        <article class="kis-quiz-history-stat">
          <strong>${bestScore}%</strong>
          <span>Best Score</span>
        </article>

      </div>

      ${
        totalAttempts
          ? `
            <div class="kis-quiz-trend">

              <h4>Performance Trend</h4>

              <p>Your latest 10 quiz attempts, from oldest to newest.</p>

              <div class="kis-quiz-trend-chart">

                ${history.slice(-10).map((attempt, index) => `
                  <div class="kis-quiz-trend-column">

                    <strong>${attempt.percentage}%</strong>

                    <div class="kis-quiz-trend-track">
                      <div
                        class="kis-quiz-trend-bar"
                        style="height: ${Math.min(100, Math.max(0, attempt.percentage))}%"
                      ></div>
                    </div>

                    <span>${index + 1}</span>

                  </div>
                `).join("")}

              </div>

            </div>

            <div class="kis-quiz-history-list">

              ${sortedHistory.map(attempt => `

                <article class="kis-quiz-history-item">

                  <div class="kis-quiz-history-item-header">
                    <div>
                      <h4>${escapeKisQuizText(attempt.lessonTitle)}</h4>
                      <p>${escapeKisQuizText(attempt.subjectName)}</p>
                    </div>

                    <strong>${attempt.percentage}%</strong>
                  </div>

                  <div class="kis-quiz-history-progress">
                    <div style="width: ${Math.min(100, Math.max(0, attempt.percentage))}%"></div>
                  </div>

                  <div class="kis-quiz-history-item-footer">
                    <span>${attempt.score} / ${attempt.total} correct</span>
                    <span>${new Date(attempt.completedAt).toLocaleString()}</span>
                  </div>

                </article>

              `).join("")}

            </div>
          `
          : `
            <div class="kis-quiz-history-empty">
              <h4>No Quiz Attempts Yet</h4>
              <p>Complete a quiz to see your learning history here.</p>
            </div>
          `
      }

      <button class="kis-button" data-kis-quiz-back-results>
        Back to Results
      </button>

    </section>
  `;
}


document.addEventListener("click", event => {

  const startButton = event.target.closest(
    "[data-kis-quiz-start]"
  );

  if (startButton) {

    const lessonId = startButton.dataset.kisQuizStart;
    const lessonSource =
      startButton.dataset.kisQuizSource || "local";

    const localLessonId = Number(lessonId);

    const localQuestions =
      lessonSource === "local"
        ? kisLessonQuizzes[localLessonId] || []
        : [];

    kisQuizState = {
      lessonId: lessonId,
      lessonSource: lessonSource,
      questions: localQuestions,
      lessonTitle: "",
      subject: "",
      questionIndex: 0,
      score: 0,
      answered: false,
      answers: [],
      saved: false
    };

    const area = document.getElementById("kis-quiz-area");

    if (area) {
      area.textContent = "Loading quiz...";
    }

    kisLoadStudentQuiz(lessonId, lessonSource)
      .then(quiz => {

        if (quiz) {

          kisQuizState.questions = quiz.questions;
          kisQuizState.lessonTitle = quiz.lessonTitle || "";
          kisQuizState.subject = quiz.subject || "";

        } else if (localQuestions.length > 0) {

          kisQuizState.questions = localQuestions;

        } else {

          if (area) {
            area.textContent =
              "No published quiz is available for this lesson.";
          }

          return;
        }

        kisQuizState.questionIndex = 0;
        kisQuizState.score = 0;
        kisQuizState.answered = false;
        kisQuizState.answers = [];
        kisQuizState.saved = false;

        renderKisQuizQuestion();

      })
      .catch(error => {

        console.error("Unable to start quiz:", error);

        if (area) {
          area.textContent = "Unable to load this quiz. Please try again.";
        }

      });

    return;
  }


  const choiceButton = event.target.closest(
    "[data-kis-quiz-choice]"
  );

  if (choiceButton) {

    answerKisQuizQuestion(
      Number(choiceButton.dataset.kisQuizChoice)
    );

    return;
  }


  const nextButton = event.target.closest(
    "[data-kis-quiz-next]"
  );

  if (nextButton) {

const questions = kisQuizState.questions;

    kisQuizState.questionIndex++;

    if (kisQuizState.questionIndex >= questions.length) {

      renderKisQuizResults();

    } else {

      kisQuizState.answered = false;

      renderKisQuizQuestion();

    }

    return;
  }


// Opens the answer review screen.
  const reviewButton = event.target.closest(
    "[data-kis-quiz-review]"
  );

  if (reviewButton) {
    renderKisQuizReview();
    return;
  }

// Opens the quiz history screen.
const historyButton = event.target.closest(
  "[data-kis-quiz-history]"
);

if (historyButton) {
  renderKisQuizHistory();
  return;
}

  // Returns to the final results screen.
  const backResultsButton = event.target.closest(
    "[data-kis-quiz-back-results]"
  );

  if (backResultsButton) {
    renderKisQuizResults();
    return;
  }


  const retryButton = event.target.closest(
    "[data-kis-quiz-retry]"
  );

  if (retryButton) {

kisQuizState = {
  lessonId: retryButton.dataset.kisQuizRetry,
  lessonSource: retryButton.dataset.kisQuizSource || "local",
  questions: kisQuizState.questions,
  lessonTitle: kisQuizState.lessonTitle || "",
  subject: kisQuizState.subject || "",
  questionIndex: 0,
  score: 0,
  answered: false,
  answers: [],
  saved: false
};

    renderKisQuizQuestion();

  }

});
