const responseMessages = require('../middlewares/response-messages');
const { errorHandlerFunction } = require('../middlewares/error')
const { excel } = require('../services/imports');
const db = require('../models');

module.exports = {
  createInternship: async (req, res) => {
    try {
      const data = await db.internship.create(req.body);
      if (data && data._id) {
        return res.success({
          msg: responseMessages[1026] || 'Internship created successfully',
          result: data
        });
      }
      return res.clientError({
        msg: responseMessages[1017] || 'Failed to create internship'
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },

  // Add single internshipData item
  addInternshipData: async (req, res) => {
    try {
      const { internshipId } = req.params;
      const { name, img_url, description } = req.body;

      const updated = await db.internship.findByIdAndUpdate(
        internshipId,
        {
          $push: {
            internshipData: { name, img_url, description }
          }
        },
        { new: true }
      );

      if (!updated) {
        return res.clientError({ msg: 'Internship not found or failed to update' });
      }

      return res.success({
        msg: 'Internship data added successfully',
        result: updated
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },
  getInternships: async (req, res) => {
    try {
      const { internshipId } = req.query;
  
      if (internshipId) {
        const internship = await db.internship.findOne({
          _id: internshipId,
          isDeleted: false
        });
  
        if (!internship) {
          return res.clientError({ msg: 'Internship not found' });
        }
  
        return res.success({
          msg: 'Internship fetched successfully',
          result: internship
        });
      }
  
      const internships = await db.internship.find({ isDeleted: false });
  
      return res.success({
        msg: 'All internships fetched successfully',
        result: internships
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  }, 
  updateInternshipBanner: async (req, res) => {
    try {
      const { internshipId } = req.params;
      const { banner } = req.body;
  
      const updated = await db.internship.findByIdAndUpdate(
        internshipId,
        { banner },
        { new: true }
      );
  
      if (!updated) {
        return res.clientError({ msg: 'Internship not found' });
      }
  
      return res.success({
        msg: 'Internship banner updated successfully',
        result: updated
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },
  updateInternshipDataItem: async (req, res) => {
    try {
      const { internshipId, dataId } = req.params;
      const { name, img_url, description } = req.body;
  
      const updated = await db.internship.findOneAndUpdate(
        { _id: internshipId, "internshipData._id": dataId },
        {
          $set: {
            "internshipData.$.name": name,
            "internshipData.$.img_url": img_url,
            "internshipData.$.description": description
          }
        },
        { new: true }
      );
  
      if (!updated) {
        return res.clientError({ msg: 'Internship or data item not found' });
      }
  
      return res.success({
        msg: 'Internship data item updated successfully',
        result: updated
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },
  deleteInternship: async (req, res) => {
    try {
      const { internshipId } = req.params;
  
      const deleted = await db.internship.findByIdAndUpdate(
        internshipId,
        { isDeleted: true },
        { new: true }
      );
  
      if (!deleted) {
        return res.clientError({ msg: 'Internship not found' });
      }
  
      return res.success({
        msg: 'Internship deleted (soft) successfully',
        result: deleted
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },
  deleteInternshipDataItem: async (req, res) => {
    try {
      const { internshipId, dataId } = req.params;
  
      const updated = await db.internship.findByIdAndUpdate(
        internshipId,
        {
          $pull: {
            internshipData: { _id: dataId }
          }
        },
        { new: true }
      );
  
      if (!updated) {
        return res.clientError({ msg: 'Internship or data item not found' });
      }
  
      return res.success({
        msg: 'Internship data item deleted successfully',
        result: updated
      });
    } catch (error) {
      errorHandlerFunction(res, error);
    }
  },        
}