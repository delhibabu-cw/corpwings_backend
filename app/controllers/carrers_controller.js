const responseMessages = require('../middlewares/response-messages');
const { errorHandlerFunction } = require('../middlewares/error');
const { paginationFn } = require('../utils/common_utils');
const validator = require('../validators/carrers');
const db = require('../models');

module.exports = {
    createCarrer: async (req , res) => {
        try{
            const { error , validateData } = await validator.validateCreateCarrers(req.body);
            if(error){
                return res.clientError({
                    msg: error
                })
            }
            const filterQuery = { isDeleted: false };
            filterQuery.name = req.body.name;
            const checkExist = await db.carrer.findOne(filterQuery);
            if(checkExist){
                return res.clientError({
                    msg: responseMessages[1025]
                })
            }
            const data =await db.carrer.create(req.body);
            if(data && data._id){
                return res.success({
                    msg: responseMessages[1029],
                    result: data
                });
            }
                return res.clientError({
                 msg: responseMessages[1017]
                });
            
        }catch(error){
            errorHandlerFunction(res, error)
        }
    },
    getAuthCarrers: async (req, res) => {
        try {
            const _id = req.params.id;
            const filterQuery = _id ? { _id, isDeleted: false } : { isDeleted: false };
    
            // Fetch Single Career with Total Applications Count
            if (_id) {
                const data = await db.carrer.findOne(filterQuery);
                if (data) {
                    const totalApplications = await db.jobApplication.countDocuments({ career: _id, isDeleted: false });
    
                    return res.success({
                        msg: responseMessages[1018],
                        result: { ...data.toObject(), totalApplications }
                    });
                }
                return res.clientError({ msg: responseMessages[1015] });
            }
    
            // Fetch all Careers (no pagination)
            const careers = await db.carrer.find(filterQuery).sort({ createdAt: -1 });
    
            if (!careers.length) {
                return res.success({
                    msg: responseMessages[1014],
                    result: []
                });
            }
    
            // Get total applications per career
            const careerIds = careers.map(c => c._id);
            const applicationCounts = await db.jobApplication.aggregate([
                { $match: { career: { $in: careerIds }, isDeleted: false } },
                { $group: { _id: "$career", totalApplications: { $sum: 1 } } }
            ]);
    
            const applicationCountMap = applicationCounts.reduce((acc, curr) => {
                acc[curr._id] = curr.totalApplications;
                return acc;
            }, {});
    
            const updatedCareers = careers.map(career => ({
                ...career.toObject(),
                totalApplications: applicationCountMap[career._id] || 0
            }));
    
            return res.success({
                msg: responseMessages[1018],
                result: updatedCareers
            });
        } catch (error) {
            errorHandlerFunction(res, error);
        }
    },    
    getCarrers: async (req, res) => {
        try {
            const _id = req.params.id;
            const filterQuery = _id ? { _id, isDeleted: false } : { isDeleted: false };
            const unwanted = { isDeleted: 0 };
    
            // Fetch Single Career with Total Applications Count
            if (_id) {
                const data = await db.carrer.findOne(filterQuery);
                if (data) {
                    // Count the number of applications linked to this career
                    const totalApplications = await db.jobApplication.countDocuments({ career: _id, isDeleted: false });
    
                    return res.success({
                        msg: responseMessages[1018],
                        result: { ...data.toObject(), totalApplications }
                    });
                }
                return res.clientError({ msg: responseMessages[1015] });
            }
    
            // Fetch Careers with Pagination
            const { perPage, currentPage, sortBy } = req.query;
            let sort = { createdAt: -1 };
            if (sortBy === 'latest') sort = { createdAt: -1 };
            if (sortBy === 'oldest') sort = { createdAt: 1 };
    
            const { rows, pagination } = await paginationFn(
                res,
                db.carrer,
                filterQuery,
                perPage,
                currentPage,
                null,
                sort,
                unwanted
            );
    
            // If no careers found
            if (!rows.length) {
                return res.success({
                    msg: responseMessages[1014],
                    result: { rows }
                });
            }
    
            // Fetch total applications for each career
            const careerIds = rows.map((career) => career._id);
            const applicationCounts = await db.jobApplication.aggregate([
                { $match: { career: { $in: careerIds }, isDeleted: false } },
                { $group: { _id: "$career", totalApplications: { $sum: 1 } } }
            ]);
    
            // Map total applications to careers
            const applicationCountMap = applicationCounts.reduce((acc, curr) => {
                acc[curr._id] = curr.totalApplications;
                return acc;
            }, {});
    
            const updatedRows = rows.map((career) => ({
                ...career.toObject(),
                totalApplications: applicationCountMap[career._id] || 0
            }));
    
            return res.success({
                msg: responseMessages[1018],
                result: { rows: updatedRows, pagination }
            });
        } catch (error) {
            errorHandlerFunction(res, error);
        }
    },
    
    // getCarrers: async (req, res) => {
    //     try{
    //     const _id = req.params.id;
    //     const filterQuery = _id ? { _id, isDeleted: false } : { isDeleted: false };
    //     // const filterQuery = { isDeleted : false };
    //     const unwanted = {
    //         isDeleted: 0,
    //     }
    //     if(_id){
    //         // filterQuery._id = _id; // ✅ Apply the ID filter

    //         const data = await db.carrer.findOne(filterQuery);
    //         if(data){
    //             const totalApply = await db.jobApplication.countDocuments({ career: _id, isDeleted : false })
    //             return res.success({
    //                 msg: responseMessages[1018],
    //                 result: { ...data.toObject(), totalApply }
    //             })
    //         }
    //         return res.clientError({
    //             msg: responseMessages[1015]
    //         })
    //     }
    //     const { perPage, currentPage, sortBy  } = req.query;
    //     let sort = { createdAt: -1 };
    //     if(sortBy === 'latest') sort = { createdAt: -1 };
    //     if(sortBy === 'oldest') sort = { createdAt: 1 };
    //     const { rows, pagination } = await paginationFn(
    //         res,
    //         db.carrer,
    //         filterQuery,
    //         perPage,
    //         currentPage,
    //         null,
    //         sort,
    //         unwanted
    //     )
    //     if(!rows.length){
    //         return res.success({
    //             msg: responseMessages[1014],
    //             result: { rows }
    //         })
    //     }

    //      // Fetch total applications for each career
    //     const careerIds = rows?.map((career) => career._id);
    //     const applicationCounts = await db.jobApplication.aggregate([
    //         { $match: { career: { $in: careerIds }, isDeleted: false } },
    //         { $group: { _id: '$career', totalApplications: { $sum: 1 } } }
    //     ]);

    //      // Map total applications to careers
    //      const applicationCountMap = applicationCounts.reduce((acc, curr)=>{
    //         acc[curr._id] = curr.totalApplications;
    //         return acc
    //      }, {});

    //      const updateRows = rows?.map((careers) =>({
    //         ...data
    //      }))
    //     return res.success({
    //         msg: responseMessages[1018],
    //         result: { rows, pagination }
    //     })
    //     }catch(error){
    //         errorHandlerFunction(res, error)
    //     }
    // },
    updateCarrers: async (req, res) => {
        try{
            const _id = req.params.id;
            const filterQuery = { isDeleted: false, _id };
            const checkExist = await db.carrer.findOne(filterQuery);
            if(!checkExist){
                return res.clientError({
                    msg: responseMessages[1014]
                })
            }
            const updateData = {};
            Object.keys(req.body).forEach((key) => {
                updateData[key] = req.body[key];
            });
            const data = await db.carrer.updateOne(filterQuery, updateData);
            if(data.modifiedCount){
                return res.success({
                    msg: responseMessages[1019],
                    result: data
                })
            }
            return res.clientError({
                msg: responseMessages[1020]
            })
        }catch(error){
            errorHandlerFunction(res , error);
        }
    },
    deleteCarrers: async (req, res) => {
        try{
            const _id = req.params.id;
            const filterQuery = { isDeleted: false, _id };
            const checkExists = await db.carrer.findOne(filterQuery);
            if(!checkExists){
                return res.clientError({
                    msg: responseMessages[1014]
                })
            }
            const data = await db.carrer.updateOne(filterQuery, { isDeleted: true });
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