// =========================================================
// OKWU Campus Life Web App
// Final script.js - Event-driven programming + API usage
// =========================================================

// ======================================
// Schedule Page Button (Event-Driven JS)
// ======================================
const scheduleButton = document.getElementById("loadScheduleBtn");

if (scheduleButton) {
  scheduleButton.addEventListener("click", () => {
    alert("This feature will load your class schedule soon!");
  });
}

// ======================================
// Future Dining API Placeholder
// ======================================
const diningAPI = "https://api.placeholder.com/menu";
// TODO: Replace with real dining API in future.

// ======================================
// Daily Devotion API (Bible Verse)
// labs.bible.org provides a random Bible verse as JSON.
// ======================================
const devotionButton = document.getElementById("dailyDevotionBtn");
const devotionText = document.getElementById("devotionText");

if (devotionButton && devotionText) {
  devotionButton.addEventListener("click", async () => {
    try {
      devotionText.textContent = "Loading devotion...";

      const response = await fetch(
        "https://labs.bible.org/api/?passage=random&type=json"
      );
      const data = await response.json();

      const verse = data[0];
      devotionText.textContent = `${verse.bookname} ${verse.chapter}:${verse.verse} — ${verse.text}`;
    } catch (error) {
      devotionText.textContent =
        "Sorry, the devotion could not be loaded right now.";
      console.error("Devotion API error:", error);
    }
  });
}

// ======================================
// Chapel Events API (JSON Data Fetch)
// Loads upcoming chapel events from a custom JSON file.
// Demonstrates external data integration + event-driven JS.
// ======================================
const loadChapelBtn = document.getElementById("loadChapelBtn");
const chapelEventsList = document.getElementById("chapelEventsList");

if (loadChapelBtn && chapelEventsList) {
  loadChapelBtn.addEventListener("click", async () => {
    try {
      // Show loading state
      chapelEventsList.innerHTML =
        "<li class='list-group-item'>Loading chapel events...</li>";

      // Fetch chapel events JSON
      const response = await fetch("js/chapel-events.json");
      const events = await response.json();

      chapelEventsList.innerHTML = ""; // Clear loading message

      // Loop through and display each event
      events.forEach((evt) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
          <strong>${evt.title}</strong><br>
          Speaker: ${evt.speaker}<br>
          Date: ${evt.date}<br>
          Location: ${evt.location}
        `;

        // Smooth fade-in effect
        li.style.opacity = "0";
        chapelEventsList.appendChild(li);

        setTimeout(() => {
          li.style.transition = "opacity 0.5s ease-in";
          li.style.opacity = "1";
        }, 50);
      });
    } catch (error) {
      chapelEventsList.innerHTML =
        "<li class='list-group-item'>Unable to load chapel events.</li>";
      console.error("Chapel events API error:", error);
    }
  });
}
// ======================================
// OKWU Events API (JSON Data Fetch)
// Loads November–December OKWU campus events from custom JSON.
// Demonstrates multi-event grouping + DOM rendering.
// ======================================

const loadOkwuEventsBtn = document.getElementById("loadOkwuEventsBtn");
const okwuEventsList = document.getElementById("okwuEventsList");

if (loadOkwuEventsBtn && okwuEventsList) {
  loadOkwuEventsBtn.addEventListener("click", async () => {
    try {
      // Loading message
      okwuEventsList.innerHTML =
        "<li class='list-group-item'>Loading OKWU events...</li>";

      // Fetch events JSON file
      const response = await fetch("js/okwu-events.json");
      const eventGroups = await response.json();

      // Clear loading state
      okwuEventsList.innerHTML = "";

      // Loop through date groups
      eventGroups.forEach(group => {
        // Group header
        const dateHeader = document.createElement("li");
        dateHeader.className = "list-group-item active";
        dateHeader.textContent = group.date;
        okwuEventsList.appendChild(dateHeader);

        // Individual events
        group.events.forEach(ev => {
          const li = document.createElement("li");
          li.className = "list-group-item";

          li.innerHTML = `
            <strong>${ev.title}</strong><br>
            Time: ${ev.time}<br>
            Location: ${ev.location}
            ${ev.link ? `<br><a href="${ev.link}" target="_blank">More Info</a>` : ""}
          `;

          // Fade-in animation
          li.style.opacity = "0";
          okwuEventsList.appendChild(li);

          setTimeout(() => {
            li.style.transition = "opacity 0.5s ease-in";
            li.style.opacity = "1";
          }, 50);
        });
      });

    } catch (error) {
      okwuEventsList.innerHTML =
        "<li class='list-group-item'>Unable to load OKWU events.</li>";
      console.error("OKWU Events API error:", error);
    }
  });
}

