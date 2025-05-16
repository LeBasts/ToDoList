const main = document.querySelector('main');
const tasks = document.getElementById('tasks');                    // Recupère le compartiment tasks
const done = document.getElementById('done');                    // Recupère le compartiment done
const placeDiv = tasks.children;
let editing = false;
function newAction(){                                        // Fonction d'ajout de tache
    let compt = document.querySelectorAll("div.action").length; //Récupère le nombre de tache
    let nextAct = compt;                              // Défini la prochaine place libre
    let divTache = document.createElement('div');               //Crée une nouvelle div
    let brutTask = document.getElementsByTagName("input")[0].value; //Récupère la chaine dans l'imput
    let task = brutTask.replace(/[&<>"'\/]/g,'');
    if(task==''){                                            //Si vide
        document.getElementsByTagName("input")[0].value = "Vous devez écrire quelque chose";    // Message d'érreur
    } else {  
        while(verifId(nextAct) == false){
            console.log(verifId(nextAct));
            nextAct = nextAct+1;
            verifId(nextAct);   
        }
        divTache.setAttribute('id','action'+nextAct);           //Ajoute l'id action prochaine place
        divTache.setAttribute('class','action');                //Ajoute la classe action
        //Ajoute l'interieur de la div
        divTache.innerHTML = '<p>'+task+'</p><input type="checkbox" class="ok" id="ok'+nextAct+'" onclick=check('+nextAct+',action'+nextAct+')><button class="modifier" onclick=addEditInput('+nextAct+')>Modifier</button><button class="x" onclick=del('+nextAct+')>X</button>';
        //let previousTask = document.querySelector('tasks');      //
        tasks.appendChild(divTache, tasks.nextSibling);             // Crée la div dans tasks
        document.getElementsByTagName("input")[0].value="";       // Vide le champ input
        majCompt();                                               // Appel les fonctions
        saveData();
    }
}
function del(numberTask){
    let divSuppr = document.getElementById('action'+numberTask);
    divSuppr.remove();
    majCompt();
    saveData();
}
function ischeck(){
    for(i=0; i<done.children.length;i++){
        if(done.children[i].style.backgroundColor == "green"){
            done.children[i].querySelector('input').checked = true;
        }
    }
}
function check(numberTask){
    // let checkbox = document.querySelector("main div input");
    let checkbox = document.getElementById("ok"+numberTask);
    
    // let checkbox1 = document.querySelector('main div #action'+numberTask+" input");
    // let checkbox2 = document.querySelector('main div #done'+numberTask+" input");
    checkbox.addEventListener('change', handleChange);
    function handleChange() {  
        if (checkbox.checked){
            document.getElementById('action'+numberTask).style = "background-color : green;";    
            done.appendChild(document.getElementById('action'+numberTask), done);
        } else if (!checkbox.checked){
            document.getElementById('action'+numberTask).style = "background-color : #434141;";
            tasks.appendChild(document.getElementById('action'+numberTask), tasks);
        }
        majCompt();
        saveData();
    } 
}
function search(){
    if (event.key === 'Enter' && document.getElementsByTagName("input")[0].value!=""){
        newAction();  
    } else if (event.key === 'Enter' && document.getElementById("editInput").value!=""){
        document.getElementById("edit").click();
    } 
}
function saveData(){
    localStorage.setItem("taches", tasks.innerHTML);
    localStorage.setItem("done", done.innerHTML);
}
function showSaved(){
    done.innerHTML = localStorage.getItem("done");
    tasks.innerHTML = localStorage.getItem("taches");
}
function majCompt(){
    document.getElementById("taskButton").innerHTML = "En cours - "+tasks.children.length;
    if(done.children.length == 1){
        document.getElementById("doneButton").innerHTML = "Terminée - "+done.children.length;
    } else {
        document.getElementById("doneButton").innerHTML = "Terminées - "+done.children.length;
    }
}
        function selectTab(onglet){
            let content = document.querySelectorAll('.tasks');
            for(i=0;i<content.length;i++){
                content[i].style.display = 'none';
            }
            content[onglet].style.display = 'block';
            if (onglet == 0 ){
                document.getElementById('doneButton').style.color = '#ecc19c';
                document.getElementById('doneButton').style.backgroundColor = '#434141';
                document.getElementById('taskButton').style.color = '#434141';
                document.getElementById('taskButton').style.backgroundColor = '#ecc19c';
            } else if (onglet == 1){
                document.getElementById('doneButton').style.color = '#434141';
                document.getElementById('doneButton').style.backgroundColor = '#ecc19c';
                document.getElementById('taskButton').style.color = '#ecc19c';
                document.getElementById('taskButton').style.backgroundColor = '#434141';
            }
        }
        function verifId(compt){
            let idValid;
            tasksLen = tasks.children;
            doneLen = done.children;
            compt = 'action'+compt;
            for(i=0;i<tasksLen.length;i++){
                if(compt==tasksLen[i].id){
                    idValid = false;
                } else if(idValid!=false){
                    idValid = true;
                }
            }
            for(i=0;i<doneLen.length;i++){
                if(compt==doneLen[i].id){
                    idValid = false;
                } else if(idValid!=false){
                    idValid = true;
                }
            }
            //console.log(idValid);
            return(idValid);
        }
        function addEditInput(numberTask){
            console.log("Début input "+editing);
            if(main.querySelector('input')!=null && editing == false){
                editing = true;
                //if ()
                // console.log(document.querySelectorAll('.action'+numberTask+' p').innerHTML);
                // console.log(document.getElementById("action"+numberTask).innerHTML);
                let divToEdit = document.getElementById("action"+numberTask);
                let tagToEdit = divToEdit.children[0];
                let texToEdit = divToEdit.children[0].innerHTML;
                tagToEdit.innerHTML = '<input type="text" id="editInput"value="'+texToEdit+'" onkeydown="search()"><button id="edit" onclick="editValidation('+numberTask+')">Ok</button>';
                divToEdit.querySelector('input').focus();
                divToEdit.querySelector('input').setSelectionRange(texToEdit.length,texToEdit.length);
            }
            console.log("Fin boucle input "+editing);
            //return editing;
        }
        function editValidation(numberTask){
            console.log("Début edit "+editing);
            let divToEdit = document.getElementById("action"+numberTask);
            let newText = divToEdit.querySelector('input').value;
            if (newText!=""){  //newText!=texToEdit && 
                divToEdit.querySelector('p').innerText = newText;
                editing = false;
            }
            console.log("Fin edit "+editing);
        }
        function deleteSave(){
            localStorage.clear();
        }
        showSaved();
        selectTab(0);
        majCompt();
        ischeck();