import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const getKey = () => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "SECRET_KEY is missing. Add SECRET_KEY in .env (32 characters for aes-256-cbc).",
    );
  }

  const key = Buffer.from(secretKey, "utf8");
  if (key.length !== 32) {
    throw new Error(
      `Invalid SECRET_KEY length: expected 32 bytes, received ${key.length}.`,
    );
  }

  return key;
};

export const encrypt = (text) => {
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Content must be a non-empty string.");
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", getKey(), iv);

  let encryptedData = cipher.update(text, "utf8", "hex");
  encryptedData += cipher.final("hex");

  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = (encryptedPayload, legacyIvHex) => {
  if (typeof encryptedPayload !== "string" || !encryptedPayload) {
    throw new Error("Encrypted payload is required.");
  }

  let ivHex = legacyIvHex;
  let encryptedData = encryptedPayload;

  // New format: "ivHex:cipherHex" (single field)
  if (!ivHex) {
    const [ivPart, cipherPart] = encryptedPayload.split(":");
    if (!ivPart || !cipherPart) {
      throw new Error("Invalid encrypted payload format.");
    }
    ivHex = ivPart;
    encryptedData = cipherPart;
  }

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", getKey(), iv);

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
