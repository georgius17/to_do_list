import {storage} from './storage';
import {projectModuleDOM} from './projectRender';
import {factories} from './factories';
import {taskModuleDOM} from './taskRender';
import {taskModuleLOG} from './taskLogic';

const projectModuleLOG = (()=> {

    function projectAI(projects){
        projectModuleDOM.projectRender(projects);
        newProject(projects);
        removeProject(projects);
        renameProject(projects);
        activeProject(projects);
    }

    function activeProject(projects){
        window.addEventListener('click', (event)=> {
            for (let i=0; i<projects.length; i++){
                if (event.target.getAttribute('id')=='col'+i){
                    //open tasks connected with this (selected) project
                    taskModuleDOM.taskRender(projects, i);
                    taskModuleLOG.selectedChanger(i);
                    projectModuleDOM.projectMarker(projects, i);
                }
            }
        })
    }


    function newProject(projects){
        let newProjectBtn = document.getElementById('addNewProject');
        let name = document.getElementById('name');
        newProjectBtn.addEventListener('click',()=>{
            if (name.value==null || name.value=='') alert ('please fill all fields');
            else {
                let project = factories.projectFactory(name.value);
                projects.push(project);
                localStorage.setItem('projects', JSON.stringify(projects));
                projectModuleDOM.projectRender(projects);
            }
        })
    }

    function removeProject(projects){
        window.addEventListener('click',(event)=>{
            for (let i=0; i<projects.length; i++){
                if (event.target.getAttribute('id')=='projectDelete'+i){
                    projects.splice(i,1);
                    localStorage.setItem('projects', JSON.stringify(projects));
                    projectModuleDOM.projectRender(projects);
                }
            }
        })
    }

    function renameProject(projects){
        window.addEventListener('click',(event)=> {
            for (let i=0; i<projects.length; i++){
                if (event.target.getAttribute('id')=='projectChange'+i){
                    projectModuleDOM.nameChangeArea(i);
                }

                if (event.target.getAttribute('id')=='checkIcon'+i){
                    let newName = document.getElementById('changeArea'+i);
                    if (newName.value !==null && newName.value !== ''){
                        projects[i].title = newName.value;
                        localStorage.setItem('projects', JSON.stringify(projects));
                        projectModuleDOM.projectRender(projects);
                        projectModuleDOM.projectMarker(projects, i);
                    }
                }

                if (event.target.getAttribute('id')=='cancelIcon'+i){
                    projectModuleDOM.projectRender(projects);
                    projectModuleDOM.projectMarker(projects, i);
                }
            }
        })
    }

return {projectAI}
})();

export {projectModuleLOG};