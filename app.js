
/* =========================================
   KIS APPLICATION - NAVIGATION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const main = document.querySelector(".main-content");
  const navItems = document.querySelectorAll(".nav-item");

  // Current authenticated Campus account
  window.kisCampusUser = window.kisCampusUser || null;

  // =========================================
  // KIS STUDENT DASHBOARD
  // =========================================

  function kisRenderStudentDashboard(profile) {
    const name = kisCalendarEscape(profile.fullName || "Student");
    const grade = kisCalendarEscape(profile.gradeSection || "Grade and section not provided");

    return `
      <section class="app-page kis-student-dashboard">

        <div class="welcome-section">
          <div class="welcome-text">
            <p class="eyebrow">STUDENT DASHBOARD</p>
            <h2>Welcome, ${name}!</h2>
            <p>${grade}</p>
          </div>
          <div class="welcome-decoration">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Quick Access</h2>
              <p>Your student services.</p>
            </div>
            <span class="section-label">STUDENT</span>
          </div>

          <div class="dashboard-grid">
            <article class="dashboard-card" data-feature="Learning Center">
              <div class="card-icon"><i class="fa-solid fa-book-open"></i></div>
              <h3>Learning Center</h3>
              <p>Lessons and learning materials</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Attendance">
              <div class="card-icon"><i class="fa-solid fa-calendar-check"></i></div>
              <h3>Attendance</h3>
              <p>View attendance records</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Academic Records">
              <div class="card-icon"><i class="fa-solid fa-chart-column"></i></div>
              <h3>Academic Records</h3>
              <p>Grades and performance</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Announcements">
              <div class="card-icon"><i class="fa-solid fa-bullhorn"></i></div>
              <h3>Announcements</h3>
              <p>Latest school updates</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Learning Resources</h2>
              <p>Continue your learning journey.</p>
            </div>
            <span class="section-label">LEARN</span>
          </div>

          <div class="dashboard-grid">
            <article class="dashboard-card" data-feature="Lessons">
              <div class="card-icon"><i class="fa-solid fa-book-open"></i></div>
              <h3>Lessons</h3>
              <p>Digital lessons and modules</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Subjects">
              <div class="card-icon"><i class="fa-solid fa-book"></i></div>
              <h3>Subjects</h3>
              <p>Explore your subjects</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Quizzes">
              <div class="card-icon"><i class="fa-solid fa-clipboard-question"></i></div>
              <h3>Quizzes</h3>
              <p>Practice your knowledge</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>

            <article class="dashboard-card" data-feature="Reviewers">
              <div class="card-icon"><i class="fa-solid fa-file-lines"></i></div>
              <h3>Reviewers</h3>
              <p>Study materials and guides</p>
              <i class="fa-solid fa-arrow-right card-arrow"></i>
            </article>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Account</h2>
              <p>Your Campus session.</p>
            </div>
          </div>

          <button type="button" class="kis-role-button" id="kis-campus-signout">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Sign Out</span>
          </button>
        </div>

      </section>
    `;
  }



  // =========================================
  // =========================================
  // KIS PARENT DASHBOARD
  // =========================================

  function kisRenderParentDashboard(profile) {
    const name = kisCalendarEscape(profile.fullName || "Parent");

    return `
      <section class="app-page kis-parent-dashboard">

        <div class="welcome-section">
          <div class="welcome-text">
            <p class="eyebrow">PARENT DASHBOARD</p>
            <h2>Welcome, ${name}!</h2>
            <p>Stay connected with your children's school progress.</p>
          </div>
          <div class="welcome-decoration">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>My Children</h2>
              <p>View your verified parent-child connections.</p>
            </div>
            <span class="section-label">FAMILY</span>
          </div>

          <div id="kis-parent-linked-children" class="detail-panel">
            <p>Verified linked children will appear here.</p>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>School Updates</h2>
              <p>Stay informed about your children's education.</p>
            </div>
          </div>

          <div class="dashboard-grid">
            <article class="dashboard-card" data-kis-parent-page="attendance">
              <div class="card-icon">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <h3>Attendance</h3>
              <p>View your children's attendance.</p>
            </article>

            <article class="dashboard-card" data-kis-parent-page="academic">
              <div class="card-icon">
                <i class="fa-solid fa-chart-column"></i>
              </div>
              <h3>Academic Progress</h3>
              <p>Follow academic updates.</p>
            </article>

            <article class="dashboard-card" data-kis-parent-page="announcements">
              <div class="card-icon">
                <i class="fa-solid fa-bullhorn"></i>
              </div>
              <h3>Announcements</h3>
              <p>Read important school updates.</p>
            </article>
          </div>
        </div>

      </section>
    `;
  }

  // =========================================
  // KIS TEACHER DASHBOARD
  // =========================================

  function kisRenderTeacherDashboard(profile) {
    const name = kisCalendarEscape(profile.fullName || "Teacher");
    const teachingRole = kisCalendarEscape(
      profile.teachingRole || "Teaching role not provided"
    );

    return `
      <section class="app-page kis-teacher-dashboard">

        <div class="welcome-section">
          <div class="welcome-text">
            <p class="eyebrow">TEACHER DASHBOARD</p>
            <h2>Welcome, ${name}!</h2>
            <p>${teachingRole}</p>
          </div>
          <div class="welcome-decoration">
            <i class="fa-solid fa-chalkboard-user"></i>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Teaching Assignments</h2>
              <p>Your administrator-approved classes.</p>
            </div>
            <span class="section-label">TEACHING</span>
          </div>

          <div id="kis-teacher-assignments" class="detail-panel">
            <p>Approved teaching assignments will appear here.</p>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Teaching Tools</h2>
              <p>Tools for your assigned classes.</p>
            </div>
          </div>

          <div class="dashboard-grid">
            <article class="dashboard-card" data-kis-teacher-page="classes">
              <div class="card-icon">
                <i class="fa-solid fa-users"></i>
              </div>
              <h3>My Classes</h3>
              <p>View your approved class assignments.</p>
            </article>

            <article class="dashboard-card" data-kis-teacher-page="attendance">
              <div class="card-icon">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <h3>Class Attendance</h3>
              <p>Manage attendance for assigned classes.</p>
            </article>

            <article class="dashboard-card" data-kis-teacher-page="announcements">
              <div class="card-icon">
                <i class="fa-solid fa-bullhorn"></i>
              </div>
              <h3>Announcements</h3>
              <p>Read important school updates.</p>
            </article>
          </div>
        </div>

      </section>
    `;
  }

  // KIS STUDENT PROFILE
  // =========================================

  function kisRenderStudentProfile(profile) {
    const name = kisCalendarEscape(profile.fullName || "Not provided");
    const grade = kisCalendarEscape(profile.gradeSection || "Not provided");
    const email = kisCalendarEscape(profile.email || "Not provided");

    const studentNumber = String(profile.studentNumber || "");
    const maskedNumber = studentNumber.length >= 4
      ? "••••••••" + kisCalendarEscape(studentNumber.slice(-4))
      : "Not available";

    return `
      <section class="app-page kis-student-profile">

        <button class="back-button" id="kis-back">
          <i class="fa-solid fa-arrow-left"></i>
          Back
        </button>

<div class="kis-profile-hero">

  <button type="button"
    class="kis-digital-id-trigger"
    id="kis-open-digital-id"
    aria-label="Open Digital Learner ID"
    title="Digital Learner ID">
    <i class="fa-solid fa-qrcode"></i>
  </button>

  <div class="kis-profile-avatar">
    <i class="fa-solid fa-user"></i>
  </div>

  <h2>${name}</h2>
  <p>${grade} · Student</p>

  <span class="kis-profile-status">
    <i class="fa-solid fa-circle-check"></i>
    Approved Account
  </span>

</div>

        <div id="kis-digital-id-panel"
          class="detail-panel kis-digital-id-panel"
          hidden
          role="dialog"
          aria-labelledby="kis-digital-id-title">

          <h3 id="kis-digital-id-title">
            <i class="fa-solid fa-qrcode"></i>
            Digital Learner ID
          </h3>

          <p>Student QR Code</p>

          <div id="kis-student-qr"
            class="kis-student-qr"
            aria-label="Student QR code"></div>

          <p id="kis-student-qr-status" role="status">
            Your Digital ID is not generated yet.
          </p>

          <p class="kis-profile-note">
            This QR code is a student reference, not proof of identity.
          </p>

          <button type="button"
            class="kis-role-button"
            id="kis-close-digital-id">
            Close Digital ID
          </button>
        </div>

        <div class="detail-panel">
          <h3>
            <i class="fa-solid fa-user-pen"></i>
            Personal Information
          </h3>

          <p class="kis-profile-label">FULL NAME</p>
          <p class="kis-profile-value">${name}</p>

          <button type="button"
            class="kis-role-button kis-profile-action"
            id="kis-edit-profile-name">
            <i class="fa-solid fa-pen"></i>
            Edit Full Name
          </button>

          <form id="kis-profile-name-form"
            class="kis-registration-form" hidden>

            <label for="kis-profile-full-name">Full Name</label>
            <input
              id="kis-profile-full-name"
              name="fullName"
              type="text"
              value="${name}"
              minlength="2"
              maxlength="100"
              autocomplete="name"
              required
            >

            <p id="kis-profile-name-message" role="status"></p>

            <button type="submit" class="kis-role-button">
              Save Changes
            </button>

            <button type="button" class="kis-role-button"
              id="kis-cancel-profile-name">
              Cancel
            </button>
          </form>

          <br>

          <p class="kis-profile-label">STUDENT NUMBER</p>
          <p class="kis-profile-value">${maskedNumber}</p>

          <p class="kis-profile-label">GRADE AND SECTION</p>
          <p class="kis-profile-value">${grade}</p>
        </div>

        <div class="detail-panel">
          <h3>
            <i class="fa-solid fa-id-card"></i>
            Account Information
          </h3>

          <p class="kis-profile-label">EMAIL ADDRESS</p>
          <p class="kis-profile-value">${email}</p>

          <button type="button"
            class="kis-role-button kis-profile-action"
            id="kis-check-email-verification">
            <i class="fa-solid fa-circle-check"></i>
            Check Verified Email
          </button>

          <br>

          <p class="kis-profile-label">ACCOUNT STATUS</p>
          <p class="kis-profile-value">Approved</p>
        </div>

        <div class="detail-panel">
          <h3>
            <i class="fa-solid fa-shield-halved"></i>
            Security &amp; Privacy
          </h3>

          <p>Manage your account security.</p>

          <button type="button"
            class="kis-role-button kis-profile-action"
            id="kis-open-email-settings">
            <i class="fa-solid fa-envelope"></i>
            Change Email Address
          </button>

          <form id="kis-email-settings-form"
            class="kis-registration-form" hidden>

            <label for="kis-new-email">New Email Address</label>
            <input
              id="kis-new-email"
              name="newEmail"
              type="email"
              autocomplete="email"
              required
            >

            <label for="kis-email-current-password">Current Password</label>
            <input
              id="kis-email-current-password"
              name="currentPassword"
              type="password"
              autocomplete="current-password"
              required
            >

            <p id="kis-email-settings-message" role="status"></p>

            <button type="submit" class="kis-role-button">
              Send Verification Email
            </button>

            <button type="button" class="kis-role-button"
              id="kis-cancel-email-settings">
              Cancel
            </button>
          </form>

          <button type="button"
            class="kis-role-button kis-profile-action"
            id="kis-open-password-settings">
            <i class="fa-solid fa-lock"></i>
            Change Password
          </button>

          <form id="kis-password-settings-form"
            class="kis-registration-form" hidden>

            <label for="kis-current-password">Current Password</label>
            <input
              id="kis-current-password"
              name="currentPassword"
              type="password"
              autocomplete="current-password"
              required
            >

            <label for="kis-new-password">New Password</label>
            <input
              id="kis-new-password"
              name="newPassword"
              type="password"
              minlength="8"
              autocomplete="new-password"
              required
            >

            <label for="kis-confirm-password">Confirm New Password</label>
            <input
              id="kis-confirm-password"
              name="confirmPassword"
              type="password"
              minlength="8"
              autocomplete="new-password"
              required
            >

            <p id="kis-password-settings-message" role="status"></p>

            <button type="submit" class="kis-role-button">
              Update Password
            </button>

            <button type="button" class="kis-role-button"
              id="kis-cancel-password-settings">
              Cancel
            </button>
          </form>
        </div>

        <button type="button"
          class="kis-role-button"
          id="kis-campus-signout">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Sign Out</span>
        </button>

      </section>
    `;
  }

  // Preserve original Home dashboard
  const homeSections = Array.from(main.children);

  // Create a separate page container
  const pageContainer = document.createElement("div");
  pageContainer.id = "kis-page-container";
  pageContainer.hidden = true;
  main.appendChild(pageContainer);

  // Store the Lessons page HTML for Back navigation
  let lessonsPageHTML = "";
  let learnPageHTML = "";

// Store the Subject page HTML for Back navigation
let subjectPageHTML = "";

  // Feature information
  const features = {

    "Learning Center": "Explore lessons, subjects, quizzes, and reviewers.",
    "Recent Announcements": "Read the latest announcements from your school.",
    "Upcoming Events": "Explore upcoming school events and activities.",
    "Lessons": "Access digital lessons and subject learning materials.",
    "Subjects": "Explore your subjects and organized learning resources.",
    "Quizzes": "Practice your knowledge with interactive quizzes.",
    "Reviewers": "Study using digital reviewers and learning guides.",
    "Attendance": "View your school attendance records.",
    "Academic Records": "Access your academic performance and grades.",
    "Announcements": "Read important school announcements.",
    "Events": "Discover upcoming school activities and events.",
    "My Profile": "Your personal student information will appear here.",
    "Settings": "Application preferences and account settings."
  };

  // Create feature cards
function createCards(items) {

  return `
    <div class="feature-grid">
      ${items.map(item => `
        <button class="feature-card" data-feature="${item.title}">

          <span class="feature-icon">
            <i class="${item.icon}"></i>
          </span>

          <h4>${item.title}</h4>
          <p>${item.description}</p>

          <span class="kis-badge ${
            item.status === "Available"
              ? "kis-badge--success"
              : "kis-badge--neutral"
          } kis-badge--small kis-badge--pill">
            ${item.status || "Coming Soon"}
          </span>

        </button>
      `).join("")}
    </div>
  `;
}


  // KIS CAMPUS CALENDAR
  function kisGetPhilippineTodayKey() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());

    const values = {};
    parts.forEach(part => {
      values[part.type] = part.value;
    });

    return `${values.year}-${values.month}-${values.day}`;
  }

  let kisSelectedCalendarDate = kisGetPhilippineTodayKey();
  let kisCalendarDate = new Date(
    Number(kisSelectedCalendarDate.slice(0, 4)),
    Number(kisSelectedCalendarDate.slice(5, 7)) - 1,
    1
  );
  let kisCalendarFilter = "All";

  // KIS MULTI-EVENT FIRESTORE CALENDAR

  const kisCalendarSampleEvents = {
    "2026-11-18": [{
      id: "sample-regular-classes",
      title: "Regular Classes",
      type: "class",
      category: "Classes",
      description: "Regular classroom instruction and scheduled learning activities."
    }],
    "2026-11-21": [{
      id: "sample-parent-conference",
      title: "2nd Quarter Parent-Teacher Conference",
      type: "parent",
      category: "Meeting",
      description: "A sample schedule for parents and teachers to discuss learners' academic progress."
    }],
    "2026-11-28": [{
      id: "sample-intramurals",
      title: "KIS Intramurals & Cultural Festival",
      type: "school",
      category: "School Activity",
      description: "A sample school activity featuring sports, cultural presentations, and student participation."
    }]
  };

  const KIS_CALENDAR_CACHE_KEY = "kisPublishedCalendarEvents_v1";

function kisCloneSampleCalendarEvents() {
  return {};
}

  let kisCalendarEvents = kisCloneSampleCalendarEvents();

  function kisCalendarEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function kisCalendarEventType(category) {
    if (["Classes", "Examination"].includes(category)) {
      return "class";
    }

    if (["Meeting", "Deadline"].includes(category)) {
      return "parent";
    }

    return "school";
  }

  function kisMergeCalendarEvents(records) {
    kisCalendarEvents = kisCloneSampleCalendarEvents();

    records.forEach(event => {
      if (!event || typeof event.date !== "string") return;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) return;

      const category = String(event.category || "Other");

      const normalized = {
        id: String(event.id || ""),
        title: String(event.title || "Untitled Event"),
        category,
        description: String(event.description || ""),
        type: ["class", "parent", "school"].includes(event.type)
          ? event.type
          : kisCalendarEventType(category)
      };

      if (!kisCalendarEvents[event.date]) {
        kisCalendarEvents[event.date] = [];
      }

      kisCalendarEvents[event.date].push(normalized);
    });
  }

  async function kisLoadPublishedCalendarEvents() {
    // Load previously published events first for offline access.
    let cachedEvents = [];

    try {
      const saved = localStorage.getItem(KIS_CALENDAR_CACHE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          cachedEvents = parsed.filter(event =>
            event &&
            event.status === "published" &&
            typeof event.date === "string"
          );
        }
      }
    } catch (error) {
      console.warn("KIS calendar cache could not be read:", error);
    }

    kisMergeCalendarEvents(cachedEvents);
    kisRenderCampusCalendar();

    // Refresh from Firestore when a connection is available.
    try {
      if (!window.kisDb) {
        throw new Error("Firebase database is unavailable.");
      }

      const snapshot = await window.kisDb
        .collection("calendarEvents")
        .where("status", "==", "published")
        .get();

      const publishedEvents = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          date: data.date,
          title: data.title,
          category: data.category,
          description: data.description,
          type: data.type,
          status: data.status
        };
      }).filter(event =>
        event.status === "published" &&
        typeof event.date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(event.date)
      );

      // Cache only published records.
      try {
        localStorage.setItem(
          KIS_CALENDAR_CACHE_KEY,
          JSON.stringify(publishedEvents)
        );
      } catch (error) {
        console.warn("KIS calendar cache could not be saved:", error);
      }

      kisMergeCalendarEvents(publishedEvents);
      kisRenderCampusCalendar();

    } catch (error) {
      console.warn(
        "KIS calendar is using saved events or sample events:",
        error
      );
    }
  }

  let kisCalendarClockTimer = null;

function kisUpdatePhilippineClock() {
  const dateElement = document.getElementById("kis-calendar-ph-date");
  const timeElement = document.getElementById("kis-calendar-ph-time");

  if (!dateElement || !timeElement) return;

  const now = new Date();

  dateElement.textContent = now.toLocaleDateString("en-GB", {
    timeZone: "Asia/Manila",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  timeElement.textContent = now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
}

function kisStartPhilippineClock() {
  kisUpdatePhilippineClock();

  if (kisCalendarClockTimer !== null) return;

  kisCalendarClockTimer = window.setInterval(
    kisUpdatePhilippineClock,
    1000
  );
}

function kisRenderCampusCalendar() {
    const root = pageContainer.querySelector("#kis-campus-calendar");
    if (!root) return;

    const year = kisCalendarDate.getFullYear();
    const month = kisCalendarDate.getMonth();

    const monthName = kisCalendarDate.toLocaleString("en-US", {
      month: "long"
    });

    const todayPhilippine = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    let calendarDays = "";

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDay + 1;

      if (day < 1 || day > daysInMonth) {
        calendarDays += `<div class="kis-calendar-empty"></div>`;
        continue;
      }

      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const events = kisCalendarEvents[dateKey] || [];
      const firstEvent = events[0];

      const eventColors = events.map(event => {
        const colors = {
          class: "rgba(234, 179, 8, 0.20)",
          parent: "rgba(239, 68, 68, 0.17)",
          school: "rgba(34, 197, 94, 0.17)"
        };

        return colors[event.type] || "rgba(107, 114, 128, 0.15)";
      });

      const eventBackground = eventColors.length
        ? `linear-gradient(to right, ${
            eventColors.map((color, index) => {
              const start = index / eventColors.length * 100;
              const end = (index + 1) / eventColors.length * 100;
              return `${color} ${start}% ${end}%`;
            }).join(", ")
          })`
        : "";

      const classes = [
        "kis-calendar-day",
        dateKey === todayPhilippine ? "is-today" : "",
        dateKey === kisSelectedCalendarDate ? "is-selected" : "",
        events.length ? `has-event event-${firstEvent.type}` : ""
      ].filter(Boolean).join(" ");

      calendarDays += `
        <button type="button"
          class="${classes}"
          ${eventBackground ? `style="background-image: ${eventBackground};"` : ""}
          data-calendar-day="${dateKey}"
          aria-pressed="${dateKey === kisSelectedCalendarDate}">
          ${day}
          ${events.length > 1
            ? `<span class="kis-calendar-event-count">${events.length}</span>`
            : ""}
        </button>
      `;
    }

    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}-`;

    const monthEvents = Object.entries(kisCalendarEvents)
      .filter(([date]) => date.startsWith(monthPrefix))
      .sort(([a], [b]) => a.localeCompare(b));

    const selectedEvents = kisCalendarEvents[kisSelectedCalendarDate] || [];

    const filteredSelectedEvents = selectedEvents.filter(event =>
      kisCalendarFilter === "All" ||
      event.category === kisCalendarFilter
    );

    const filteredMonthEvents = monthEvents
      .map(([date, events]) => [
        date,
        events.filter(event =>
          kisCalendarFilter === "All" ||
          event.category === kisCalendarFilter
        )
      ])
      .filter(([, events]) => events.length > 0);


const calendarCategories = [
  "All",
  "Classes",
  "Meeting",
  "School Activity",
  "Holiday",
  "Examination",
  "Deadline",
  "Other"
];

const calendarFilterButtons = calendarCategories.map(category => `
  <button
    type="button"
    class="kis-calendar-filter ${kisCalendarFilter === category ? "active" : ""}"
    data-calendar-filter="${kisCalendarEscape(category)}"
    aria-pressed="${kisCalendarFilter === category}">
    ${kisCalendarEscape(category)}
  </button>
`).join("");

    const eventList = filteredMonthEvents.length
      ? filteredMonthEvents.flatMap(([date, events]) => {
          const dateLabel = new Date(`${date}T12:00:00`)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric"
            });

          return events.map(event => `
            <div class="kis-calendar-event">
              <span class="kis-event-date event-${event.type}">
                ${dateLabel}
              </span>
              <span>${kisCalendarEscape(event.title)}</span>
            </div>
          `);
        }).join("")
      : `<p class="kis-calendar-no-events">No scheduled events this month.</p>`;

    const selectedEventDetails = filteredSelectedEvents.length
      ? filteredSelectedEvents.map(event => `
          <div class="kis-calendar-event-details">
            <span class="kis-event-category event-${event.type}">
              ${kisCalendarEscape(event.category)}
            </span>
            <h4>${kisCalendarEscape(event.title)}</h4>
            <p>${kisCalendarEscape(event.description)}</p>
          </div>
        `).join("")
      : `
          <p class="kis-calendar-no-details">
            No scheduled event for this date.
          </p>
        `;

    root.innerHTML = `
      <div class="kis-calendar-card">

        <div class="kis-calendar-live-clock">
          <div id="kis-calendar-ph-date"></div>
          <div id="kis-calendar-ph-time"></div>
        </div>

        <div class="kis-calendar-heading">
          <button type="button" data-calendar-month="-1"
            aria-label="Previous month">
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <h2>${monthName} ${year}</h2>

          <button type="button" data-calendar-month="1"
            aria-label="Next month">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div class="kis-calendar-school-year">
          DepEd School Year 2026–2027
        </div>

        <div class="kis-calendar-weekdays">
          ${["S", "M", "T", "W", "T", "F", "S"].map(day =>
            `<span>${day}</span>`
          ).join("")}
        </div>

        <div class="kis-calendar-grid">
          ${calendarDays}
        </div>

        <div class="kis-calendar-divider"></div>

        <div class="kis-calendar-selected">
          <h3>Event Details</h3>
          <strong>${new Date(`${kisSelectedCalendarDate}T12:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}</strong>

          ${selectedEventDetails}
        </div>

        <div class="kis-calendar-divider"></div>

        <h3 class="kis-calendar-events-title">Upcoming School Events</h3>

        <div class="kis-calendar-filters">
          ${calendarFilterButtons}
        </div>
        <div class="kis-calendar-events">
          ${eventList}
        </div>

        <p class="kis-calendar-sample-note">
          Sample events are illustrative and subject to official school confirmation.
        </p>

      </div>
    `;

    kisStartPhilippineClock();
  }

  // Page content
  const pages = {

    Calendar: `
      <section class="app-page campus-calendar-page">
        <div id="kis-campus-calendar"></div>
      </section>
    `,

    Children: `
      <section class="app-page">
        <div class="page-heading">
          <h2>My Children</h2>
          <p>View children whose relationship with your account has been verified by the school.</p>
        </div>
        <div id="kis-parent-children-page" class="detail-panel">
          <p>Verified linked children will appear here.</p>
        </div>

        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Add Another Child</h2>
              <p>Submit a new relationship request for school verification.</p>
            </div>
          </div>

          <div class="detail-panel">
            <label for="kis-new-child-student-number">
              Student Number (12-digit LRN)
            </label>
            <input
              id="kis-new-child-student-number"
              type="text"
              inputmode="numeric"
              pattern="[0-9]{12}"
              maxlength="12"
              placeholder="Enter 12-digit Student Number"
            >

            <label for="kis-new-child-grade-section">
              Grade &amp; Section
            </label>
            <select id="kis-new-child-grade-section">
              <option value="">Select Grade &amp; Section</option>
              <option value="Grade 7 - Amethyst">Grade 7 - Amethyst</option>
              <option value="Grade 8 - Archimedes">Grade 8 - Archimedes</option>
              <option value="Grade 9 - Anthurium">Grade 9 - Anthurium</option>
              <option value="Grade 10 - Aristotle">Grade 10 - Aristotle</option>
            </select>

            <button type="button" id="kis-submit-parent-child-request">
              Submit Child Request
            </button>

            <p id="kis-parent-child-request-message"
               aria-live="polite"></p>
          </div>
        </div>

        <div class="dashboard-section">
          <h2>Child Request Status</h2>
          <div id="kis-parent-child-request-history"
               class="detail-panel">
            <p>Request history will appear here.</p>
          </div>
        </div>
      </section>
    `,

    Updates: `
      <section class="app-page">
        <div class="page-heading">
          <h2>School Updates</h2>
          <p>Important information about your children's school activities.</p>
        </div>
        <div id="kis-parent-updates" class="detail-panel">
          <p>School updates will appear here.</p>
        </div>
      </section>
    `,

    Classes: `
      <section class="app-page">
        <div class="page-heading">
          <h2>My Classes</h2>
          <p>View your administrator-approved teaching assignments.</p>
        </div>
        <div id="kis-teacher-classes" class="detail-panel">
          <p>Approved teaching assignments will appear here.</p>
        </div>
      </section>
    `,

    Notifications: `
      <section class="app-page">
        <div class="page-heading">
          <h2>Notifications</h2>
          <p>School announcements and important notices.</p>
        </div>
        <div id="kis-campus-notifications" class="detail-panel">
          <p>Notifications will appear here.</p>
        </div>
      </section>
    `,

    School: `
      <section class="app-page">

        <div class="page-heading">
          <h2>School Services</h2>
          <p>Everything you need to stay connected with KIS.</p>
        </div>

        <div class="page-group">
          <h3>Student Services</h3>

          ${createCards([
            {
              title: "Attendance",
              icon: "fa-solid fa-calendar-check",
              description: "View attendance records"
            },
            {
              title: "Academic Records",
              icon: "fa-solid fa-chart-column",
              description: "Grades and performance"
            },
            {
              title: "Announcements",
              icon: "fa-solid fa-bullhorn",
              description: "School announcements"
            },
            {
              title: "Events",
              icon: "fa-solid fa-calendar-days",
              description: "School activities"
            }
          ])}
        </div>

      </section>
    `,

    Account: `
      <section class="app-page kis-campus-access">

        <div class="kis-campus-brand">
          <img
            src="assets/kis-official-logo-transparent.png"
            alt="Katipunan Integrated School Logo"
          >

          <h2>KIS CAMPUS</h2>
          <p>Katipunan Integrated School</p>
          <span>The Roadway to Success</span>
        </div>

        <div class="kis-role-heading">
          <h3>Select your role to launch the Campus app.</h3>
          <p>Choose your account type to continue.</p>
        </div>

        <div class="kis-role-grid">

          <button class="kis-role-button" data-kis-role="Student">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Student</span>
          </button>

          <button class="kis-role-button" data-kis-role="Parent">
            <i class="fa-solid fa-users"></i>
            <span>Parent</span>
          </button>

          <button class="kis-role-button" data-kis-role="Teacher">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span>Teacher</span>
          </button>

        </div>

        <p id="kis-role-selection-message" class="kis-role-message">
          Please select your account type.
        </p>

      </section>
    `
  };

  // Load verified children belonging to the signed-in Parent.
  async function kisLoadParentChildren(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    const user = window.kisAuth?.currentUser;

    if (
      !user ||
      window.kisCampusUser?.role !== "parent" ||
      !window.kisDb
    ) {
      container.innerHTML = "<p>Parent account or database connection unavailable.</p>";
      return;
    }

    container.innerHTML = "<p>Loading verified children...</p>";

    try {
      const snapshot = await window.kisDb
        .collection("parentLinks")
        .where("parentUid", "==", user.uid)
        .where("status", "==", "active")
        .get();

      if (snapshot.empty) {
        container.innerHTML =
          "<p>No verified children are linked to this account yet.</p>";
        return;
      }

      container.innerHTML = snapshot.docs.map(doc => {
        const child = doc.data();
        const childName = kisCalendarEscape(
          child.childName || "Child profile details need administrator update"
        );
        const gradeSection = kisCalendarEscape(
          child.gradeSection || "Grade and Section unavailable"
        );

        return `
          <div class="detail-panel kis-parent-child-card">
            <h3>${childName}</h3>
            <p><strong>Grade &amp; Section:</strong> ${gradeSection}</p>
            <span class="section-label">VERIFIED LINK</span>
          </div>
        `;
      }).join("");

    } catch (error) {
      console.error("Unable to load Parent's children:", error);
      container.innerHTML =
        "<p>Unable to load verified children. Please check your connection.</p>";
    }
  }


  // Load child relationship request history for the signed-in Parent.
  async function kisLoadParentChildRequests() {
    const container = document.getElementById(
      "kis-parent-child-request-history"
    );

    if (!container) return;

    const user = window.kisAuth?.currentUser;

    if (
      !user ||
      window.kisCampusUser?.role !== "parent" ||
      !window.kisDb
    ) {
      container.innerHTML =
        "<p>Parent account or database connection unavailable.</p>";
      return;
    }

    container.innerHTML = "<p>Loading request history...</p>";

    try {
      const snapshot = await window.kisDb
        .collection("parentChildRequests")
        .where("parentUid", "==", user.uid)
        .get();

      if (snapshot.empty) {
        container.innerHTML = "<p>No child requests submitted yet.</p>";
        return;
      }

      const requests = snapshot.docs.map(doc => doc.data());

      requests.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });

      container.innerHTML = requests.map(request => {
        const section = kisCalendarEscape(
          request.childGradeSection || "Grade and Section unavailable"
        );

        const status = String(request.status || "unknown").toLowerCase();
        const safeStatus = kisCalendarEscape(status);

        let explanation = "";

        if (status === "rejected") {
          explanation =
            "<p>You may submit a new request with corrected details.</p>";
        } else if (status === "pending") {
          explanation =
            "<p>Waiting for school administrator verification.</p>";
        } else if (status === "approved") {
          explanation =
            "<p>This child relationship has been verified.</p>";
        }

        return `
          <div class="detail-panel kis-parent-request-card">
            <p><strong>Grade &amp; Section:</strong> ${section}</p>
            <p><strong>Status:</strong> ${safeStatus.toUpperCase()}</p>
            ${explanation}
          </div>
        `;
      }).join("");

    } catch (error) {
      console.error("Unable to load Parent request history:", error);
      container.innerHTML =
        "<p>Unable to load request history. Please check your connection.</p>";
    }
  }

  // Show a page
  function showPage(pageName) {

    const currentRole = window.kisCampusUser?.role;

    const bottomNavigation = document.querySelector(
      ".bottom-navigation"
    );

    if (bottomNavigation) {
      bottomNavigation.hidden = ![
        "student",
        "parent",
        "teacher"
      ].includes(currentRole);
    }

    const allowedPages = {
      student: ["Home", "Learn", "Calendar", "School", "Profile"],
      parent: ["Home", "Children", "Updates", "Profile"],
      teacher: ["Home", "Classes", "Notifications", "Profile"],
      admin: ["Home"]
    };

    if (currentRole && allowedPages[currentRole]) {
      if (!allowedPages[currentRole].includes(pageName)) {
        showPage("Home");
        return;
      }
    } else if (pageName !== "Account") {
      showPage("Account");
      return;
    }

    const hasCampusDashboard =
      pageName === "Home" &&
      ["student", "parent", "teacher", "admin"].includes(currentRole);

    const isLoggedIn = Boolean(window.kisCampusUser);

    homeSections.forEach(section => {
      section.hidden = !isLoggedIn || pageName !== "Home" || hasCampusDashboard;
    });

    pageContainer.hidden = !isLoggedIn
      ? false
      : pageName === "Home" && !hasCampusDashboard;

    if (pageName === "Home") {
if (currentRole === "student") {
  pageContainer.innerHTML =
    kisRenderStudentDashboard(window.kisCampusUser);

  // Show Admin Studio only to the authorized administrator.
  if (
    typeof kisIsAdmin === "function" &&
    kisIsAdmin(window.kisAuth?.currentUser)
  ) {
    const dashboard = pageContainer.querySelector(
      ".kis-student-dashboard"
    );

    if (dashboard) {
      dashboard.insertAdjacentHTML("beforeend", `
        <div class="dashboard-section">
          <div class="section-heading">
            <div>
              <h2>Administration</h2>
              <p>Portal management tools.</p>
            </div>
            <span class="section-label">ADMIN</span>
          </div>

          <div class="dashboard-grid">
            <button
              type="button"
              class="feature-card"
              data-feature="Admin Studio"
            >
              <i class="fa-solid fa-screwdriver-wrench"></i>
              <span>Admin Studio</span>
            </button>
          </div>
        </div>
      `);
    }
  }
      } else if (currentRole === "parent") {
        pageContainer.innerHTML =
          kisRenderParentDashboard(window.kisCampusUser);
        kisLoadParentChildren("kis-parent-linked-children");
      } else if (currentRole === "teacher") {
        pageContainer.innerHTML =
          kisRenderTeacherDashboard(window.kisCampusUser);
      } else if (currentRole === "admin" && kisIsAdmin()) {
        pageContainer.innerHTML = `
          <section class="app-page">
            <div class="page-heading">
              <h2>Welcome, Administrator!</h2>
              <p>Manage your KIS Campus portal.</p>
            </div>

            <div class="dashboard-grid">
              <button
                type="button"
                class="feature-card"
                data-feature="Admin Studio"
              >
                <i class="fa-solid fa-screwdriver-wrench"></i>
                <span>Admin Studio</span>
              </button>
            </div>
          </section>
        `;
      } else {
        pageContainer.innerHTML = "";
      }
    } else if (pageName === "Learn" && currentRole === "student") {
      pageContainer.innerHTML = kisRenderLearnPage();

    } else if (pageName === "Profile" && currentRole === "student") {
      pageContainer.innerHTML =
        kisRenderStudentProfile(window.kisCampusUser);

    } else if (
      pageName === "Profile" &&
      ["parent", "teacher"].includes(currentRole)
    ) {
      const profile = window.kisCampusUser;
      const name = kisCalendarEscape(profile.fullName || "");
      const email = kisCalendarEscape(profile.email || "");
      const roleLabel =
        currentRole === "parent" ? "Parent" : "Teacher";

      pageContainer.innerHTML = `
        <section class="app-page">
          <div class="page-heading">
            <h2>My Profile</h2>
            <p>View your KIS Campus account information.</p>
          </div>

          <div class="detail-panel">
            <h3>${name}</h3>
            <p><strong>Account Type:</strong> ${roleLabel}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <button
            type="button"
            class="kis-role-button"
            id="kis-campus-signout">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Sign Out</span>
          </button>
        </section>
      `;
    } else {
      pageContainer.innerHTML = pages[pageName] || "";

      if (currentRole === "parent" && pageName === "Children") {
        kisLoadParentChildren("kis-parent-children-page");
      }
      if (currentRole === "parent" && pageName === "Children") {
        kisLoadParentChildRequests();
      }

      if (pageName === "Calendar") {
        kisSelectedCalendarDate = kisGetPhilippineTodayKey();

        kisCalendarDate = new Date(
          Number(kisSelectedCalendarDate.slice(0, 4)),
          Number(kisSelectedCalendarDate.slice(5, 7)) - 1,
          1
        );

        kisRenderCampusCalendar();
        kisLoadPublishedCalendarEvents();
      }
    }

    const navigation = {
      student: [
        ["Home", "fa-house"],
        ["Learn", "fa-book-open"],
        ["Calendar", "fa-calendar-days"],
        ["Notifications", "fa-bell"],
        ["Profile", "fa-circle-user"]
      ],
      parent: [
        ["Home", "fa-house"],
        ["Children", "fa-children"],
        ["Updates", "fa-bullhorn"],
        ["Profile", "fa-circle-user"]
      ],
      teacher: [
        ["Home", "fa-house"],
        ["Classes", "fa-chalkboard"],
        ["Notifications", "fa-bell"],
        ["Profile", "fa-circle-user"]
      ]
    };

    const navItemsConfig = navigation[currentRole] || navigation.student;

    navItems.forEach((item, index) => {
      const config = navItemsConfig[index];

      item.hidden = !config;
      item.style.display = config ? "" : "none";

      if (!config) return;

      const [label, icon] = config;
      const span = item.querySelector("span");
      const iconElement = item.querySelector("i");

      if (span) span.textContent = label;
      if (iconElement) iconElement.className = `fa-solid ${icon}`;
    });

    const navLabelsByPage = {
      Home: "Home",
      Learn: "Learn",
      Calendar: "Calendar",
      School: "Notifications",
      Children: "Children",
      Updates: "Updates",
      Classes: "Classes",
      Notifications: "Notifications",
      Profile: "Profile",
      Account: "Profile"
    };

    navItems.forEach(item => {
      const label = item.querySelector("span")?.textContent.trim();

      item.classList.toggle(
        "active",
        label === navLabelsByPage[pageName]
      );
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Render the Student Learn hub
  function kisRenderLearnPage() {
    learnPageHTML = `
      <section class="app-page" data-kis-page="learn">

        <div class="page-heading">
          <h2>Learn</h2>
          <p>Choose what you want to study.</p>
        </div>

        <div class="feature-grid">

          <button type="button"
            class="feature-card"
            data-learn-action="lessons">

            <span class="feature-icon">
              <i class="fa-solid fa-book-open"></i>
            </span>

            <h4>Lessons</h4>
            <p>Explore lessons across all eight subjects.</p>

          </button>

          <button type="button"
            class="feature-card"
            data-learn-action="quizzes">

            <span class="feature-icon">
              <i class="fa-solid fa-clipboard-list"></i>
            </span>

            <h4>Quizzes</h4>
            <p>Practice and test what you have learned.</p>

          </button>

        </div>
      </section>
    `;

    return learnPageHTML;
  }

  // Bottom navigation
  navItems.forEach(item => {

    item.addEventListener("click", () => {


      const navLabel = item.querySelector("span")?.textContent.trim();

      const role = window.kisCampusUser?.role;

      const pageRoutes = {
        student: {
          Home: "Home",
          Learn: "Learn",
          Calendar: "Calendar",
          Notifications: "School",
          Profile: "Profile"
        },
        parent: {
          Home: "Home",
          Children: "Children",
          Updates: "Updates",
          Profile: "Profile"
        },
        teacher: {
          Home: "Home",
          Classes: "Classes",
          Notifications: "Notifications",
          Profile: "Profile"
        }
      };

      const routes = pageRoutes[role] || {
        Home: "Home",
        Calendar: "Calendar",
        Notifications: "School",
        Profile: "Account"
      };

      const pageName = routes[navLabel];

      if (pageName && (pages[pageName] || pageName === "Home" || pageName === "Profile")) {
        showPage(pageName);
      }

    });

  });

// =========================================
  // KIS CAMPUS CALENDAR INTERACTIONS
  // =========================================

  main.addEventListener("click", event => {
    const filterButton = event.target.closest("[data-calendar-filter]");

    if (filterButton) {
      kisCalendarFilter = filterButton.dataset.calendarFilter;
      kisRenderCampusCalendar();
      return;
    }

    const monthButton = event.target.closest("[data-calendar-month]");

    if (monthButton) {
      const change = Number(monthButton.dataset.calendarMonth);
      kisCalendarDate = new Date(
        kisCalendarDate.getFullYear(),
        kisCalendarDate.getMonth() + change,
        1
      );

      kisSelectedCalendarDate = [
        kisCalendarDate.getFullYear(),
        String(kisCalendarDate.getMonth() + 1).padStart(2, "0"),
        "01"
      ].join("-");

      kisRenderCampusCalendar();
      return;
    }

    const dayButton = event.target.closest("[data-calendar-day]");

    if (dayButton) {
      kisSelectedCalendarDate = dayButton.dataset.calendarDay;
      kisRenderCampusCalendar();
    }
  });

// =========================================
// LESSON SUBJECT NAVIGATION
// =========================================

main.addEventListener("click", async event => {

  // Open Admin Studio
  const adminCard = event.target.closest(
    'button.feature-card[data-feature="Admin Studio"]'
  );

  if (adminCard) {
    window.kisOpenAdminStudio();
    return;
  }

const subjectCard = event.target.closest(
  "button.feature-card[data-subject]"
);

if (!subjectCard) return;

const subject = kisSubjects.find(
  item => item.id === subjectCard.dataset.subject
);

if (!subject) return;

// Load published lessons from Firestore.
const publishedLessons = await kisLoadPublishedLessons();

// Identify original lessons already imported into Firestore.
const importedOriginalIds = new Set(
  publishedLessons
    .filter(lesson => lesson.origin === "original")
    .map(lesson => String(lesson.legacyId))
);

// Keep local lessons that have not been imported.
const localLessons = kisLessons.filter(
  lesson =>
    lesson.subject === subject.id &&
    !importedOriginalIds.has(String(lesson.id))
);

// Combine local and published lessons without duplicates.
const subjectLessons = [
  ...localLessons,
  ...publishedLessons.filter(
    lesson => lesson.subject === subject.id
  )
];

  subjectPageHTML = `
        <section class="app-page" data-kis-page="subject">

      <button class="back-button" id="kis-back">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </button>

      <div class="page-heading">
        <h2>${subject.name}</h2>
        <p>Learning materials and lessons</p>
      </div>

      <div class="page-group">

        <h3>Available Lessons</h3>

        <div class="feature-grid">

          ${subjectLessons.map((lesson, index) => `
<button class="feature-card"
  data-lesson="${lesson.id}"
  data-source="${lesson.source || "local"}">

              <span class="feature-icon">
                <i class="fa-solid fa-book-open"></i>
              </span>

              <h4>${lesson.title}</h4>

              <p>${lesson.description}</p>

              <span class="kis-badge kis-badge--success kis-badge--small kis-badge--pill">
                ${lesson.status}
              </span>

            </button>
          `).join("")}

        </div>

      </div>

    </section>
  `;

  pageContainer.innerHTML = subjectPageHTML;

  window.scrollTo({ top: 0, behavior: "smooth" });

  });

// =========================================
// LESSON READER NAVIGATION
// =========================================

main.addEventListener("click", async event => {

  const lessonCard = event.target.closest("[data-lesson]");

  if (!lessonCard) return;

  let lesson = null;
  let content = null;

  // Check whether this lesson comes from Firestore.
  if (lessonCard.dataset.source === "firestore") {

    try {

      const lessonDoc = await kisDb
        .collection("lessons")
        .doc(lessonCard.dataset.lesson)
        .get();

      if (!lessonDoc.exists) {
        alert("This lesson is no longer available.");
        return;
      }

      lesson = {
        id: lessonDoc.id,
        ...lessonDoc.data()
      };

      content = lesson.content;

    } catch (error) {

      console.error("Unable to open published lesson:", error);

      alert("Unable to load this lesson. Please try again.");
      return;

    }

  } else {

    // Load an original KIS lesson.
    lesson = kisLessons.find(
      item => item.id === Number(lessonCard.dataset.lesson)
    );

    if (!lesson) return;

    content = kisLessonContent[lesson.id];

  }

  // Parse structured lesson content stored as a JSON string.
  if (typeof content === "string") {
    try {
      const parsedContent = JSON.parse(content);

      if (
        parsedContent &&
        typeof parsedContent === "object" &&
        !Array.isArray(parsedContent) &&
        (
          Array.isArray(parsedContent.objectives) ||
          Array.isArray(parsedContent.sections)
        )
      ) {
        content = parsedContent;
      }

    } catch (error) {
      // Keep ordinary plain-text lesson content unchanged.
    }
  }

pageContainer.innerHTML = `
  <section class="app-page" data-kis-page="lesson">

    <button class="back-button" id="kis-back">
      <i class="fa-solid fa-arrow-left"></i>
      Back
    </button>

    <div class="page-heading">
      <h2>${lesson.title}</h2>
      <p>${lesson.description}</p>
    </div>

    <div class="detail-panel">

      <span class="kis-badge kis-badge--success kis-badge--small kis-badge--pill">
        LESSON
      </span>

      ${
        typeof content === "string"
          ? `
            <h3>Lesson Content</h3>

            ${content.split(/\n\s*\n/).map(paragraph => `
              <p>${kisEscapeHTML(paragraph)}</p>
            `).join("")}
          `
          : content
            ? `
              <h3>Learning Objectives</h3>

              <ul>
                ${content.objectives.map(item => `
                  <li>${item}</li>
                `).join("")}
              </ul>

              ${content.sections.map(section => `
                <div class="lesson-section">

                  <h3>${section.heading}</h3>

                  ${
                    section.paragraphs
                      ? section.paragraphs.map(paragraph => `
                          <p>${paragraph}</p>
                        `).join("")
                      : ""
                  }

                  ${
                    section.example
                      ? `
                        <div class="lesson-example">

                          <h4>${section.example.problem}</h4>

                          <ol>
                            ${section.example.steps.map(step => `
                              <li>${step}</li>
                            `).join("")}
                          </ol>

                          <p><strong>Answer:</strong> ${section.example.answer}</p>

                          <p>${section.example.explanation}</p>

                        </div>
                      `
                      : ""
                  }

                </div>
              `).join("")}
            `
            : `
              <h3>Introduction</h3>

              <p>Learning materials for this lesson will be added soon.</p>
            `
      }

${window.renderKisQuizButton(
  lesson.quizLessonId ?? lesson.id,
  lesson.quizSource || lessonCard.dataset.source || "local"
)}

    </div>

  </section>
`;

  window.scrollTo({ top: 0, behavior: "smooth" });

});

  // Dashboard and feature cards
  main.addEventListener("click", event => {

    const card = event.target.closest(
      ".dashboard-card, .information-card, .feature-card"
    );

    if (!card) return;

    const title = card.dataset.feature ||
      card.querySelector("h3")?.textContent.trim() ||
      "";

    if (features[title]) {
      if (title === "Lessons") {

        pageContainer.hidden = false;

        homeSections.forEach(section => {
          section.hidden = true;
        });

       lessonsPageHTML = `
          <section class="app-page">

            <button class="back-button" id="kis-back">
              <i class="fa-solid fa-arrow-left"></i>
              Back
            </button>

            <div class="page-heading">
              <h2>Lessons</h2>
              <p>Explore lessons by subject.</p>
            </div>

            <div class="page-group">
              <h3>Subject Categories</h3>

              <div class="feature-grid">
                ${kisSubjects.map(subject => `
                  <button class="feature-card"
                    data-subject="${subject.id}">

                    <span class="feature-icon">
                      <i class="${subject.icon}"></i>
                    </span>

                    <h4>${subject.name}</h4>
                    <p>${subject.description}</p>

                    <span class="kis-badge kis-badge--success kis-badge--small kis-badge--pill">
                      AVAILABLE
                    </span>

                  </button>
                `).join("")}
              </div>

            </div>

          </section>
        `;

        pageContainer.innerHTML = lessonsPageHTML;

        navItems.forEach(item => item.classList.remove("active"));

        window.scrollTo({ top: 0, behavior: "smooth" });

        return;
      }
      pageContainer.hidden = false;

      homeSections.forEach(section => {
        section.hidden = true;
      });

      pageContainer.innerHTML = `
        <section class="app-page">

          <button class="back-button" id="kis-back">
            <i class="fa-solid fa-arrow-left"></i>
            Back
          </button>

          <div class="page-heading">
            <h2>${title}</h2>
            <p>Katipunan Integrated School</p>
          </div>

          <div class="detail-panel">
            <h3>${title}</h3>
            <p>${features[title]}</p>
            <br>
            <p>This module is part of the KIS development roadmap. Its full functionality will be implemented in a later phase.</p>
          </div>

        </section>
      `;

      navItems.forEach(item => item.classList.remove("active"));

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

  });


// =========================================
// KIS CAMPUS SIGN-IN SCREEN
// =========================================

function kisRenderCampusSignIn(role) {
  const campus = pageContainer.querySelector(".kis-campus-access");
  if (!campus) return;

  const roleNames = {
    Student: "Student",
    Parent: "Parent",
    Teacher: "Teacher"
  };

  if (!roleNames[role]) return;

  campus.innerHTML = `
    <div class="kis-campus-brand">
      <img
        src="assets/kis-official-logo-transparent.png"
        alt="Katipunan Integrated School Logo"
      >
      <h2>KIS CAMPUS</h2>
      <p>${roleNames[role]} Sign In</p>
    </div>

    <button
      type="button"
      class="kis-role-button"
      id="kis-back-to-campus-options"
    >
      Back
    </button>

    <div class="kis-role-heading">
      <h3>Welcome back!</h3>
      <p>Sign in using your registered email and password.</p>
    </div>

    <form id="kis-campus-signin" class="kis-registration-form">
      <input type="hidden" name="selectedRole" value="${role}">

      <label for="kis-signin-email">Email Address</label>
      <input
        id="kis-signin-email"
        name="email"
        type="email"
        autocomplete="username"
        required
      >

      <label for="kis-signin-password">Password</label>
      <div class="kis-password-field">
        <input
          id="kis-signin-password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
        >
        <button
          type="button"
          class="kis-toggle-password"
          id="kis-toggle-signin-password"
          aria-label="Show password"
          aria-pressed="false"
        >
          <i class="fa-solid fa-eye" aria-hidden="true"></i>
        </button>
      </div>

      <p id="kis-signin-message" class="kis-role-message">
        Enter your account credentials to continue.
      </p>

      <button type="submit" class="kis-role-button">
        Sign In
      </button>
    </form>
  `;
}

// KIS CAMPUS ROLE SELECTION
main.addEventListener("click", event => {
  const backToRolesButton = event.target.closest("#kis-back-to-roles");

  if (backToRolesButton) {
    const campus = pageContainer.querySelector(".kis-campus-access");
    if (!campus) return;

    campus.innerHTML = `
      <div class="kis-campus-brand">
        <img
          src="assets/kis-official-logo-transparent.png"
          alt="Katipunan Integrated School Logo"
        >
        <h2>KIS CAMPUS</h2>
        <p>Katipunan Integrated School</p>
        <span>The Roadway to Success</span>
      </div>

      <div class="kis-role-heading">
        <h3>Select your role to launch the Campus app.</h3>
        <p>Choose your account type to continue.</p>
      </div>

      <div class="kis-role-grid">
        <button class="kis-role-button" data-kis-role="Student">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>Student</span>
        </button>

        <button class="kis-role-button" data-kis-role="Parent">
          <i class="fa-solid fa-users"></i>
          <span>Parent</span>
        </button>

        <button class="kis-role-button" data-kis-role="Teacher">
          <i class="fa-solid fa-chalkboard-user"></i>
          <span>Teacher</span>
        </button>
      </div>

      <p id="kis-role-selection-message" class="kis-role-message">
        Please select your account type.
      </p>
    `;

    return;
  }

  const roleButton = event.target.closest("[data-kis-role]");
  if (!roleButton) return;

  const selectedRole = roleButton.dataset.kisRole;

  // Initial role selection opens account options.
  if (roleButton.dataset.kisRegister !== "true") {
    const campus = pageContainer.querySelector(".kis-campus-access");
    if (!campus) return;

    campus.innerHTML = `
      <div class="kis-campus-brand">
        <img
          src="assets/kis-official-logo-transparent.png"
          alt="Katipunan Integrated School Logo"
        >
        <h2>KIS CAMPUS</h2>
        <p>${selectedRole} Account</p>
      </div>

      <button
        type="button"
        class="kis-role-button"
        id="kis-back-to-roles"
      >
        Back to role selection
      </button>

      <div class="kis-role-heading">
        <h3>${selectedRole} Portal</h3>
        <p>Choose how you want to continue.</p>
      </div>

      <div class="kis-role-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
        <button
          type="button"
          class="kis-role-button"
          data-kis-campus-signin="${selectedRole}"
        >
          <i class="fa-solid fa-right-to-bracket"></i>
          <span>Sign In</span>
        </button>

        <button
          type="button"
          class="kis-role-button"
          data-kis-role="${selectedRole}"
          data-kis-register="true"
        >
          <i class="fa-solid fa-user-plus"></i>
          <span>Create Account</span>
        </button>
      </div>
    `;

    return;
  }

  if (selectedRole === "Teacher") {

    const campus = pageContainer.querySelector(".kis-campus-access");
    if (!campus) return;

    campus.innerHTML = `
      <div class="kis-campus-brand">
        <img src="assets/kis-official-logo-transparent.png"
             alt="Katipunan Integrated School Logo">
        <h2>KIS CAMPUS</h2>
        <p>Teacher Registration</p>
      </div>

      <button type="button" class="kis-role-button"
              id="kis-back-to-roles">
        Back to role selection
      </button>

      <form id="kis-teacher-registration"
            class="kis-registration-form">

        <label for="kis-teacher-name">Teacher Full Name</label>
        <input id="kis-teacher-name" name="fullName"
               type="text" autocomplete="name" required>

        <label for="kis-teacher-number">
          Teacher Number (DepEd Employee Number)
        </label>
        <input id="kis-teacher-number" name="teacherNumber"
               type="text" required>

        <label for="kis-teacher-email">Email Address</label>
        <input id="kis-teacher-email" name="email"
               type="email" autocomplete="email" required>

        <label>Teaching Role</label>

        <div class="kis-teaching-role-options">
          <button type="button"
                  class="kis-role-button kis-teaching-role-option"
                  data-kis-teaching-role="Adviser"
                  aria-pressed="false">
            Adviser
          </button>

          <button type="button"
                  class="kis-role-button kis-teaching-role-option"
                  data-kis-teaching-role="Not an Adviser"
                  aria-pressed="false">
            Not an Adviser
          </button>
        </div>

        <input type="hidden" id="kis-teaching-role"
               name="teachingRole" value="">

        <div id="kis-advisory-fields" hidden>
          <label for="kis-advisory-grade-section">
            Advisory Grade & Section
          </label>
          <select id="kis-advisory-grade-section"
                  name="advisoryGradeSection">
            <option value="">Select Advisory Grade & Section</option>
            <option value="Grade 7 - Amethyst">Grade 7 - Amethyst</option>
            <option value="Grade 8 - Archimedes">Grade 8 - Archimedes</option>
            <option value="Grade 9 - Anthurium">Grade 9 - Anthurium</option>
            <option value="Grade 10 - Aristotle">Grade 10 - Aristotle</option>
          </select>
        </div>

        <label for="kis-teacher-password">Password</label>
        <input id="kis-teacher-password" name="password"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <label for="kis-teacher-confirm">Confirm Password</label>
        <input id="kis-teacher-confirm" name="confirmPassword"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <p class="kis-role-message">
          Complete all fields to continue.
        </p>

        <button type="submit" class="kis-role-button">
          Create Teacher Account
        </button>
      </form>
    `;

    return;
  }

  if (selectedRole === "Parent") {

    const campus = pageContainer.querySelector(".kis-campus-access");
    if (!campus) return;

    campus.innerHTML = `
      <div class="kis-campus-brand">
        <img src="assets/kis-official-logo-transparent.png"
             alt="Katipunan Integrated School Logo">
        <h2>KIS CAMPUS</h2>
        <p>Parent/Guardian Registration</p>
      </div>

      <button type="button" class="kis-role-button"
              id="kis-back-to-roles">
        Back to role selection
      </button>

      <form id="kis-parent-registration"
            class="kis-registration-form">

        <label for="kis-parent-name">Parent/Guardian Full Name</label>
        <input id="kis-parent-name" name="fullName"
               type="text" autocomplete="name" required>

        <div id="kis-parent-children">
          <div class="kis-parent-child-entry">
            <h4>Child 1</h4>

            <label>Child's Student Number (12-digit LRN)
              <input name="childStudentNumber" type="text"
                     inputmode="numeric" pattern="[0-9]{12}"
                     maxlength="12" placeholder="Enter 12-digit LRN"
                     required>
            </label>

            <label>Child's Grade & Section
              <select name="childGradeSection" required>
                <option value="">Select Grade & Section</option>
                <option value="Grade 7 - Amethyst">Grade 7 - Amethyst</option>
                <option value="Grade 8 - Archimedes">Grade 8 - Archimedes</option>
                <option value="Grade 9 - Anthurium">Grade 9 - Anthurium</option>
                <option value="Grade 10 - Aristotle">Grade 10 - Aristotle</option>
              </select>
            </label>
          </div>
        </div>

        <button type="button" class="kis-role-button"
                id="kis-add-parent-child">
          Add Another Child
        </button>

        <template id="kis-parent-child-template">
          <div class="kis-parent-child-entry">
            <h4></h4>

            <label>Child's Student Number (12-digit LRN)
              <input name="childStudentNumber" type="text"
                     inputmode="numeric" pattern="[0-9]{12}"
                     maxlength="12" placeholder="Enter 12-digit LRN"
                     required>
            </label>

            <label>Child's Grade & Section
              <select name="childGradeSection" required>
                <option value="">Select Grade & Section</option>
                <option value="Grade 7 - Amethyst">Grade 7 - Amethyst</option>
                <option value="Grade 8 - Archimedes">Grade 8 - Archimedes</option>
                <option value="Grade 9 - Anthurium">Grade 9 - Anthurium</option>
                <option value="Grade 10 - Aristotle">Grade 10 - Aristotle</option>
              </select>
            </label>

            <button type="button" class="kis-role-button"
                    data-kis-remove-child>
              Remove Child
            </button>
          </div>
        </template>

        <label for="kis-parent-email">Email Address</label>
        <input id="kis-parent-email" name="email"
               type="email" autocomplete="email" required>

        <label for="kis-parent-password">Password</label>
        <input id="kis-parent-password" name="password"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <label for="kis-parent-confirm">Confirm Password</label>
        <input id="kis-parent-confirm" name="confirmPassword"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <p id="kis-parent-registration-message"
           class="kis-role-message">
          Complete all fields to continue.
        </p>

        <button type="submit" class="kis-role-button">
          Create Parent Account
        </button>
      </form>
    `;

    return;
  }

  if (selectedRole === "Student") {

    const campus = pageContainer.querySelector(".kis-campus-access");
    if (!campus) return;

    campus.innerHTML = `
      <div class="kis-campus-brand">
        <img src="assets/kis-official-logo-transparent.png"
             alt="Katipunan Integrated School Logo">
        <h2>KIS CAMPUS</h2>
        <p>Student Registration</p>
      </div>

      <button type="button" class="kis-role-button"
              id="kis-back-to-roles">
        Back to role selection
      </button>

      <form id="kis-student-registration" class="kis-registration-form">

        <label for="kis-student-name">Student Full Name</label>
        <input id="kis-student-name" name="fullName"
               type="text" autocomplete="name" required>

        <label for="kis-student-number">Student Number (12-digit LRN)</label>
        <input id="kis-student-number" name="studentNumber"
               type="text" inputmode="numeric"
               pattern="[0-9]{12}" maxlength="12"
               placeholder="Enter 12-digit LRN" required>

        <label for="kis-student-grade-section">Grade & Section</label>
        <select id="kis-student-grade-section"
                name="gradeSection" required>
          <option value="">Select Grade & Section</option>
          <option value="Grade 7 - Amethyst">Grade 7 - Amethyst</option>
          <option value="Grade 8 - Archimedes">Grade 8 - Archimedes</option>
          <option value="Grade 9 - Anthurium">Grade 9 - Anthurium</option>
          <option value="Grade 10 - Aristotle">Grade 10 - Aristotle</option>
        </select>

        <label for="kis-student-email">Email Address</label>
        <input id="kis-student-email" name="email"
               type="email" autocomplete="email" required>

        <label for="kis-student-password">Password</label>
        <input id="kis-student-password" name="password"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <label for="kis-student-confirm">Confirm Password</label>
        <input id="kis-student-confirm" name="confirmPassword"
               type="password" minlength="8"
               autocomplete="new-password" required>

        <p id="kis-student-registration-message"
           class="kis-role-message">
          Complete all fields to continue.
        </p>

        <button type="submit" class="kis-role-button">
          Create Student Account
        </button>

      </form>
    `;

    return;
  }

  const message = document.querySelector("#kis-role-selection-message");

  if (message) {
    message.textContent =
      selectedRole + " selected. Registration setup is coming next.";
  }

  document.querySelectorAll(".kis-role-button").forEach(button => {
    button.setAttribute(
      "aria-pressed",
      button === roleButton ? "true" : "false"
    );
  });

});


// KIS SIGN-IN SHOW/HIDE PASSWORD
main.addEventListener("click", event => {
  const toggle = event.target.closest("#kis-toggle-signin-password");
  if (!toggle) return;

  const password = main.querySelector("#kis-signin-password");
  const icon = toggle.querySelector("i");

  if (!password || !icon) return;

  const showing = password.type === "password";

  password.type = showing ? "text" : "password";
  toggle.setAttribute("aria-label", showing ? "Hide password" : "Show password");
  toggle.setAttribute("aria-pressed", showing ? "true" : "false");

  icon.classList.toggle("fa-eye", !showing);
  icon.classList.toggle("fa-eye-slash", showing);
});

// KIS CAMPUS SIGN-IN NAVIGATION
main.addEventListener("click", event => {
  const signInButton = event.target.closest("[data-kis-campus-signin]");

  if (signInButton) {
    kisRenderCampusSignIn(signInButton.dataset.kisCampusSignin);
    return;
  }

  if (event.target.closest("#kis-back-to-campus-options")) {
    showPage("Account");
  }
});

// KIS TEACHING ROLE CARD SELECTION
main.addEventListener("click", event => {

  const roleButton = event.target.closest("[data-kis-teaching-role]");
  if (!roleButton) return;

  const form = document.querySelector("#kis-teacher-registration");
  if (!form) return;

  const selectedRole = roleButton.dataset.kisTeachingRole;
  const roleInput = form.elements.teachingRole;
  const advisoryFields = form.querySelector("#kis-advisory-fields");
  const advisorySelect = form.querySelector(
    "#kis-advisory-grade-section"
  );

  roleInput.value = selectedRole;

  form.querySelectorAll("[data-kis-teaching-role]").forEach(button => {
    button.setAttribute(
      "aria-pressed",
      button === roleButton ? "true" : "false"
    );
  });

  const isAdviser = selectedRole === "Adviser";

  advisoryFields.hidden = !isAdviser;
  advisorySelect.required = isAdviser;

  if (!isAdviser) {
    advisorySelect.value = "";
  }
});


// =========================================
// KIS CAMPUS FIREBASE SIGN-IN HANDLER
// =========================================

main.addEventListener("submit", async event => {
  const form = event.target;

  if (form.id !== "kis-campus-signin") return;

  event.preventDefault();

  const message = form.querySelector("#kis-signin-message");
  const submitButton = form.querySelector('button[type="submit"]');

  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;
  const selectedRole = form.elements.selectedRole.value.toLowerCase();

  if (!window.kisFirebaseReady || !window.kisAuth || !window.kisDb) {
    message.textContent = "Firebase is unavailable. Please try again.";
    return;
  }

  if (submitButton) submitButton.disabled = true;

  message.textContent = "Verifying your account...";

  let authenticatedUser = null;

  try {
    const credential = await kisAuth.signInWithEmailAndPassword(
      email,
      password
    );

    authenticatedUser = credential.user;


    const profileDoc = await kisDb
      .collection("users")
      .doc(authenticatedUser.uid)
      .get();

    if (!profileDoc.exists) {
      await kisAuth.signOut();
      message.textContent =
        "No authorized Campus profile was found for this account.";
      return;
    }

    const profile = profileDoc.data();

    if (profile.role !== selectedRole) {
      await kisAuth.signOut();
      message.textContent =
        "This account does not belong to the selected role.";
      return;
    }

    if (profile.status !== "approved") {
      await kisAuth.signOut();

      if (profile.status === "pending") {
        message.textContent =
          "Your registration is awaiting administrator approval.";
      } else if (profile.status === "rejected") {
        message.textContent =
          "Your registration was not approved. Please contact the school administrator.";
      } else {
        message.textContent =
          "Your account is not authorized to access KIS Campus.";
      }

      return;
    }

    window.kisCampusUser = {
      uid: authenticatedUser.uid,
      role: profile.role,
      status: profile.status,
      fullName: profile.fullName || "",
      email: authenticatedUser.email || profile.email || ""
    };

    if (profile.role === "student") {
      window.kisCampusUser.studentNumber =
        profile.studentNumber || "";

      window.kisCampusUser.gradeSection =
        profile.gradeSection || "";

    } else if (profile.role === "parent") {
      // Parent access will use administrator-approved child links.
      window.kisCampusUser.role = "parent";

    } else if (profile.role === "teacher") {
      // Declared teaching role does not grant class assignments.
      window.kisCampusUser.teachingRole =
        profile.teachingRole || "";

      window.kisCampusUser.advisoryGradeSection =
        profile.teachingRole === "Adviser"
          ? profile.advisoryGradeSection || ""
          : "";
    }

    showPage("Home");

  } catch (error) {
    console.error("KIS Campus sign-in error:", error);

    if (authenticatedUser) {
      try {
        await kisAuth.signOut();
      } catch (signOutError) {
        console.error("Campus sign-out after error failed:", signOutError);
      }
    }

    const messages = {
      "auth/invalid-credential":
        "Incorrect email or password.",
      "auth/user-disabled":
        "This account is disabled. Contact the school administrator.",
      "auth/too-many-requests":
        "Too many attempts. Please try again later.",
      "auth/network-request-failed":
        "Network error. Check your internet connection."
    };

    message.textContent =
      messages[error.code] ||
      "Sign-in could not be completed. Please try again.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});


// =========================================
// KIS CAMPUS FIREBASE REGISTRATION HANDLER
// =========================================

main.addEventListener("submit", async event => {
  const form = event.target;

  if (
    form.id !== "kis-student-registration" &&
    form.id !== "kis-parent-registration" &&
    form.id !== "kis-teacher-registration"
  ) return;

  event.preventDefault();

  const message = form.querySelector(".kis-role-message");
  const submitButton = form.querySelector('button[type="submit"]');

  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  const isStudent = form.id === "kis-student-registration";
  const isParent = form.id === "kis-parent-registration";
  const isTeacher = form.id === "kis-teacher-registration";

  const fullName = form.elements.fullName.value.trim();
  const email = form.elements.email.value.trim().toLowerCase();

  if (fullName.length < 2 || fullName.length > 100 || !email) {
    message.textContent = "Please enter a valid name and email address.";
    return;
  }

  const validSections = [
    "Grade 7 - Amethyst",
    "Grade 8 - Archimedes",
    "Grade 9 - Anthurium",
    "Grade 10 - Aristotle"
  ];

  let profileData = null;
  let parentChildren = [];

  if (isStudent) {
    const studentNumber = form.elements.studentNumber.value.trim();
    const gradeSection = form.elements.gradeSection.value;

    if (!/^[0-9]{12}$/.test(studentNumber)) {
      message.textContent = "Enter a valid 12-digit Student Number.";
      return;
    }

    if (!validSections.includes(gradeSection)) {
      message.textContent = "Please select a valid Grade & Section.";
      return;
    }

    profileData = {
      role: "student",
      studentNumber,
      gradeSection
    };
  }

  if (isParent) {
    const entries = [
      ...form.querySelectorAll(".kis-parent-child-entry")
    ];

    if (!entries.length || entries.length > 10) {
      message.textContent = "Register between 1 and 10 children.";
      return;
    }

    for (const entry of entries) {
      const studentNumber =
        entry.querySelector('[name="childStudentNumber"]').value.trim();

      const gradeSection =
        entry.querySelector('[name="childGradeSection"]').value;

      if (!/^[0-9]{12}$/.test(studentNumber)) {
        message.textContent =
          "Each child must have a valid 12-digit Student Number.";
        return;
      }

      if (!validSections.includes(gradeSection)) {
        message.textContent =
          "Please select a valid Grade & Section for every child.";
        return;
      }

      parentChildren.push({
        childStudentNumber: studentNumber,
        childGradeSection: gradeSection
      });
    }

    const childNumbers = parentChildren.map(
      child => child.childStudentNumber
    );

    if (new Set(childNumbers).size !== childNumbers.length) {
      message.textContent =
        "The same Student Number cannot be entered more than once.";
      return;
    }

    profileData = { role: "parent" };
  }

  if (isTeacher) {
    const teacherNumber = form.elements.teacherNumber.value.trim();
    const teachingRole = form.elements.teachingRole.value;
    const advisoryGradeSection =
      form.elements.advisoryGradeSection.value;

    if (teacherNumber.length < 3 || teacherNumber.length > 30) {
      message.textContent = "Enter a valid Teacher Number.";
      return;
    }

    if (!["Adviser", "Not an Adviser"].includes(teachingRole)) {
      message.textContent = "Please select your Teaching Role.";
      return;
    }

    if (
      teachingRole === "Adviser" &&
      !validSections.includes(advisoryGradeSection)
    ) {
      message.textContent =
        "Please select your Advisory Grade & Section.";
      return;
    }

    profileData = {
      role: "teacher",
      teacherNumber,
      teachingRole
    };

    if (teachingRole === "Adviser") {
      profileData.advisoryGradeSection = advisoryGradeSection;
    }
  }

  if (!window.kisFirebaseReady || !window.kisAuth || !window.kisDb) {
    message.textContent = "Firebase is not available. Please try again.";
    return;
  }

  if (kisAuth.currentUser) {
    message.textContent =
      "A Firebase account is currently signed in. Please sign out first.";
    return;
  }

  let createdUser = null;
  let profileCreated = false;
  let savedChildRequests = 0;

  if (submitButton) submitButton.disabled = true;

  message.textContent = "Creating your account...";

  try {
    const credential = await kisAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    createdUser = credential.user;

    const userProfile = {
      uid: createdUser.uid,
      role: profileData.role,
      status: "pending",
      fullName,
      email: createdUser.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (isStudent) {
      userProfile.studentNumber = profileData.studentNumber;
      userProfile.gradeSection = profileData.gradeSection;
    }

    if (isTeacher) {
      userProfile.teacherNumber = profileData.teacherNumber;
      userProfile.teachingRole = profileData.teachingRole;

      if (profileData.teachingRole === "Adviser") {
        userProfile.advisoryGradeSection =
          profileData.advisoryGradeSection;
      }
    }

    await kisDb.collection("users")
      .doc(createdUser.uid)
      .set(userProfile);

    profileCreated = true;

    if (isParent) {
      for (const child of parentChildren) {
        await kisDb.collection("parentChildRequests").add({
          parentUid: createdUser.uid,
          childStudentNumber: child.childStudentNumber,
          childGradeSection: child.childGradeSection,
          status: "pending",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        savedChildRequests++;
      }
    }

    await kisAuth.signOut();

    form.reset();

    message.textContent = isParent
      ? "Parent registration submitted. Your account and child relationship requests are awaiting administrator review."
      : "Registration submitted successfully. Your account is awaiting administrator approval.";

  } catch (error) {
    console.error("KIS registration error:", error);

    if (createdUser && !profileCreated) {
      try {
        await createdUser.delete();
      } catch (cleanupError) {
        console.error("Account cleanup failed:", cleanupError);

        message.textContent =
          "Registration failed. An account may need administrator review. Please contact the school administrator.";
        return;
      }
    }

    if (createdUser && profileCreated && kisAuth.currentUser) {
      try {
        await kisAuth.signOut();
      } catch (signOutError) {
        console.error("Registration sign-out failed:", signOutError);
      }
    }

    if (profileCreated && isParent) {
      message.textContent =
        `Your Parent account was created, but only ${savedChildRequests} of ${parentChildren.length} child requests were saved. Please contact the administrator before registering again.`;
    } else if (profileCreated) {
      message.textContent =
        "Your registration was saved, but sign-out or finalization failed. Please sign out manually and contact the administrator if necessary.";
    } else {
      const messages = {
        "auth/email-already-in-use":
          "This email address already has an account.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/weak-password":
          "Please choose a stronger password.",
        "auth/network-request-failed":
          "Network error. Check your internet connection."
      };

      message.textContent =
        messages[error.code] ||
        "Registration failed. Please try again.";
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

// Shared sign-out function for Campus and Admin Studio
window.kisCampusSignOut = async function(button = null) {
  if (button) button.disabled = true;

  try {
    if (window.kisAuth?.currentUser) {
      await window.kisAuth.signOut();
    }

    window.kisCampusUser = null;
    showPage("Account");
    return true;

  } catch (error) {
    console.error("KIS Campus sign-out failed:", error);
    if (button) button.disabled = false;
    alert("Sign-out failed. Please try again.");
    return false;
  }
};


// PARENT ADD-CHILD REQUEST SUBMISSION
main.addEventListener("click", async event => {
  const button = event.target.closest(
    "#kis-submit-parent-child-request"
  );

  if (!button) return;

  event.preventDefault();

  const message = document.getElementById(
    "kis-parent-child-request-message"
  );
  const studentInput = document.getElementById(
    "kis-new-child-student-number"
  );
  const sectionInput = document.getElementById(
    "kis-new-child-grade-section"
  );

  const user = window.kisAuth?.currentUser;
  const profile = window.kisCampusUser;

  const showMessage = text => {
    if (message) message.textContent = text;
  };

  if (
    !user ||
    profile?.role !== "parent" ||
    profile?.status !== "approved" ||
    !window.kisDb
  ) {
    showMessage(
      "Only approved Parent accounts can submit child requests."
    );
    return;
  }

  const studentNumber = studentInput?.value.trim() || "";
  const gradeSection = sectionInput?.value || "";

  const validSections = [
    "Grade 7 - Amethyst",
    "Grade 8 - Archimedes",
    "Grade 9 - Anthurium",
    "Grade 10 - Aristotle"
  ];

  if (!/^[0-9]{12}$/.test(studentNumber)) {
    showMessage("Enter a valid 12-digit Student Number.");
    return;
  }

  if (!validSections.includes(gradeSection)) {
    showMessage("Please select a valid Grade & Section.");
    return;
  }

  button.disabled = true;
  showMessage("Checking existing requests...");

  try {
    const existingSnapshot = await window.kisDb
      .collection("parentChildRequests")
      .where("parentUid", "==", user.uid)
      .get();

    const duplicate = existingSnapshot.docs.some(doc => {
      const request = doc.data();

      return (
        request.childStudentNumber === studentNumber &&
        ["pending", "approved"].includes(
          String(request.status || "").toLowerCase()
        )
      );
    });

    if (duplicate) {
      showMessage(
        "A pending or approved request already exists for this Student Number."
      );
      return;
    }

    await window.kisDb
      .collection("parentChildRequests")
      .add({
        parentUid: user.uid,
        childStudentNumber: studentNumber,
        childGradeSection: gradeSection,
        status: "pending",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    studentInput.value = "";
    sectionInput.value = "";

    showMessage(
      "Child request submitted successfully. It is awaiting administrator verification."
    );

    await kisLoadParentChildRequests();

  } catch (error) {
    console.error("Parent child request submission failed:", error);
    showMessage(
      "Unable to submit the request. Check your connection and try again."
    );

  } finally {
    button.disabled = false;
  }
});

// KIS CAMPUS SHARED SIGN-OUT HANDLER
main.addEventListener("click", async event => {
  const button = event.target.closest("#kis-campus-signout");
  if (!button) return;

  await window.kisCampusSignOut(button);
});

// BACK BUTTON NAVIGATION
// BACK BUTTON NAVIGATION

main.addEventListener("click", event => {

  if (!event.target.closest("#kis-back")) return;

  const currentHeading = pageContainer
    .querySelector(".page-heading h2")
    ?.textContent.trim();

  const isSubjectPage = Boolean(
    pageContainer.querySelector('[data-kis-page="subject"]')
  );

  const isLessonPage = Boolean(
    pageContainer.querySelector('[data-kis-page="lesson"]')
  );

  if (isLessonPage) {

    pageContainer.innerHTML = subjectPageHTML;

    window.scrollTo({ top: 0, behavior: "smooth" });

  } else if (isSubjectPage) {

    pageContainer.innerHTML = lessonsPageHTML;

    window.scrollTo({ top: 0, behavior: "smooth" });

  } else if (currentHeading === "Lessons") {

    showPage("Home");

  } else {

    showPage("Home");

  }

});

  // STUDENT DIGITAL ID MODAL
main.addEventListener("click", event => {
  const openButton = event.target.closest("#kis-open-digital-id");

  if (!openButton) return;

  const profile = window.kisCampusUser;

  if (!profile || profile.role !== "student") return;

  const existingModal = document.getElementById("kis-digital-id-modal");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.id = "kis-digital-id-modal";
  modal.className = "kis-digital-id-modal";

  const safeName = kisCalendarEscape(profile.fullName || "Not provided");
  const safeGrade = kisCalendarEscape(profile.gradeSection || "Not provided");

  const number = String(profile.studentNumber || "");
  const masked = number.length >= 4
    ? "••••••••" + kisCalendarEscape(number.slice(-4))
    : "Not available";

  modal.innerHTML = `
    <div class="kis-digital-id-card">

      <button type="button"
        class="kis-digital-id-close"
        aria-label="Close Digital ID">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="kis-digital-id-heading">
        <h2>KATIPUNAN INTEGRATED SCHOOL</h2>
        <p>THE ROADWAY TO SUCCESS</p>
        <span>DIGITAL LEARNER ID</span>
      </div>

      <div class="kis-digital-id-body">

        <div class="kis-digital-id-photo">
          <i class="fa-solid fa-user"></i>
        </div>

        <h3>${safeName}</h3>
        <p>${safeGrade}</p>

        <div class="kis-digital-id-details">
          <p><strong>STUDENT NUMBER</strong><br>${masked}</p>
          <p><strong>SCHOOL YEAR</strong><br>2026–2027</p>
        </div>

        <div class="kis-digital-id-qr">
          <div id="kis-digital-id-qr-code"></div>
          <p>STUDENT QR CODE</p>
          <small id="kis-digital-id-qr-status">
            Generating temporary demo QR...
          </small>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const qrContainer = modal.querySelector("#kis-digital-id-qr-code");
  const qrStatus = modal.querySelector("#kis-digital-id-qr-status");

  if (typeof QRCode === "function" &&
      window.crypto?.getRandomValues) {

    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);

    const reference = Array.from(
      randomBytes,
      byte => byte.toString(16).padStart(2, "0")
    ).join("");

    new QRCode(qrContainer, {
      text: `KIS-DEMO:${reference}`,
      width: 180,
      height: 180,
      colorDark: "#14532d",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });

    qrStatus.textContent =
      "Demo QR only — not verified for identity or attendance.";
  } else {
    qrStatus.textContent = "QR generation is unavailable on this device.";
  }

  modal.querySelector(".kis-digital-id-close")
    .addEventListener("click", () => modal.remove());

  modal.addEventListener("click", event => {
    if (event.target === modal) modal.remove();
  });
});

// Account profile button
  const profileButton = document.querySelector(".profile-button");

  if (profileButton) {
    profileButton.addEventListener("click", () => {
      showPage(window.kisCampusUser ? "Profile" : "Account");
    });
  }


// LIVE LEARNING CENTER SEARCH

main.addEventListener("input", event => {

  if (event.target.id !== "kis-learning-search") return;

  const query = event.target.value.toLowerCase().trim();

  const cards = pageContainer.querySelectorAll(".feature-card");

  let visibleCount = 0;

  cards.forEach(card => {

    const matches = card.textContent.toLowerCase().includes(query);

    card.hidden = !matches;

    if (matches) visibleCount++;

  });

  const emptyState = pageContainer.querySelector("#kis-search-empty");

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }

});


  // Open Admin Studio only for the authorized Firebase administrator.
  window.kisOpenAdminStudio = function() {

    if (
      !window.kisCampusUser ||
      typeof kisIsAdmin !== "function" ||
      !kisIsAdmin()
    ) {
      alert("Access denied. Administrator authorization is required.");
      return;
    }

    pageContainer.hidden = false;
    kisRenderAdminDashboard();

  };

  // Initial screen
  showPage("Home");

  console.log("KIS navigation initialized successfully!");

});
