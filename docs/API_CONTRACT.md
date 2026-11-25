# LoFo - API Contract

## 1. Overview

This document defines the REST API contract for LoFo (Lost & Found).

The API allows users to:
- Retrieve and browse LOST and FOUND reports.
- Search reports by item name.
- Filter reports by type, category, and location.
- Retrieve detailed information about a specific report.
- Submit a new LOST or FOUND report.
- Retrieve available report categories.

**Base URL (Development):**

`http://localhost:3000/api`

**Content Type:**
- `application/json` for standard requests and responses.
- `multipart/form-data` for report submission with image uploads during Checkpoint 3.

## 2. Data Structure

### 2.1 Report Object

Each report contains the following fields:

| Field | Type | Description |
|---|---|---|
| id | UUID (string) | Unique report identifier |
| title | string | Name of the reported item |
| description | string | Description of the item |
| type | string | LOST or FOUND |
| category | object | Report category information |
| location | string | Location related to the report |
| reporterName | string | Name of the person submitting the report |
| contact | object or null | Public contact information, if consent is given |
| status | string | Current report status |
| images | array | List of uploaded image references |
| createdAt | string (ISO 8601) | Report creation timestamp |

### 2.2 Category Object

| Field | Type | Description |
|---|---|---|
| id | UUID (string) | Unique category identifier |
| name | string | Category name |

### 2.3 Contact Object

Contact information is only included in public API responses when the reporter explicitly gives permission.

| Field | Type | Description |
|---|---|---|
| method | string | Contact method, such as WhatsApp or Email |
| value | string | Contact information |

If the reporter does not give permission, the API must return `contact: null`.

### 2.4 Image Object

| Field | Type | Description |
|---|---|---|
| id | UUID (string) | Unique image identifier |
| url | string | Image URL |

A report may contain zero to three images. Reports without images must return an empty array. The frontend displays a placeholder when no image is available.

## 3. API Endpoints

### 3.1 Get All Reports

**Endpoint:** `GET /api/reports`

**Description:** Retrieves a list of reports. Supports search, filtering, and pagination.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| q | string | No | Search reports by item name |
| type | string | No | Filter by LOST or FOUND |
| categoryId | string | No | Filter by category ID |
| location | string | No | Filter by location |
| page | integer | No | Page number. Default: 1 |
| limit | integer | No | Number of reports per page. Default: 10, maximum: 50 |

**Example Request:**

`GET /api/reports?q=wallet&type=LOST&page=1&limit=10`

**Success Response: 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "11111111-1111-4111-8111-111111111111",
      "title": "Black Wallet",
      "description": "A black wallet lost near the library.",
      "type": "LOST",
      "category": {
        "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        "name": "Accessories"
      },
      "location": "Fasilkom UI Library",
      "reporterName": "Andi",
      "contact": null,
      "status": "ACTIVE",
      "images": [],
      "createdAt": "2026-11-20T09:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

**Notes:**
- Search is case-insensitive and matches the report title.
- Type filtering accepts `LOST` or `FOUND`.
- Category filtering uses `categoryId`.
- Location filtering matches the provided location text.
- Multiple filters may be combined.
- Invalid query parameters return `400 Bad Request`.

### 3.2 Get Report by ID

**Endpoint:** `GET /api/reports/:id`

**Description:** Retrieves the details of a specific report.

**Example Request:**

`GET /api/reports/11111111-1111-4111-8111-111111111111`

**Success Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "11111111-1111-4111-8111-111111111111",
    "title": "Black Wallet",
    "description": "A black wallet lost near the library.",
    "type": "LOST",
    "category": {
      "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      "name": "Accessories"
    },
    "location": "Fasilkom UI Library",
    "reporterName": "Andi",
    "contact": null,
    "status": "ACTIVE",
    "images": [],
    "createdAt": "2026-11-20T09:00:00.000Z"
  }
}
```

**Error Response: 404 Not Found**

```json
{
  "success": false,
  "message": "Report not found."
}
```

### 3.3 Submit a New Report

**Endpoint:** `POST /api/reports`

**Description:** Creates a new LOST or FOUND report.

**Checkpoint 2 Request:**

Uses `application/json`. Image uploads are not required at this stage. The `images` field is not included in the request.

**Example Request Body:**

```json
{
  "title": "Black Wallet",
  "description": "A black wallet lost near the library.",
  "type": "LOST",
  "categoryId": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  "location": "Fasilkom UI Library",
  "reporterName": "Andi",
  "contactMethod": "WhatsApp",
  "contactValue": "081234567890",
  "isContactPublic": false
}
```

**Checkpoint 3 Request:**

Uses `multipart/form-data` to support optional image uploads.

Text fields remain the same. Images are sent using the `images` field and may contain zero to three files.

**Success Response: 201 Created**

```json
{
  "success": true,
  "message": "Report submitted successfully.",
  "data": {
    "id": "22222222-2222-4222-8222-222222222222",
    "title": "Black Wallet",
    "description": "A black wallet lost near the library.",
    "type": "LOST",
    "category": {
      "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      "name": "Accessories"
    },
    "location": "Fasilkom UI Library",
    "reporterName": "Andi",
    "contact": null,
    "status": "ACTIVE",
    "images": [],
    "createdAt": "2026-11-25T07:00:00.000Z"
  }
}
```

### 3.4 Get All Categories

**Endpoint:** `GET /api/categories`

**Description:** Retrieves all available report categories.

**Success Response: 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      "name": "Electronics"
    },
    {
      "id": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
      "name": "Accessories"
    },
    {
      "id": "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
      "name": "Documents"
    },
    {
      "id": "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
      "name": "Clothing"
    },
    {
      "id": "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
      "name": "Others"
    }
  ]
}
```

## 4. Validation Rules

The API must validate submitted report data.

| Field | Validation |
|---|---|
| title | Required, must not be empty |
| description | Required, must not be empty |
| type | Required, must be LOST or FOUND |
| categoryId | Required, must reference an existing category |
| location | Required, must not be empty |
| reporterName | Required, must not be empty |
| contactMethod | Optional |
| contactValue | Optional |
| isContactPublic | Boolean, defaults to false |
| images | Optional, maximum of 3 files |

Additional rules:
- If `isContactPublic` is false, contact information must not appear in public API responses.
- If `isContactPublic` is true, the selected contact method and contact value may be displayed.
- Reports without images are valid.
- Every new report receives the default status `ACTIVE`.
- No public endpoint is provided for editing, deleting, or changing report status.

## 5. HTTP Status Codes

| Status Code | Meaning | Usage |
|---|---|---|
| 200 | OK | Request completed successfully |
| 201 | Created | Report successfully submitted |
| 400 | Bad Request | Invalid request data or query parameters |
| 404 | Not Found | Requested report does not exist |
| 413 | Payload Too Large | Uploaded files exceed the allowed size |
| 415 | Unsupported Media Type | Unsupported request or image format |
| 500 | Internal Server Error | Unexpected server error |

**Error Response Format:**

```json
{
  "success": false,
  "message": "Invalid report data."
}
```

## 6. Pagination

The report listing endpoint supports pagination.

Default values:
- `page = 1`
- `limit = 10`
- Maximum `limit = 50`

The API returns pagination metadata containing:
- `page`: Current page number.
- `limit`: Number of reports per page.
- `totalItems`: Total number of reports matching the query.
- `totalPages`: Total number of available pages.

## 7. Implementation Phases

### Checkpoint 2
- Implement the report listing endpoint.
- Implement the report detail endpoint.
- Implement the report submission endpoint using JSON.
- Implement search, filtering, and pagination.
- Use in-memory storage and sample data.
- Configure CORS for frontend-backend communication.

### Checkpoint 3
- Integrate PostgreSQL using Prisma ORM.
- Store reports and categories in the database.
- Support image uploads using Cloudinary.
- Accept up to three optional images using `multipart/form-data`.
- Maintain the same response structure defined in this document.

## 8. Scope Limitations

The initial version of LoFo does not include:
- User authentication or registration.
- Public report editing or deletion.
- Item ownership claims or confirmation workflows.
- In-app messaging or notifications.
- Administrative dashboard.
- Public status update functionality.