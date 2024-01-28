// Axios Globals
axios.defaults.headers.common["X-Auth-Token"] = "Token will come here";

// GET REQUEST
function getTodos() {
  // axios({
  //   method: "get",
  //   url: "https://reqres.in/api/users",
  //   params:{
  //     page:1,
  //     per_page:3
  //   }
  // })
  // ! or
  // axios.get("https://reqres.in/api/users",{params:{
  //   per_page:3,
  //   page:4
  // }})
  // ! or
  axios
    .get("https://reqres.in/api/users")
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => console.log(err));
  // fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((res) => {
  //     console.log(res)
  //     let data = res.json()
  //     console.log(data)
  //     return data

  //   })
  //   .then((data) => console.log(data));
}

// POST REQUEST
function addTodo() {
  //  axios.post("https://reqres.in/api/users",{
  //     "name": "Akshay",
  //     "job": "Webdeveloper"
  // })
  axios({
    method: "post",
    url: "https://reqres.in/api/users",
    data: {
      email: "ajay@reqres.in",
      first_name: "Ajay",
      last_name: "Patil",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put("https://reqres.in/api/users/630",{
  //   "name":"Ajay Patil",
  // "job":"CRA and devotee of Lord Shri Krishna"
  // }).
  // then((res)=>showOutput(res))
  axios
    .patch("https://reqres.in/api/users/630", {
      email: "ajay_patil_123@reqres.in",
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://reqres.in/api/users/2")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/posts"),
    axios.get("https://reqres.in/api/users?page=2"),
  ])
    .then((res) => {
      const [res1, res2] = res;
      showOutput(res2);
    })
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Some token",
    },
  };

  axios
    .post(
      "https://reqres.in/api/users",
      {
        name: "Akshay",
        job: "Webdeveloper",
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}
// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://reqres.in/api/users",
    data: {
      email: "ajay@reqres.in",
      first_name: "Ajay",
      last_name: "Patil",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.last_name = data.last_name.toUpperCase();
      data.first_name = data.first_name.toUpperCase();
      return data;
    }),
  };
  axios(options)
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://reqres.in/api/users?per_page=3&page=3")
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        if (err.response.status === 404) {
          alert("Error: Page Not Found");
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancleToken.source();

  axios
    .get("https://reqres.in/api/users?per_page=3&page=3", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });
  if (true) {
    source.cancel("Request canceled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`,
      config
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
});
axiosInstance.get("/users").then((res) => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
