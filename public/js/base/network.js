var NETWORK_STATE_SUCCESS           = 0;
var NETWORK_STATE_DISCONNECT        = 1;
var NETWORK_STATE_MISS_AXIOS        = 2;
var NETWORK_STATE_METHOD_WRONG      = 3;

function _networkCreateResponse(state, data) {
    return {
        state : state,
        data : data
    };
}

function httpRequest(method, url, params, onSuccess=undefined, onFail=undefined) {
        if (null == axios || undefined === axios){
        // if (true){
            log("尚未引入axios！！！");
            resolve(_networkCreateResponse(NETWORK_STATE_MISS_AXIOS, undefined));
        }
        switch (method) {
            case "get":
                axios.get(url, { params: params }).then(function (response) {
                    if (onSuccess){
                        onSuccess(_networkCreateResponse(NETWORK_STATE_SUCCESS, response.data));
                    }
                }).catch(function (error) {
                    if (onFail){
                        onFail(_networkCreateResponse(NETWORK_STATE_DISCONNECT, error));
                    }
                });
                break;
            case "post":
                axios.post(url, { params: params }).then(function (response) {
                    if (onSuccess){
                        onSuccess(_networkCreateResponse(NETWORK_STATE_SUCCESS, response.data));
                    }
                }).catch(function (error) {
                    if (onFail){
                        onFail(_networkCreateResponse(NETWORK_STATE_DISCONNECT, error));
                    }
                });
                break;
            default:
                resolve(_networkCreateResponse(NETWORK_STATE_METHOD_WRONG, {}));
                break;
        }
}

function httpGet(url, params, onSuccess=undefined, onFail=undefined) {
    httpRequest("get", url, params, onSuccess, onFail);
}

function httpPost(url, params, onSuccess=undefined, onFail=undefined) {
    httpRequest("post" ,url, params, onSuccess, onFail);
}









