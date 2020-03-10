import {format,formatDistanceToNow,parse} from 'date-fns';

const taskModuleDOM = (()=>{ 
    function taskRender(projects,i){
        let tasks = document.getElementById('accordion');
        taskCleaner(tasks);
        addTaskBut(i);
        addSubmitBut(i);
        modalCleaner();
        let project = projects[i];
        Object.keys(project).forEach((key)=>{
            if (key!=='title'){
                taskCreator(tasks, key, project[key].title, project[key].description, project[key].dueDate, project[key].priority);
                //console.log('rendered key no:'+key);  
            }
        })
    }

    function taskCreator(tasks, i, title, description, date, priority){
        let div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        let card_header = document.createElement('div');
        card_header.setAttribute('class', 'card-header');
        let card_link = document.createElement('a');
        card_link.setAttribute('class','card-link');
        card_link.setAttribute('data-toggle','collapse');
        card_link.setAttribute('href','#taskCollapse'+i);
        card_link.innerHTML = title+' ';

        card_link.appendChild(addChangeBut(i));
        card_link.appendChild(addPriority(priority));
        card_link.appendChild(addDate(date));
        card_link.appendChild(addDeleteBut(i));
        card_header.appendChild(card_link);

        let collapse = document.createElement('div');
        collapse.id='taskCollapse'+i;
        collapse.setAttribute('class','collapse show');
        collapse.setAttribute('data-parent','#accordion');
        let card_body = document.createElement('div');
        card_body.setAttribute('class','card-body');
        card_body.innerHTML=description;
        //card body date
        card_body.appendChild(remainDate(date));
        
        collapse.appendChild(card_body);

        div_card.appendChild(card_header);
        div_card.appendChild(collapse);
        tasks.appendChild(div_card);
        tasks.appendChild(document.createElement('br'));
    }

    function taskCleaner(tasks){
        tasks.innerHTML='';
        //and delete Add task btn
        document.getElementById('taskArea').innerHTML='';
        //and delete Submit task btn
        document.getElementById('modalForm').removeChild(document.getElementById('modalForm').lastChild);
    }

    function remainDate(date){
        let remain = document.createElement('p');
        let result = parse(date,'yyyy-MM-dd', new Date());
        remain.innerHTML ='Remaining time: '+formatDistanceToNow(result);
        remain.setAttribute('class','date');
        return remain
    }

    function addDeleteBut(i){
        let DeleteBut = document.createElement('i');
        DeleteBut.setAttribute('class','fas fa-window-close');
        DeleteBut.id='taskDelete'+i;
        DeleteBut.style.cssFloat='right';
        return DeleteBut;
    }

    function addChangeBut(i){
        let ChangeBut = document.createElement('i');
        ChangeBut.setAttribute('class','far fa-edit');
        ChangeBut.setAttribute('data-toggle','modal');
        ChangeBut.setAttribute('data-target','#taskForm');
        ChangeBut.id='taskChange'+i;
        return ChangeBut;
    }

    function addPriority(priority){
        let prior = document.createElement('button');
        prior.setAttribute('type','button');
        let type='';
        if (priority=='Low') type='btn-secondary';
        if (priority=='Normal') type='btn-warning';
        if (priority=='High') type ='btn-danger';
        prior.setAttribute('class','btn '+type+' btn-sm');
        prior.innerHTML = priority;
        return prior;
    }

    function addDate(date){
        let datePara= document.createElement('p');
        datePara.innerHTML = 'Due date: '+date;
        datePara.setAttribute('class','date');
        return datePara;
    }

    function addTaskBut(i){
        let taskArea= document.getElementById('taskArea');
        let TaskBut = document.createElement('button');
        TaskBut.setAttribute('type', 'button');
        TaskBut.setAttribute('class','btn btn-primary');
        TaskBut.setAttribute('data-toggle','modal');
        TaskBut.setAttribute('data-target','#taskForm');
        TaskBut.innerHTML='Add task';
        TaskBut.id='addTask'+i;
        //TaskBut.style.display = 'none';
        taskArea.appendChild(TaskBut);
    }


    function addSubmitBut(i){
        let submitBtn = document.createElement('input');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.setAttribute('value', 'Submit');
        submitBtn.setAttribute('class', 'btn btn-primary');
        submitBtn.setAttribute('data-dismiss','modal');
        submitBtn.id='taskSubmit'+i;
        document.getElementById('modalForm').appendChild(submitBtn);
    }

    function addEditBut(i){
        let editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'submit');
        editBtn.setAttribute('value', 'Edit');
        editBtn.setAttribute('class', 'btn btn-primary');
        editBtn.setAttribute('data-dismiss','modal');
        editBtn.id='taskEdit'+i;

        //delete default Submit btn
        document.getElementById('modalForm').removeChild(document.getElementById('modalForm').lastChild);
        document.getElementById('modalForm').appendChild(editBtn);
    }

    function modalCleaner(){
        document.getElementById('title').value ='';
        document.getElementById('description').value='';
        document.getElementById('taskDate').value='';
        document.getElementById('priority').value='';
    }
    

return {taskRender, addEditBut}
})();

export {taskModuleDOM};