# SparkCost – Cloud Cost Monitoring & Anomaly Detection Prototype

SparkCost is a full-stack cloud cost monitoring prototype built to track cloud spending, manage cloud account details, and store cost data. The project is designed for AWS, Cloud Computing, FinOps, and cloud cost management learning.

## Project Overview

Cloud cost management is an important part of modern cloud environments. SparkCost helps users manage cloud accounts, add cloud cost data, and monitor spending patterns through a web application.

This project is currently a prototype and can be further improved with real AWS, Azure, or GCP billing APIs, advanced anomaly detection, dashboards, and alerting features.

## Features

* User registration and login
* JWT-based authentication
* Protected profile route
* Cloud account management
* Add and view cloud cost data
* MongoDB database integration
* React and TypeScript frontend
* Python Flask backend API
* Prototype structure for cloud cost anomaly detection
* Useful for AWS, Cloud Computing, FinOps, and cloud cost management learning

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn-ui

### Backend

* Python
* Flask
* Flask-CORS
* Flask-JWT-Extended
* PyMongo

### Database

* MongoDB

### Tools

* Git
* GitHub
* VS Code

## Project Structure

```text
spark-cost/
│
├── backend/
│   ├── app.py
│   ├── auth.py
│   ├── database.py
│   └── models.py
│
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── test/
│
├── package.json
├── README.md
└── tailwind.config.ts
```

## Backend API Features

### Authentication APIs

* User Register API
* User Login API
* JWT Token Authentication
* Protected Profile API

### Cloud Account APIs

* Add cloud account details
* View cloud account details

### Cost Data APIs

* Add cloud cost data
* View cloud cost data

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Pankajshinde007/spark-cost.git
cd spark-cost
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

### 4. Setup Backend

Go to the backend folder:

```bash
cd backend
```

Install required Python packages:

```bash
pip install flask flask-cors flask-jwt-extended pymongo
```

Run the Flask backend:

```bash
python app.py
```

### 5. Start MongoDB

Make sure MongoDB is running locally:

```bash
mongodb://localhost:27017/
```

## Future Improvements

* Add real AWS, Azure, or GCP billing API integration
* Add anomaly detection algorithm for cloud cost spike detection
* Add advanced cost visualization charts and dashboard
* Add email or dashboard alerts
* Add Docker support
* Add CI/CD pipeline using GitHub Actions or Jenkins
* Move secret keys and database URL into environment variables
* Improve authentication security using password hashing
* Add proper backend models and validations

## Learning Outcome

Through this project, I learned about full-stack development, backend API creation, JWT authentication, MongoDB integration, cloud cost tracking, and the basics of cloud cost management and FinOps project structure.

## Author

**Pankaj Shinde**
AWS & Cloud Computing Learner
GitHub: [Pankajshinde007](https://github.com/Pankajshinde007)
