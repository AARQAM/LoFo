# LoFo - Database Design

## 1. Overview

LoFo uses PostgreSQL as its relational database management system. Prisma ORM will be used to manage database access and define the data models.

The database consists of three main entities:

1. Category
2. Report
3. ReportImage

The design supports Lost and Found reports, item categorization, and optional image attachments.

## 2. Database Entities

### 2.1 Category

Stores the available categories for reported items.

| Field | Data Type | Constraint | Description |
|---|---|---|---|
| id | UUID | Primary Key | Unique category identifier |
| name | VARCHAR | Unique, Not Null | Category name |

Example categories:
- Electronics
- Accessories
- Documents
- Clothing
- Others

### 2.2 Report

Stores the main information about Lost and Found reports.

| Field | Data Type | Constraint | Description |
|---|---|---|---|
| id | UUID | Primary Key | Unique report identifier |
| title | VARCHAR | Not Null | Item name |
| description | TEXT | Not Null | Item description |
| type | ENUM | Not Null | LOST or FOUND |
| categoryId | UUID | Foreign Key, Not Null | References Category |
| location | VARCHAR | Not Null | Location related to the report |
| reporterName | VARCHAR | Not Null | Name of the reporter |
| contactMethod | VARCHAR | Nullable | Selected contact method |
| contactValue | VARCHAR | Nullable | Contact information |
| isContactPublic | BOOLEAN | Not Null, Default false | Whether contact information can be displayed publicly |
| status | ENUM | Not Null, Default ACTIVE | Report status |
| createdAt | TIMESTAMP | Not Null | Report creation timestamp |

### 2.3 ReportImage

Stores references to images associated with a report.

| Field | Data Type | Constraint | Description |
|---|---|---|---|
| id | UUID | Primary Key | Unique image identifier |
| reportId | UUID | Foreign Key, Not Null | References Report |
| imageUrl | TEXT | Not Null | Cloudinary image URL |
| publicId | VARCHAR | Not Null | Cloudinary public ID |

A report may have zero to three images.

## 3. Relationships

| Relationship | Cardinality | Description |
|---|---|---|
| Category → Report | One-to-Many | One category can be associated with multiple reports. |
| Report → ReportImage | One-to-Many | One report can have up to three images. |

## 4. Enums

### ReportType

- `LOST`
- `FOUND`

### ReportStatus

- `ACTIVE`
- `RESOLVED`

## 5. Contact Information Privacy

Reporter contact information must only be publicly accessible when the reporter explicitly grants permission.

The `isContactPublic` field determines whether contact information is included in public API responses.

- If `true`, the selected contact method and contact value may be displayed.
- If `false`, contact information must not be included in public API responses.

## 6. Image Storage

Image files will be stored using Cloudinary.

PostgreSQL will only store the image references:

- `imageUrl`: Public URL used to display the image.
- `publicId`: Cloudinary identifier for the uploaded image.

Each report can have a maximum of three images.

Reports without images will be displayed using a frontend placeholder.

## 7. Database Constraints

- Every report must belong to an existing category.
- Every report must have a valid report type.
- Every report must have a valid status.
- Every image must belong to an existing report.
- Each report may contain a maximum of three images.
- Contact information must not be publicly exposed without explicit permission.

## 8. Database Relationships Summary

```text
Category (1) -------- (N) Report
Report   (1) -------- (N) ReportImage (maximum 3 images per report)
```

## 9. Implementation Notes

The database will be implemented using Prisma ORM and PostgreSQL during Checkpoint 3.

During Checkpoint 2, the backend may use in-memory storage with sample data while maintaining the same API response structure.