# ReCoder — AI Code Reviewer Application

ReCoder is a full-stack web application that uses AI to analyze and review code. It helps developers identify bugs, improve performance, and follow better coding practices through structured feedback.

The goal of this project is to simulate a real-world code review workflow using modern tools and AI integration.

---

## Overview

ReCoder allows users to submit code and receive detailed feedback in a structured format. Instead of just pointing out issues, the system explains them and suggests improvements, making it useful for both learning and development workflows.

It is designed as a complete product with authentication, history tracking, and a responsive user interface.

---

## Features

### AI-based Code Review
- Analyzes code using a language model
- Detects bugs and logical issues
- Suggests improvements with explanations
- Provides structured output (summary, issues, suggestions)

### Performance and Security Insights
- Highlights inefficient code patterns
- Identifies potential vulnerabilities
- Encourages best practices

### User Authentication
- JWT-based login and registration
- Protected routes for authenticated users
- Session persistence

### Review History
- Stores previous code reviews
- Allows users to revisit and reuse past results

### User Interface
- Modern landing page with interactive elements
- Modal-based authentication flow
- Clean dashboard for reviewing and managing code

---

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Context API

Backend:
- Node.js
- Express

Database:
- MongoDB

AI Integration:
- OpenRouter API (LLM-based code analysis)

---

## Project Structure

recoder-ai/
  ├── frontend/        React application (UI)
  ├── backend/         Express server (API + AI logic)
  └── README.md        Project documentation

---

## Getting Started

Clone the repository:

git clone https://github.com/yyogeshhkumar/recoder-ai.git  
cd recoder-ai  

---

Backend setup:

cd backend  
npm install  
npm run dev  

---

Frontend setup:
```bash
cd frontend  
npm install  
npm run dev  
```
---

## Environment Variables

Create a `.env` file in the backend directory and add:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
OPENROUTER_API_KEY=your_api_key  

---

## How It Works

1. User logs in or registers  
2. Code is submitted through the dashboard  
3. Backend sends code to AI service  
4. AI returns structured feedback  
5. Result is stored and displayed to the user  

---

## What Makes This Project Different

This is not just a basic project. It focuses on:

- Solving a real developer problem (code review)
- Integrating AI in a practical workflow
- Building a complete full-stack system
- Creating a product-like user experience

---

## Future Improvements

- Admin panel  
- GitHub repository analysis  
- Multi-language support  
- Exporting reports  

---

## Author

Yogesh Kumar

---

## Note

This project is actively being improved and extended with new features.