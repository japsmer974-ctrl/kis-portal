/* =========================================
   KIS - ADMIN AUTHENTICATION
========================================= */

// Authorized administrator UID
const KIS_ADMIN_UID = "5B3FmfSx7lh3s3GTyQ8gMXrZlLI3";

// Check whether the current user is the admin
function kisIsAdmin(user = kisAuth.currentUser) {
  return Boolean(
    user &&
    user.uid === KIS_ADMIN_UID &&
    user.email?.toLowerCase() === "japsmer974@gmail.com"
  );
}

// Sign in administrator
async function kisAdminLogin(email, password) {

  try {

    const result = await kisAuth.signInWithEmailAndPassword(
      email,
      password
    );

    if (!kisIsAdmin(result.user)) {

      await kisAuth.signOut();

      throw new Error(
        "Access denied. This account is not an authorized administrator."
      );
    }

    return {
      success: true,
      message: "Administrator login successful!"
    };

  } catch (error) {

    return {
      success: false,
      message: error.message
    };

  }
}

// Sign out administrator
async function kisAdminLogout() {

  await kisAuth.signOut();

  return true;
}

// Monitor authentication changes
kisAuth.onAuthStateChanged(user => {

  window.kisAdminAuthenticated = kisIsAdmin(user);

  document.dispatchEvent(
    new CustomEvent("kisAdminAuthChanged", {
      detail: {
        authenticated: window.kisAdminAuthenticated
      }
    })
  );

});

/* =========================================
   KIS - ADMIN STUDIO INTERFACE
========================================= */

function kisRenderAdminLogin() {

const main = document.querySelector("#kis-page-container");

if (!main) {
  console.error("KIS page container was not found.");
  return;
}

main.hidden = false;

  main.innerHTML = `
    <section class="app-page">

      <div class="page-heading">
        <h2>Admin Studio</h2>
        <p>Manage KIS lessons and quizzes</p>
      </div>

      <div class="admin-login-card">

        <h3>Administrator Sign In</h3>

        <p>
          Sign in using your authorized administrator account.
        </p>

        <form id="kis-admin-login-form">

          <label for="kis-admin-email">Email Address</label>

          <input
            type="email"
            id="kis-admin-email"
            placeholder="Enter your admin email"
            required
          >

          <label for="kis-admin-password">Password</label>

          <input
            type="password"
            id="kis-admin-password"
            placeholder="Enter your password"
            required
          >

          <button type="submit">
            Sign In
          </button>

          <p id="kis-admin-login-message"></p>

        </form>

      </div>

    </section>
  `;

  const form = document.querySelector("#kis-admin-login-form");

  form.addEventListener("submit", async event => {

    event.preventDefault();

    const email = document.querySelector("#kis-admin-email").value;
    const password = document.querySelector("#kis-admin-password").value;
    const message = document.querySelector("#kis-admin-login-message");

    message.textContent = "Signing in...";

    const result = await kisAdminLogin(email, password);

    message.textContent = result.message;

    if (result.success) {
      kisRenderAdminDashboard();
    }

  });

}

/* =========================================
   KIS - ADMIN DASHBOARD
========================================= */

function kisRenderAdminDashboard() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  main.innerHTML = `
    <section class="app-page">

      <div class="page-heading">
        <h2>Admin Studio</h2>
        <p>Welcome to your content management center.</p>
      </div>

      <div class="admin-dashboard">

        <div class="admin-dashboard-card">
          <h3>Lessons</h3>
          <p>Create and manage learning materials.</p>
          <button id="kis-manage-lessons">
            Manage Lessons
          </button>
        </div>

<div class="admin-dashboard-card">
  <h3>Original Lessons</h3>
  <p>Import the original KIS learning materials into Firestore.</p>
<button
  id="kis-import-original-lessons"
  type="button"
onclick="window.kisImportOriginalLessons()"
>
    Import Original Lessons
  </button>
</div>

        <div class="admin-dashboard-card">
          <h3>Draft Lessons</h3>
          <p>View and manage your saved lesson drafts.</p>
          <button id="kis-manage-drafts">
            Manage Drafts
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Quizzes</h3>
          <p>Create and manage student assessments.</p>
          <button id="kis-manage-quizzes">
            Manage Quizzes
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Published Quizzes</h3>
          <p>Open and edit quizzes currently available to students.</p>
          <button id="kis-view-published-quizzes">
            View Published Quizzes
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Published Content</h3>
          <p>Review content available to students.</p>
          <button id="kis-view-published">
            View Published Content
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Calendar Events</h3>
          <p>Create, edit, publish, and manage school calendar events.</p>
          <button id="kis-manage-calendar-events">
            Manage Calendar Events
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Student Accounts</h3>
          <p>Review registrations and manage student account approval.</p>
          <button id="kis-manage-student-accounts">
            Manage Student Accounts
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Parent Accounts</h3>
          <p>Review parent registrations and manage account approval.</p>
          <button id="kis-manage-parent-accounts">
            Manage Parent Accounts
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Parent–Child Requests</h3>
          <p>Verify student details and manage parent-child relationship requests.</p>
          <button id="kis-manage-parent-child-requests">
            Manage Parent–Child Requests
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>Teacher Accounts</h3>
          <p>Review teacher registrations and manage account approval.</p>
          <button id="kis-manage-teacher-accounts">
            Manage Teacher Accounts
          </button>
        </div>

        <div class="admin-dashboard-card">
          <h3>User Management</h3>
          <p>Search all accounts, manage profiles, roles, and account statuses.</p>
          <button id="kis-manage-user-management" type="button">
            Manage All Users
          </button>
        </div>

      </div>

      <button id="kis-admin-logout" class="admin-logout">
        Sign Out
      </button>

    </section>
  `;

  // Sign out administrator and return to KIS Account
  document.querySelector("#kis-admin-logout")
    .addEventListener("click", async event => {
      const button = event.currentTarget;
      await window.kisCampusSignOut(button);
    });

  // Open lesson management
  document.querySelector("#kis-manage-lessons")
    .addEventListener("click", () => {

      kisRenderLessonManager();

    });

  // Open draft management
  document.querySelector("#kis-manage-drafts")
    .addEventListener("click", () => {

      kisRenderDraftManager();

    });

  // Open quiz management
  document.querySelector("#kis-manage-quizzes")
    .addEventListener("click", () => {

      kisRenderQuizManager();

    });

  // Open published content
  document.querySelector("#kis-view-published")
    .addEventListener("click", () => {

      kisRenderPublishedContent();

    });

  // Open published quizzes
  document.querySelector("#kis-view-published-quizzes")
    .addEventListener("click", () => {

      kisRenderPublishedQuizzes();

    });

  // Open calendar event management
  document.querySelector("#kis-manage-calendar-events")
    .addEventListener("click", () => {
      kisRenderCalendarEventManager();
    });

  // Open student account management
  document.querySelector("#kis-manage-student-accounts")
    .addEventListener("click", () => {
      kisRenderStudentAccountManager();
    });

  // Open parent account management
  document.querySelector("#kis-manage-parent-accounts")
    .addEventListener("click", () => {
      kisRenderParentAccountManager();
    });

  // Open Parent–Child request management
  document.querySelector("#kis-manage-parent-child-requests")
    .addEventListener("click", () => {
      kisRenderParentChildRequestManager();
    });

  // Open teacher account management
  document.querySelector("#kis-manage-teacher-accounts")
    .addEventListener("click", () => {
      kisRenderTeacherAccountManager();
    });

  // Open centralized user management
  document.querySelector("#kis-manage-user-management")
    .addEventListener("click", () => {
      kisRenderUserManagement();
    });

// Import original KIS lessons
document.querySelector("#kis-import-original-lessons")
  .addEventListener("click", () => {

    alert("Import button click detected.");

    window.kisImportOriginalLessons();

  });

}

/* =========================================
   KIS - LESSON MANAGER
========================================= */

function kisRenderLessonManager(
  lessonId = null,
  lessonData = null,
  isPublishedEdit = false
) {

  // Stores the ID of the lesson currently being edited.
let editingLessonId = lessonId;

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  main.innerHTML = `
    <section class="admin-manager">

      <button id="kis-back-admin" class="back-button">
        <i class="fa-solid fa-arrow-left"></i>
        Back to Admin Dashboard
      </button>

      <div class="page-heading">
        <h2>Lesson Manager</h2>
        <p>Create and publish learning materials.</p>
      </div>

      <form id="kis-lesson-form" class="admin-form">

        <label for="kis-lesson-subject">Subject</label>

        <select id="kis-lesson-subject" required>
          <option value="">Select a subject</option>

          ${kisSubjects.map(subject => `
            <option value="${subject.id}">
              ${subject.name}
            </option>
          `).join("")}

        </select>

        <label for="kis-lesson-title">Lesson Title</label>

        <input
          id="kis-lesson-title"
          type="text"
          placeholder="Enter lesson title"
          required
        >

        <label for="kis-lesson-description">
          Short Description
        </label>

        <textarea
          id="kis-lesson-description"
          placeholder="Describe this lesson"
          required
        ></textarea>

        <div id="kis-lesson-content-editor"
             class="kis-structured-editor">

          <div class="kis-editor-panel">
            <h3>Learning Objectives</h3>
            <p class="kis-editor-help">
              Add what students should learn from this lesson.
            </p>

            <div id="kis-objectives-list"></div>

            <div class="kis-editor-actions">
              <button type="button" id="kis-add-objective">
                Add Objective
              </button>
            </div>
          </div>

          <div class="kis-editor-panel">
            <h3>Lesson Sections</h3>
            <p class="kis-editor-help">
              Organize your lesson into headings and paragraphs.
            </p>

            <div id="kis-sections-list"></div>

            <div class="kis-editor-actions">
              <button type="button" id="kis-add-section"
                      class="kis-add-section">
                Add Section
              </button>
            </div>
          </div>

        </div>

<div class="admin-form-actions">

  ${
    isPublishedEdit
      ? `
        <button type="submit">
          Save Changes
        </button>
      `
      : `
        <button type="button" id="kis-save-draft">
          Save Draft
        </button>

        <button type="submit">
          Publish Lesson
        </button>
      `
  }

</div>

        <p id="kis-lesson-message"></p>

      </form>

    </section>
  `;

  // Load existing lesson information when editing.
  if (lessonData) {

    document.querySelector("#kis-lesson-subject").value =
      lessonData.subject || "";

    document.querySelector("#kis-lesson-title").value =
      lessonData.title || "";

    document.querySelector("#kis-lesson-description").value =
      lessonData.description || "";



    document.querySelector("#kis-lesson-message").textContent =
      "Editing an existing lesson.";

  }

  // Load Firestore content first.
  let editorContent = lessonData ? lessonData.content : null;

  // Fall back to the original local lesson only when Firestore content is missing.
  if (
    lessonData &&
    lessonData.origin === "original" &&
    (
      editorContent == null ||
      (typeof editorContent === "string" && !editorContent.trim())
    )
  ) {
    const originalLessonId = Number(lessonData.legacyId);

    if (
      Number.isInteger(originalLessonId) &&
      originalLessonId > 0
    ) {
      editorContent = kisLessonContent[originalLessonId] || "";
    }
  }

  // Initialize the visual lesson editor.
  kisInitializeLessonEditor(editorContent);

  // Return to the Admin Studio dashboard.
document.querySelector("#kis-back-admin")
  .addEventListener("click", () => {

    if (isPublishedEdit) {
      kisRenderPublishedContent();
    } else {
      kisRenderAdminDashboard();
    }

  });

  // Save the lesson as a draft.
if (!isPublishedEdit) {

  document.querySelector("#kis-save-draft")
    .addEventListener("click", () => {
      kisSaveLesson("draft", editingLessonId);
    });

}

  // Publish the lesson.
  document.querySelector("#kis-lesson-form")
    .addEventListener("submit", event => {
      event.preventDefault();
kisSaveLesson("published", editingLessonId, isPublishedEdit);
    });
}


/* =========================================
   KIS - SAVE LESSON TO FIRESTORE
========================================= */

async function kisSaveLesson(
  status,
  lessonId = null,
  isPublishedEdit = false
) {

  if (!kisIsAdmin()) {
    alert("Administrator access required.");
     return;
  }

const subject = document.querySelector("#kis-lesson-subject").value;
const title = document.querySelector("#kis-lesson-title").value.trim();
const description = document.querySelector("#kis-lesson-description").value.trim();
const content = kisReadLessonEditorContent();
const message = document.querySelector("#kis-lesson-message");

if (
  !subject ||
  !title ||
  !description ||
  (!content && !isPublishedEdit)
) {
  message.textContent = "Please complete all required lesson fields.";
  return;
}

  message.textContent = "Saving lesson...";

  try {

const lessonData = {
  subject: subject,
  title: title,
  description: description,
  content: content,
  status: isPublishedEdit ? "published" : status,
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  updatedBy: kisAuth.currentUser.uid
};

// Preserve the original publishedAt when editing.
if (status === "published" && !isPublishedEdit) {
  lessonData.publishedAt =
    firebase.firestore.FieldValue.serverTimestamp();
}

if (isPublishedEdit && !lessonId) {
  message.textContent = "Error: Published lesson ID is missing.";
  return;
}

if (lessonId) {

  await kisDb.collection("lessons")
    .doc(lessonId)
    .set(lessonData, { merge: true });

} else {

  await kisDb.collection("lessons")
    .add(lessonData);

}

message.textContent = isPublishedEdit
  ? "Published lesson updated successfully!"
  : status === "published"
    ? "Lesson published successfully!"
    : "Lesson saved as draft!";

if (!isPublishedEdit) {
  document.querySelector("#kis-lesson-form").reset();
}

  } catch (error) {

    console.error("Lesson saving failed:", error);

    message.textContent = "Unable to save lesson: " + error.message;

  }
}


/* =========================================
   KIS - DRAFT MANAGER
========================================= */

async function kisRenderDraftManager() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  main.innerHTML = `
    <section class="admin-manager">

      <button id="kis-back-drafts" class="back-button">
        <i class="fa-solid fa-arrow-left"></i>
        Back to Admin Dashboard
      </button>

      <div class="page-heading">
        <h2>Draft Lessons</h2>
        <p>Review your saved lesson drafts.</p>
      </div>

      <div id="kis-draft-list">
        <p>Loading drafts...</p>
      </div>

    </section>
  `;

  document.querySelector("#kis-back-drafts")
    .addEventListener("click", () => {
      kisRenderAdminDashboard();
    });

  const draftList = document.querySelector("#kis-draft-list");

  try {

    const snapshot = await kisDb.collection("lessons")
      .where("status", "==", "draft")
      .get();

    if (snapshot.empty) {
      draftList.innerHTML = `
        <p>No saved drafts yet.</p>
      `;
      return;
    }


    draftList.innerHTML = snapshot.docs.map(doc => {

      const lesson = doc.data();

      const subjectName =
        kisSubjects.find(subject => subject.id === lesson.subject)?.name
        || lesson.subject
        || "Unknown Subject";

      return `
        <article class="admin-dashboard-card">

          <h3>${kisEscapeHTML(subjectName)}</h3>

          <h4>${kisEscapeHTML(lesson.title || "Untitled Lesson")}</h4>

          <p>${kisEscapeHTML(lesson.description || "")}</p>

          <span class="kis-badge kis-badge--neutral kis-badge--small kis-badge--pill">Draft</span>

          <div class="admin-form-actions">

            <button
              type="button"
              class="kis-edit-draft"
              data-id="${doc.id}"
            >
              Edit
            </button>

            <button
              type="button"
              class="kis-publish-draft"
              data-id="${doc.id}"
            >
              Publish
            </button>

            <button
              type="button"
              class="kis-delete-draft"
              data-id="${doc.id}"
            >
              Delete
            </button>

          </div>

        </article>
      `;

    }).join("");

    // Connect each Edit button to its selected lesson.
    draftList.querySelectorAll(".kis-edit-draft")
      .forEach(button => {

        button.addEventListener("click", async () => {

          const selectedDoc = await kisDb
            .collection("lessons")
            .doc(button.dataset.id)
            .get();

          if (!selectedDoc.exists) {
            alert("This lesson could not be found.");
            return;
          }

          kisRenderLessonManager(
            selectedDoc.id,
            selectedDoc.data()
          );

        });

      });

    // Connect each Publish button.
    draftList.querySelectorAll(".kis-publish-draft")
      .forEach(button => {

        button.addEventListener("click", async () => {

          const lessonId = button.dataset.id;

          if (!confirm("Publish this lesson for all KIS students?")) {
            return;
          }

          try {

            await kisDb.collection("lessons")
              .doc(lessonId)
              .update({

                status: "published",

                publishedAt:
                  firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                  firebase.firestore.FieldValue.serverTimestamp(),

                updatedBy: kisAuth.currentUser.uid

              });

            alert("Lesson published successfully!");

            await kisRenderDraftManager();

          } catch (error) {

            console.error("Publishing lesson failed:", error);

            alert("Unable to publish lesson: " + error.message);

          }

        });

      });

  } catch (error) {

    console.error("Loading drafts failed:", error);

    draftList.innerHTML = `
      <p>Unable to load drafts: ${kisEscapeHTML(error.message)}</p>
    `;

  }
}


/* =========================================
   KIS - PUBLISHED CONTENT MANAGER
========================================= */

async function kisRenderPublishedContent() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  main.innerHTML = `
    <section class="admin-manager">

      <button id="kis-back-published" class="back-button">
        <i class="fa-solid fa-arrow-left"></i>
        Back to Admin Dashboard
      </button>

      <div class="page-heading">
        <h2>Published Content</h2>
        <p>Manage and edit your published lessons.</p>
      </div>

      <div id="kis-published-list">
        <p>Loading published lessons...</p>
      </div>

    </section>
  `;

  document.querySelector("#kis-back-published")
    .addEventListener("click", () => {
      kisRenderAdminDashboard();
    });

  const publishedList =
    document.querySelector("#kis-published-list");

  try {

    const snapshot = await kisDb.collection("lessons")
      .where("status", "==", "published")
      .get();

    if (snapshot.empty) {
      publishedList.innerHTML = `
        <p>No published lessons yet.</p>
      `;
      return;
    }

    publishedList.innerHTML = snapshot.docs.map(doc => {

      const lesson = doc.data();

      const subjectName =
        kisSubjects.find(subject => subject.id === lesson.subject)?.name
        || lesson.subject
        || "Unknown Subject";

      return `
        <article class="admin-dashboard-card">

          <h3>${kisEscapeHTML(subjectName)}</h3>

          <h4>${kisEscapeHTML(lesson.title || "Untitled Lesson")}</h4>

          <p>${kisEscapeHTML(lesson.description || "")}</p>

          <span class="kis-badge kis-badge--neutral kis-badge--small kis-badge--pill">Published</span>

          <div class="admin-form-actions">

            <button
              type="button"
              class="kis-edit-published"
              data-id="${doc.id}"
            >
              Edit Lesson
            </button>

          </div>

        </article>
      `;

    }).join("");

    publishedList.querySelectorAll(".kis-edit-published")
      .forEach(button => {

        button.addEventListener("click", async () => {

          const lessonId = button.dataset.id;

          try {

            const selectedDoc = await kisDb.collection("lessons")
              .doc(lessonId)
              .get();

            if (!selectedDoc.exists) {
              alert("This lesson no longer exists.");
              await kisRenderPublishedContent();
              return;
            }

            kisRenderLessonManager(
              selectedDoc.id,
              selectedDoc.data(),
              true
            );

          } catch (error) {

            console.error("Opening published lesson failed:", error);

            alert("Unable to open lesson: " + error.message);

          }

        });

      });

  } catch (error) {

    console.error("Loading published lessons failed:", error);

    publishedList.innerHTML = `
      <p>Unable to load published lessons:
        ${kisEscapeHTML(error.message)}
      </p>
    `;

  }

}


// =========================================
// KIS - ADMIN QUIZ MANAGER
// =========================================

async function kisRenderQuizManager() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  main.innerHTML = `
    <section class="admin-manager">

      <h2>Quiz Manager</h2>

      <p>Create and manage student quizzes.</p>

      <button type="button" id="kis-create-quiz">
        Create New Quiz
      </button>

      <button type="button" id="kis-back-admin" class="back-button">
        <i class="fa-solid fa-arrow-left"></i>
        Back to Admin Dashboard
      </button>

<div class="kis-quiz-filters">

<select id="kis-quiz-sort">
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
  <option value="title">Title (A–Z)</option>
  <option value="subject">Subject (A–Z)</option>
</select>

  <input
    type="search"
    id="kis-quiz-search"
    placeholder="Search quizzes by title..."
  >

  <select id="kis-quiz-subject-filter">
    <option value="all">All Subjects</option>
  </select>

  <select id="kis-quiz-status-filter">
    <option value="all">All Statuses</option>
    <option value="published">Published</option>
    <option value="draft">Draft</option>
  </select>

  <button type="button" id="kis-clear-quiz-filters">
    Clear Filters
  </button>

</div>

      <div id="kis-quiz-manager-list">
        <p>Loading quizzes...</p>
      </div>

    </section>
  `;

  document.querySelector("#kis-back-admin")
    .addEventListener("click", () => {
      kisRenderAdminDashboard();
    });

  document.querySelector("#kis-create-quiz")
    .addEventListener("click", () => {
      kisRenderQuizEditor();
    });

  kisLoadAdminQuizzes();

}

// =========================================
// KIS - LOAD ADMIN QUIZZES
// =========================================

async function kisLoadAdminQuizzes() {

  const list = document.querySelector("#kis-quiz-manager-list");

  if (!list) {
    return;
  }

  try {

    const snapshot = await kisDb.collection("quizzes").get();

    if (snapshot.empty) {

      list.innerHTML = `
        <p>No quizzes created yet.</p>
      `;

      return;
    }


const allQuizzes = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));

const subjectFilter = document.querySelector("#kis-quiz-subject-filter");

const subjects = [...new Set(
  allQuizzes.map(quiz => quiz.subject || "Not specified")
)];

subjectFilter.innerHTML = `
  <option value="all">All Subjects</option>
  ${subjects.map(subject => `
    <option value="${kisEscapeHTML(subject)}">
      ${kisEscapeHTML(subject)}
    </option>
  `).join("")}
`;

function kisRenderFilteredQuizzes() {

  const search = document.querySelector("#kis-quiz-search")
    .value.trim().toLowerCase();

  const selectedSubject = subjectFilter.value;

  const selectedStatus = document.querySelector("#kis-quiz-status-filter")
    .value;

  const filteredQuizzes = allQuizzes.filter(quiz => {

    const title = (quiz.lessonTitle || "Untitled Lesson").toLowerCase();
    const subject = quiz.subject || "Not specified";
    const status = quiz.status || "draft";

    return (
      title.includes(search) &&
      (selectedSubject === "all" || subject === selectedSubject) &&
      (selectedStatus === "all" || status === selectedStatus)
    );
  });

const sortBy = document.querySelector("#kis-quiz-sort").value;

const getQuizTime = value => {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {

  if (sortBy === "title") {
    return (a.lessonTitle || "").localeCompare(b.lessonTitle || "");
  }

  if (sortBy === "subject") {
    return (a.subject || "").localeCompare(b.subject || "");
  }

  if (sortBy === "oldest") {
    return getQuizTime(a.createdAt) - getQuizTime(b.createdAt);
  }

  return getQuizTime(b.createdAt) - getQuizTime(a.createdAt);
});

list.innerHTML = sortedQuizzes.map(quiz => {

    const isPublished = quiz.status === "published";

      return `
        <div class="admin-dashboard-card">

          <h3>${kisEscapeHTML(quiz.lessonTitle || "Untitled Lesson")}</h3>

          <p>Subject: ${kisEscapeHTML(quiz.subject || "Not specified")}</p>

          <p>Questions: ${Array.isArray(quiz.questions) ? quiz.questions.length : 0}</p>

          <p>Status: <strong>${isPublished ? "Published" : "Draft"}</strong></p>

          <button
            type="button"
            data-kis-edit-quiz="${kisEscapeHTML(quiz.id)}">
            Edit Quiz
          </button>

          <button
            type="button"
            data-kis-toggle-quiz="${kisEscapeHTML(quiz.id)}"
            data-next-status="${isPublished ? "draft" : "published"}">
            ${isPublished ? "Unpublish Quiz" : "Publish Quiz"}
          </button>

          <button
            type="button"
            data-kis-delete-quiz="${kisEscapeHTML(quiz.id)}">
            Delete Quiz
          </button>

        </div>
      `;

    }).join("");

  if (filteredQuizzes.length === 0) {
    list.innerHTML = "<p>No quizzes match your filters.</p>";
  }

  }

document.querySelector("#kis-quiz-search").oninput =
  kisRenderFilteredQuizzes;

subjectFilter.onchange = kisRenderFilteredQuizzes;

document.querySelector("#kis-quiz-status-filter").onchange =
  kisRenderFilteredQuizzes;

document.querySelector("#kis-quiz-sort").onchange =
  kisRenderFilteredQuizzes;

  kisRenderFilteredQuizzes();
const clearFiltersButton = document.querySelector("#kis-clear-quiz-filters");

if (clearFiltersButton) {
  clearFiltersButton.onclick = () => {
    document.querySelector("#kis-quiz-search").value = "";
    subjectFilter.value = "all";
    document.querySelector("#kis-quiz-status-filter").value = "all";

    kisRenderFilteredQuizzes();
  };
}

    // Handle Quiz Manager actions.
    list.onclick = async function(event) {

      const button = event.target.closest("button");

      if (!button) return;

      const quizId =
        button.dataset.kisEditQuiz ||
        button.dataset.kisToggleQuiz ||
        button.dataset.kisDeleteQuiz;

      if (!quizId) return;

      if (button.dataset.kisEditQuiz) {
        await kisRenderQuizEditor(quizId);
        return;
      }

      if (button.dataset.kisToggleQuiz) {
        await kisSetQuizStatus(
          quizId,
          button.dataset.nextStatus
        );
        return;
      }

      if (button.dataset.kisDeleteQuiz) {
        await kisDeleteQuiz(quizId);
      }

    };


  } catch (error) {

    console.error("Loading quizzes failed:", error);

    list.innerHTML = `
      <p>Unable to load quizzes: ${kisEscapeHTML(error.message)}</p>
    `;

  }
}

// =========================================
// KIS - ADMIN QUIZ EDITOR
// =========================================

function kisCreateQuizQuestionHTML(question = {}, index = 0) {

  const choices = Array.isArray(question.choices)
    ? question.choices
    : ["", "", "", ""];

  return `
    <div class="admin-dashboard-card kis-quiz-question">

      <div class="kis-quiz-question-heading">
        <h3>Question ${index + 1}</h3>
        <span>Multiple Choice</span>
      </div>

      <div class="kis-quiz-field">
        <label>Question Text</label>
        <textarea
          class="kis-quiz-question-text"
          required
          placeholder="Write your question here..."
        >${kisEscapeHTML(question.question || "")}</textarea>
      </div>

      <div class="kis-quiz-answer-section">
        <h4>Answer Choices</h4>
        <p>Select the correct answer below.</p>

        ${choices.map((choice, choiceIndex) => `
          <div class="kis-quiz-answer-field">
            <label>Choice ${String.fromCharCode(65 + choiceIndex)}</label>
            <input
              type="text"
              class="kis-quiz-choice"
              value="${kisEscapeHTML(choice || "")}"
              placeholder="Enter choice ${String.fromCharCode(65 + choiceIndex)}"
              required
            >
          </div>
        `).join("")}
      </div>

      <div class="kis-quiz-field">
        <label>Correct Answer</label>
        <select class="kis-quiz-correct-answer">
          <option value="0" ${Number(question.correctAnswer) === 0 ? "selected" : ""}>A</option>
          <option value="1" ${Number(question.correctAnswer) === 1 ? "selected" : ""}>B</option>
          <option value="2" ${Number(question.correctAnswer) === 2 ? "selected" : ""}>C</option>
          <option value="3" ${Number(question.correctAnswer) === 3 ? "selected" : ""}>D</option>
        </select>
      </div>

      <div class="kis-quiz-field">
        <label>Answer Explanation</label>
        <textarea
          class="kis-quiz-explanation"
          placeholder="Explain why this answer is correct..."
        >${kisEscapeHTML(question.explanation || "")}</textarea>
      </div>

      <button type="button" class="kis-remove-quiz-question">
        Remove Question
      </button>

    </div>
  `;
}


async function kisRenderQuizEditor(quizId = null, fromPublishedQuizzes = false) {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  let existingQuiz = null;

  if (quizId) {

    try {

      const quizDoc = await kisDb.collection("quizzes")
        .doc(quizId)
        .get();

      if (!quizDoc.exists) {
        alert("Quiz not found.");
        return;
      }

      existingQuiz = quizDoc.data();

    } catch (error) {

      alert("Unable to load quiz: " + error.message);
      return;

    }
  }

  let lessonOptions = kisLessons.map(lesson => `
    <option
      value="local:${lesson.id}"
      ${existingQuiz?.lessonSource === "local"
        && String(existingQuiz.lessonId) === String(lesson.id)
        ? "selected" : ""}
    >
      ${kisEscapeHTML(lesson.title)} (Local)
    </option>
  `).join("");

  try {

    const lessonSnapshot = await kisDb.collection("lessons").get();

    lessonSnapshot.forEach(doc => {

      const lesson = doc.data();

      lessonOptions += `
        <option
          value="firestore:${doc.id}"
          ${existingQuiz?.lessonSource === "firestore"
            && existingQuiz.lessonId === doc.id
            ? "selected" : ""}
        >
          ${kisEscapeHTML(lesson.title || "Untitled Lesson")} (Firestore)
        </option>
      `;

    });

  } catch (error) {

    console.error("Unable to load lesson options:", error);

  }

  const isPublishedQuizEditor =
    fromPublishedQuizzes && existingQuiz?.status === "published";

  const questions = existingQuiz?.questions || [{}];

  main.innerHTML = `
    <section class="admin-manager">

      <h2>${quizId ? "Edit Quiz" : "Create Quiz"}</h2>

      <label for="kis-quiz-lesson">Select Lesson</label>

      <select id="kis-quiz-lesson" required>
        <option value="">Choose a lesson</option>
        ${lessonOptions}
      </select>

  <script>
    console.log("Quiz lesson selector rendered");
  </script>

      <div id="kis-quiz-question-list">
        ${questions.map((question, index) =>
          kisCreateQuizQuestionHTML(question, index)
        ).join("")}
      </div>

      <button type="button" id="kis-add-quiz-question">
        Add Question
      </button>

      ${isPublishedQuizEditor ? `
        <button type="button" id="kis-save-quiz-changes">
          Save Changes
        </button>
      ` : `
        <button type="button" id="kis-save-quiz-draft">
          Save Draft
        </button>

        <button type="button" id="kis-publish-quiz">
          Publish Quiz
        </button>
      `}

      <button type="button" id="kis-cancel-quiz" class="back-button">
        Cancel
      </button>

      <p id="kis-quiz-editor-message"></p>

    </section>
  `;

  let questionCount = questions.length;

  document.querySelector("#kis-add-quiz-question")
    .addEventListener("click", () => {

      const questionList = document.querySelector("#kis-quiz-question-list");

      questionList.insertAdjacentHTML(
        "beforeend",
        kisCreateQuizQuestionHTML({}, questionCount)
      );

      questionCount++;

    });

  document.querySelector("#kis-quiz-question-list")
    .addEventListener("click", event => {

      if (event.target.classList.contains("kis-remove-quiz-question")) {

        event.target.closest(".kis-quiz-question").remove();

      }

    });

  document.querySelector("#kis-cancel-quiz")
    .addEventListener("click", () => {

      if (isPublishedQuizEditor) {
        kisRenderPublishedQuizzes();
      } else {
        kisRenderQuizManager();
      }

    });

  if (isPublishedQuizEditor) {

    document.querySelector("#kis-save-quiz-changes")
      .addEventListener("click", () => {
        kisSaveQuiz("published", quizId, existingQuiz, true);
      });

  } else {

    document.querySelector("#kis-save-quiz-draft")
      .addEventListener("click", () => {
        kisSaveQuiz("draft", quizId, existingQuiz);
      });

    document.querySelector("#kis-publish-quiz")
      .addEventListener("click", () => {
        kisSaveQuiz("published", quizId, existingQuiz);
      });

  }

}



// Saves or publishes a quiz in Firestore.
async function kisSaveQuiz(status, quizId = null, existingQuiz = null, returnToPublished = false) {
console.log("kisSaveQuiz started:", status);

  const message = document.querySelector("#kis-quiz-editor-message");
  const saveButton = document.querySelector(
    status === "draft" ? "#kis-save-quiz-draft" : "#kis-publish-quiz"
  );

  try {

    message.textContent = "Saving quiz...";

console.log("Save message element:", message);
console.log("Lesson selector:", document.querySelector("#kis-quiz-lesson"));

    const lessonValue = document.querySelector("#kis-quiz-lesson").value;

    if (!lessonValue) {
      throw new Error("Please select a lesson.");
    }

    const [lessonSource, lessonId] = lessonValue.split(":");

    let lessonTitle = "";
    let subject = "";

    if (lessonSource === "local") {

      const lesson = kisLessons.find(
        item => String(item.id) === lessonId
      );

      if (!lesson) {
        throw new Error("Selected local lesson was not found.");
      }

      lessonTitle = lesson.title;
      subject = lesson.subject;

    } else if (lessonSource === "firestore") {

      const lessonDoc = await kisDb.collection("lessons")
        .doc(lessonId)
        .get();

      if (!lessonDoc.exists) {
        throw new Error("Selected Firestore lesson was not found.");
      }

      const lesson = lessonDoc.data();

      lessonTitle = lesson.title || "Untitled Lesson";
      subject = lesson.subject || "";

    } else {

      throw new Error("Invalid lesson source.");

    }

    const questionCards = document.querySelectorAll(
      ".kis-quiz-question"
    );

    if (questionCards.length === 0) {
      throw new Error("Please add at least one question.");
    }

    const questions = [];

    questionCards.forEach((card, index) => {

      const question = card.querySelector(
        ".kis-quiz-question-text"
      ).value.trim();

      const choices = Array.from(
        card.querySelectorAll(".kis-quiz-choice")
      ).map(input => input.value.trim());

      const correctAnswer = Number.parseInt(
        card.querySelector(".kis-quiz-correct-answer").value,
        10
      );

      const explanation = card.querySelector(
        ".kis-quiz-explanation"
      ).value.trim();

      if (!question) {
        throw new Error("Question " + (index + 1) + " is empty.");
      }

      if (choices.length !== 4 || choices.some(choice => !choice)) {
        throw new Error(
          "Question " + (index + 1) + " must have four complete choices."
        );
      }

      if (
        !Number.isInteger(correctAnswer) ||
        correctAnswer < 0 ||
        correctAnswer > 3
      ) {
        throw new Error(
          "Select a valid correct answer for question " + (index + 1) + "."
        );
      }

      questions.push({
        question,
        choices,
        correctAnswer,
        explanation
      });

    });

    const currentUser = firebase.auth().currentUser;

    const quizData = {
      lessonId,
      lessonSource,
      lessonTitle,
      subject,
      questions,
      status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: currentUser ? currentUser.uid : null
    };

    if (!quizId) {
      quizData.createdAt =
        firebase.firestore.FieldValue.serverTimestamp();
    }

    if (status === "published" && existingQuiz?.publishedAt) {
      quizData.publishedAt = existingQuiz.publishedAt;
    } else if (status === "published") {
      quizData.publishedAt =
        firebase.firestore.FieldValue.serverTimestamp();
    } else if (existingQuiz?.publishedAt) {
      quizData.publishedAt = existingQuiz.publishedAt;
    }

    if (quizId) {

      await kisDb.collection("quizzes")
        .doc(quizId)
        .set(quizData, { merge: true });

    } else {

      await kisDb.collection("quizzes")
        .add(quizData);

    }

    message.textContent = "Quiz saved successfully!";

    alert(
      status === "published"
        ? "Quiz published successfully!"
        : "Quiz saved as draft successfully!"
    );

    if (returnToPublished) {
      await kisRenderPublishedQuizzes();
    } else {
      await kisRenderQuizManager();
    }

  } catch (error) {

    console.error("Saving quiz failed:", error);

    const errorMessage = error.code
      ? error.code + ": " + error.message
      : error.message;

    if (message) {
      message.textContent = "Unable to save quiz: " + errorMessage;
    }

    alert("Quiz saving failed:\n" + errorMessage);

    if (saveButton) {
      saveButton.disabled = false;
    }

  }

  }


// =========================================
// KIS - PUBLISH / UNPUBLISH QUIZ
// =========================================

async function kisSetQuizStatus(quizId, nextStatus) {

  if (nextStatus !== "published" && nextStatus !== "draft") {
    return;
  }

  const action = nextStatus === "published"
    ? "Publish this quiz for students?"
    : "Unpublish this quiz? Students will no longer see it.";

  if (!confirm(action)) return;

  try {

    const currentUser = firebase.auth().currentUser;

    const updateData = {
      status: nextStatus,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: currentUser ? currentUser.uid : null
    };

    if (nextStatus === "published") {
      updateData.publishedAt =
        firebase.firestore.FieldValue.serverTimestamp();
    } else {
      updateData.publishedAt =
        firebase.firestore.FieldValue.delete();
    }

    await kisDb.collection("quizzes")
      .doc(quizId)
      .update(updateData);

    alert(
      nextStatus === "published"
        ? "Quiz published successfully!"
        : "Quiz unpublished successfully!"
    );

    await kisLoadAdminQuizzes();

  } catch (error) {

    console.error("Updating quiz status failed:", error);
    alert("Unable to update quiz: " + error.message);

  }
}


// =========================================
// KIS - DELETE QUIZ
// =========================================

async function kisDeleteQuiz(quizId) {

  if (!confirm(
    "Delete this quiz permanently? This action cannot be undone."
  )) {
    return;
  }

  try {

    await kisDb.collection("quizzes")
      .doc(quizId)
      .delete();

    alert("Quiz deleted successfully!");

    await kisLoadAdminQuizzes();

  } catch (error) {

    console.error("Deleting quiz failed:", error);
    alert("Unable to delete quiz: " + error.message);

  }
}


window.kisImportOriginalLessons = kisImportOriginalLessons;

/* =========================================
   KIS - SAFE TEXT DISPLAY
========================================= */

function kisEscapeHTML(value) {

  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

}

/* =========================================
   KIS - IMPORT ORIGINAL LESSONS
========================================= */

async function kisImportOriginalLessons() {

  if (!kisIsAdmin()) {
    alert("Administrator access required.");
    return;
  }

  if (!window.kisDb || !navigator.onLine) {
    alert("An internet connection is required for importing lessons.");
    return;
  }

  const confirmed = confirm(
    "Import the 17 original KIS lessons into Firestore? Existing documents will be skipped."
  );

  if (!confirmed) return;

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const lesson of kisLessons) {

    try {

      const documentId = "original-" + lesson.id;

      const lessonRef = kisDb
        .collection("lessons")
        .doc(documentId);

      const existing = await lessonRef.get();

      if (existing.exists) {
        skipped++;
        continue;
      }

      await lessonRef.set({

        legacyId: Number(lesson.id),
        origin: "original",

        subject: lesson.subject,
        title: lesson.title,
        description: lesson.description,

        content: kisLessonContent[lesson.id] || "",

        status: "published",

        quizLessonId: Number(lesson.id),
        quizSource: "local",

        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: kisAuth.currentUser.uid

      });

      imported++;

    } catch (error) {

      console.error(
        "Failed to import lesson:",
        lesson.title,
        error
      );

      failed++;

    }
  }

  alert(
    "Original lesson import finished!\n\n" +
    "Imported: " + imported +
    "\nSkipped: " + skipped +
    "\nFailed: " + failed
  );

}




/* =========================================
   KIS - VISUAL LESSON EDITOR
========================================= */

let kisLessonEditorData = {
  objectives: [],
  sections: [],
  legacyText: ""
};

function kisInitializeLessonEditor(content) {

  kisLessonEditorData = {
    objectives: [],
    sections: [],
    legacyText: ""
  };

  let parsedContent = content;

  if (typeof content === "string") {
    try {
      const candidate = JSON.parse(content);

      if (
        candidate &&
        typeof candidate === "object" &&
        !Array.isArray(candidate) &&
        (
          Array.isArray(candidate.objectives) ||
          Array.isArray(candidate.sections)
        )
      ) {
        parsedContent = candidate;
      } else {
        kisLessonEditorData.legacyText = content;
      }

    } catch (error) {
      kisLessonEditorData.legacyText = content;
    }
  }

  if (
    parsedContent &&
    typeof parsedContent === "object" &&
    !Array.isArray(parsedContent)
  ) {

    kisLessonEditorData.objectives =
      Array.isArray(parsedContent.objectives)
        ? [...parsedContent.objectives]
        : [];

    kisLessonEditorData.sections =
      Array.isArray(parsedContent.sections)
        ? parsedContent.sections.map(section => ({
            heading: section.heading || "",
            paragraphs: Array.isArray(section.paragraphs)
              ? [...section.paragraphs]
              : [],
            example: section.example
              ? {
                  problem: section.example.problem || "",
                  steps: Array.isArray(section.example.steps)
                    ? [...section.example.steps]
                    : [],
                  answer: section.example.answer || "",
                  explanation: section.example.explanation || ""
                }
              : null
          }))
        : [];
  }

  kisRenderLessonContentEditor();

}

function kisRenderLessonContentEditor() {

  const objectivesList =
    document.querySelector("#kis-objectives-list");

  const sectionsList =
    document.querySelector("#kis-sections-list");

  if (!objectivesList || !sectionsList) return;

  objectivesList.innerHTML =
    kisLessonEditorData.objectives.map((objective, index) => `
      <div class="kis-editor-section">
        <label>Objective ${index + 1}</label>
        <textarea
          data-objective-index="${index}"
          placeholder="Enter a learning objective..."
        >${kisEscapeHTML(objective)}</textarea>

        <button type="button"
          class="kis-remove-section"
          data-remove-objective="${index}">
          Remove Objective
        </button>
      </div>
    `).join("");

  let legacyEditor = document.querySelector("#kis-legacy-lesson-text");

  if (kisLessonEditorData.legacyText) {
    if (!legacyEditor) {
      const panel = document.createElement("div");
      panel.className = "kis-editor-panel";
      panel.innerHTML = `
        <h3>Legacy Lesson Text</h3>
        <p class="kis-editor-help">
          This lesson uses the older plain-text format.
        </p>
        <textarea
          id="kis-legacy-lesson-text"
          placeholder="Write lesson content..."
        ></textarea>
      `;
      document.querySelector("#kis-lesson-content-editor")
        .prepend(panel);
      legacyEditor = panel.querySelector("#kis-legacy-lesson-text");
    }

    legacyEditor.value = kisLessonEditorData.legacyText;
  }

  sectionsList.innerHTML =
    kisLessonEditorData.sections.map((section, index) => `
      <div class="kis-editor-section">

        <h4>Section ${index + 1}</h4>

        <label>Section Heading</label>
        <input
          type="text"
          data-section-heading="${index}"
          value="${kisEscapeHTML(section.heading)}"
          placeholder="Enter section heading..."
        >

        <label>Paragraphs</label>

        ${(section.paragraphs || []).map((paragraph, paragraphIndex) => `
          <div>
            <textarea
              data-paragraph-section="${index}"
              data-paragraph-index="${paragraphIndex}"
              placeholder="Write a paragraph..."
            >${kisEscapeHTML(paragraph)}</textarea>

            <button type="button"
              class="kis-remove-section"
              data-remove-paragraph="${index}"
              data-paragraph-index="${paragraphIndex}">
              Remove Paragraph
            </button>
          </div>
        `).join("")}

        <div class="kis-editor-actions">
          <button type="button"
            data-add-paragraph="${index}">
            Add Paragraph
          </button>
        </div>

        <div class="kis-editor-example">

          <h4>Worked Example</h4>

          ${section.example ? `
            <label>Problem</label>
            <textarea data-example-problem="${index}">${kisEscapeHTML(section.example.problem)}</textarea>

            <label>Steps (one per line)</label>
            <textarea data-example-steps="${index}">${kisEscapeHTML(section.example.steps.join("\n"))}</textarea>

            <label>Answer</label>
            <input type="text"
              data-example-answer="${index}"
              value="${kisEscapeHTML(section.example.answer)}">

            <label>Explanation</label>
            <textarea data-example-explanation="${index}">${kisEscapeHTML(section.example.explanation)}</textarea>

            <button type="button"
              class="kis-remove-section"
              data-remove-example="${index}">
              Remove Example
            </button>
          ` : `
            <button type="button"
              data-add-example="${index}">
              Add Worked Example
            </button>
          `}

        </div>

        <button type="button"
          class="kis-remove-section"
          data-remove-section="${index}">
          Remove Section
        </button>

      </div>
    `).join("");

  kisAttachLessonEditorEvents();

}

function kisAttachLessonEditorEvents() {

  const editor =
    document.querySelector("#kis-lesson-content-editor");

  if (!editor || editor.dataset.eventsAttached === "true") return;

  editor.dataset.eventsAttached = "true";

  editor.addEventListener("input", event => {

    const target = event.target;

    if (target.id === "kis-legacy-lesson-text") {
      kisLessonEditorData.legacyText = target.value;
      return;
    }

    if (target.dataset.objectiveIndex !== undefined) {
      kisLessonEditorData.objectives[
        Number(target.dataset.objectiveIndex)
      ] = target.value;
    }

    if (target.dataset.sectionHeading !== undefined) {
      kisLessonEditorData.sections[
        Number(target.dataset.sectionHeading)
      ].heading = target.value;
    }

    if (target.dataset.paragraphSection !== undefined) {
      kisLessonEditorData.sections[
        Number(target.dataset.paragraphSection)
      ].paragraphs[
        Number(target.dataset.paragraphIndex)
      ] = target.value;
    }

    const sectionIndex = Number(
      target.dataset.exampleProblem ??
      target.dataset.exampleSteps ??
      target.dataset.exampleAnswer ??
      target.dataset.exampleExplanation
    );

    if (target.dataset.exampleProblem !== undefined) {
      kisLessonEditorData.sections[sectionIndex].example.problem =
        target.value;
    }

    if (target.dataset.exampleSteps !== undefined) {
      kisLessonEditorData.sections[sectionIndex].example.steps =
        target.value.split("\n");
    }

    if (target.dataset.exampleAnswer !== undefined) {
      kisLessonEditorData.sections[sectionIndex].example.answer =
        target.value;
    }

    if (target.dataset.exampleExplanation !== undefined) {
      kisLessonEditorData.sections[sectionIndex].example.explanation =
        target.value;
    }

  });

  editor.addEventListener("click", event => {

    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.addObjective !== undefined) {
      kisLessonEditorData.objectives.push("");
    }

    else if (button.dataset.removeObjective !== undefined) {
      kisLessonEditorData.objectives.splice(
        Number(button.dataset.removeObjective), 1
      );
    }

    else if (button.dataset.addSection !== undefined) {
      kisLessonEditorData.sections.push({
        heading: "",
        paragraphs: [""],
        example: null
      });
    }

    else if (button.dataset.removeSection !== undefined) {
      kisLessonEditorData.sections.splice(
        Number(button.dataset.removeSection), 1
      );
    }

    else if (button.dataset.addParagraph !== undefined) {
      kisLessonEditorData.sections[
        Number(button.dataset.addParagraph)
      ].paragraphs.push("");
    }

    else if (button.dataset.removeParagraph !== undefined) {
      kisLessonEditorData.sections[
        Number(button.dataset.removeParagraph)
      ].paragraphs.splice(
        Number(button.dataset.paragraphIndex), 1
      );
    }

    else if (button.dataset.addExample !== undefined) {
      kisLessonEditorData.sections[
        Number(button.dataset.addExample)
      ].example = {
        problem: "",
        steps: [""],
        answer: "",
        explanation: ""
      };
    }

    else if (button.dataset.removeExample !== undefined) {
      kisLessonEditorData.sections[
        Number(button.dataset.removeExample)
      ].example = null;
    }

    else {
      return;
    }

    kisRenderLessonContentEditor();

  });

  editor.addEventListener("click", event => {

    if (event.target.closest("#kis-add-objective")) {
      kisLessonEditorData.objectives.push("");
      kisRenderLessonContentEditor();
    }

    if (event.target.closest("#kis-add-section")) {
      kisLessonEditorData.sections.push({
        heading: "",
        paragraphs: [""],
        example: null
      });
      kisRenderLessonContentEditor();
    }

  });

}

/* =========================================
   KIS - READ VISUAL LESSON EDITOR
========================================= */

function kisReadLessonEditorContent() {

  const objectives = kisLessonEditorData.objectives
    .map(objective => String(objective).trim())
    .filter(Boolean);

  const sections = kisLessonEditorData.sections.map(section => {

    const result = {
      heading: String(section.heading || "").trim(),
      paragraphs: (section.paragraphs || [])
        .map(paragraph => String(paragraph).trim())
        .filter(Boolean)
    };

    if (section.example) {
      result.example = {
        problem: String(section.example.problem || "").trim(),
        steps: (section.example.steps || [])
          .map(step => String(step).trim())
          .filter(Boolean),
        answer: String(section.example.answer || "").trim(),
        explanation: String(section.example.explanation || "").trim()
      };
    }

    return result;

  }).filter(section =>
    section.heading ||
    section.paragraphs.length ||
    section.example
  );

  const legacyText =
    String(kisLessonEditorData.legacyText || "").trim();

  if (legacyText && (objectives.length || sections.length)) {
    sections.unshift({
      heading: "Original Lesson Text",
      paragraphs: [legacyText]
    });
  }

  if (!objectives.length && !sections.length) {
    return legacyText;
  }

  return {
    objectives,
    sections
  };

}


// =========================================
// KIS - PUBLISHED QUIZZES
// =========================================

async function kisRenderPublishedQuizzes() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");

  if (!main) {
    console.error("KIS page container was not found.");
    return;
  }

  main.innerHTML = `
    <section class="admin-manager">
      <h2>Published Quizzes</h2>
      <p>Manage quizzes currently available to students.</p>

      <button type="button" id="kis-back-published-quizzes" class="back-button">
        <i class="fa-solid fa-arrow-left"></i>
        Back to Admin Dashboard
      </button>

      <button type="button" id="kis-import-original-quizzes">
        Import Original Quizzes
      </button>

      <input
        type="search"
        id="kis-published-quiz-search"
        placeholder="Search published quizzes..."
      >

      <div id="kis-published-quiz-list">
        <p>Loading published quizzes...</p>
      </div>
    </section>
  `;

  document.querySelector("#kis-back-published-quizzes")
    .addEventListener("click", () => {
      kisRenderAdminDashboard();
    });

  document.querySelector("#kis-import-original-quizzes")
    .addEventListener("click", kisImportOriginalQuizzes);

  document.querySelector("#kis-published-quiz-search")
    .addEventListener("input", kisFilterPublishedQuizzes);

  await kisLoadPublishedQuizzes();
}



// =========================================
// KIS - IMPORT ORIGINAL LOCAL QUIZZES
// =========================================

async function kisImportOriginalQuizzes() {

  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!kisDb || !Array.isArray(kisLessons) || !kisLessonQuizzes) {
    alert("Quiz data or Firebase is not available.");
    return;
  }

  const originalIds = [3, 4, 5, 6, 7, 8, 17];

  const confirmed = confirm(
    "Import the 7 original KIS quizzes (50 questions) into Published Quizzes?\\n\\nExisting local quizzes will be skipped. Your original offline quiz data will not be changed."
  );

  if (!confirmed) return;

  try {

    const prepared = [];

    // Validate all original quizzes before writing anything.
    for (const id of originalIds) {

      const lesson = kisLessons.find(item => String(item.id) === String(id));
      const questions = kisLessonQuizzes[id];

      if (!lesson || !Array.isArray(questions) || questions.length === 0) {
        throw new Error("Original quiz data is missing for lesson " + id + ".");
      }

      const validQuestions = questions.every(question =>
        question &&
        typeof question.question === "string" &&
        question.question.trim() &&
        Array.isArray(question.choices) &&
        question.choices.length === 4 &&
        question.choices.every(choice =>
          typeof choice === "string" && choice.trim()
        ) &&
        Number.isInteger(question.correctAnswer) &&
        question.correctAnswer >= 0 &&
        question.correctAnswer <= 3
      );

      if (!validQuestions) {
        throw new Error(
          "The original quiz for " + lesson.title + " contains incomplete question data."
        );
      }

      prepared.push({
        id,
        lesson,
        questions: questions.map(question => ({
          question: question.question,
          choices: [...question.choices],
          correctAnswer: question.correctAnswer,
          explanation: question.explanation || ""
        }))
      });
    }

    const snapshot = await kisDb.collection("quizzes").get();

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const item of prepared) {

      const alreadyExists = snapshot.docs.some(doc => {
        const data = doc.data();

        return (
          data.lessonSource === "local" &&
          String(data.lessonId) === String(item.id)
        );
      });

      if (alreadyExists) {
        skipped++;
        continue;
      }

      const documentId = "original-local-quiz-" + item.id;
      const quizRef = kisDb.collection("quizzes").doc(documentId);

      try {

        const existingDocument = await quizRef.get();

        if (existingDocument.exists) {
          skipped++;
          continue;
        }

        const now = firebase.firestore.FieldValue.serverTimestamp();
        const currentUser = firebase.auth().currentUser;

        await quizRef.set({
          lessonId: String(item.id),
          lessonSource: "local",
          lessonTitle: item.lesson.title,
          subject: item.lesson.subject,
          questions: item.questions,
          status: "published",
          createdAt: now,
          updatedAt: now,
          publishedAt: now,
          updatedBy: currentUser ? currentUser.uid : null
        });

        imported++;

      } catch (error) {
        console.error("Original quiz import failed for lesson " + item.id, error);
        failed++;
      }
    }

    alert(
      "Original quiz import finished.\\n\\n" +
      "Imported: " + imported + "\\n" +
      "Skipped: " + skipped + "\\n" +
      "Failed: " + failed
    );

    await kisLoadPublishedQuizzes();

  } catch (error) {

    console.error("Original quiz import could not start:", error);
    alert("Import stopped: " + error.message);

  }
}

let kisPublishedQuizData = [];

async function kisLoadPublishedQuizzes() {

  const list = document.querySelector("#kis-published-quiz-list");
  if (!list) return;

  try {

    const snapshot = await kisDb.collection("quizzes")
      .where("status", "==", "published")
      .get();

    kisPublishedQuizData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    kisFilterPublishedQuizzes();

  } catch (error) {

    console.error("Loading published quizzes failed:", error);
    list.innerHTML = `
      <p>Unable to load published quizzes: ${kisEscapeHTML(error.message)}</p>
    `;

  }
}


function kisFilterPublishedQuizzes() {

  const list = document.querySelector("#kis-published-quiz-list");
  const searchInput = document.querySelector("#kis-published-quiz-search");

  if (!list || !searchInput) return;

  const search = searchInput.value.trim().toLowerCase();

  const filtered = kisPublishedQuizData.filter(quiz =>
    (quiz.lessonTitle || "Untitled Lesson").toLowerCase().includes(search) ||
    (quiz.subject || "").toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    list.innerHTML = `
      <p>No matching published quizzes found.</p>
    `;
    return;
  }

  list.innerHTML = filtered.map(quiz => `
    <div class="admin-dashboard-card">
      <h3>${kisEscapeHTML(quiz.lessonTitle || "Untitled Lesson")}</h3>
      <p>Subject: ${kisEscapeHTML(quiz.subject || "Not specified")}</p>
      <p>Questions: ${
        Array.isArray(quiz.questions) ? quiz.questions.length : 0
      }</p>
      <p>Status: <strong>Published</strong></p>

      <button
        type="button"
        data-kis-edit-published-quiz="${kisEscapeHTML(quiz.id)}">
        Edit Quiz
      </button>
    </div>
  `).join("");

  list.querySelectorAll("[data-kis-edit-published-quiz]")
    .forEach(button => {
      button.addEventListener("click", () => {
        kisRenderQuizEditor(button.dataset.kisEditPublishedQuiz, true);
      });
    });
}


// =========================================

// =========================================
// KIS STUDENT ACCOUNT APPROVAL MANAGER
// =========================================

async function kisRenderStudentAccountManager() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  main.innerHTML = `
    <section class="admin-manager">
      <h2>Student Account Manager</h2>
      <p>Review and manage student account registrations.</p>

      <button type="button" id="kis-back-student-accounts" class="back-button">
        Back to Admin Dashboard
      </button>

      <div id="kis-student-account-list">
        <p>Loading student registrations...</p>
      </div>
    </section>
  `;

  document.querySelector("#kis-back-student-accounts")
    .addEventListener("click", kisRenderAdminDashboard);

  await kisLoadStudentAccountRegistrations();
}


async function kisLoadStudentAccountRegistrations() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const list = document.querySelector("#kis-student-account-list");
  if (!list) return;

  try {
    const snapshot = await kisDb.collection("users")
      .where("status", "==", "pending")
      .get();

    const students = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(student => student.role === "student")
      .sort((a, b) =>
        String(a.fullName || "").localeCompare(String(b.fullName || ""))
      );

    if (!students.length) {
      list.innerHTML = `
        <div class="admin-dashboard-card">
          <h3>No Pending Registrations</h3>
          <p>There are currently no student accounts awaiting approval.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = `
      <div class="kis-admin-event-summary">
        <p><strong>Pending student registrations:</strong> ${students.length}</p>
      </div>

      ${students.map(student => {
        const number = String(student.studentNumber || "");
        const maskedNumber = number.length >= 4
          ? "••••••••" + number.slice(-4)
          : "Not provided";

        return `
          <div class="admin-dashboard-card">
            <h3>${kisCalendarAdminEscape(student.fullName || "Unnamed Student")}</h3>
            <p><strong>Student Number:</strong> ${kisCalendarAdminEscape(maskedNumber)}</p>
            <p><strong>Grade & Section:</strong> ${kisCalendarAdminEscape(student.gradeSection || "Not provided")}</p>
            <p><strong>Email:</strong> ${kisCalendarAdminEscape(student.email || "Not provided")}</p>

            <p>
              <span class="kis-badge kis-badge--warning kis-badge--small kis-badge--pill">
                Pending Approval
              </span>
            </p>

            <button type="button"
              data-kis-review-student="${kisCalendarAdminEscape(student.id)}"
              data-next-status="approved">
              Approve Account
            </button>

            <button type="button"
              data-kis-review-student="${kisCalendarAdminEscape(student.id)}"
              data-next-status="rejected">
              Reject Registration
            </button>
          </div>
        `;
      }).join("")}
    `;

    list.querySelectorAll("[data-kis-review-student]").forEach(button => {
      button.addEventListener("click", () => {
        kisReviewStudentAccount(
          button.dataset.kisReviewStudent,
          button.dataset.nextStatus
        );
      });
    });

  } catch (error) {
    console.error("Student account loading failed:", error);
    list.innerHTML = `
      <div class="admin-dashboard-card">
        <h3>Unable to Load Registrations</h3>
        <p>Check your Firebase connection and administrator permissions.</p>
      </div>
    `;
  }
}


async function kisReviewStudentAccount(userId, nextStatus) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!["approved", "rejected"].includes(nextStatus)) {
    alert("Invalid account status.");
    return;
  }

  const action = nextStatus === "approved" ? "approve" : "reject";

  if (!confirm(`Are you sure you want to ${action} this student registration?`)) {
    return;
  }

  try {
    const userRef = kisDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      alert("Student account not found.");
      return;
    }

    const student = userDoc.data();

    if (student.role !== "student" || student.status !== "pending") {
      alert("This registration is no longer pending. Refreshing the list.");
      await kisLoadStudentAccountRegistrations();
      return;
    }

    await userRef.update({
      status: nextStatus,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
      reviewedBy: kisAuth.currentUser.uid
    });

    alert(
      nextStatus === "approved"
        ? "Student account approved successfully."
        : "Student registration rejected."
    );

    await kisLoadStudentAccountRegistrations();

  } catch (error) {
    console.error("Student account review failed:", error);
    alert("Unable to update this student account. Check Firebase permissions.");
  }
}



// =========================================
// KIS PARENT AND TEACHER ACCOUNT MANAGERS
// =========================================

async function kisRenderParentAccountManager() {
  await kisRenderRoleAccountManager("parent");
}

async function kisRenderTeacherAccountManager() {
  await kisRenderRoleAccountManager("teacher");
}

async function kisRenderRoleAccountManager(role) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  const title = role === "parent"
    ? "Parent Account Manager"
    : "Teacher Account Manager";

  const description = role === "parent"
    ? "Review and manage parent account registrations."
    : "Review and manage teacher account registrations.";

  main.innerHTML = `
    <section class="admin-manager">
      <h2>${title}</h2>
      <p>${description}</p>

      <button type="button" id="kis-back-role-accounts"
              class="back-button">
        Back to Admin Dashboard
      </button>

      <div id="kis-role-account-list">
        <p>Loading registrations...</p>
      </div>
    </section>
  `;

  document.querySelector("#kis-back-role-accounts")
    .addEventListener("click", kisRenderAdminDashboard);

  await kisLoadRoleAccountRegistrations(role);
}

async function kisLoadRoleAccountRegistrations(role) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!["parent", "teacher"].includes(role)) return;

  const list = document.querySelector("#kis-role-account-list");
  if (!list) return;

  try {
    const snapshot = await kisDb.collection("users")
      .where("status", "==", "pending")
      .get();

    const accounts = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(account => account.role === role)
      .sort((a, b) =>
        String(a.fullName || "").localeCompare(String(b.fullName || ""))
      );

    if (!accounts.length) {
      list.innerHTML = `
        <div class="admin-dashboard-card">
          <h3>No Pending Registrations</h3>
          <p>There are currently no pending ${role} accounts.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = `
      <div class="kis-admin-event-summary">
        <p><strong>Pending ${role} registrations:</strong> ${accounts.length}</p>
      </div>

      ${accounts.map(account => {
        const details = role === "teacher"
          ? `
            <p><strong>Teacher Number:</strong>
              ${kisCalendarAdminEscape(account.teacherNumber || "Not provided")}
            </p>
            <p><strong>Teaching Role:</strong>
              ${kisCalendarAdminEscape(account.teachingRole || "Not provided")}
            </p>
            ${account.teachingRole === "Adviser" ? `
              <p><strong>Declared Advisory Section:</strong>
                ${kisCalendarAdminEscape(account.advisoryGradeSection || "Not provided")}
              </p>
            ` : ""}
          `
          : `
            <p>Child relationship requests must be reviewed separately.</p>
          `;

        return `
          <div class="admin-dashboard-card">
            <h3>${kisCalendarAdminEscape(account.fullName || "Unnamed Account")}</h3>
            <p><strong>Email:</strong>
              ${kisCalendarAdminEscape(account.email || "Not provided")}
            </p>
            ${details}

            <p>
              <span class="kis-badge kis-badge--warning kis-badge--small kis-badge--pill">
                Pending Approval
              </span>
            </p>

            <button type="button"
              data-kis-review-role="${kisCalendarAdminEscape(account.id)}"
              data-role="${role}"
              data-next-status="approved">
              Approve Account
            </button>

            <button type="button"
              data-kis-review-role="${kisCalendarAdminEscape(account.id)}"
              data-role="${role}"
              data-next-status="rejected">
              Reject Registration
            </button>
          </div>
        `;
      }).join("")}
    `;

    list.querySelectorAll("[data-kis-review-role]")
      .forEach(button => {
        button.addEventListener("click", () => {
          kisReviewRoleAccount(
            button.dataset.kisReviewRole,
            button.dataset.role,
            button.dataset.nextStatus
          );
        });
      });

  } catch (error) {
    console.error(`${role} account loading failed:`, error);
    list.innerHTML = `
      <div class="admin-dashboard-card">
        <h3>Unable to Load Registrations</h3>
        <p>Check your Firebase connection and administrator permissions.</p>
      </div>
    `;
  }
}

async function kisReviewRoleAccount(userId, role, nextStatus) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (
    !["parent", "teacher"].includes(role) ||
    !["approved", "rejected"].includes(nextStatus)
  ) {
    alert("Invalid account review request.");
    return;
  }

  const action = nextStatus === "approved" ? "approve" : "reject";

  if (!confirm(`Are you sure you want to ${action} this ${role} account?`)) {
    return;
  }

  try {
    const userRef = kisDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      alert("Account not found.");
      return;
    }

    const account = userDoc.data();

    if (account.role !== role || account.status !== "pending") {
      alert("This registration is no longer pending. Refreshing the list.");
      await kisLoadRoleAccountRegistrations(role);
      return;
    }

    await userRef.update({
      status: nextStatus,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
      reviewedBy: kisAuth.currentUser.uid
    });

    alert(
      nextStatus === "approved"
        ? `${role} account approved successfully.`
        : `${role} registration rejected.`
    );

    await kisLoadRoleAccountRegistrations(role);

  } catch (error) {
    console.error(`${role} account review failed:`, error);
    alert("Unable to update this account. Check Firebase permissions.");
  }
}


// =========================================
// KIS PARENT-CHILD REQUEST MANAGER
// =========================================

async function kisRenderParentChildRequestManager() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  main.innerHTML = `
    <section class="admin-manager">
      <h2>Parent–Child Requests</h2>
      <p>Review claimed student relationships before granting access.</p>

      <button type="button" id="kis-back-parent-child-requests"
              class="back-button">
        Back to Admin Dashboard
      </button>

      <button type="button" id="kis-repair-parent-child-links">
        Repair Existing Approved Links
      </button>

      <div id="kis-parent-child-request-list">
        <p>Loading Parent–Child requests...</p>
      </div>
    </section>
  `;

  document.querySelector("#kis-back-parent-child-requests")
    .addEventListener("click", kisRenderAdminDashboard);

  document.querySelector("#kis-repair-parent-child-links")
    .addEventListener("click", kisRepairExistingParentChildLinks);

  await kisLoadParentChildRequests();
}

async function kisRepairExistingParentChildLinks() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!confirm(
    "Repair existing approved Parent–Child links? Only verified display fields will be updated."
  )) return;

  const button = document.querySelector("#kis-repair-parent-child-links");
  if (button) button.disabled = true;

  let repaired = 0;
  let skipped = 0;
  let failed = 0;

  try {
    const requests = await kisDb.collection("parentChildRequests")
      .where("status", "==", "approved")
      .get();

    for (const requestDoc of requests.docs) {
      try {
        const request = requestDoc.data();

        if (
          !request.parentUid ||
          !request.childUid ||
          !request.childStudentNumber ||
          !request.childGradeSection
        ) {
          skipped++;
          continue;
        }

        const parentRef = kisDb.collection("users").doc(request.parentUid);
        const studentRef = kisDb.collection("users").doc(request.childUid);
        const linkRef = kisDb.collection("parentLinks")
          .doc(`${request.parentUid}_${request.childUid}`);

        const [parentDoc, studentDoc, linkDoc] = await Promise.all([
          parentRef.get(),
          studentRef.get(),
          linkRef.get()
        ]);

        if (!parentDoc.exists || !studentDoc.exists || !linkDoc.exists) {
          skipped++;
          continue;
        }

        const parent = parentDoc.data();
        const student = studentDoc.data();
        const link = linkDoc.data();

        if (
          parent.role !== "parent" ||
          parent.status !== "approved" ||
          student.role !== "student" ||
          student.status !== "approved" ||
          student.studentNumber !== request.childStudentNumber ||
          student.gradeSection !== request.childGradeSection ||
          link.parentUid !== request.parentUid ||
          link.childUid !== request.childUid ||
          link.status !== "active" ||
          !student.fullName ||
          !student.gradeSection
        ) {
          skipped++;
          continue;
        }

        await linkRef.update({
          childName: student.fullName,
          gradeSection: student.gradeSection
        });

        repaired++;
      } catch (error) {
        console.error("Parent–Child link repair item failed:", error);
        failed++;
      }
    }

    alert(
      "Repair finished.\nRepaired: " + repaired +
      "\nSkipped: " + skipped +
      "\nFailed: " + failed
    );

  } catch (error) {
    console.error("Parent–Child link repair failed:", error);
    alert("Repair failed. Check the Firebase connection and permissions.");
  } finally {
    const currentButton = document.querySelector(
      "#kis-repair-parent-child-links"
    );
    if (currentButton) currentButton.disabled = false;
  }
}

async function kisLoadParentChildRequests() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const list = document.querySelector("#kis-parent-child-request-list");
  if (!list) return;

  try {
    const snapshot = await kisDb.collection("parentChildRequests")
      .where("status", "==", "pending")
      .get();

    const requests = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return aTime - bTime;
      });

    if (!requests.length) {
      list.innerHTML = `
        <div class="admin-dashboard-card">
          <h3>No Pending Requests</h3>
          <p>There are currently no Parent–Child requests awaiting review.</p>
        </div>
      `;
      return;
    }

    const cards = await Promise.all(requests.map(async request => {
      let parentName = "Unavailable";
      let parentStatus = "unknown";

      try {
        const parentDoc = await kisDb.collection("users")
          .doc(request.parentUid)
          .get();

        if (parentDoc.exists) {
          const parent = parentDoc.data();
          parentName = parent.fullName || "Unnamed Parent";
          parentStatus = parent.status || "unknown";
        }
      } catch (error) {
        console.error("Parent profile lookup failed:", error);
      }

      return `
        <div class="admin-dashboard-card">
          <h3>${kisCalendarAdminEscape(parentName)}</h3>

          <p><strong>Parent Account Status:</strong>
            ${kisCalendarAdminEscape(parentStatus)}
          </p>

          <p><strong>Student Number:</strong>
            •••••••••${kisCalendarAdminEscape(
              String(request.childStudentNumber || "").slice(-3)
            )}
          </p>

          <p><strong>Claimed Grade &amp; Section:</strong>
            ${kisCalendarAdminEscape(request.childGradeSection || "Not provided")}
          </p>

          <p><strong>Request Status:</strong> Pending</p>

          <button type="button"
            data-kis-review-parent-child="${kisCalendarAdminEscape(request.id)}"
            data-next-status="approved">
            Verify and Approve
          </button>

          <button type="button"
            data-kis-review-parent-child="${kisCalendarAdminEscape(request.id)}"
            data-next-status="rejected">
            Reject Request
          </button>
        </div>
      `;
    }));

    list.innerHTML = cards.join("");

    list.querySelectorAll("[data-kis-review-parent-child]")
      .forEach(button => {
        button.addEventListener("click", () => {
          kisReviewParentChildRequest(
            button.dataset.kisReviewParentChild,
            button.dataset.nextStatus
          );
        });
      });

  } catch (error) {
    console.error("Parent–Child requests loading failed:", error);
    list.innerHTML = `
      <div class="admin-dashboard-card">
        <h3>Unable to Load Requests</h3>
        <p>Check Firestore permissions and your Firebase connection.</p>
      </div>
    `;
  }
}


async function kisReviewParentChildRequest(requestId, nextStatus) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!["approved", "rejected"].includes(nextStatus)) {
    alert("Invalid Parent–Child request status.");
    return;
  }

  const action = nextStatus === "approved" ? "approve" : "reject";

  if (!confirm(`Are you sure you want to ${action} this Parent–Child request?`)) {
    return;
  }

  try {
    const requestRef = kisDb.collection("parentChildRequests")
      .doc(requestId);

    if (nextStatus === "rejected") {
      await kisDb.runTransaction(async transaction => {
        const requestDoc = await transaction.get(requestRef);

        if (!requestDoc.exists) {
          throw new Error("REQUEST_NOT_FOUND");
        }

        if (requestDoc.data().status !== "pending") {
          throw new Error("REQUEST_NOT_PENDING");
        }

        transaction.update(requestRef, {
          status: "rejected",
          reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
          reviewedBy: kisAuth.currentUser.uid
        });
      });
    } else {
      // Read the request first, outside the transaction.
      const initialRequestDoc = await requestRef.get();

      if (!initialRequestDoc.exists) {
        throw new Error("REQUEST_NOT_FOUND");
      }

      const request = initialRequestDoc.data();

      if (request.status !== "pending") {
        throw new Error("REQUEST_NOT_PENDING");
      }

      if (
        typeof request.parentUid !== "string" ||
        typeof request.childStudentNumber !== "string" ||
        typeof request.childGradeSection !== "string"
      ) {
        throw new Error("INVALID_REQUEST_DATA");
      }

      // Queries are performed outside the transaction.
      const studentSnapshot = await kisDb.collection("users")
        .where("studentNumber", "==", request.childStudentNumber)
        .get();

      if (studentSnapshot.size !== 1) {
        throw new Error("STUDENT_NOT_UNIQUE");
      }

      const studentRef = studentSnapshot.docs[0].ref;
      const parentRef = kisDb.collection("users")
        .doc(request.parentUid);

      const childUid = studentRef.id;

      const linkRef = kisDb.collection("parentLinks")
        .doc(`${request.parentUid}_${childUid}`);

      // Transaction reads use document references only.
      await kisDb.runTransaction(async transaction => {
        const currentRequest = await transaction.get(requestRef);
        const parentDoc = await transaction.get(parentRef);
        const studentDoc = await transaction.get(studentRef);
        const existingLink = await transaction.get(linkRef);

        if (!currentRequest.exists) {
          throw new Error("REQUEST_NOT_FOUND");
        }

        if (currentRequest.data().status !== "pending") {
          throw new Error("REQUEST_NOT_PENDING");
        }

        if (!parentDoc.exists) {
          throw new Error("PARENT_NOT_FOUND");
        }

        const parent = parentDoc.data();

        if (parent.role !== "parent" || parent.status !== "approved") {
          throw new Error("PARENT_NOT_APPROVED");
        }

        if (!studentDoc.exists) {
          throw new Error("STUDENT_NOT_FOUND");
        }

        const student = studentDoc.data();

        if (
          student.role !== "student" ||
          student.status !== "approved"
        ) {
          throw new Error("STUDENT_NOT_APPROVED");
        }

        if (student.studentNumber !== request.childStudentNumber) {
          throw new Error("STUDENT_NUMBER_MISMATCH");
        }

        if (student.gradeSection !== request.childGradeSection) {
          throw new Error("GRADE_SECTION_MISMATCH");
        }

        if (existingLink.exists) {
          throw new Error("LINK_ALREADY_EXISTS");
        }

        // All transaction reads are complete. Now perform writes.
        transaction.set(linkRef, {
          parentUid: request.parentUid,
          childUid,
          childName: student.fullName,
          gradeSection: student.gradeSection,
          status: "active",
          requestId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: kisAuth.currentUser.uid
        });

        transaction.update(requestRef, {
          status: "approved",
          childUid,
          reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
          reviewedBy: kisAuth.currentUser.uid
        });
      });
    }

    alert(
      nextStatus === "approved"
        ? "Parent–Child relationship verified and approved."
        : "Parent–Child request rejected."
    );

    await kisLoadParentChildRequests();

  } catch (error) {
    console.error("Parent–Child request review failed:", {
      code: error.code,
      message: error.message,
      name: error.name,
      details: error
    });

    const messages = {
      REQUEST_NOT_FOUND: "Request not found.",
      REQUEST_NOT_PENDING: "This request is no longer pending.",
      INVALID_REQUEST_DATA: "The request contains invalid information.",
      PARENT_NOT_FOUND: "Parent account not found.",
      PARENT_NOT_APPROVED: "Approve the Parent account before approving this child link.",
      STUDENT_NOT_UNIQUE: "No unique Student account matches that Student Number.",
      STUDENT_NOT_FOUND: "Student account not found.",
      STUDENT_NOT_APPROVED: "The matching Student account is not approved.",
      STUDENT_NUMBER_MISMATCH: "The Student Number does not match the request.",
      GRADE_SECTION_MISMATCH: "The Grade & Section does not match the Student profile.",
      LINK_ALREADY_EXISTS: "This Parent–Child relationship already exists."
    };

    alert(
      "ERROR CODE: " + (error.code || "none") +
      "\nERROR MESSAGE: " + (error.message || "Unknown error")
    );

    await kisLoadParentChildRequests();
  }
}


// KIS CALENDAR EVENT MANAGER
// =========================================

function kisCalendarAdminEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function kisCalendarCategoryType(category) {
  if (category === "Classes" || category === "Examination") return "class";
  if (category === "Meeting" || category === "Deadline") return "parent";
  return "school";
}

async function kisRenderCalendarEventManager() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  main.innerHTML = `
    <section class="admin-manager">
      <h2>Calendar Event Manager</h2>
      <p>Create and manage official KIS calendar events.</p>

      <button type="button" id="kis-create-calendar-event">
        Add New Event
      </button>

      <button type="button" id="kis-back-calendar-admin" class="back-button">
        Back to Admin Dashboard
      </button>

      <div id="kis-calendar-admin-list">
        <p>Loading calendar events...</p>
      </div>
    </section>
  `;

  document.querySelector("#kis-back-calendar-admin")
    .addEventListener("click", kisRenderAdminDashboard);

  document.querySelector("#kis-create-calendar-event")
    .addEventListener("click", () => kisRenderCalendarEventEditor());

  await kisLoadAdminCalendarEvents();
}


async function kisLoadAdminCalendarEvents() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const list = document.querySelector("#kis-calendar-admin-list");
  if (!list) return;

  try {
    const snapshot = await kisDb.collection("calendarEvents").get();

    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    events.sort((a, b) =>
      String(a.date || "").localeCompare(String(b.date || "")) ||
      String(a.title || "").localeCompare(String(b.title || ""))
    );

    if (!events.length) {
      list.innerHTML = "<p>No calendar events yet. Add your first event.</p>";
      return;
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());

    const upcoming = events.filter(event => event.date >= today);
const past = events.filter(event =>
  /^\d{4}-\d{2}-\d{2}$/.test(event.date || "") && event.date < today
);
const unscheduled = events.filter(event =>
  !/^\d{4}-\d{2}-\d{2}$/.test(event.date || "")
);

    const renderEvent = event => `
      <div class="admin-dashboard-card">
        <h3>${kisCalendarAdminEscape(event.title || "Untitled Event")}</h3>
        <p><strong>Date:</strong> ${kisCalendarAdminEscape(event.date || "Not set")}</p>
        <p><strong>Category:</strong> ${kisCalendarAdminEscape(event.category || "Other")}</p>
        <p><strong>Status:</strong> ${kisCalendarAdminEscape(event.status || "draft")}</p>
        <p>${kisCalendarAdminEscape(event.description || "")}</p>

        <button type="button"
          data-kis-edit-calendar-event="${kisCalendarAdminEscape(event.id)}">
          Edit Event
        </button>

        <button type="button"
          data-kis-toggle-calendar-event="${kisCalendarAdminEscape(event.id)}"
          data-next-status="${event.status === "published" ? "draft" : "published"}">
          ${event.status === "published" ? "Unpublish" : "Publish"}
        </button>

        <button type="button"
          data-kis-delete-calendar-event="${kisCalendarAdminEscape(event.id)}">
          Delete Event
        </button>
      </div>
    `;

    const renderGroup = (title, groupEvents) => `
      <section class="kis-admin-event-group">
        <h3>${title} (${groupEvents.length})</h3>
        ${
          groupEvents.length
            ? groupEvents.map(renderEvent).join("")
            : "<p>No events in this section.</p>"
        }
      </section>
    `;

    list.innerHTML = `
      <div class="kis-admin-event-summary">
        <p><strong>Total events:</strong> ${events.length}</p>
        <p><strong>Upcoming:</strong> ${upcoming.length}</p>
        <p><strong>Past:</strong> ${past.length}</p>
<p><strong>Unscheduled:</strong> ${unscheduled.length}</p>
      </div>

      ${renderGroup("Upcoming & Today's Events", upcoming)}
      ${renderGroup("Past Events", past)}
${renderGroup("Unscheduled Events", unscheduled)}
    `;

    list.querySelectorAll("[data-kis-edit-calendar-event]").forEach(button => {
      button.addEventListener("click", () => {
        kisRenderCalendarEventEditor(button.dataset.kisEditCalendarEvent);
      });
    });

    list.querySelectorAll("[data-kis-toggle-calendar-event]").forEach(button => {
      button.addEventListener("click", () => {
        kisSetCalendarEventStatus(
          button.dataset.kisToggleCalendarEvent,
          button.dataset.nextStatus
        );
      });
    });

    list.querySelectorAll("[data-kis-delete-calendar-event]").forEach(button => {
      button.addEventListener("click", () => {
        kisDeleteCalendarEvent(button.dataset.kisDeleteCalendarEvent);
      });
    });

  } catch (error) {
    console.error("Calendar event loading failed:", error);
    list.innerHTML = `
      <p>Unable to load calendar events. Check your Firebase connection and permissions.</p>
    `;
  }
}


async function kisRenderCalendarEventEditor(eventId = null) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  let eventData = {};

  if (eventId) {
    try {
      const doc = await kisDb.collection("calendarEvents").doc(eventId).get();

      if (!doc.exists) {
        alert("This calendar event could not be found.");
        kisRenderCalendarEventManager();
        return;
      }

      eventData = doc.data();
    } catch (error) {
      console.error("Calendar event retrieval failed:", error);
      alert("Unable to open this event.");
      return;
    }
  }

  const categories = [
    "Classes",
    "Meeting",
    "School Activity",
    "Holiday",
    "Examination",
    "Deadline",
    "Other"
  ];

  main.innerHTML = `
    <section class="admin-manager">
      <h2>${eventId ? "Edit Calendar Event" : "Create Calendar Event"}</h2>

      <form id="kis-calendar-event-form">
        <label for="kis-calendar-event-title">Event Title</label>
        <input id="kis-calendar-event-title" type="text"
          maxlength="120" required
          value="${kisCalendarAdminEscape(eventData.title || "")}">

        <label for="kis-calendar-event-date">Event Date</label>
        <input id="kis-calendar-event-date" type="date"
          required value="${kisCalendarAdminEscape(eventData.date || "")}">

        <label for="kis-calendar-event-category">Category</label>
        <select id="kis-calendar-event-category" required>
          ${categories.map(category => `
            <option value="${category}"
              ${eventData.category === category ? "selected" : ""}>
              ${category}
            </option>
          `).join("")}
        </select>

        <label for="kis-calendar-event-description">Description</label>
        <textarea id="kis-calendar-event-description"
          maxlength="1000" rows="5" required>${kisCalendarAdminEscape(eventData.description || "")}</textarea>

        <label for="kis-calendar-event-status">Publication Status</label>
        <select id="kis-calendar-event-status">
          <option value="draft" ${eventData.status !== "published" ? "selected" : ""}>Draft</option>
          <option value="published" ${eventData.status === "published" ? "selected" : ""}>Published</option>
        </select>

        <p id="kis-calendar-event-message" role="status"></p>

        <button type="submit">Save Event</button>
        <button type="button" id="kis-cancel-calendar-event" class="back-button">Cancel</button>
      </form>
    </section>
  `;

  document.querySelector("#kis-cancel-calendar-event")
    .addEventListener("click", kisRenderCalendarEventManager);

  document.querySelector("#kis-calendar-event-form")
    .addEventListener("submit", async event => {
      event.preventDefault();

      if (!kisIsAdmin()) {
        alert("Administrator access required.");
        return;
      }

      const title = document.querySelector("#kis-calendar-event-title").value.trim();
      const date = document.querySelector("#kis-calendar-event-date").value;
      const category = document.querySelector("#kis-calendar-event-category").value;
      const description = document.querySelector("#kis-calendar-event-description").value.trim();
      const status = document.querySelector("#kis-calendar-event-status").value;
      const message = document.querySelector("#kis-calendar-event-message");

      if (!title || !date || !category || !description) {
        message.textContent = "Please complete all required fields.";
        return;
      }

      message.textContent = "Saving event...";

      const eventRecord = {
        title,
        date,
        category,
        type: kisCalendarCategoryType(category),
        description,
        status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: kisAuth.currentUser.uid
      };

      if (status === "published" && eventData.status !== "published") {
        eventRecord.publishedAt =
          firebase.firestore.FieldValue.serverTimestamp();
      }

      try {
        if (eventId) {
          await kisDb.collection("calendarEvents")
            .doc(eventId)
            .set(eventRecord, { merge: true });
        } else {
          eventRecord.createdAt =
            firebase.firestore.FieldValue.serverTimestamp();

          await kisDb.collection("calendarEvents").add(eventRecord);
        }

        alert(status === "published"
          ? "Calendar event published successfully!"
          : "Calendar event saved as draft!");

        await kisRenderCalendarEventManager();

      } catch (error) {
        console.error("Calendar event save failed:", error);
        message.textContent = "Unable to save event. Check Firebase permissions.";
      }
    });
}

async function kisSetCalendarEventStatus(eventId, status) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!["draft", "published"].includes(status)) return;

  try {
    const update = {
      status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: kisAuth.currentUser.uid
    };

    if (status === "published") {
      update.publishedAt =
        firebase.firestore.FieldValue.serverTimestamp();
    }

    await kisDb.collection("calendarEvents").doc(eventId).update(update);
    await kisLoadAdminCalendarEvents();

  } catch (error) {
    console.error("Calendar event status update failed:", error);
    alert("Unable to update event status.");
  }
}

async function kisDeleteCalendarEvent(eventId) {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  if (!confirm("Delete this calendar event permanently?")) return;

  try {
    await kisDb.collection("calendarEvents").doc(eventId).delete();
    await kisLoadAdminCalendarEvents();
  } catch (error) {
    console.error("Calendar event deletion failed:", error);
    alert("Unable to delete this event.");
  }
}

// =========================================
// KIS - CENTRAL USER MANAGEMENT DIRECTORY
// =========================================

window.kisAdminUserDirectory = [];

async function kisRenderUserManagement() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const main = document.querySelector("#kis-page-container");
  if (!main) return;

  main.innerHTML = `
    <section class="admin-manager">

      <h2>User Management</h2>
      <p>Central directory of registered KIS Campus accounts.</p>

      <button
        type="button"
        id="kis-back-user-management"
        class="back-button">
        Back to Admin Dashboard
      </button>

      <div id="kis-user-management-summary">
        <p>Loading account summary...</p>
      </div>

      <div class="admin-user-filters">

        <input
          type="search"
          id="kis-user-search"
          placeholder="Search name, email, or account number"
          autocomplete="off">

        <select id="kis-user-role-filter">
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="parent">Parents</option>
        </select>

        <select id="kis-user-status-filter">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>

      </div>

      <div id="kis-user-management-list">
        <p>Loading registered users...</p>
      </div>

    </section>
  `;

  document.querySelector("#kis-back-user-management")
    .addEventListener("click", kisRenderAdminDashboard);

  document.querySelector("#kis-user-search")
    .addEventListener("input", kisFilterUserManagementDirectory);

  document.querySelector("#kis-user-role-filter")
    .addEventListener("change", kisFilterUserManagementDirectory);

  document.querySelector("#kis-user-status-filter")
    .addEventListener("change", kisFilterUserManagementDirectory);

  await kisLoadUserManagementDirectory();
}


async function kisLoadUserManagementDirectory() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const list = document.querySelector("#kis-user-management-list");
  if (!list) return;

  list.innerHTML = "<p>Loading registered users...</p>";

  try {
    const snapshot = await kisDb.collection("users").get();

    window.kisAdminUserDirectory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    kisFilterUserManagementDirectory();

  } catch (error) {
    console.error("User directory loading failed:", error);

    list.innerHTML =
      "<p>Unable to load registered users. Please try again.</p>";
  }
}


function kisFilterUserManagementDirectory() {
  if (!kisIsAdmin()) {
    kisRenderAdminLogin();
    return;
  }

  const list = document.querySelector("#kis-user-management-list");
  const summary = document.querySelector("#kis-user-management-summary");
  const searchInput = document.querySelector("#kis-user-search");
  const roleFilter = document.querySelector("#kis-user-role-filter");
  const statusFilter = document.querySelector("#kis-user-status-filter");

  if (!list || !summary || !searchInput || !roleFilter || !statusFilter) {
    return;
  }

  const users = window.kisAdminUserDirectory || [];

  const search = searchInput.value.trim().toLowerCase();
  const selectedRole = roleFilter.value;
  const selectedStatus = statusFilter.value;

  const counts = {
    total: users.length,
    student: users.filter(user => user.role === "student").length,
    teacher: users.filter(user => user.role === "teacher").length,
    parent: users.filter(user => user.role === "parent").length,
    pending: users.filter(user => user.status === "pending").length,
    approved: users.filter(user => user.status === "approved").length,
    rejected: users.filter(user => user.status === "rejected").length,
    suspended: users.filter(user => user.status === "suspended").length
  };

  summary.innerHTML = `
    <div class="admin-dashboard">
      <div class="admin-dashboard-card">
        <h3>Total Accounts</h3>
        <p>${counts.total}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Students</h3>
        <p>${counts.student}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Teachers</h3>
        <p>${counts.teacher}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Parents</h3>
        <p>${counts.parent}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Pending</h3>
        <p>${counts.pending}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Approved</h3>
        <p>${counts.approved}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Rejected</h3>
        <p>${counts.rejected}</p>
      </div>

      <div class="admin-dashboard-card">
        <h3>Suspended</h3>
        <p>${counts.suspended}</p>
      </div>
    </div>
  `;

  const filtered = users.filter(user => {
    const roleMatches =
      selectedRole === "all" || user.role === selectedRole;

    const statusMatches =
      selectedStatus === "all" || user.status === selectedStatus;

    const searchableText = [
      user.fullName,
      user.email,
      user.studentNumber,
      user.teacherNumber
    ].join(" ").toLowerCase();

    return roleMatches &&
      statusMatches &&
      searchableText.includes(search);
  });

  if (!filtered.length) {
    list.innerHTML = "<p>No matching accounts found.</p>";
    return;
  }

  list.innerHTML = filtered.map(user => {
    const role = kisCalendarAdminEscape(user.role || "Unknown");
    const name = kisCalendarAdminEscape(user.fullName || "Name unavailable");
    const email = kisCalendarAdminEscape(user.email || "Email unavailable");
    const status = kisCalendarAdminEscape(user.status || "Unknown");

    let identifier = "Not provided";

    if (user.role === "student" && user.studentNumber) {
      identifier = "••••••••" + String(user.studentNumber).slice(-4);
    } else if (user.role === "teacher" && user.teacherNumber) {
      const number = String(user.teacherNumber);
      identifier = "••••" + number.slice(-Math.min(4, number.length));
    }

    return `
      <div class="admin-dashboard-card">

        <h3>${name}</h3>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Account Number:</strong>
          ${kisCalendarAdminEscape(identifier)}
        </p>

        <button
          type="button"
          class="admin-action-button"
          data-kis-view-user="${kisCalendarAdminEscape(user.id)}">
          View Profile
        </button>

      </div>
    `;
  }).join("");

  list.querySelectorAll("[data-kis-view-user]").forEach(button => {
    button.addEventListener("click", () => {
      kisViewUserProfile(button.dataset.kisViewUser);
    });
  });
}

