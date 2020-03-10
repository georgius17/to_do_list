import {factories} from './factories';
import {taskModuleDOM} from './taskRender';

const taskModuleLOG = (()=>{
    let selectedProject=0;

    function selectedChanger(i){
        selectedProject=i;
    }

    function taskAI(projects, i){
        newTask(projects);
        removeTask(projects);
        modalReset(projects);
    }

    function newTask(projects){
        let taskTitle = document.getElementById('title');
        let taskDesc = document.getElementById('description');
        let taskDate = document.getElementById('taskDate');
        let taskPrior = document.getElementById('priority');
        window.addEventListener('click',(event)=>{
            for (let i=0; i<projects.length; i++){
                if (event.target.getAttribute('id')=='taskSubmit'+i){
                    if (taskTitle.value !== null && taskTitle.value !== ''){
                        console.log ('new task created');
                        let task = factories.taskFactory(taskTitle.value, taskDesc.value, taskDate.value, taskPrior.value);
                        //create empty obj and insert a new key as newly created task
                        let newProject = {};

                        let number = Object.keys(projects[i]).length-1;
                        
                        newProject[number] = task;
                        //pick the selected project in projects[]
                        let project = projects[i];
                        //copy newproject to selected project in projects []
                        Object.assign(project, newProject);
                        console.log(projects[i]);
                        localStorage.setItem('projects', JSON.stringify(projects));
                        taskModuleDOM.taskRender(projects, i);
                        return
                    }
                }
            }

            //edit task
            let number = Object.keys(projects[selectedProject]).length-1;
            for (let i=0; i<number; i++){
                if (event.target.getAttribute('id')=='taskChange'+i){
                    taskModuleDOM.addEditBut(i);
                    let project = projects[selectedProject];
                    taskTitle.value= project[i].title;
                    taskDesc.value= project[i].description;
                    taskDate.value = project[i].dueDate;
                    taskPrior.value = project[i].priority;
                    return 
               }

               if (event.target.getAttribute('id')=='taskEdit'+i){
                   let project = projects[selectedProject];
                   project[i].title = taskTitle.value;
                   project[i].description=taskDesc.value;
                   project[i].dueDate=taskDate.value;
                   project[i].priority=taskPrior.value;
                   localStorage.setItem('projects', JSON.stringify(projects));
                   taskModuleDOM.taskRender(projects, selectedProject);
                   return
               }
            }
            
        })
    }

    function removeTask(projects){
        window.addEventListener('click',(event)=>{
            let number = Object.keys(projects[selectedProject]).length-1;
            for (let i=0; i<number; i++){
                if (event.target.getAttribute('id')=='taskDelete'+i){
                    console.log('cislo je:'+number);
                    let project = projects[selectedProject];
                    delete project[i];
                    console.log(project);

                    //create new (updated)project and copy keys from the old one
                    //to avoid incorrect sequence
                    let updatedProject ={}
                    updatedProject.title=project.title;
                    let j=0;
                    Object.keys(project).forEach((key)=>{
                        if (key!='title'){
                            updatedProject[j]=project[key]
                            j++; 
                        }
                        
                    })
                    //insert updatedProject to projects[]
                    projects[selectedProject]=updatedProject;
                    console.log(projects[selectedProject]);
                    localStorage.setItem('projects', JSON.stringify(projects));
                    taskModuleDOM.taskRender(projects, selectedProject);
                    return
                }
            }
        
       })
       return
    }

    function modalReset(projects){
        window.addEventListener('click',(event)=>{
            if (event.target.getAttribute('id')=='modalClose' || event.target.getAttribute('id')=='taskForm'){
                taskModuleDOM.taskRender(projects, selectedProject);
            }
        })
    }

    

return {taskAI, selectedChanger}
})()

export {taskModuleLOG};