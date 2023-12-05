interface Blog {
    id:number
    title:string
    content:string
    comment:Comment[]
}
interface Comment {
    id:number
    content:string
}

let blog:Blog[] = []
if (!JSON.parse(localStorage.getItem('blog') as string)) {
    localStorage.setItem('blog',JSON.stringify(blog))
}

function renderBlog():void{
    let blogDb:Blog[] = JSON.parse(localStorage.getItem('blog')as string)
    let listBlogs:HTMLElement = document.querySelector('.bottom') as HTMLElement
    listBlogs.innerHTML=""

    blogDb.forEach((blog:Blog) =>{
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
        `
        renderComment(blog.id)
    })

}
renderBlog()

function addNewBlog():void{
    let blogDb:Blog[] = JSON.parse(localStorage.getItem('blog')as string)
    let titleInput:HTMLInputElement = document.getElementById('title') as HTMLInputElement
    let contentInput:HTMLTextAreaElement = document.getElementById('content') as HTMLTextAreaElement
    if (titleInput.value.length == 0 || contentInput.value.length == 0) {
        alert('Enter complete information!!!')
    }else{
        if (blogDb.length == 0) {
            blogDb.push({
                id:1,
                title: titleInput.value.toUpperCase().trim(),
                content: contentInput.value.trim(),
                comment:[]
            })
        }else{
            blogDb.push({
                id: blogDb[blogDb.length-1].id + 1,
                title: titleInput.value.toUpperCase().trim(),
                content: contentInput.value.trim(),
                comment:[]
            })
        }
    }
    localStorage.setItem('blog',JSON.stringify(blogDb))
    titleInput.value  = "" 
    contentInput.value = ""
    renderBlog()
}

function openModel(id:number):void{
    let model:HTMLElement = document.querySelector('.model') as HTMLElement
    let blogDb:Blog[] = JSON.parse(localStorage.getItem('blog')as string)
    model.style.display = "flex"

    let needBlog: Blog|undefined = blogDb.find((blog:Blog) => blog.id == id)
    
    model.innerHTML = 
    `
    <div class="modelItem">
        <input class="enterComment" placeholder="Enter comment..." type="text">
        <button onclick="applyComment(${needBlog?.id})">Comment</button>
        <button onclick="offModel(${needBlog?.id})">Cancel</button>
    </div>
    `
}

function offModel(id:number):void{
    let model:HTMLElement = document.querySelector('.model') as HTMLElement
    model.style.display = "none"
}
function renderComment(id:number){
    
    let blogDb:Blog[] = JSON.parse(localStorage.getItem('blog')as string)
    let needBlog: Blog|undefined = blogDb.find((blog:Blog) => blog.id == id)
    console.log(needBlog?.comment);
    
    let listComments:NodeList = document.querySelectorAll('.commentItems') as NodeList
    let listCommentsArr = Array.from(listComments)
    let listComment:any = listCommentsArr.find((comment:any, index:number) => (index+1)==id)
    listComment.innerHTML = ""

    let listCounts:NodeList = document.querySelectorAll('.count') as NodeList
    let listCountsArr = Array.from(listCounts)
    let listCount:any = listCountsArr.find((count:any, index:number) => (index+1)==id)
    listCount.innerHTML = `Count: ${needBlog?.comment.length} comment`

    needBlog?.comment.forEach((item:Comment) =>{
        listComment.innerHTML += 
        `
            <p>${item.content}</p>
        `
    })
}
function applyComment(id:number):void{
    
    let blogDb:Blog[] = JSON.parse(localStorage.getItem('blog')as string)
    let needBlog: Blog|undefined = blogDb.find((blog:Blog) => blog.id == id)
    let commentInput:HTMLInputElement = document.querySelector('.enterComment') as HTMLInputElement
    if (commentInput.value.length == 0) {
        alert('Your comment is nothing!!!')
    }else{
        if (needBlog?.comment.length == 0) {
            needBlog.comment.push({
                id:1,
                content: commentInput.value.trim()
            }as Comment)
        }else{
            needBlog?.comment.push({
                id: needBlog.comment[needBlog.comment.length - 1].id + 1,
                content: commentInput.value.trim()
            }as Comment)
        }
    }
    localStorage.setItem('blog',JSON.stringify(blogDb))
    offModel(id)
    renderComment(id)
}