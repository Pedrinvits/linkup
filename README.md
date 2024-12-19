# LinkUp

LinkUp is a social network for programmers. With LinkUp, users can follow other programmers, make posts, interact with posts, and access an exclusive dashboard for administrators.


<img   src="https://github.com/Pedrinvits/LinkUp/blob/master/src/public/schema.png">

## Features
- **Follow Users**: Follow other programmers to keep up with their posts.
- **Posts**: Share knowledge and ideas through posts.
- **Interactions**: Like, comment, and share other users' posts.
- **Admin Dashboard**: An exclusive panel where administrators can manage platform content.

## Project Structure

The project uses the following technologies:
- **Node.js and npm** for backend management.
- **Docker** to create development containers.
- **Prisma** for database management.

## Requirements

- **Node.js**: Install the latest version of Node.js.
- **Docker**: Required to run the application containers.
- **Prisma**: An ORM (Object-Relational Mapping) for the database.

## Installation and Execution Commands

To set up the environment and run the application, follow these steps:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/yourusername/LinkUp.git
   cd LinkUp
2. Install dependencies with npm:
   
   ```bash
   npm install

3. Start the containers with Docker:

   ```bash
   docker-compose up -d

4. Set up the database with Prisma:
   ```bash
   npx prisma db push

5. Access the project in your browser at http://localhost:3002
