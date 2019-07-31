let data = localStorage.getItem('todolist');
if (data===null){
    data = {
        todolist: []
    };
    localStorage.setItem('todolist',JSON.stringify(data));
}


getTodoList = () => {
    return JSON.parse(localStorage.getItem('todolist'));
}

save = (data) => {
    localStorage.setItem('todolist',JSON.stringify(data));
    render();
}

reverse = (value) => {
    let newVal  = value.split('');
    newVal.reverse();
    return newVal.join('-');
}

render = () => {
    data = getTodoList();
    html = data.todolist.map( (item, i)=>{
       return '<li>'+item+' <span class="remove">[sil]</span></li>';
    });
    const todolistContainer = document.getElementById('todolist');
    todolistContainer.innerHTML = html;
}



function doSubmit(e){
    e.preventDefault();
    let data = getTodoList();
    const value = document.getElementById('myinput').value;
    const result = document.getElementById('result');
    if (value.trim().length>0){
        data.todolist.push({key:5, task:value});
        save(data);
    }
    return false;
}


domReady = () => {
    document.getElementById('form').addEventListener('submit',doSubmit);
    render();
}

document.addEventListener('DOMContentLoaded',domReady);
