function subscribe_newsletter(
        subscribe_url,
        subscribe_form,
        subscribe_feedback_selector,
        subscribe_submit_selector) {

    subscribe_form.each(function() {
        subscribe_form = $(this);
        subscribe_form_feedback = $(this).find(subscribe_feedback_selector);
        subscribe_form_submit = $(this).find(subscribe_submit_selector);

        (function(
            subscribe_form, 
            subscribe_form_feedback, 
            subscribe_form_submit) {

            subscribe_form.submit(function(e) {
                e.preventDefault();
                subscribe_form_submit.prop('disabled', true)

                fetch(subscribe_url, {
                    method: 'POST',
                    headers: {  
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                    },  
                    body: subscribe_form.serialize() 
                })
                .then(resp => resp.json())
                .then(function(res) {
                    if (res.success == true) {
                        subscribe_form_feedback
                            .css('color', 'blue') // green
                            .html("Hang tight, you'll see the font in your inbox shortly. Enjoy :)");
                            
                        subscribe_form_submit.val('Thank You!');
                        subscribe_form_submit.css({
                          'background-color': '#888',
                          'cursor': 'default'
                        });
                        // disable form submit on success
                        subscribe_form_submit.prop('disabled', true);
                    } else {
                        subscribe_form_feedback
                            .css('color', 'red') // yellow
                            .html(res.errors);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });

            });
        })(subscribe_form, 
            subscribe_form_feedback, 
            subscribe_form_submit);
    });
};
