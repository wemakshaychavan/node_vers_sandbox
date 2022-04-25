const { databaseConfig } = require('../../../../init/database.init');
const database = databaseConfig();

const updatePostStats = async (params) => {
	
	try {
			const postId = params.MessageAttributes.postId.StringValue
			const userId = params.MessageAttributes.userId.StringValue

			let postViewStats =await database.models["postViewStats"].findOne({where:{postId:postId,userId:userId}});

			console.log(postViewStats)
			if(!postViewStats){

				let postViewObj = new database.models["postViewStats"]()
				postViewObj.postId = postId
				postViewObj.userId = userId
				postViewObj.save();

				//save incremented value to redis cache

				const postViewCount = await redisCache.get(`view-stat-${postId}`);
				if(postViewCount){
					await redisCache.incr(`view-stat-${postId}`);
				}else{
					await redisCache.set(`view-stat-${postId}`,1);
				}

				console.log(`await redisCache.get(${postId}`,await redisCache.get(`view-stat-${postId}`))

			}

		return true

	} catch (error) {
		console.log(`[StatsServiceV1] postViewed service error `, error)
		let responseData = {
			currentDateTime: new Date().getTime(),
			serviceError: error
		}
		return responseData
	}
}

module.exports = {
	updatePostStats
}