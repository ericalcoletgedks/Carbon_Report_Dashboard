#### Live Demo
https://carbon-report-dashboard.vercel.app/

## Rationale

### Approach

I followed a **Path A with elements of Path B**, focusing on building a clear, user-oriented product rather than only a technical exercise. The application is designed specifically for OCF files, prioritising a clean UI, reusable components and maintainable code.

---

### What I would improve with more time

- Add an AI layer to allow users to query and generate reports from selected fields in the datas table.
- Make dashboard charts configurable (toggle visibility and customise views).
- Generate automatic chart descriptions using AI based on the underlying data.
- Use AI to dynamically generate PDF narratives based on selected metrics.
- Add a backend with authentication to store historical uploads and enable comparisons over time, including saving AI conversations for context-aware assistance.
- Build a mapping interface for CSV uploads to handle non-standard column naming from different clients.

---

### Time spent

Approximately **2–4 hours per day** during development.

---

### Use of AI

I used ChatGPT and Claude (free versions) mainly for:

- Understanding carbon footprint concepts and domain context
- Identifying suitable libraries (CSV parsing, PDF generation, charts)
- Assisting during development for faster iteration while maintaining understanding
- Improving and refining textual content

The rest of the project (architecture, implementation, UI design and logic) was built independently.

---
# Landscape Research and Technology Decisions

## Frameworks and Core Technologies

- **React + Vite** was selected over Next.js because this project only requires a client-side application. Although I have not yet had the opportunity to work with Next.js extensively, I am interested in learning it in future projects.
- **TypeScript**
- **Tailwind CSS**

## Existing Options Survey

### Charts and Data Visualization

**Open-source options considered**

- Recharts
- Chart.js
- Make Graph
- Lightweight Charts

**Decision: Reuse**

Recharts was selected because it provides a declarative React API, good TypeScript support and sufficient flexibility for the required bar, pie and radar charts. It reduced implementation effort while keeping full control over the UI.

---

### PDF Generation

**Open-source options considered**

- jsPDF
- react-pdf
- pdf-lib

**Decision: Reuse + Build**

jsPDF was chosen due to its simplicity and compatibility with browser environments. Custom report generation logic was implemented on top of the library to support multiple sections, charts and formatted content.

---

### Exporting Charts as Images

**Open-source options considered**

- html-to-image
- dom-to-imag

**Decision: Reuse**

html-to-image was selected because it integrates easily with React components and allowed chart components to be converted into images before embedding them into the PDF.

---

### UI Components

**Open-source options considered**

- HeadlessUi
- shadcn/ui

**Decision: Reuse**

shadcn/ui was selected because it provides accessible components while maintaining complete styling flexibility and minimal overhead.

---

### CSV Processing

**Open-source options considered**

- PapaParse
- Custom parser

**Decision: Reuse**

PapaParse was used to simplify CSV parsing and ensure reliable processing of uploaded files.

---

## Build vs Reuse vs Buy

No commercial solutions were adopted.

- **Build:** report composition logic, state management and data transformation.
- **Reuse:** charts, PDF generation, CSV parsing and UI components.
- **Buy:** none.

This approach minimized development time while keeping the application maintainable, flexible and fully customizable.

## Links & Resources

- https://ui.shadcn.com/docs/components
- https://tailwindcss.com/
- https://stackoverflow.com/questions
- https://artskydj.github.io/jsPDF/docs/jsPDF.html
- https://es.pinterest.com/pin/276689970853775483/
- https://es.pinterest.com/pin/276689970853820158/
- https://es.pinterest.com/pin/276689970854176118/