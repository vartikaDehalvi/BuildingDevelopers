# Build Dev

Build Dev is a web application designed to connect developers, providing a platform for registration, login, profile creation, education and experience management, social link addition, post creation, liking, commenting, and more.
The users can signup and register, create their profile, see each other's profile (on Developers page) and posts (on posts page), like/ dislike and share their opinions by commenting and posting. The About page lets you know more about the company and their services.
The site uses gravatar images, so you can login with gravatar email to display the profile picture which is by default set to a default user icon. (Considering the user being a fullstack developer himself, he might have a gravatar account).

(This is a basic application to let the developers communicate with each other and not a clone of LinkedIn!)

This README file will guide you through using the project.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Contributing](#contributing)
- [Installation](#installation)

# Features

- User Registration and Login
- Dashboard
- Profile Management (Education, Experience, Social Links)
- Post Creation, Liking, and Commenting
- About Page

# Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running
- Git for version control

# Usage

To use Build Dev, follow these steps:

- Register an account or log in to access the dashboard.
- Create and manage your profile, including education, experience and social links and also view others' profile.
- Create, like, comments or delete posts.
- Explore the About page to learn more about the company.

# Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and test thoroughly.
- Submit a pull request with a clear description of your changes.

# Installation

To get started with Build Dev:

- Clone the repository: `git clone https://github.com/vartikaDehalvi/BuildingDevelopers.git`
- Navigate to the project directory: `cd buildDev`
- Install the dependencies for the server: `npm install`
- Navigate to the client directory: `cd client`
- Install the dependencies for the client (React): `npm install`
- Return to the project root: `cd ..`
- Start the server and client concurrently: `npm run dev`
  
  # Key Dependencies

  Build Dev relies on several key libraries and packages:

- [Express](https://expressjs.com/): A web framework for Node.js used for building the server.
- [React](https://reactjs.org/): A JavaScript library used for building the client-side user interface.
- [MongoDB](https://www.mongodb.com/): A NoSQL database used for data storage.

You can find a full list of project dependencies in the `package.json` files for the server and client components.


