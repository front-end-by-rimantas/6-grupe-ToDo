var todo = (function(){

    var tasks = [];

    //cached DOM
    var $todo = $('#todo'),
        $textarea = $todo.find('#new_todo_content'),
        $button = $todo.find('.btn.btn-add'),
        $list = $todo.find('#todo_list'),
        new_task_template = $todo.find('#todo_new_task_template').html();
    
    // bind events
    $button.on('click', addTask);

    // sukurti (prideti)
        // textarea > 0
        // button click
    function addTask() {
        var text = $textarea.val();
        if ( text.length > 0 ) {
            tasks.push( text );
            $textarea.val('');
        }
        render();
    }
    
    // pasalinti
        // remove click
    function removeTask() {
        console.log('removeTask - pasalina turini');
        render();
        return;
    }
    
    // redaguoti
        // edit click
    function updateTask() {
        console.log('updateTask - atnaujina turini');
        render();
        return;
    }
    
    // atvaizduoti
        // on any update/change
    function render() {
        var data = {
            task_number: [],
            task_text: tasks
        };
        for ( var i=0; i<tasks.length; i++ ) {
            data.task_number.push( i+1 );
        }
        return $list.html( HTML_template.render( new_task_template, data ) );
    }

    return {
        tasks: tasks,
        add: addTask,
        update: updateTask,
        remove: removeTask
    }

})();


