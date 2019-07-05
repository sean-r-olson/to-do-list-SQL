console.log('IN JS');

$(document).ready(onReady);

function onReady () {
    getTasks();
    $('#addTaskBtn').on('click', addTask);
    $('#taskListDiv').on('click', '.completeBtn', completeTask);
}

//Setup GET request 
function getTasks () {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        let el = $('#taskListDiv');
        el.empty();
        for (let i=0; i<response.length; i++) {
            el.append( `
            <li>${response[i].tasks} ${response[i].status}
            <button class="completeBtn" data-id="${response[i].id}">Complete Task</button>
            </li>
            `)
        } // end for loop
    }).catch(function(err){
        alert('error getting tasks:', err);
    })
}

//Setup POST request
function addTask () {
    console.log('in addTask');
}

//Setup PUT request
function completeTask () {
    console.log('in completeTask');
}



