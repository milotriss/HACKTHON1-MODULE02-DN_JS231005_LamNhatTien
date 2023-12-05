"use strict";
let blog = [];
if (!JSON.parse(localStorage.getItem('blog'))) {
    localStorage.setItem('blog', JSON.stringify(blog));
}
function renderBlog() {
    let blogDb = JSON.parse(localStorage.getItem('blog'));
    let listBlogs = document.querySelector('.bottom');
    listBlogs.innerHTML = "";
    blogDb.forEach((blog) => {
        listBlogs.innerHTML +=
            `
        <div class="blogItems">
            <h1>${blog.title}</h1>
            <p>${blog.content}</p>
            <div class="comment">
                <button onclick="openModel(${blog.id})">Comment</button>
            </div>
            <span class="count"></span>
            <div class="commentItems">
            </div>
        </div>
        `;
        renderComment(blog.id);
    });
}
renderBlog();
function addNewBlog() {
    let blogDb = JSON.parse(localStorage.getItem('blog'));
    let titleInput = document.getElementById('title');
    let contentInput = document.getElementById('content');
    if (titleInput.value.length == 0 || contentInput.value.length == 0) {
        alert('Enter complete information!!!');
    }
    else {
        if (blogDb.length == 0) {
            blogDb.push({
                id: 1,
                title: titleInput.value.toUpperCase().trim(),
                content: contentInput.value.trim(),
                comment: []
            });
        }
        else {
            blogDb.push({
                id: blogDb[blogDb.length - 1].id + 1,
                title: titleInput.value.toUpperCase().trim(),
                content: contentInput.value.trim(),
                comment: []
            });
        }
    }
    localStorage.setItem('blog', JSON.stringify(blogDb));
    titleInput.value = "";
    contentInput.value = "";
    renderBlog();
}
function openModel(id) {
    let model = document.querySelector('.model');
    let blogDb = JSON.parse(localStorage.getItem('blog'));
    model.style.display = "flex";
    let needBlog = blogDb.find((blog) => blog.id == id);
    model.innerHTML =
        `
    <div class="modelItem">
        <input class="enterComment" placeholder="Enter comment..." type="text">
        <button onclick="applyComment(${needBlog === null || needBlog === void 0 ? void 0 : needBlog.id})">Comment</button>
        <button onclick="offModel(${needBlog === null || needBlog === void 0 ? void 0 : needBlog.id})">Cancel</button>
    </div>
    `;
}
function offModel(id) {
    let model = document.querySelector('.model');
    model.style.display = "none";
}
function renderComment(id) {
    let blogDb = JSON.parse(localStorage.getItem('blog'));
    let needBlog = blogDb.find((blog) => blog.id == id);
    console.log(needBlog === null || needBlog === void 0 ? void 0 : needBlog.comment);
    let listComments = document.querySelectorAll('.commentItems');
    let listCommentsArr = Array.from(listComments);
    let listComment = listCommentsArr.find((comment, index) => (index + 1) == id);
    listComment.innerHTML = "";
    let listCounts = document.querySelectorAll('.count');
    let listCountsArr = Array.from(listCounts);
    let listCount = listCountsArr.find((count, index) => (index + 1) == id);
    listCount.innerHTML = `Count: ${needBlog === null || needBlog === void 0 ? void 0 : needBlog.comment.length} comment`;
    needBlog === null || needBlog === void 0 ? void 0 : needBlog.comment.forEach((item) => {
        listComment.innerHTML +=
            `
            <p>${item.content}</p>
        `;
    });
}
function applyComment(id) {
    let blogDb = JSON.parse(localStorage.getItem('blog'));
    let needBlog = blogDb.find((blog) => blog.id == id);
    let commentInput = document.querySelector('.enterComment');
    if (commentInput.value.length == 0) {
        alert('Your comment is nothing!!!');
    }
    else {
        if ((needBlog === null || needBlog === void 0 ? void 0 : needBlog.comment.length) == 0) {
            needBlog.comment.push({
                id: 1,
                content: commentInput.value.trim()
            });
        }
        else {
            needBlog === null || needBlog === void 0 ? void 0 : needBlog.comment.push({
                id: needBlog.comment[needBlog.comment.length - 1].id + 1,
                content: commentInput.value.trim()
            });
        }
    }
    localStorage.setItem('blog', JSON.stringify(blogDb));
    offModel(id);
    renderComment(id);
}
