const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mime = require('mime-types');
const fileType = require('file-type');
const { google } = require('googleapis');

// Create auth object once at the top (if not already created)
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../utils/corpwingsfileuploader-f51425d45142.json'),
  // keyFile: path.resolve(process.env.GOOGLE_DRIVE_KEY_FILE),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// Upload file to Google Drive
async function uploadFileToDrive(filePath, fileName) {
    const driveService = google.drive({ version: 'v3', auth: await auth.getClient() });
  
    let detectedType;
    try {
      const buffer = fs.readFileSync(filePath);
      detectedType = await fileType.fromBuffer(buffer);
    } catch (err) {
      console.error("Error reading file for type detection:", err);
    }
  
    const extensionSource = fileName || filePath;
    const fallbackMime = mime.lookup(extensionSource) || 'application/octet-stream';
    const mimeType = detectedType?.mime || fallbackMime;
  
    console.log("==== MIME TYPE DEBUG ====");
    console.log("Original Filename:", fileName);
    console.log("Temp File Path:", filePath);
    console.log("Detected by file-type:", detectedType?.mime || 'N/A');
    console.log("Fallback by mime-types (based on filename):", fallbackMime);
    console.log("Final MIME Type Used:", mimeType);
    console.log("==========================");
  
    const fileMetadata = {
      name: fileName,
      parents: ['1n4Xkx9mklYVP7YO4n0Py2cPW-iQMQ4jM'],
    };
    // const fileMetadata = { name: fileName };

    const media = {
      mimeType,
      body: fs.createReadStream(filePath),
    };
  
    const file = await driveService.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink, webContentLink',
    });
  
    const fileId = file.data.id;
  
    // ✅ Set permissions (make public)
    await driveService.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  
    // ✅ Re-fetch file to get updated public link immediately
    const updatedFile = await driveService.files.get({
      fileId,
      fields: 'id, webViewLink, webContentLink',
    });
  
    return {
      url: updatedFile.data.webViewLink, // <-- Use this in iframe
      downloadUrl: updatedFile.data.webContentLink, // Optional
      mimeType,
    };
}


// Set up Multer for temporary file storage
const upload = multer({ dest: 'temp/' }); // temp folder

module.exports = {
  singleUpload: async (req, res) => {
    try {
      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error("Multer error:", err);
          return res.clientError({ msg: 'Upload error', error: err.message });
        }

        if (!req.file) {
          return res.clientError({ msg: 'No file provided' });
        }

        try {
          const filePath = req.file.path;
          const originalName = req.file.originalname;

          const result = await uploadFileToDrive(filePath, originalName);

          // Optionally delete the file from temp folder after upload
          fs.unlinkSync(filePath);

          res.success({
            msg: 'File Uploaded Successfully!',
            result: {
              id: result.id,
              url: result.url,              // ✅ use this for iframe/doc preview
              downloadUrl: result.downloadUrl, // ✅ optional (if you need direct download)
              mimeType: result.mimeType,
            },
          });         
        } catch (uploadError) {
          console.error("Google Drive upload failed:", uploadError);
          return res.clientError({
            msg: 'Drive upload failed',
            error: uploadError.message || uploadError,
          });
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      res.clientError({ msg: 'Unexpected error', error: err.message });
    }
  }
};
