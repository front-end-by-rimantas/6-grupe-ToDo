var todo = (function(){

    var tasks = ['asd'];

    //cached DOM
    var $todo = $('#todo'),
        $textarea = $todo.find('#new_todo_content'),
        $button = $todo.find('.btn.btn-add'),
        $list = $todo.find('#todo_list'),
        new_task_template = $todo.find('#todo_new_task_template').html(),
        update_task_template = $todo.find('#todo_update_task_template').html(),
        empty_task_template = $todo.find('#todo_empty_template').html();
    
    // bind events
    $button.on('click', addTask);
    $list.on('click', 'i.remove', removeTask);
    $list.on('click', 'i.edit', updateTask);
    $list.on('click', 'i.cancel', cancelTask);
    $list.on('click', 'i.save', saveTask);

    // pradinio turinio atvaizdavimas (tuscias TODO sarasas)
    render();

    // sutvarkome teksta (saugumo prasme)
        // english: text sanitization
    function secureText( text ) {
        return text.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
    }

    // sukurti (prideti)
        // textarea > 0
        // button click
    function addTask() {
        var text = $textarea.val();
        if ( text.length > 0 ) {
            tasks.push( secureText( text ) );
            $textarea.val('');
        }
        render();
    }
    
    // pasalinti
        // remove click
    function removeTask( event ) {
        var remove_index = $(event.target).parents('.todo-task').index();
        tasks.splice(remove_index, 1);
        render();
        return;
    }
    
    // redaguoti
        // edit click
    function updateTask( event ) {
        var update_index = $(event.target).parents('.todo-task').index(),
            data = {
                task_number: [ update_index + 1 ],
                task_text: [ tasks[update_index] ]
            };
        return $list.find('.todo-task').eq(update_index).replaceWith( HTML_template.render( update_task_template, data ) );
    }
    
    // atsaukti redagavima
        // cancel click
    function cancelTask( event ) {
        var cancel_index = $(event.target).parents('.todo-task').index(),
            data = {
                task_number: [ cancel_index + 1 ],
                task_text: [ tasks[cancel_index] ]
            };
        return $list.find('.todo-task').eq(cancel_index).replaceWith( HTML_template.render( new_task_template, data ) );
    }
    
    // atnaujiname turini
        // save click
    function saveTask( event ) {
        var save_index = $(event.target).parents('.todo-task').index(),
            data = {
                task_number: [ save_index + 1 ],
                task_text: [  ]
            };
        tasks[save_index] = secureText( $list.find('.todo-task').eq(save_index).find('textarea').val() );
        data.task_text.push( tasks[save_index] );

        if ( tasks[save_index].length > 0 ) {
            return $list.find('.todo-task').eq(save_index).replaceWith( HTML_template.render( new_task_template, data ) );
        } else {
            removeTask( event );
        }

    }
    
    // atvaizduoti
        // on any update/change
    function render() {
        if ( tasks.length > 0 ) {
            var data = {
                task_number: [],
                task_text: tasks
            };
            for ( var i=0; i<tasks.length; i++ ) {
                data.task_number.push( i+1 );
            }
            return $list.html( HTML_template.render( new_task_template, data ) );
        } else {
            return $list.html( empty_task_template );
        }
    }

    return {
        tasks: tasks,
        add: addTask,
        update: updateTask,
        remove: removeTask,
        secure: secureText
    }

})();