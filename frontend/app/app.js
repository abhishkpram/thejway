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

const initialAssignments = new Map(riders.map((rider) => [rider.id, "bus-01"]));
const state = {
  role: "student",
  absences: new Set(),
  assignments: new Map(initialAssignments),
};

const roleSelect = document.querySelector("#role-select");
const resetButton = document.querySelector("#reset-demo");
const dashboard = document.querySelector("#dashboard");
const intro = document.querySelector("#view-intro");
const announcement = document.querySelector("#live-announcement");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
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

function setIntro(title, description) {
  intro.innerHTML = `<h1 id="view-title">${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>`;
}

function renderRiderView() {
  const rider = getActiveRider();
  const bus = getAssignedBus(rider.id);
  const absent = state.absences.has(rider.id);
  const roleName = state.role === "faculty" ? "Faculty" : "Student";
  const attendanceText = absent ? "Marked absent today" : "Expected to ride today";
  const attendanceClass = absent ? "status-absent" : "status-expected";

  setIntro(
    `${roleName} dashboard`,
    `${rider.name} · Assigned transportation and today's ride status.`,
  );

  return `
    <div class="dashboard-grid">
      <section class="panel panel-wide" aria-labelledby="ride-heading">
        <div class="panel-heading">
          <div>
            <h2 id="ride-heading">Today's ride</h2>
            <p class="panel-copy">Your assignment is managed by the college admin.</p>
          </div>
          <span class="status-pill ${attendanceClass}">${attendanceText}</span>
        </div>
        <div class="metric-grid">
          <div class="metric"><span>Assigned bus</span><strong>${bus ? escapeHtml(bus.label) : "Not assigned"}</strong></div>
          <div class="metric"><span>Route</span><strong>${bus ? escapeHtml(bus.route) : "Not assigned"}</strong></div>
          <div class="metric"><span>Driver</span><strong>Demo driver</strong></div>
        </div>
        <label class="attendance-control" for="absence-toggle">
          <input id="absence-toggle" type="checkbox" data-absence="${escapeHtml(rider.id)}" ${absent ? "checked" : ""}>
          <span>
            <strong>I will not be on the bus today</strong>
            <small>Only mark this when you will not travel. If you do nothing, the driver sees you as expected.</small>
          </span>
        </label>
      </section>

      <section class="panel panel-narrow" aria-labelledby="driver-heading">
        <h2 id="driver-heading">Route driver</h2>
        <div class="list-stack">
          <div class="list-row"><span><strong>Demo driver</strong><small>Assigned route driver</small></span></div>
          <div class="list-row"><span><strong>Mobile number</strong><small>Not configured in this demo</small></span></div>
        </div>
      </section>

      <section class="panel panel-wide" aria-labelledby="location-heading">
        <div class="panel-heading">
          <div>
            <h2 id="location-heading">Bus location</h2>
            <p class="panel-copy">The production app is intended to show the driver's phone location.</p>
          </div>
          <span class="status-pill status-offline">Not connected</span>
        </div>
        <div class="map-placeholder">
          <div>
            <strong>Live tracking is unavailable</strong>
            <span>No GPS feed or Google Maps service is connected.</span>
          </div>
        </div>
      </section>

      <aside class="panel panel-narrow" aria-labelledby="phase-heading">
        <h2 id="phase-heading">Release scope</h2>
        <p class="panel-copy">Absence marking and bus tracking are Phase 1. Fee details and payments are deferred to Phase 2.</p>
      </aside>
    </div>`;
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
      ? "status-offline"
      : allAbsent ? "status-pass" : "status-stop";
    const statusText = stopRiders.length === 0
      ? "No demo riders mapped"
      : allAbsent ? "Eligible to pass" : "Expected rider — plan to stop";
    const riderRows = stopRiders.length
      ? stopRiders.map((rider) => {
        const absent = state.absences.has(rider.id);
        return `<div class="list-row"><span><strong>${escapeHtml(rider.name)}</strong><small>${escapeHtml(rider.role)}</small></span><span class="status-pill ${absent ? "status-absent" : "status-expected"}">${absent ? "Absent" : "Expected"}</span></div>`;
      }).join("")
      : `<p class="panel-copy">Stop assignment is not configured for this demo.</p>`;

    return `
      <article class="panel panel-wide" aria-labelledby="stop-${index + 1}-heading">
        <div class="panel-heading">
          <div><h2 id="stop-${index + 1}-heading">${escapeHtml(stop)}</h2><p class="panel-copy">Upcoming stop ${index + 1}</p></div>
          <span class="status-pill ${statusClass}">${statusText}</span>
        </div>
        <div class="list-stack">${riderRows}</div>
      </article>`;
  }).join("");

  setIntro("Driver dashboard", "Route and upcoming rider status for the demo bus.");

  return `
    <div class="dashboard-grid">
      <section class="panel panel-full" aria-labelledby="route-heading">
        <div class="panel-heading">
          <div>
            <h2 id="route-heading">${escapeHtml(bus.label)} · ${escapeHtml(bus.route)}</h2>
            <p class="panel-copy">The route is assigned to the driver or bus. This sample route is not real route data.</p>
          </div>
          <span class="status-pill status-offline">Phone GPS not connected</span>
        </div>
      </section>
      ${stopCards}
      <aside class="panel panel-full">
        <p class="phase-note"><strong>Driver decision:</strong> “Eligible to pass” means every demo rider at that stop marked absent. The app does not automatically alter the route or direct a real driver.</p>
      </aside>
    </div>`;
}

function renderAdminView() {
  setIntro("Admin dashboard", "Assign demo riders to a bus and its route. Students cannot change these assignments.");

  const assignmentRows = riders.map((rider) => {
    const assignedBusId = state.assignments.get(rider.id);
    const assignedBus = getBus(assignedBusId);
    const options = fleet.map((bus) => `
      <option value="${escapeHtml(bus.id)}" ${bus.id === assignedBusId ? "selected" : ""}>
        ${escapeHtml(bus.label)}
      </option>`).join("");

    return `
      <tr>
        <th scope="row">${escapeHtml(rider.name)}</th>
        <td>${escapeHtml(rider.role)}</td>
        <td>
          <label class="sr-only" for="assignment-${escapeHtml(rider.id)}">Bus assignment for ${escapeHtml(rider.name)}</label>
          <select class="assignment-select" id="assignment-${escapeHtml(rider.id)}" data-assignment="${escapeHtml(rider.id)}">
            ${options}
          </select>
        </td>
        <td>${assignedBus ? escapeHtml(assignedBus.route) : "Not assigned"}</td>
      </tr>`;
  }).join("");

  return `
    <div class="dashboard-grid">
      <section class="panel panel-full" aria-labelledby="assignment-heading">
        <div class="panel-heading">
          <div>
            <h2 id="assignment-heading">Student and faculty assignments</h2>
            <p class="panel-copy">Only the admin view can edit bus assignments. Each bus maps to a demo route.</p>
          </div>
          <span class="status-pill status-expected">${fleet.length} demo buses</span>
        </div>
        <div class="table-wrap">
          <table>
            <caption>All records and bus routes are synthetic.</caption>
            <thead><tr><th scope="col">Rider</th><th scope="col">Role</th><th scope="col">Bus</th><th scope="col">Route</th></tr></thead>
            <tbody>${assignmentRows}</tbody>
          </table>
        </div>
      </section>
      <aside class="panel panel-full">
        <p class="phase-note"><strong>Production boundary:</strong> this browser-only demo does not authenticate admins or save assignments to the cloud. The production role-provisioning method is still undecided.</p>
      </aside>
    </div>`;
}

function announce(message) {
  announcement.textContent = message;
}

function render() {
  if (state.role === "student" || state.role === "faculty") {
    dashboard.innerHTML = renderRiderView();
    return;
  }
  if (state.role === "driver") {
    dashboard.innerHTML = renderDriverView();
    return;
  }
  if (state.role === "admin") {
    dashboard.innerHTML = renderAdminView();
    return;
  }
  throw new Error(`Unsupported demo role: ${state.role}`);
}

roleSelect.addEventListener("change", () => {
  state.role = roleSelect.value;
  render();
  announce(`Showing the ${roleSelect.options[roleSelect.selectedIndex].text} demo view.`);
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
    render();
    announce(`${rider.name} assigned to ${bus.label} in demo data.`);
  }
});

resetButton.addEventListener("click", () => {
  state.role = "student";
  state.absences.clear();
  state.assignments = new Map(initialAssignments);
  roleSelect.value = "student";
  render();
  announce("Demo data reset.");
});

render();
