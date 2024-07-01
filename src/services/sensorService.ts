import useSWR from "swr";
import { BasicCredentials, useAuthContext } from "../contexts/AuthContext";

var supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
var supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
var jwtoken: string | null = null;
var defaultFilter = 'project_id=eq.1';

function getjwtoken(credentials?: BasicCredentials): Promise<string> {
	return new Promise(function (resolve, reject) {
		var params = {
			"email": credentials?.username || '',
			"password": credentials?.password || ''
		};

		var url = process.env.REACT_APP_SUPABASE_URL + '/auth/v1/token?grant_type=password';

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				if (xmlhttp.status == 200) {
					var data = JSON.parse(xmlhttp.responseText);
					jwtoken = data["access_token"];
					resolve(jwtoken as string);
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
		xmlhttp.setRequestHeader("apikey", supabaseKey!);
		xmlhttp.send(JSON.stringify(params));
	});
}

function getData<T>(table: string | undefined, credentials?: BasicCredentials, query?: string): Promise<T> {
	if (!table) {
		return Promise.resolve(null as unknown as T);
	}

	return new Promise(function (resolve, reject) {
		var q = query == null ? '' : query + '&';
		var url = supabaseUrl + '/rest/v1/' + table + '?' + q + defaultFilter + '&select=*';

		// Check if jwtoken exists or fetch a new one
		if (!jwtoken) {
			getjwtoken(credentials).then(function (token: string) {
				makeApiRequest(token);
			}).catch(function (error) {
				reject(error);
			});
		} else {
			makeApiRequest(jwtoken);
		}

		function makeApiRequest(token: string) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", url, true);
			xmlhttp.onload = function () {
				if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
					resolve(JSON.parse(xmlhttp.response));
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
			xmlhttp.setRequestHeader("apikey", supabaseKey!);
			xmlhttp.send();
		}
	});
}

export const useData = <T>(table: string | undefined, query?: string) => {
	const { credentials } = useAuthContext();
	const fetcher = () => getData<T>(table, credentials, query);
	return useSWR<T>(!table ? null : table + '?' + query, fetcher);
};
