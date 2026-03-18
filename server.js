import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const filesDirectory = path.resolve(process.cwd(), "files");

fs.mkdirSync(filesDirectory, { recursive: true });

app.use(express.json());

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

function getSafeFilePath(filename) {
  if (typeof filename !== "string" || filename.trim() === "") {
    return { error: "Filename is required." };
  }

  const safeFilename = filename.trim();

  if (
    safeFilename.includes("..") ||
    /[\\/]/.test(safeFilename) ||
    path.isAbsolute(safeFilename)
  ) {
    return { error: "Invalid filename." };
  }

  const filePath = path.resolve(filesDirectory, safeFilename);
  const normalizedBase = path.normalize(filesDirectory + path.sep);
  const normalizedTarget = path.normalize(filePath);

  if (!normalizedTarget.startsWith(normalizedBase)) {
    return { error: "Invalid filename." };
  }

  return { filePath, safeFilename };
}

app.post("/create", (req, res) => {
  try {
    const { filename } = req.body || {};
    const resolved = getSafeFilePath(filename);

    if (resolved.error) {
      return sendError(res, 400, resolved.error);
    }

    const { filePath, safeFilename } = resolved;

    if (fs.existsSync(filePath)) {
      return sendError(res, 409, `File ${safeFilename} already exists.`);
    }

    fs.writeFileSync(filePath, "", "utf8");
    return res.status(201).json({
      message: `File ${safeFilename} created successfully.`,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error.");
  }
});

app.post("/write", (req, res) => {
  try {
    const { filename, content } = req.body || {};
    const resolved = getSafeFilePath(filename);

    if (typeof content !== "string") {
      return sendError(res, 400, "Content must be a string.");
    }

    const { filePath, safeFilename } = resolved;
    const existed = fs.existsSync(filePath);

    fs.writeFileSync(filePath, content, "utf8");

    return res.status(existed ? 200 : 201).json({
      message: `Content written to ${safeFilename}.`,
      filename: safeFilename,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error.");
  }
});

app.get("/read/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const resolved = getSafeFilePath(filename);

    if (resolved.error) {
      return sendError(res, 400, resolved.error);
    }

    const { filePath, safeFilename } = resolved;

    if (!fs.existsSync(filePath)) {
      return sendError(res, 404, `File ${safeFilename} not found.`);
    }

    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return sendError(res, 404, `File ${safeFilename} not found.`);
    }

    const content = fs.readFileSync(filePath, "utf8");
    return res.status(200).json({
      filename: safeFilename,
      content,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error.");
  }
});

app.delete("/delete/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const resolved = getSafeFilePath(filename);

    if (resolved.error) {
      return sendError(res, 400, resolved.error);
    }

    const { filePath, safeFilename } = resolved;

    if (!fs.existsSync(filePath)) {
      return sendError(res, 404, `File ${safeFilename} not found.`);
    }

    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return sendError(res, 404, `File ${safeFilename} not found.`);
    }

    fs.unlinkSync(filePath);
    return res.status(200).json({
      message: `File ${safeFilename} deleted successfully.`,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error.");
  }
});

app.get("/list", (req, res) => {
  try {
    const entries = fs.readdirSync(filesDirectory, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);

    return res.status(200).json({ files });
  } catch (error) {
    return sendError(res, 500, "Internal server error.");
  }
});

app.listen(PORT, () => {
  console.log(`File Manager API running on port ${PORT}`);
});
