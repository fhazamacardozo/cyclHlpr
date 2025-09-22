Project: Cycling Training App - Frontend  

Stack: React.js + Vite, Tailwind CSS, Material UI.  
Design: Minimalist modern, support dark/light themes, palette: green, blue, red, yellow, black, white.  

Core UI Features (MVP):  
1. Daily Training Report form (fields: date, planned session, completed session, duration/TSS/IF/HR/NP, execution, physiology, mental, recovery, takeaways).  
2. Weekly Check-In form (fields for weekly summary, key sessions, endurance rides, physiology, mental, recovery, takeaways).  
3. Prompt generator: take form input and format it into structured text.  
4. Preview box to show generated prompt text.  

Development philosophy:  
- Build incrementally, starting with forms and UI.  
- Validate form data locally before backend integration.  
- Prioritize working code snippets over long explanations.  

Project: Cycling Training App - Backend  

Stack: Node.js + Express (runs on port 5000).  
Database: TBD (SQLite or MongoDB for reports).  

Core API Features (MVP):  
1. POST /report → accepts training report JSON, returns formatted text.  
2. GET /reports → returns all saved reports.  
3. Health check: GET /health → {status: "ok"}.  

Future API Features:  
- Strava API integration (auto fetch training data).  
- OpenAI API integration (send generated prompts).  
- Bike parts wear tracker (CRUD endpoints).  

Development philosophy:  
- Start with mock data and in-memory storage.  
- Add DB persistence later.  
- Keep endpoints clean and RESTful.  

Project: Cycling Training App — Integration task

Context:
- Frontend: React + Vite, Tailwind + MUI, runs on dev port 5173.
- Backend: Node + Express, runs on port 5000.
- Shared data shape: use the `TrainingReport` schema in src/types.ts (ISO date, fields for planned/completed sessions, metrics, sections for execution/physiology/mental/recovery/takeaways).
- Dev philosophy: small incremental changes, test each piece before adding next.

Integration goal (what I want now):
1. Frontend: on daily-report form submit, POST JSON to backend endpoint `POST http://localhost:5000/api/reports`.
   - Body: JSON matching `TrainingReport`.
2. Backend: `POST /api/reports` should:
   - validate input (basic required fields),
   - return `{ success: true, reportText: "<formatted text>" }` where `reportText` is the formatted training prompt (plain text).
3. Frontend should:
   - show a loading state while waiting,
   - display `reportText` in a preview box when the response arrives,
   - show error messages for non-2xx responses.
4. Dev conveniences:
   - Backend should enable CORS for `http://localhost:5173` or allow a dev proxy.
   - Provide a simple curl example to test the endpoint.
5. Acceptance criteria (how I’ll know it’s done):
   - Submitting the form yields a `reportText` string returned from backend and displayed by frontend.
   - Simple validation prevents empty required fields.
   - Dev-friendly logs/errors for failures.

Deliverables (copyable code):
- Express `POST /api/reports` route that validates and returns formatted text.
- Minimal frontend fetch/post code (React) integrated into the existing form submit handler.
- Example curl command to test the endpoint locally.

Keep code-first — produce files/snippets I can paste into project files. If anything needs a tiny explanation, keep it to 1–2 lines.

🔹 Roadmap of Smaller Copilot-Ready Prompts

Each step is designed to be copy-pasted into Copilot Agent.

Step 1: Project Setup
Set up a React + Vite project with Tailwind CSS and Material UI installed.  
Add a simple App component that displays "Cycling Training App".  
Confirm Tailwind and MUI styles are both applied correctly.  

Step 2: Backend Setup
Set up a Node.js + Express backend with one GET /health route that returns {status: "ok"}.  
Make sure the server runs on port 5000.  

Step 3: Frontend-Backend Connection
In the React app, add a button that fetches from http://localhost:5000/health when clicked.  
Display the response JSON on the screen.  

Step 4: Daily Report Form (Frontend only)
Create a form in React with the following fields:  
- Date  
- Planned session  
- Completed session  
- Duration / TSS / IF / Avg HR / NP  
- Execution notes  
- Physiology & Perception notes  
- Mental notes  
- Recovery/Context notes  
- Takeaways  

On submit, show the collected form data as JSON below the form.  
Style the form with Tailwind + MUI.  

Step 5: Prompt Generator (Frontend only)
Take the JSON from the Daily Report form and format it into a structured text report:  
- Use headings for each section (Execution, Physiology, Mental, Recovery, Takeaways).  
- Output the generated text in a preview box under the form.  

Step 6: Backend Endpoint for Reports
Add a POST /report endpoint in the Express backend.  
It should accept form JSON, generate the formatted text report, and return it.  

Step 7: Connect Frontend to Backend
Modify the React form so that on submit, it sends the JSON to POST /report.  
Display the response (formatted report text) in the frontend.  

Step 8: Database Persistence
Add database support (SQLite or MongoDB).  
Update POST /report to save the training report.  
Add GET /reports to return all saved reports.  
Connect frontend to display a list of past reports.  

Step 9: Future Features (leave for later)

Strava API integration (auto fetch ride files).

OpenAI API integration (send prompts automatically).

Bike parts wear tracker.