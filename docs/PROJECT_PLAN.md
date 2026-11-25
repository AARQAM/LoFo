# LoFo - Project Plan

## 1. Project Overview

LoFo (Lost & Found) is a web-based platform designed to help Fasilkom UI students report and find lost or found belongings. Users can browse existing reports, search for specific items, and submit new reports through a simple and accessible interface.

## 2. Problem Statement

Students may lose or find belongings around campus, but information about these items can be scattered across different communication channels. This makes it difficult to find relevant reports and connect information about lost and found items.

LoFo aims to provide a centralized platform where students can access and submit lost and found reports.

## 3. Project Objectives

- Provide a centralized platform for lost and found reports.
- Allow users to browse and view report details.
- Make it easier to find reports through search and filtering.
- Allow users to submit lost and found reports.
- Provide a simple and responsive user experience.

## 4. Target Users

The primary target users are Fasilkom UI students who want to:
- Report belongings they have lost.
- Report belongings they have found.
- Search for information about lost or found items.

## 5. Scope and Features

### 5.1 Report Listing
- Display a list of LOST and FOUND reports.
- Display relevant item information.
- Provide a placeholder when a report has no image.

### 5.2 Report Details
- Display the full information of a selected report.
- Display item descriptions, categories, locations, and report dates.
- Display reporter contact information only when the reporter explicitly allows it.

### 5.3 Search and Filtering
- Search reports by item name.
- Filter reports by type (LOST or FOUND).
- Filter reports by category.
- Filter reports by location.

### 5.4 Report Submission
- Allow users to submit LOST or FOUND reports.
- Collect item information, description, category, location, and reporter information.
- Allow users to upload 0 to 3 optional images.
- Validate submitted information.

## 6. Out of Scope

The following features are excluded from the initial project scope:
- User authentication and registration.
- Public report editing and deletion.
- Item ownership claims and confirmation workflows.
- In-app messaging and notifications.
- Administrative dashboard.

## 7. Application Pages

| Page | Description |
|---|---|
| Home | Introduction and access to the main features |
| Report Listing | Displays reports with search and filtering |
| Report Details | Displays complete information about a selected report |
| Submit Report | Form for submitting a LOST or FOUND report |
| Not Found | Displays when a requested page or report does not exist |

## 8. User Flow

### Finding an Item
1. User opens the LoFo website.
2. User browses the report listing.
3. User searches or filters reports.
4. User opens a report to view its details.
5. User checks the available reporter contact information, if publicly shared.

### Reporting an Item
1. User opens the Submit Report page.
2. User selects LOST or FOUND.
3. User fills in the required information.
4. User optionally uploads up to three images.
5. User submits the report.
6. The system validates and stores the report.
7. The new report appears in the listing.

## 9. Team Responsibilities

The project team consists of three members:

| Role | Responsibilities |
|---|---|
| Frontend Developer 1 | Report listing, report details, search, and filtering |
| Frontend Developer 2 | Report submission form, image preview, and frontend validation |
| Backend Developer | REST API, database integration, backend validation, and image upload |

All team members are responsible for collaboration, testing, documentation, and integration.

## 10. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Image Storage | Cloudinary |
| Version Control | Git + GitHub |

## 11. Development Timeline

### Checkpoint 1: Project Preparation
- Initialize repository and development environment.
- Define application pages and features.
- Design database structure and relationships.
- Document REST API endpoints and data formats.
- Prepare shared mock data.

### Checkpoint 2: Frontend and Backend Development
- Develop frontend pages using mock data.
- Implement report listing, search, filtering, and submission interfaces.
- Develop REST API endpoints.
- Implement basic validation and pagination.
- Deploy the backend API.

### Checkpoint 3: Integration and Deployment
- Integrate frontend with backend APIs.
- Implement PostgreSQL persistence using Prisma.
- Implement image uploads using Cloudinary.
- Test the complete application.
- Deploy the frontend and finalize project documentation.