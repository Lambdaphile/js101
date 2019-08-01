// Global variables (accessible from everything)
let data = localStorage.getItem('todolist');
if (data === null){
    data = {
        todolist: []
    };
    localStorage.setItem('todolist',JSON.stringify(data));
}

save = (data) => {
    localStorage.setItem('todolist',JSON.stringify(data));
    render();
}

remove = (taskid) => {
    data = getTodoList();
    data.todolist.splice(taskid,1);
    save(data);
}

reverse = (value) => {
    let newVal  = value.split('');
    newVal.reverse();
    return newVal.join('-');
}

render = () => {
    data = getTodoList();
    html = data.todolist.map( (item, i)=>{
       return '<li>'+item+' <span class="remove" data-taskid="'+i+'">[sil]</span></li>';
    });

    const todolistContainer = document.getElementById('todolist');
    todolistContainer.innerHTML = html;

    Array.from(document.getElementsByClassName('remove')).forEach((removeBtn) => {
        removeBtn.addEventListener('click', (event) => {
            remove(event.target.getAttribute('data-taskid'));
        }, false);
    });
}

getTodoList = () => {
    return JSON.parse(localStorage.getItem('todolist'));
}

function doSubmit(event){
    // Prevents the form from reloading the page
    event.preventDefault();

    let data = getTodoList();
    
    const value = document.getElementById('myinput').value;
    alert(value);
    // Seems like this is never used?
    const result = document.getElementById('result');
    
    // Checks for empty strings and null values
    if (value.trim().length > 0) {
        // Push the new value into the data objects array
        // and save the new value into our localStorage
        data.todolist.push(value);
        save(data);
    }
    // I'll leave this for now, not exaxtly sure what it does.
    return false;
}

document.getElementById('form').addEventListener('submit', (event) => {
    doSubmit(event);
    render();
}, false);