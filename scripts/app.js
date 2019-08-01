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
    removeBtns = document.getElementsByClassName('remove');
    for (i=0; i<removeBtns.length; i++){
        removeBtns[i].addEventListener('click',(e)=>{
            remove(e.target.getAttribute('data-taskid'));
        });
    }

}



function doSubmit(e){
    e.preventDefault();
    let data = getTodoList();
    const value = document.getElementById('myinput').value;
    const result = document.getElementById('result');
    if (value.trim().length>0){
        data.todolist.push(value);
        save(data);
    }
    return false;
}


domReady = () => {
    document.getElementById('form').addEventListener('submit',doSubmit);

    render();
}

document.addEventListener('DOMContentLoaded',domReady);
