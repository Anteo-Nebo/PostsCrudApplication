# Posts CRUD Application

A simple **Posts CRUD (Create, Read, Update, Delete) application** built with **React**, **React Admin**, **MongoDB**, **HTML**, **JavaScript**, and **MUI (Material-UI)**. This application allows you to manage posts with a modern, user-friendly interface.

---

## Features

- Create, read, update, and delete posts.
- Modern UI with **MUI (Material-UI)** components.
- Backend powered by **MongoDB**.
- Built with **React Admin** for easy admin management.

---

## Prerequisites

Before using this application, you need to have **Node.js** installed.  

1. Download Node.js from [nodejs.org](https://nodejs.org/).  
2. After installation, open a terminal or PowerShell and check that Node.js and npm are installed:

```bash
node -v
npm -v
How to Set Up MongoDB

Create a database called postsdb (or any name you like).

Create a collection called posts to store your posts.

Get your MongoDB connection string. It should look like this:

mongodb+srv://<username>:<password>@cluster0.mongodb.net/postsdb?retryWrites=true&w=majority


Add the connection string to your backend config or environment file (.env) as:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/postsdb?retryWrites=true&w=majority


Make sure to replace <username> and <password> with your MongoDB credentials.
How to Use This Application

Follow these steps to run the application locally:

Clone the repository to your computer:

git clone <your-repo-url>
cd <your-repo-folder>


Install dependencies (all required packages):

npm install


Start the development server:

npm run dev


Open your browser and go to the URL shown in the terminal (usually http://localhost:5173) to see the application in action.
