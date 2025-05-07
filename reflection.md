# 🪞 Reflection – LinkNest

## AI Tools Usage

I used AI tools (ChatGPT and GitHub Copilot) selectively to accelerate non-critical tasks. For example, Copilot helped scaffold some TypeScript function signatures and generate repetitive form validation code. ChatGPT supported idea validation and assisted in refining the project README for clarity and completeness.

## Manual Implementation and Decisions

All architecture decisions, component logic, routing, and state management (via Context API and local storage) were designed and implemented manually. I also designed the UI layout myself and chose to use Material UI to speed up development without compromising design quality. Authentication logic and link CRUD features were entirely handcrafted, including form validation.

## Critical Thinking & Challenges

The main challenges were balancing functionality with simplicity and maintaining a clean, intuitive user experience. I had to think critically about how to persist data without a backend, which led me to use `localStorage` as a temporary fake database. Implementing drag-and-drop with Dnd Kit required careful state synchronization and update handling.

## What I’d Improve with More Time

Given more time, I would:

- Replace `localStorage` with a real backend like Supabase or Firebase for multi-device persistence and auth security.
- Add analytics to track link engagement.
- Allow profile and theme customization for better personalization.
- Improve accessibility and mobile responsiveness.

Overall, I focused on delivering a polished MVP that reflects good development practices, thoughtful UX, and strong execution within the time limit.
