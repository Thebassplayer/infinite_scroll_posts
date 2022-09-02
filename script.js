const postsContainer = document.getElementById("post-container"),
  loading = document.querySelector(".loader"),
  filter = document.getElementById("filter"),
  apiUrl = "https://jsonplaceholder.typicode.com";

//! API parameters
let section = "/posts",
  limit = 5,
  page = 1;

//! Fetch posts from API
async function getPosts() {
  const res = await fetch(`${apiUrl}${section}?_limit=${limit}&_page=${page}`),
    data = await res.json();
  return await data;
}

//! Show post in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
      </div>`;

    postsContainer.appendChild(postEl);
  });
}

//! Show loader & Fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//! Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase(),
    posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase(),
      body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

//! Show initial post
showPosts();

//! Event Listeners
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
