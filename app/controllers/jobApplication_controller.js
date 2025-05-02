const responseMessages = require('../middlewares/response-messages');
const { errorHandlerFunction } = require('../middlewares/error');
const { paginationFn } = require('../utils/common_utils');
const validator = require('../validators/jobApplication');
const db = require('../models');

module.exports = {
    createJobApplication: async (req, res) => {
        try{
            const { error, validateData } = await validator.validateJobApplicationCreate(req.body);
            if (error) {
                return res.clientError({
                  msg: error
                })
              }
              const filterQuery = { isDeleted: false };
              filterQuery.mobile = req.body.mobile;
              const checkExists = await db.jobApplication.findOne(filterQuery);
              if(checkExists){
                return res.clientError({
                    msg: responseMessages[1009]
                })
              }
              const data = await db.jobApplication.create(req.body);
              if(data && data._id){
                return res.success({
                    msg: responseMessages[1031],
                    result: data
                });
              }
              return res.clientError({
                msg: responseMessages[1017]
              });
        }catch(error){
            errorHandlerFunction(res, error);
        }
    },
     getJobApplication: async (req, res) => {
        try {
          const _id = req.params.id;
          // const filterQuery = { isDeleted: false };
          const filterQuery = _id ? { _id, isDeleted: false } : { isDeleted: false };
          const unwanted = {
            isDeleted: 0,
          }
          const populateValues = { path: 'career', select: 'name' };
          if (_id) {
            const data = await db.jobApplication.findOne(filterQuery).select(unwanted).populate(populateValues);
            if (data) {
              return res.success({
                msg: responseMessages[1018],
                result: data
              });
            }
            return res.clientError({
              msg: responseMessages[1015]
            })
          }
          const { perPage, currentPage, sortBy, career } = req.query;
          let sort = { createdAt: -1 };
          if (sortBy === 'latest') sort = { createdAt: -1 };
          if (sortBy === 'oldest') sort = { createdAt: 1 };
          if (career) {
            filterQuery.career = career
          }
          const { rows, pagination } = await paginationFn(
            res,
            db.jobApplication,
            filterQuery,
            perPage,
            currentPage,
            populateValues,
            sort,
            unwanted
          )
          if (!rows.length) {
            return res.success({
              msg: responseMessages[1014],
              result: { rows }
            });
          }
          return res.success({
            msg: responseMessages[1018],
            result: { rows, pagination }
          })
        } catch (error) {
          errorHandlerFunction(res, error);
        }
      },
        deleteJobApplication: async (req, res) => {
              try{
                  const _id = req.params.id;
                  const filterQuery = { isDeleted: false, _id };
                  const checkExists = await db.jobApplication.findOne(filterQuery);
                  if(!checkExists){
                      return res.clientError({
                          msg: responseMessages[1014]
                      })
                  }
                  const data = await db.jobApplication.updateOne(filterQuery, { isDeleted: true });
                  if(data.modifiedCount){
                      return res.success({
                          msg: responseMessages[1030],
                          result: data
                      })
                  }
                  return res.clientError({
                      msg: responseMessages[1022]
                  })
              }catch(error){
                  errorHandlerFunction(res, error);
              }
          }
}