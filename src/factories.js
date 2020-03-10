const factories = (()=>{
    const taskFactory = (title,description,dueDate,priority)=>{
        return {title,description,dueDate,priority}
    };

    const projectFactory = (title, ...tasks)=> {
        return {title, ...tasks};
    };

return {taskFactory, projectFactory}
})();

export {factories};