import axios from "axios";

import { ACCESS_TOKEN, DOMAIN, TOKEN, TOKEN_CYBER } from "util/config";

// PUT JSON ve backend
export class BaseService {
  //put method
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        TokenCybersoft: TOKEN_CYBER,
        Authorization: "Bearer " + ACCESS_TOKEN, // JWT
      },
    });
  };

  // post method
  post = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        TokenCybersoft: TOKEN_CYBER,
        Authorization: "Bearer " + ACCESS_TOKEN, // JWT
      },
    });
  };

  // get method
  get = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBER,
        Authorization: "Bearer " + ACCESS_TOKEN, // JWT
      },
    });
  };

  // delete method
  delete = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBER,
        Authorization: "Bearer " + ACCESS_TOKEN, // JWT
      },
    });
  };
}
