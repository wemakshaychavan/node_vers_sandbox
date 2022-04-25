exports.removeFalsyProperties = function (obj) {
	if (!obj) {
		return obj;
	}

	if (Array.isArray(obj) && obj.length === 0) {
		return null;
	}

	Object.entries(obj).forEach(([key, val]) => {
		if (val && typeof val === 'object') {
			val = this.removeFalsyProperties(val);
		}

		if (val && typeof val === 'string') {
			val = val.trim();
		}

		if (val == null || typeof val === 'undefined' || val === '') {
			delete obj[key];
		}

		if (Array.isArray(val) && val.length === 0) {
			delete obj[key];
		}
	});

	if (Object.entries(obj).length === 0 && obj.constructor === Object) {
		return null;
	}
	return obj;
};