document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getAPI').addEventListener('click', getAPI);
document.getElementById('addPost').addEventListener('submit', addPost);

function getText() {
    fetch('text.txt')
    .then((resolve) => resolve.text())
    .then((data) => {
        document.getElementById('output').innerHTML = `<div class="alert alert-primary">${data}</div>`;
    })
    .catch((err) => [console.log(err)]);
}

function getUsers() {
    fetch('users.json')
    .then((resolve) => resolve.json())
    .then((data) => {
        let output = `
            <h2 class="mt-3">Users</h2>
            <div class="list-group mt-3">
        `;
        data.forEach((user) => {
            output +=`
                <div class="list-group-item mb-3 bg-light">
                    <h5 class="mb-1">Name: ${user.name}</h5>
                    <p class="mb-1">Email: ${user.email}</p>
                    <small>ID: ${user.id}</small>
                </div>
            `;
        });
        output += `</div>`;
        document.getElementById('output').innerHTML = output;
    });
}

function getAPI() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        let output = `
            <h2 class="mt-3">Posts from JSONPlaceholder Site</h2>
            <div class="mt-3">
        `;
        data.forEach((post) => {
            output +=`
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                    </div>
                </div>
            `;
        });
        output += `</div>`;
        document.getElementById('output').innerHTML = output;
    });
}

function addPost(e){
    e.preventDefault();
    
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({title:title, body:body})
    })
    .then(resolve => resolve.json())
    .then((data) => {
        let output = `
            <h2 class="mt-3">New Post Added</h2>
            <div class="card bg-light mt-3">
                <div class="card-body">
                    <h4 class="card-title">${data.title}</h4>
                    <p class="card-text">${data.body}</p>
                </div>
            </div>
        `;
        document.getElementById('output').innerHTML = output;
    });
}

