const multer  = require('multer')
const path = require('path')
// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify where to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  }
});
// Initialize Multer with storage options
const upload = multer({ storage: storage });

module.exports = {
    // Single file upload
    singleUpload: async (req, res) => {
      try {
        upload.single('file')(req, res, async (err) => {
          if (err) {
            return res.clientError({ msg: 'File upload failed', error: err });
          }
    
          if (!req.file) {
            return res.clientError({ msg: 'No file uploaded' });
          }
    
          try {
            res.success({
                msg: "File Uploaded Successfully!!!",
                result: req.file.filename
            })
            // const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    
            // res.success({
            //   msg: 'File uploaded successfully!',
            //   result: { location: result.secure_url },
            // });
          } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.clientError({ msg: 'Error uploading', error: uploadError });
          }
        });
      }catch (error) {
        console.error('Caught error:', error);
        return res.clientError({ msg: `File upload exception: ${error.message}`, error });
      }
    },

}