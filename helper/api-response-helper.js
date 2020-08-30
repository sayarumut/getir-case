exports.success = function (res, data) {
	var payload = ERROR_RESPONSE.SUCCESS;
	payload = Object.assign(payload, data);
	return res.status(200).json(payload);
};

exports.clientError = (res, msg) =>  {
	let payload = ERROR_RESPONSE.CLIENT_ERROR;
	payload.msg = msg;
	return res.status(400).json(payload);
}

exports.notFound = (res) => {
	return res.status(404).json(ERROR_RESPONSE.NOT_FOUND);
};

exports.serverError = (res, err) => {
	return res.status(500).json(ERROR_RESPONSE.SERVER_ERROR);
};

const ERROR_RESPONSE = {
	SUCCESS: {
		"code": 0,
		"msg": "Success"
	},
	CLIENT_ERROR: {
		"code": 1
	},
	SERVER_ERROR: {
		"code": 2,
		"msg": "Something went wrong!"
	},
	NOT_FOUND: {
		"code": 3,
		"msg": "Not Found!"
	},
}