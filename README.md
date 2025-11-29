Learnify is a full-stack Learning Management System (LMS) built with Node.js, Express.js, React.js, Sequelize ORM, and PostgreSQL, designed for scalable online learning.
It supports course creation, modules & lessons, video/PDF content, and real-time socket notifications for instructors when a student purchases a course.

🚀 Features

🔐 Secure Authentication & Authorization (JWT-based)
🎓 Complete Course Builder – modules, lessons, videos & PDF uploads
💳 Course Purchase Workflow
⚡ Real-Time Notifications (Socket.io) – instructors get alerts instantly
🧑‍🏫 Instructor Dashboard
👨‍🎓 Student Dashboard
📦 Sequelize ORM with PostgreSQL
🗂️ Clean REST API Architecture
🎥 Video + Document Storage Support

🛠️ Tech Stack

Frontend:
React.js • Redux (optional) • Axios

Backend:
Node.js • Express.js • Sequelize ORM • PostgreSQL • Socket.io

Dev Tools:
Multer / Cloudinary (for uploads) • JWT • Bcrypt

🖼️ System Overview

⚡ Real-Time Notification Flow

  - Student purchases a course
  - Backend triggers instructor event
  - Socket.io sends instant notification
  - Instructor dashboard updates in real-time

📌 Future Enhancements

  ✔ Offline Mode (PWA Support)
  ✔ Advanced Role–Permission System
  ✔ Student–Instructor real-time chat

👤 Author
Hiten Thanki
