const projectModuleDOM = (() =>{

    function projectRender(projects){
        let table = document.getElementById('projectDisplay');
        let length = projects.length;
        projectCleaner(table);
        for (let i=0; i<length; i++){     
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.id = 'col'+i;
        row.id = 'row'+i;
        cell1.innerHTML = projects[i].title;
        cell2.appendChild(addChangeBut(i));
        cell3.appendChild(addDeleteBut(i));
        //console.log(projects[i]);
        }
    }
        //delete old table
    function projectCleaner(table){
        table.innerHTML='';
    }

    function projectMarker(projects, i){
        for (let j=0; j<projects.length; j++){
            //document.getElementById('row'+j).setAttribute('class','unselected');
            document.getElementById('row'+j).style.backgroundColor='white';
        }
        document.getElementById('row'+i).style.backgroundColor='lightblue';
    }

    function addDeleteBut(i){
        let DeleteBut = document.createElement('i');
        DeleteBut.setAttribute('class','fas fa-window-close');
        DeleteBut.id='projectDelete'+i;
        return DeleteBut;
    }

    function addChangeBut(i){
        let ChangeBut = document.createElement('i');
        ChangeBut.setAttribute('class','far fa-edit');
        ChangeBut.id='projectChange'+i;
        return ChangeBut;
    }

    //Add an input for name edit, add icons for submit and cancel
    function nameChangeArea(i){
        let changeArea = document.createElement('input');
        changeArea.id='changeArea'+i;

        let checkIcon = document.createElement('i');
        checkIcon.id='checkIcon'+i;
        checkIcon.setAttribute('class','fa fa-check');
        checkIcon.setAttribute('aria-hidden','true');

        let cancelIcon = document.createElement('i');
        cancelIcon.id='cancelIcon'+i;
        cancelIcon.setAttribute('class','fa fa-ban');
        cancelIcon.setAttribute('aria-hidden','true');

        let editedRow = document.getElementById('row'+i);
        editedRow.innerHTML='';
        editedRow.appendChild(changeArea);
        editedRow.appendChild(checkIcon);
        editedRow.appendChild(cancelIcon);
       
    }

return {projectRender, nameChangeArea, projectMarker}
})();

export {projectModuleDOM};