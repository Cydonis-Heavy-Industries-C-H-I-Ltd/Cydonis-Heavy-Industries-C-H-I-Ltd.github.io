# Repair Request Tracker - Project Structure

## Project Overview
This web application allows users to submit repair requests and administrators to manage them.

## Directory Structure
```
repair-tracker/
├── index.php                 # Landing page with login form
├── dashboard.php             # User dashboard to view/create requests
├── admin.php                 # Admin dashboard to manage requests
├── register.php              # New user registration
├── config/
│   └── database.php          # Database connection configuration
├── includes/
│   ├── header.php            # Common header
│   ├── footer.php            # Common footer
│   ├── auth.php              # Authentication functions
│   └── functions.php         # Common utility functions
├── api/
│   ├── auth.php              # Login/logout API
│   ├── requests.php          # CRUD operations for repair requests
│   └── users.php             # User management API
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Common JavaScript functions
│   │   ├── dashboard.js      # Dashboard functionality
│   │   └── admin.js          # Admin panel JavaScript
│   └── img/                  # Images folder
└── database/
    └── schema.sql            # Database schema
```

## Features
1. User authentication (login/registration)
2. Submit new repair requests
3. View request history and status
4. Admin dashboard to manage requests
5. Status updates with notifications
6. Search and filter capabilities
7. Responsive design for mobile compatibility

## Database Schema
- Users table (id, username, password, email, role, created_at)
- Requests table (id, user_id, title, description, location, priority, status, created_at, updated_at)
- Comments table (id, request_id, user_id, comment, created_at)
