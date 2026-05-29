# MPloyChek - Angular Role Based User Management System

To run:

ng serve

credentials:

general user: kevin, 1234
admin: admin, admin123

## Project Overview

MPloyChek is a Single Page Application (SPA) developed using Angular and TypeScript that demonstrates:

* Role-based authentication
* User login system
* Dashboard management
* Admin CRUD operations
* Route protection using Auth Guards
* Asynchronous API simulation with configurable delays
* Modular Angular architecture
* Modern responsive UI design

The application was built as per the assignment requirements and focuses on clean architecture, reusable services, async data handling, and effective Angular framework usage.

---

# Technologies Used

## Frontend

* Angular 18+
* TypeScript
* RxJS
* Angular Signals
* Angular Router
* Angular Forms
* Tailwind CSS

## Backend Simulation

* Dummy API using Angular Services
* In-memory mock database using TypeScript arrays

---

# Features Implemented

## 1. Login System

The application contains a fully functional login page with:

* User ID
* Password
* Role Selection

### Supported Roles

* General User
* Admin

### Authentication Flow

* Credentials are validated through a dummy API service
* Logged-in user data is stored using AuthService
* Routing is based on user role

### Navigation Logic

| Role         | Redirect    |
| ------------ | ----------- |
| General User | Dashboard   |
| Admin        | Admin Panel |

---

# 2. Dashboard Page

After login, users are redirected to the dashboard.

## Features

* Displays logged-in user details
* Fetches records asynchronously
* Displays records in table format
* Role-based access filtering

## Role Based Record Access

### General User

Can view:

* Only permitted user records

### Admin

Can view:

* All records

---

# 3. Admin User Management

Admins have access to a dedicated control panel.

## Admin Features

* View all users
* Add new users
* Edit existing users
* Delete users
* Manage user roles

## CRUD Operations Implemented

| Operation | Description        |
| --------- | ------------------ |
| Create    | Add new user       |
| Read      | Fetch all users    |
| Update    | Edit existing user |
| Delete    | Remove user        |

---

# 4. Dummy API with Async Processing

The application simulates backend APIs using Angular services and RxJS.

## Async Features

* API delay simulation using RxJS delay()
* Loading states
* Async UI rendering
* Real-time updates using Signals

Example:

```ts
getUsers(apiDelay: number = 1000): Observable<User[]> {
  return of(structuredClone(this.users))
    .pipe(delay(apiDelay));
}
```

## Purpose

This demonstrates:

* Asynchronous processing
* Loading behavior
* API latency handling
* Reactive UI updates

---

# 5. Angular Signals Implementation

Angular Signals are used for state management and instant UI reactivity.

## Signals Used

* users
* loading
* selectedUser
* toast notifications
* logged-in user
* dashboard records

Example:

```ts
users = signal<User[]>([]);
loading = signal(false);
```

## Benefits

* Faster rendering
* Automatic UI updates
* Reduced change detection issues
* Cleaner reactive architecture

---

# 6. Auth Guard Protection

Route protection is implemented using Angular Auth Guards.

## Protected Routes

* Dashboard
* Admin Panel

## Guard Logic

* Checks if user is logged in
* Redirects unauthorized users to login page

Example:

```ts
if (this.auth.isLoggedIn()) {
  return true;
}

this.router.navigate(['/']);
return false;
```

---

# 7. Modular Architecture

The application follows modular Angular architecture.

## Structure

```text
src/
 ├── app/
 │    ├── core/
 │    │    ├── services/
 │    │    ├── guards/
 │    │    ├── models/
 │    │    └── data/
 │    │
 │    ├── features/
 │    │    ├── login/
 │    │    ├── dashboard/
 │    │    └── admin/
 │    │
 │    └── shared/
```

## Advantages

* Reusable services
* Separation of concerns
* Maintainability
* Scalability

---

# 8. UI/UX Enhancements

The application includes a fully customized modern UI.

## UI Features

* Responsive layouts
* Loading animations
* Toast notifications
* Modern cards and tables
* Interactive buttons
* Modal popup editing
* Tailwind-based styling

---

# Application Workflow

# User Workflow

## General User

### Step 1

Login using:

* Username - kevin
* Password - 1234
* Role = General User

### Step 2

Redirected to Dashboard

### Step 3

Can:

* View profile details
* View allowed records
* Logout

---

# Admin Workflow

## Step 1

Login using:

* Username - admin
* Password - admin123
* Role = Admin

## Step 2

Redirected to Admin Control Panel

## Step 3

Can:

* Add users
* Edit users
* Delete users
* Manage roles
* Navigate to Dashboard
* Logout

## Step 4

Dashboard access allows:

* Viewing all records
* Monitoring user data

---

# API Simulation Workflow

## Example Flow

### User Action

Admin clicks "Delete User"

### Service Execution

```ts
deleteUser(id, 500)
```

### Simulated Backend Delay

```ts
delay(500)
```

### Async Update

* UI updates automatically
* Toast notification displayed
* Signal updates table instantly

---

# Key Angular Concepts Demonstrated

## Framework Usage

* Standalone Components
* Angular Signals
* RxJS Observables
* Reactive Forms
* Template-driven Forms
* Dependency Injection
* Routing
* Guards

## State Management

* Signal-based reactive state
* Immutable updates

## Async Programming

* Observables
* Subscription handling
* Simulated API delays

---

# Security Features

* Route protection using Auth Guards
* Role-based authorization
* Controlled navigation
* Session-based login management


The application is fully functional, scalable, and aligned with enterprise Angular development practices.
