
# Changelog

All notable changes to the Assessify project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Authentication system with login, register, and password recovery
- Role-based access control for Admin, Instructor, and Candidate users
- Protected routes based on user roles
- Auth context for managing user state across the application
- Demo login credentials for testing different user roles

### Changed
- Updated layouts to check for authentication status
- Home page now shows different options for logged-in vs anonymous users
- Router configuration to support authenticated and unauthenticated states

## [0.1.0] - 2025-04-08

### Added
- Initial project structure with Vite, React, TypeScript
- Tailwind CSS integration with custom theme
- ShadCN UI components
- Basic routing with React Router
- Common components (Logo, Navbar, Footer)
- Layout templates for different user roles
- Home page with hero section and features
- Authentication UI (Login, Register, Forgot Password)
- Dashboard UI for all three user roles (Admin, Instructor, Candidate)
- Project documentation in README

## Roadmap

### [0.2.0] - Completed
- Supabase integration placeholder (to be implemented with real Supabase)
- Authentication system
- User management
- Protected routes

### [0.3.0] - Planned
- Course management
- Subject management
- Enrollment system

### [0.4.0] - Planned
- Question bank system
- Exam creation
- Exam taking interface

### [0.5.0] - Planned
- Results and analytics
- Admin reporting tools
- Mobile optimizations
