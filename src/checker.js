import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const checkerModule = (()=>{
    let highTasks=0;
    let normalTasks=0;
    let lowTasks=0;

    function controller(projects){
        let length = projects.length;
        for (let i=0; i<length; i++){
            let project=projects[i];
            Object.keys(project).forEach((key)=>{
                if (project[key].priority=='High') highTasks++;
                if (project[key].priority=='Normal') normalTasks++;
                if (project[key].priority=='Low') lowTasks++;
            })
        }
    }

    function infoprovider(projects){
        let infoDiv = document.getElementById('accordion');
        let infoAlert = document.createElement('div');
        infoAlert.setAttribute('class','alert alert-info');
        infoAlert.innerHTML='Welcome user! On the left side you can find your saved projects with clickable tasks. You can add, edit and remove your tasks. On the bottom there is a number of tasks of each priority.';

        let infoPara = document.createElement('h5');
        controller(projects);
        infoPara.innerHTML='High priority tasks: '+highTasks+'<br> Normal priority tasks: '+normalTasks+'<br> Low priority tasks: '+lowTasks;
        infoDiv.appendChild(infoAlert);
        infoDiv.appendChild(infoPara);
    }

return {infoprovider}
})();
export {checkerModule}
