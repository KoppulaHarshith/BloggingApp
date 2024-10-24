# Blogify - Blogging Platform

**Blogify** is a web application for users to create, view, and comment on blogs. The project includes user authentication, blog management, and commenting features. It utilizes **Node.js**, **Express**, **MongoDB**, and **EJS** as the templating engine for rendering views. The platform enables users to sign up, log in, write blogs with images, and engage in discussions via a comment section.

[Blogify - Live Website](https://bloggingapp-z8kf.onrender.com/)
---
## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user, blog, and comment data.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **Multer**: Middleware for handling file uploads.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Bootstrap**: Frontend framework for styling.
---

## Features

### 1. User Authentication:
   - Users can sign up with their name, email, and password.
   - Log in functionality using JWT (JSON Web Tokens) for secure session management.
   - Passwords are securely stored using hashing with `crypto`.
   - Login persistence using cookies, allowing users to remain authenticated.
   - Logout functionality to clear session cookies.
   - Error handling for sign-in and sign-up, including cases where the email is already in use.

### 2. Blog Management:
   - Users can create new blog posts with a title, body, and an optional cover image.
   - Blog posts are stored in MongoDB and associated with the user who created them.
   - The ability to view individual blog posts and see details like the author's name and profile picture.
   - Uploaded images are stored locally in the `/public/upload` directory using the `multer` package.

### 3. Comment System:
   - Authenticated users can post comments on any blog post.
   - Comments are associated with both the blog post and the user who created them.
   - Comments are displayed along with the commenter's profile picture and name.

### 4. User Roles:
   - By default, users are assigned a "USER" role.
   - The system also supports an "ADMIN" role (though currently not fully integrated).

---

## Project Structure

### 1. Middleware (auth.js):
   - Includes functionality to check for a valid JWT token in the request cookies.
   - If a valid token is found, the middleware attaches the user’s payload to the `req.user` object.

### 2. Models:
   - **Blog Model**: Defines the structure of blog posts, including title, body, cover image, and a reference to the user who created it.
   - **Comment Model**: Defines the structure of comments, including the content, associated blog, and the user who created it.
   - **User Model**: Stores user information like name, email, password, salt (for hashing), and role. Passwords are hashed using `crypto` before saving to the database.

### 3. Routes:
   - **Blog Routes (`/blog`)**: 
     - `GET /blog/add-new`: Displays a form to create a new blog.
     - `POST /blog`: Handles blog creation, including file upload for the cover image.
     - `GET /blog/:id`: Displays the details of a specific blog post and its associated comments.
     - `POST /blog/comment/:blogId`: Allows users to add comments to a blog post.
   - **User Routes (`/user`)**: 
     - `GET /user/signin`: Renders the sign-in page.
     - `GET /user/signup`: Renders the sign-up page.
     - `POST /user/signin`: Handles user authentication and sets the JWT token in cookies.
     - `POST /user/signup`: Registers new users and automatically logs them in.
     - `GET /user/logout`: Logs the user out by clearing the token cookie.

### 4. Views (EJS Templates):
   - Templates for rendering the user interface, including home, sign-in, sign-up, blog details, and the form for adding a blog.
   - Navigation bar reflects the logged-in user state and shows links based on authentication status.
   - Error handling in views for displaying messages like "Incorrect email or password" or "Account already exists."

### 5. Services (auth.js):
   - JWT token creation and validation logic to manage user sessions securely.
---


