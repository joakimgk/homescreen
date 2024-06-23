var supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
var supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
var jwtoken;
var defaultFilter = 'project_id=eq.1';

export function getjwtoken() {
	return new Promise(function (resolve, reject) {
		var params = {
			"email": process.env.REACT_APP_SUPABASE_USERNAME,
			"password": process.env.REACT_APP_SUPABASE_PASS
		};

		var url = process.env.REACT_APP_SUPABASE_URL + '/auth/v1/token?grant_type=password';

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				if (xmlhttp.status == 200) {
					var data = JSON.parse(xmlhttp.responseText);
					jwtoken = data["access_token"];
					resolve(jwtoken);
				} else {
					reject({
						status: xmlhttp.status,
						statusText: xmlhttp.statusText
					});
				}
			}
		};

		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-Type", "text/html");
		xmlhttp.setRequestHeader("Accept", "application/json");
		xmlhttp.setRequestHeader("apikey", supabaseKey);
		xmlhttp.send(JSON.stringify(params));
	});
}

export function getData(table, query) {
	return new Promise(function (resolve, reject) {
		var q = query == null ? '' : query + '&';
		var url = supabaseUrl + '/rest/v1/' + table + '?' + q + defaultFilter + '&select=*';

		// Check if jwtoken exists or fetch a new one
		if (!jwtoken) {
			getjwtoken().then(function (token) {
				makeApiRequest(token);
			}).catch(function (error) {
				reject(error);
			});
		} else {
			makeApiRequest(jwtoken);
		}

		function makeApiRequest(token) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", url, true);
			xmlhttp.onload = function () {
				if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
					resolve(xmlhttp.response);
				} else {
					reject({
						status: xmlhttp.status,
						statusText: xmlhttp.statusText
					});
				}
			};
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {
					if (xmlhttp.status == 401) {
						jwtoken = null; // Clear token on unauthorized error
					}
				}
			};
			xmlhttp.onerror = reject;

			xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
			xmlhttp.setRequestHeader("apikey", supabaseKey);
			xmlhttp.send();
		}
	});
}