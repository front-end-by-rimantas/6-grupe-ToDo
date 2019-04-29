var HTML_template = (function(){
    function render( template, data ) {
        var HTML = '',
            item_HTML = '',
            keys = Object.keys(data),
            values_count = data[ keys[0] ].length;

        // check for equal params sizes
        for ( var i=0; i<keys.length; i++ ) {
            if ( data[ keys[i] ].length !== values_count ) {
                console.error('All parameters have to be same size in values.', data);
                return HTML;
            }
        }
            
        for ( var value=0; value<values_count; value++ ) {
            item_HTML = template;
            for ( var k=0; k<keys.length; k++ ) {
                item_HTML = item_HTML.replace(`{{${keys[k]}}}`, data[ keys[k] ][value]);
            }
            HTML += item_HTML;
        }
        
        return HTML;
    }

    return {
        render: render
    }
})();