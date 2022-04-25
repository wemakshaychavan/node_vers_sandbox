exports.responseFilter = async (req, res, next) => {
	try {
		if(res.getHeader("Content-Type") === "application/pdf") {
			return next()
		}
			
		const httpStatusHeader = req?.responseData?.statusCode ?? 200

		/* 
			This block is to handle the change from error JSON object to string.
			This change was required since the Android code uses GSON centrally and is expecting 
			the error property to be a String. If the req?.responseData?.error is null or blank, then
			the following code snippet shall not get executed and the req?.responseData property shall
			remain unchanged. This block was added by @pankaj.lagu in the v3.5.0 Contest feature release.
		*/
		if(req?.responseData?.error) {
			let responseData = {...req.responseData}
			if(typeof responseData?.error !== "undefined" && typeof responseData?.error === "object") {
				responseData.error = responseData.error?.message ?? ""	
			}
			req.responseData = responseData
		}

		res.status(httpStatusHeader)
		res.json(req.responseData)
		delete req.responseData

	} catch (middlewareError) {

		console.log(`[responseFilter] Error: `, middlewareError)
		const httpStatusHeader = req?.responseData?.statusCode ?? 200
		res.status(httpStatusHeader)
		res.json(req.responseData)
		delete req.responseData
	}
}
