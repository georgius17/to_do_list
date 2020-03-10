import {factories} from './factories';

const storage = (()=>{
    let projects = [];
    let localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    let defaultProjects = JSON.parse(localStorage.getItem('defaultProjects'));

    function populateStorage(projects){
        if (projects.length == 0){
            let task1 = factories.taskFactory('Some task', 'do some task', '2020-02-14', 'High');
            let task2 = factories.taskFactory('Clean my table', 'clean that shit','2020-04-11','Normal');
            let task3 = factories.taskFactory('Take a pill', 'to feel gooood','2020-03-15','High');
            let project1 = factories.projectFactory('Home',task1);
            let project2 = factories.projectFactory('School',task2,task3);
            projects.push(project1);
            projects.push(project2);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }

    function loadDefault(){
        localProjects.forEach((project)=>{
            projects.push(project);
        });
        if (defaultProjects !== false) populateStorage(projects);
    }



return {projects, localProjects, loadDefault}
})();

export {storage};
