console.log('IN JS');

$(document).ready(onReady);

function onReady () {
    getTasks();
    $('#addTaskBtn').on('click', addTask);
    $('#taskListDiv').on('click', '.completeBtn', completeTask);
    $('#taskListDiv' ).on( 'click', '.deleteBtn', deleteTask );
    // $('#taskListDiv').on('click', '.completeBtn', crossOutTask);
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
            <tr>
            <td>${response[i].tasks}</td>
            <td data-status="${response[i].status}">${response[i].status}</td>
            <td><button class="completeBtn" data-id="${response[i].id}">Complete Task</button></td>
            <td><button class="deleteBtn" data-id="${response[i].id}">Delete Task</button></td>
            </tr>
            `)
        } // end for loop
    }).catch(function(err){
        alert('error getting tasks:', err);
    })
}

//Setup POST request
function addTask (event) {
    console.log('in addTask');
    let objectToSend = {
        tasks: $('#addTaskIn').val()
    }
    $('#addTaskIn').val('');
    console.log('in addTask', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function (response){
        console.log('back from POST with:', response);
        getTasks();
    }).catch(function(err){
        alert('error adding task:', err)
    })
}

//Setup PUT request
function completeTask () {
    $(this).closest('tr').addClass('completeTask');
    console.log('in completeTask');
    const id = $(this).data('id');
    const status = $(this).data('status');
    console.log(status);
    console.log('in completeTask', id, status);
    $.ajax({
        type: 'PUT',
        url: `tasks/${id}`,
        data: {newStatus: !status}
    }).then(function(response){
        console.log('back from PUT with:', response);
        getTasks();
    }).catch(function(err){
        console.log('error UPDATING:', err);
    })
}

//setup DELETE request:
function deleteTask(){
    const id = $( this ).data( 'id' );
    console.log( 'in sell:', id );
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function( response ){
        console.log( 'back from DELETE:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
}

// function crossOutTask () {
//     $(this).closest('tr').addClass('completeTask');
//     console.log('in crossOutTask');
// }




