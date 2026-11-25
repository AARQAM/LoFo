
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Load mock data
const mockDataPath = new URL("../../docs/MOCK_DATA.json", import.meta.url);
const mockData = JSON.parse(readFileSync(mockDataPath, "utf-8"));

let reports = mockData.reports || [];
const categories = mockData.categories || [];

// Helper: format report untuk response API
function formatReport(report) {
  return {
    ...report,
    contact: report.isContactPublic === true
      ? report.contact || null
      : null,
  };
}

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "LoFo API is running!",
  });
});

// GET all categories
app.get("/api/categories", (req, res) => {
  res.json({
    success: true,
    data: categories,
  });
});

// GET all reports
app.get("/api/reports", (req, res) => {
  const {
    q,
    type,
    categoryId,
    location,
    page = 1,
    limit = 10,
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Validate pagination
  if (
    !Number.isInteger(pageNumber) ||
    !Number.isInteger(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1 ||
    limitNumber > 50
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid page or limit value.",
    });
  }

  let filteredReports = [...reports];

  // Search by title or description
  if (q) {
    const keyword = q.toLowerCase();

    filteredReports = filteredReports.filter((report) => {
      return (
        report.title.toLowerCase().includes(keyword) ||
        report.description.toLowerCase().includes(keyword)
      );
    });
  }

  // Filter by report type
  if (type) {
    const selectedType = type.toUpperCase();

    if (!["LOST", "FOUND"].includes(selectedType)) {
      return res.status(400).json({
        success: false,
        message: "Type must be LOST or FOUND.",
      });
    }

    filteredReports = filteredReports.filter(
      (report) => report.type === selectedType
    );
  }

  // Filter by category
  if (categoryId) {
    filteredReports = filteredReports.filter(
      (report) => String(report.category?.id) === String(categoryId)
    );
  }

  // Filter by location
  if (location) {
    const selectedLocation = location.toLowerCase();

    filteredReports = filteredReports.filter((report) =>
      report.location.toLowerCase().includes(selectedLocation)
    );
  }

  // Pagination
  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / limitNumber);
  const startIndex = (pageNumber - 1) * limitNumber;

  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + limitNumber
  );

  res.json({
    success: true,
    data: paginatedReports.map(formatReport),
    pagination: {
      currentPage: pageNumber,
      limit: limitNumber,
      totalItems,
      totalPages,
    },
  });
});

// GET report by ID
app.get("/api/reports/:id", (req, res) => {
  const report = reports.find(
    (item) => String(item.id) === String(req.params.id)
  );

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  res.json({
    success: true,
    data: formatReport(report),
  });
});

// POST new report
app.post("/api/reports", (req, res) => {
  const {
    title,
    description,
    type,
    categoryId,
    location,
    reporterName,
    contactMethod,
    contactValue,
    isContactPublic,
  } = req.body;

  // Required field validation
  if (
    !title ||
    !description ||
    !type ||
    !categoryId ||
    !location ||
    !reporterName
  ) {
    return res.status(400).json({
      success: false,
      message: "Please complete all required fields.",
    });
  }

  // Validate type
  const normalizedType = type.toUpperCase();

  if (!["LOST", "FOUND"].includes(normalizedType)) {
    return res.status(400).json({
      success: false,
      message: "Type must be LOST or FOUND.",
    });
  }

  // Validate category
  const selectedCategory = categories.find(
    (category) => String(category.id) === String(categoryId)
  );

  if (!selectedCategory) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID.",
    });
  }

  // Validate contact information if public consent is given
  if (
    isContactPublic === true &&
    (!contactMethod || !contactValue)
  ) {
    return res.status(400).json({
      success: false,
      message: "Contact information is required when public contact is enabled.",
    });
  }

  // Create new report
  const newReport = {
    id: `report-${Date.now()}`,
    title: title.trim(),
    description: description.trim(),
    type: normalizedType,
    category: selectedCategory,
    location: location.trim(),
    reporterName: reporterName.trim(),
    contact:
      isContactPublic === true
        ? {
            method: contactMethod,
            value: contactValue,
          }
        : null,
    isContactPublic: isContactPublic === true,
    status: "ACTIVE",
    images: [],
    createdAt: new Date().toISOString(),
  };

  reports.unshift(newReport);

  res.status(201).json({
    success: true,
    message: "Report created successfully.",
    data: formatReport(newReport),
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`LoFo API is running at http://localhost:${PORT}`);
});