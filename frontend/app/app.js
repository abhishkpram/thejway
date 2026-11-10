const fleet = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `bus-${number}`,
    label: `Bus ${number}`,
    route: `Demo route ${number}`,
  };
});

const riders = [
  { id: "student-01", name: "Demo student 01", role: "Student", stop: "Demo stop 01" },
  { id: "student-02", name: "Demo student 02", role: "Student", stop: "Demo stop 01" },
  { id: "faculty-01", name: "Demo faculty 01", role: "Faculty", stop: "Demo stop 02" },
];

const demoDriver = {
  name: "Demo driver",
  phone: "Not configured in this demo",
  initials: "DD",
};

const initialAssignments = new Map(riders.map((rider) => [rider.id, "bus-01"]));
const state = {
  role: "student",
  absences: new Set(),
  assignments: new Map(initialAssignments),
};

const dashboard = document.querySelector("#dashboard");
const roleGroup = document.querySelector(".segmented");
const resetButton = document.querySelector("#reset-demo");
const announcement = document.querySelector("#live-announcement");
const heroEyebrow = document.querySelector("#hero-eyebrow");
const viewTitle = document.querySelector("#view-title");
const viewSubtitle = document.querySelector("#view-subtitle");
const todayLabel = document.querySelector("#today-label");
const bottomNav = document.querySelector("#bottom-nav");

let focusAfterRender = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function icon(name) {
  return `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
}

function initials(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getBus(busId) {
  return fleet.find((bus) => bus.id === busId) || null;
}

function getAssignedBus(riderId) {
  return getBus(state.assignments.get(riderId));
}

function getActiveRider() {
  return state.role === "faculty"
    ? riders.find((rider) => rider.role === "Faculty")
    : riders.find((rider) => rider.role === "Student");
}

function setIntro(eyebrow, title, subtitle) {
  heroEyebrow.textContent = eyebrow;
  viewTitle.textContent = title;
  viewSubtitle.textContent = subtitle;
}

function announce(message) {
  announcement.textContent = message;
}

function renderRoleButtons() {
  roleGroup.querySelectorAll("[data-role]").forEach((button) => {
    const active = button.dataset.role === state.role;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderNav(items) {
  bottomNav.innerHTML = items.map((item, index) => `
    <a class="nav-item" href="${escapeHtml(item.href)}" ${index === 0 ? 'aria-current="page"' : ""}>
      ${icon(item.icon)}
      <span>${escapeHtml(item.label)}</span>
    </a>
  `).join("");
}

function renderMapPreview() {
  return `
    <div class="map-canvas" role="img" aria-label="Stylised route preview. Live GPS and Google Maps are not connected.">
      <span class="status-pill status-warning map-preview-pill">Preview only</span>
      <svg class="map-svg" viewBox="0 0 390 260" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 38 222 C 92 190, 112 168, 160 144 C 212 118, 252 92, 344 38" stroke="#818cf8" stroke-opacity="0.28" stroke-linecap="round" stroke-width="14"></path>
        <path d="M 38 222 C 92 190, 112 168, 160 144" stroke="#674bb5" stroke-linecap="round" stroke-width="5"></path>
        <path d="M 160 144 C 212 118, 252 92, 344 38" stroke="#818cf8" stroke-dasharray="8 5" stroke-linecap="round" stroke-width="5"></path>
        <circle cx="38" cy="222" r="9" fill="#c7d2fe" fill-opacity="0.7"></circle>
        <circle cx="38" cy="222" r="5" fill="#674bb5"></circle>
        <circle cx="160" cy="144" r="4.5" fill="#674bb5"></circle>
        <circle cx="244" cy="103" r="6" fill="#818cf8" fill-opacity="0.45"></circle>
        <circle cx="244" cy="103" r="3.5" fill="#4953bc"></circle>
        <circle cx="344" cy="38" r="12" fill="#ffdad6" fill-opacity="0.8"></circle>
        <circle cx="344" cy="38" r="7" fill="#ba1a1a"></circle>
      </svg>
      <div class="map-bus" aria-hidden="true">${icon("directions_bus")}</div>
      <div class="map-overlay">
        <strong>${icon("location_off")} Live tracking is unavailable</strong>
        <span>No GPS feed or Google Maps service is connected. This is a design preview only.</span>
      </div>
    </div>
  `;
}

function renderRiderView() {
  const rider = getActiveRider();
  const bus = getAssignedBus(rider.id);
  const absent = state.absences.has(rider.id);
  const roleName = state.role === "faculty" ? "Faculty" : "Student";
  const attendanceText = absent ? "Marked absent today" : "Expected to ride today";
  const attendanceClass = absent ? "status-absent" : "status-expected";
  const busNumber = bus ? bus.label.replace("Bus ", "") : "--";
  const assignedStop = rider.stop;

  setIntro(
    `${roleName} dashboard`,
    `${roleName} ride overview`,
    `${rider.name} · Your assigned transportation and today's ride status.`,
  );

  return `
    <div class="dashboard-grid">
      <section class="panel panel-wide" aria-labelledby="ride-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("directions_bus")}</span>
            <div>
              <h2 id="ride-heading">Today's ride</h2>
              <p class="panel-copy">Your assignment is managed by the college admin.</p>
            </div>
          </div>
          <span class="status-pill ${attendanceClass}">${attendanceText}</span>
        </div>

        <div class="ride-card">
          <div class="ride-identity">
            <div class="bus-badge" aria-hidden="true">
              ${icon("directions_bus")}
              <strong>${escapeHtml(busNumber)}</strong>
            </div>
            <div class="ride-identity-copy">
              <span class="overline">Assigned bus</span>
              <strong class="ride-title">${bus ? escapeHtml(bus.label) : "Not assigned"}</strong>
              <span class="ride-route">${bus ? escapeHtml(bus.route) : "Ask the college admin for an assignment."}</span>
            </div>
          </div>

          <div class="ride-stats">
            <div class="ride-stat">
              ${icon("route")}
              <span><small>Route</small><strong>${bus ? escapeHtml(bus.route) : "Not assigned"}</strong></span>
            </div>
            <div class="ride-stat">
              ${icon("person")}
              <span><small>Driver</small><strong>${escapeHtml(demoDriver.name)}</strong></span>
            </div>
            <div class="ride-stat">
              ${icon("location_on")}
              <span><small>Your stop</small><strong>${escapeHtml(assignedStop)}</strong></span>
            </div>
          </div>
        </div>

        <label class="attendance-control" id="attendance-heading" for="absence-toggle">
          <span class="attendance-icon">${icon("event_busy")}</span>
          <span class="attendance-copy">
            <strong>I will not be on the bus today</strong>
            <small>Only mark this when you will not travel. If you do nothing, the driver sees you as expected.</small>
          </span>
          <span class="switch">
            <input id="absence-toggle" type="checkbox" data-absence="${escapeHtml(rider.id)}" ${absent ? "checked" : ""}>
            <span class="switch-track" aria-hidden="true"></span>
          </span>
        </label>
      </section>

      <section class="panel panel-narrow" aria-labelledby="driver-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("support_agent")}</span>
            <div>
              <h2 id="driver-heading">Route driver</h2>
              <p class="panel-copy">The driver assigned to your bus.</p>
            </div>
          </div>
        </div>
        <div class="list-stack">
          <div class="person-row">
            <div class="person">
              <span class="avatar avatar-primary" aria-hidden="true">${escapeHtml(demoDriver.initials)}</span>
              <span class="person-copy">
                <strong>${escapeHtml(demoDriver.name)}</strong>
                <small>Assigned route driver</small>
              </span>
            </div>
          </div>
          <div class="person-row">
            <div class="person">
              <span class="avatar avatar-sky" aria-hidden="true">${icon("call")}</span>
              <span class="person-copy">
                <strong>Mobile number</strong>
                <small>${escapeHtml(demoDriver.phone)}</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel panel-wide" aria-labelledby="location-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("near_me")}</span>
            <div>
              <h2 id="location-heading">Bus location</h2>
              <p class="panel-copy">The production app is intended to show the driver's phone location.</p>
            </div>
          </div>
          <span class="status-pill status-offline">Not connected</span>
        </div>
        ${renderMapPreview()}
      </section>

      <aside class="panel panel-narrow" aria-labelledby="phase-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("verified_user")}</span>
            <div>
              <h2 id="phase-heading">Release scope</h2>
            </div>
          </div>
        </div>
        <p class="phase-note" style="margin-top: 0.8rem;">
          Absence marking and bus tracking are Phase 1. Fee details and payments are deferred to Phase 2.
        </p>
      </aside>
    </div>
  `;
}

function renderDriverView() {
  const bus = getBus("bus-01");
  const stopIds = ["Demo stop 01", "Demo stop 02"];
  const stopCards = stopIds.map((stop, index) => {
    const stopRiders = riders.filter((rider) =>
      rider.stop === stop && state.assignments.get(rider.id) === bus.id
    );
    const allAbsent = stopRiders.length > 0
      && stopRiders.every((rider) => state.absences.has(rider.id));
    const statusClass = stopRiders.length === 0
      ? "status-neutral"
      : allAbsent ? "status-pass" : "status-stop";
    const statusText = stopRiders.length === 0
      ? "No demo riders mapped"
      : allAbsent ? "Eligible to pass" : "Expected rider — plan to stop";
    const riderRows = stopRiders.length
      ? stopRiders.map((rider) => {
        const absent = state.absences.has(rider.id);
        return `
          <div class="rider-row">
            <div class="person">
              <span class="avatar ${absent ? "avatar-sky" : "avatar-primary"}" aria-hidden="true">${escapeHtml(initials(rider.name))}</span>
              <span class="person-copy">
                <strong>${escapeHtml(rider.name)}</strong>
                <small>${escapeHtml(rider.role)} · ${escapeHtml(rider.stop)}</small>
              </span>
            </div>
            <span class="status-pill ${absent ? "status-absent" : "status-expected"}">${absent ? "Absent" : "Expected"}</span>
          </div>
        `;
      }).join("")
      : `<div class="empty-state">${icon("person_off")}<strong>No demo riders mapped</strong><span>Stop assignment is not configured for this demo.</span></div>`;

    return `
      <article class="panel panel-wide stop-card" aria-labelledby="stop-${index + 1}-heading">
        <div class="stop-marker" aria-hidden="true">
          <span class="stop-index">${index + 1}</span>
          <span class="stop-line"></span>
        </div>
        <div class="stop-content">
          <div class="panel-heading">
            <div>
              <span class="overline">Upcoming stop ${index + 1}</span>
              <h2 id="stop-${index + 1}-heading">${escapeHtml(stop)}</h2>
            </div>
            <span class="status-pill ${statusClass}">${statusText}</span>
          </div>
          <div class="list-stack">${riderRows}</div>
        </div>
      </article>
    `;
  }).join("");

  setIntro(
    "Driver dashboard",
    `${bus.label} · ${bus.route}`,
    "Upcoming rider status for the demo bus. The route itself does not change.",
  );

  return `
    <div class="dashboard-grid">
      <section class="panel panel-full route-banner" aria-labelledby="route-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("alt_route")}</span>
            <div>
              <h2 id="route-heading">${escapeHtml(bus.label)} · ${escapeHtml(bus.route)}</h2>
              <p class="panel-copy">The route is assigned to the driver or bus. This sample route is not real route data.</p>
            </div>
          </div>
          <span class="status-pill status-offline">Phone GPS not connected</span>
        </div>
        <div class="route-track" aria-hidden="true">
          ${stopIds.map((stop, index) => `
            <div class="route-stop ${index === 0 ? "is-current" : ""}">
              <span class="route-stop-dot"></span>
              <small>${escapeHtml(stop)}</small>
            </div>
          `).join("")}
        </div>
      </section>

      ${stopCards}

      <aside class="panel panel-full" id="share-heading" aria-labelledby="share-title">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("sensors")}</span>
            <div>
              <h2 id="share-title">Phone GPS sharing</h2>
              <p class="panel-copy">Production will share the driver's phone location through the app; no separate GPS hardware is required.</p>
            </div>
          </div>
          <span class="status-pill status-offline">Not connected</span>
        </div>
        <p class="phase-note" style="margin-top: 0.8rem;">
          This demo does not request location permission or send coordinates anywhere. GPS cadence, stale-location handling, and offline behavior remain open decisions.
        </p>
      </aside>

      <aside class="panel panel-full" id="driver-decision" aria-labelledby="decision-title">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("fact_check")}</span>
            <div>
              <h2 id="decision-title">Driver decision</h2>
            </div>
          </div>
        </div>
        <p class="phase-note" style="margin-top: 0.8rem;">
          <strong>Eligible to pass</strong> means every demo rider at that stop marked absent. The app does not automatically alter the route or direct a real driver.
        </p>
      </aside>
    </div>
  `;
}

function renderAdminView() {
  setIntro(
    "Admin dashboard",
    "Fleet & route control",
    "Assign demo riders to a bus and its route. Students cannot change these assignments.",
  );

  const assignmentCards = riders.map((rider) => {
    const assignedBusId = state.assignments.get(rider.id);
    const assignedBus = getBus(assignedBusId);
    const options = fleet.map((bus) => `
      <option value="${escapeHtml(bus.id)}" ${bus.id === assignedBusId ? "selected" : ""}>
        ${escapeHtml(bus.label)}
      </option>
    `).join("");

    return `
      <article class="assignment-card">
        <div class="assignment-person">
          <span class="avatar avatar-primary" aria-hidden="true">${escapeHtml(initials(rider.name))}</span>
          <span class="person-copy">
            <strong>${escapeHtml(rider.name)}</strong>
            <small>${escapeHtml(rider.role)} · ${escapeHtml(rider.stop)}</small>
          </span>
        </div>
        <div class="assignment-fields">
          <label class="field" for="assignment-${escapeHtml(rider.id)}">
            <span>Assigned bus</span>
            <select id="assignment-${escapeHtml(rider.id)}" data-assignment="${escapeHtml(rider.id)}">
              ${options}
            </select>
          </label>
          <div class="field">
            <span>Route</span>
            <div class="assignment-route">${icon("route")}${assignedBus ? escapeHtml(assignedBus.route) : "Not assigned"}</div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  return `
    <div class="dashboard-grid">
      <div class="kpi-grid" id="admin-overview" aria-label="Demo fleet summary">
        <div class="kpi-card">
          <div class="kpi-copy">
            <span>Total fleet</span>
            <strong>${fleet.length}</strong>
            <small>Demo buses</small>
          </div>
          <span class="kpi-icon">${icon("directions_bus")}</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-copy">
            <span>Riders</span>
            <strong>${riders.length}</strong>
            <small>Students &amp; faculty</small>
          </div>
          <span class="kpi-icon sky">${icon("group")}</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-copy">
            <span>Mapped stops</span>
            <strong>2</strong>
            <small>Demo stop data</small>
          </div>
          <span class="kpi-icon">${icon("location_on")}</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-copy">
            <span>Release</span>
            <strong>Phase 1</strong>
            <small>Payments deferred</small>
          </div>
          <span class="kpi-icon rose">${icon("payments")}</span>
        </div>
      </div>

      <section class="panel panel-full" aria-labelledby="assignment-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("group")}</span>
            <div>
              <h2 id="assignment-heading">Rider assignments</h2>
              <p class="panel-copy">Only the admin view can edit bus assignments. Each bus maps to a demo route.</p>
            </div>
          </div>
          <span class="status-pill status-expected">${fleet.length} demo buses</span>
        </div>
        <div class="assignment-grid">${assignmentCards}</div>
      </section>

      <aside class="panel panel-full" id="admin-boundary" aria-labelledby="boundary-heading">
        <div class="panel-heading">
          <div class="panel-title">
            <span class="panel-icon">${icon("verified_user")}</span>
            <div>
              <h2 id="boundary-heading">Production boundary</h2>
            </div>
          </div>
        </div>
        <p class="phase-note" style="margin-top: 0.8rem;">
          This browser-only demo does not authenticate admins or save assignments to the cloud. The production role-provisioning method is still undecided.
        </p>
      </aside>
    </div>
  `;
}

function render() {
  renderRoleButtons();

  if (state.role === "student" || state.role === "faculty") {
    dashboard.innerHTML = renderRiderView();
    renderNav([
      { label: "Home", icon: "home", href: "#ride-heading" },
      { label: "Live GPS", icon: "near_me", href: "#location-heading" },
      { label: "Attendance", icon: "event_busy", href: "#attendance-heading" },
      { label: "Driver", icon: "person", href: "#driver-heading" },
    ]);
  } else if (state.role === "driver") {
    dashboard.innerHTML = renderDriverView();
    renderNav([
      { label: "Route", icon: "alt_route", href: "#route-heading" },
      { label: "Stops", icon: "list_alt", href: "#stop-1-heading" },
      { label: "Share GPS", icon: "sensors", href: "#share-heading" },
      { label: "Decision", icon: "fact_check", href: "#driver-decision" },
    ]);
  } else if (state.role === "admin") {
    dashboard.innerHTML = renderAdminView();
    renderNav([
      { label: "Overview", icon: "dashboard", href: "#admin-overview" },
      { label: "Riders", icon: "group", href: "#assignment-heading" },
      { label: "Scope", icon: "verified_user", href: "#admin-boundary" },
      { label: "Top", icon: "keyboard_arrow_up", href: "#main" },
    ]);
  } else {
    throw new Error(`Unsupported demo role: ${state.role}`);
  }

  if (focusAfterRender) {
    const selector = focusAfterRender;
    focusAfterRender = null;
    requestAnimationFrame(() => document.querySelector(selector)?.focus());
  }
}

roleGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) {
    return;
  }
  state.role = button.dataset.role;
  render();
  announce(`Showing the ${button.dataset.label} demo view.`);
});

dashboard.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }

  if (target.matches("[data-absence]")) {
    const riderId = target.dataset.absence;
    if (target.checked) {
      state.absences.add(riderId);
    } else {
      state.absences.delete(riderId);
    }
    focusAfterRender = "#absence-toggle";
    render();
    announce(target.checked ? "You are marked absent in demo data." : "You are expected to ride in demo data.");
    return;
  }

  if (target.matches("[data-assignment]")) {
    if (state.role !== "admin") {
      announce("Only the admin demo view can change assignments.");
      render();
      return;
    }
    const riderId = target.dataset.assignment;
    const bus = getBus(target.value);
    const rider = riders.find((item) => item.id === riderId);
    if (!bus || !rider) {
      throw new Error("The selected demo rider or bus is not configured.");
    }
    state.assignments.set(riderId, bus.id);
    focusAfterRender = `#assignment-${riderId}`;
    render();
    announce(`${rider.name} assigned to ${bus.label} in demo data.`);
  }
});

resetButton.addEventListener("click", () => {
  state.role = "student";
  state.absences.clear();
  state.assignments = new Map(initialAssignments);
  render();
  announce("Demo data reset.");
});

todayLabel.textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
}).format(new Date());

render();
