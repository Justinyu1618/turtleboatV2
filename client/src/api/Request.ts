import axios from "axios";

const BASE_URL = "/api/v1"; //process.env.REACT_APP_BACKEND_URL;

class Request {
  constructor(endpoint: string, parameters: any = {}) {
    // Default request options for axios
    let options: any = {
      method: "GET",
      url: BASE_URL + endpoint,
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    // if (Storage.isLoggedIn()) {
    //   options["headers"] = {
    //     ...options["headers"],
    //     Authorization: "Bearer " + Storage.getToken(),
    //   };
    // }

    // Only pass method if undefined, since it is assumed to be GET
    if (parameters["method"] !== undefined) {
      options["method"] = parameters["method"];
      if (parameters["method"] === "POST") {
        options["headers"] = {
          ...options["headers"],
          "content-type": "application/json",
        };
      }
    }

    if (parameters["responseType"] !== undefined) {
      options["responseType"] = parameters["responseType"];
    }

    // Add request data
    options["data"] = parameters["data"];

    // Pass request body and URL parameters
    options["params"] = parameters["params"];

    options["headers"] = { ...options["headers"], ...parameters["headers"] };

    console.log(endpoint, options);
    // Perform the request
    axios(options)
      .then((response) => {
        console.log("Call to " + endpoint + " SUCCEEDED");
        if (typeof this.then !== "undefined") {
          console.log(response);
          this.then(response);
        } else {
          console.log(response);
          return this;
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 422)
        ) {
          // Storage.logOut();
          window.location.reload();
        }
        if (typeof this.catch !== "undefined") {
          console.log(error);
          this.catch(error);
        } else {
          console.log("Call to " + endpoint + " FAILED");
          console.log(error);
          return this;
        }
      });
  }

  catch(callback) {
    this.catch = callback;
    return this;
  }

  then(callback) {
    this.then = callback;
    return this;
  }
}

export default Request;
