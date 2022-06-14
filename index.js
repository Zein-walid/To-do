




// start local storage app

let input = document.getElementById("input");
let submit = document.getElementById("submit");
let taskBox = document.getElementById("taskbox");


// empty array of tasks
let arrayOfTasks = [];
if(window.localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getDataFromLocalStorage();
//add task
submit.onclick = function (){
    
    if(input.value !== ""){
        addTaskToAray(input.value); // add task to array of tasks
        setTimeout(function(){
            input.value = "";
            
        },3000)
    }
}
// click on task element
taskBox.addEventListener("click",function (e){
    if(e.target.classList.contains("del")){
        deleteWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        toggleTaskStatueWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})
function addTaskToAray(taskText){
    let task = {
        id: Date.now(),
        text: taskText,
        completed: false,
    }
    arrayOfTasks.push(task);
    // add elements to page
    addTasktoPage(arrayOfTasks);
    // add elements to local storage
    addElementsToLocalStorage(arrayOfTasks)
}
function addTasktoPage(arrayOfTasks){
    taskBox.innerHTML = "";

    arrayOfTasks.forEach((task) =>{
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.text));
        if(task.completed){
            div.className = "task done"
        }
        // delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.className = "del"
        div.append(deleteBtn)
        // append task div to task box
        taskBox.append(div)

    })
}


function addElementsToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}  
 
function getDataFromLocalStorage(){
    let tasks = window.localStorage.getItem("tasks");
    if(tasks){
        let data = JSON.parse(tasks)
        addTasktoPage(data)
    }
}
function deleteWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
    addElementsToLocalStorage(arrayOfTasks)
}


function toggleTaskStatueWith(done){
    for(let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == done){
            arrayOfTasks[i].completed === false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addElementsToLocalStorage(arrayOfTasks)
}