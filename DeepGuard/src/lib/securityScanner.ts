/**
 * Security Scanner Module
 * Provides file security checks and malware detection for uploaded files
 */

export interface SecurityScanResult {
  isSafe: boolean;
  threats: string[];
  warnings: string[];
  scanTime: number;
  fileHash: string;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Performs comprehensive security scan on uploaded file
 */
export async function performSecurityScan(file: File): Promise<SecurityScanResult> {
  const startTime = Date.now();
  const threats: string[] = [];
  const warnings: string[] = [];

  // 1. File size validation (prevent zip bombs and large malicious files)
  if (file.size === 0) {
    threats.push("Empty file detected - potential corruption or malicious intent");
  }

  if (file.size > 100 * 1024 * 1024) {
    threats.push("File exceeds maximum safe size limit");
  }

  // 2. File extension validation (prevent double extensions and suspicious patterns)
  const fileName = file.name.toLowerCase();
  const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.msi', '.app', '.deb', '.rpm'];
  
  for (const ext of suspiciousExtensions) {
    if (fileName.endsWith(ext)) {
      threats.push(`Executable file type detected: ${ext} - Not allowed`);
    }
    if (fileName.includes(ext + '.')) {
      threats.push(`Double extension detected: Possible file masquerading`);
    }
  }

  // 3. MIME type validation (ensure MIME matches file extension)
  const mimeValidation = validateMimeType(file);
  if (!mimeValidation.isValid) {
    threats.push(...mimeValidation.errors);
    warnings.push(...mimeValidation.warnings);
  }

  // 4. Read file header to detect file signature mismatches
  const headerValidation = await validateFileHeader(file);
  if (!headerValidation.isValid) {
    threats.push(...headerValidation.errors);
    warnings.push(...headerValidation.warnings);
  }

  // 5. Check for suspicious file patterns
  const patternCheck = await checkSuspiciousPatterns(file);
  if (patternCheck.length > 0) {
    warnings.push(...patternCheck);
  }

  // 6. Generate file hash for integrity verification
  const fileHash = await generateFileHash(file);

  const scanTime = Date.now() - startTime;

  return {
    isSafe: threats.length === 0,
    threats,
    warnings,
    scanTime,
    fileHash,
  };
}

/**
 * Validates MIME type against file extension
 */
function validateMimeType(file: File): FileValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();
  
  // Check if MIME type is empty or generic
  if (!mimeType || mimeType === 'application/octet-stream') {
    warnings.push("Generic or missing MIME type - unable to verify file integrity");
  }

  // Validate image files
  if (fileName.match(/\.(jpg|jpeg)$/)) {
    if (!mimeType.includes('image/jpeg') && !mimeType.includes('image/jpg')) {
      errors.push("File extension doesn't match MIME type - possible file masquerading");
    }
  } else if (fileName.endsWith('.png')) {
    if (!mimeType.includes('image/png')) {
      errors.push("PNG extension but non-PNG MIME type detected");
    }
  } else if (fileName.endsWith('.gif')) {
    if (!mimeType.includes('image/gif')) {
      errors.push("GIF extension but non-GIF MIME type detected");
    }
  }
  
  // Validate video files
  else if (fileName.endsWith('.mp4')) {
    if (!mimeType.includes('video/mp4') && !mimeType.includes('video/quicktime')) {
      errors.push("MP4 extension but non-MP4 MIME type detected");
    }
  }
  
  // Validate audio files
  else if (fileName.endsWith('.mp3')) {
    if (!mimeType.includes('audio/mpeg') && !mimeType.includes('audio/mp3')) {
      errors.push("MP3 extension but non-MP3 MIME type detected");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates file header (magic bytes) to detect file type spoofing
 */
async function validateFileHeader(file: File): Promise<FileValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const headerBytes = await readFileHeader(file, 12);
    const fileName = file.name.toLowerCase();

    // Check common file signatures (magic bytes)
    const signatures: Record<string, { bytes: number[], extensions: string[] }> = {
      'JPEG': { bytes: [0xFF, 0xD8, 0xFF], extensions: ['.jpg', '.jpeg'] },
      'PNG': { bytes: [0x89, 0x50, 0x4E, 0x47], extensions: ['.png'] },
      'GIF': { bytes: [0x47, 0x49, 0x46, 0x38], extensions: ['.gif'] },
      'BMP': { bytes: [0x42, 0x4D], extensions: ['.bmp'] },
      'WEBP': { bytes: [0x52, 0x49, 0x46, 0x46], extensions: ['.webp'] },
      'MP4': { bytes: [0x00, 0x00, 0x00], extensions: ['.mp4', '.m4a', '.m4v'] },
      'AVI': { bytes: [0x52, 0x49, 0x46, 0x46], extensions: ['.avi'] },
      'MP3': { bytes: [0xFF, 0xFB], extensions: ['.mp3'] },
      'WAV': { bytes: [0x52, 0x49, 0x46, 0x46], extensions: ['.wav'] },
      'ZIP': { bytes: [0x50, 0x4B, 0x03, 0x04], extensions: ['.zip'] },
      'EXE': { bytes: [0x4D, 0x5A], extensions: ['.exe', '.dll'] },
    };

    // Check if file header matches expected signature
    let matchFound = false;
    for (const [type, sig] of Object.entries(signatures)) {
      if (headerBytes.slice(0, sig.bytes.length).every((byte, i) => byte === sig.bytes[i])) {
        // Check if extension matches the signature
        const hasMatchingExt = sig.extensions.some(ext => fileName.endsWith(ext));
        
        if (!hasMatchingExt) {
          errors.push(`File signature indicates ${type} but extension doesn't match`);
        }
        
        // Flag executable files
        if (type === 'EXE') {
          errors.push("Executable file detected - Not allowed for security reasons");
        }
        
        matchFound = true;
        break;
      }
    }

    if (!matchFound && headerBytes.length > 0) {
      warnings.push("Unable to verify file signature - proceed with caution");
    }

  } catch (error) {
    warnings.push("Unable to read file header for verification");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Reads the first N bytes of a file
 */
async function readFileHeader(file: File, numBytes: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const blob = file.slice(0, numBytes);
    
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(Array.from(bytes));
    };
    
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Checks for suspicious patterns in file content
 */
async function checkSuspiciousPatterns(file: File): Promise<string[]> {
  const warnings: string[] = [];

  try {
    // Read first 1KB of file for pattern analysis
    const sampleSize = Math.min(1024, file.size);
    const sample = await readFileHeader(file, sampleSize);
    const text = new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(sample));

    // Check for suspicious patterns (script tags, embedded code, etc.)
    const suspiciousPatterns = [
      { pattern: /<script/i, message: "Embedded script tag detected" },
      { pattern: /eval\(/i, message: "Eval function detected" },
      { pattern: /document\.write/i, message: "Document.write detected" },
      { pattern: /onclick|onload|onerror/i, message: "Event handler detected" },
      { pattern: /\\x[0-9a-f]{2}/i, message: "Hex encoded content detected" },
      { pattern: /%[0-9a-f]{2}/i, message: "URL encoded content detected" },
    ];

    for (const { pattern, message } of suspiciousPatterns) {
      if (pattern.test(text)) {
        warnings.push(message);
      }
    }

    // Check for null bytes (common in binary exploits)
    if (sample.includes(0x00) && file.type.startsWith('text/')) {
      warnings.push("Null bytes detected in text file - suspicious");
    }

  } catch (error) {
    // Silently ignore if unable to read content
  }

  return warnings;
}

/**
 * Generates SHA-256 hash of file for integrity verification
 */
async function generateFileHash(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    return 'hash_generation_failed';
  }
}

/**
 * Check file against known malicious hashes (in production, this would query a database)
 */
export function checkMaliciousHashDatabase(fileHash: string): boolean {
  // In production, this would query a real malware hash database
  // For now, return false (no match found)
  const knownMaliciousHashes = [
    // Example blocked hashes would go here
  ];
  
  return knownMaliciousHashes.includes(fileHash);
}

/**
 * Sanitize filename to prevent directory traversal attacks
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Remove special characters
    .replace(/\.{2,}/g, '.') // Remove multiple dots
    .replace(/^\./, '_') // Remove leading dot
    .slice(0, 255); // Limit length
}
