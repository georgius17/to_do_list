import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {storage} from './storage';
import {projectModuleDOM} from './projectRender';
import {projectModuleLOG} from './projectLogic';
import { taskModuleLOG } from './taskLogic';
import {checkerModule} from './checker';

//load data from localstorage
storage.loadDefault();
//check all tasks in projects and count their priorities
checkerModule.infoprovider(storage.projects);
//call project logic
projectModuleLOG.projectAI(storage.projects);
//call task logic
taskModuleLOG.taskAI(storage.projects);


