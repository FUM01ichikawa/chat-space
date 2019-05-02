$(document).on('turbolinks:load', function(){
  function build_bottommessage_HTML(message) { 
    var content = message.content? `${ message.content }` : "";
    var image = message.image? `<img src= ${ message.image } alt="">` : "";
    var html = `<div class="mainbox2__messages" data-id="${message.id}">
                  <div class="mainbox2_message_baseinfo">
                    <div class="mainbox2_message_baseinfo__user">
                      ${message.user_name}
                    </div>
                    <div class="mainbox2_message_baseinfo__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="mainbox2_message_text">
                    <p>
                    ${content}
                    </p>
                    <p>
                    ${image}
                    </p>
                  </div>  
                </div>`
    return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    })

    .done(function(input_message){
      var html = build_bottommessage_HTML(input_message);
      $('.mainbox2').append(html);
      scrollBottom()
      $("form")[0].reset();
    })

    .fail(function(submit_data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(submit_data){
      $('.form__mask__send_button').prop( 'disabled', false);
    })

    function scrollBottom(){
      var target = $('.mainbox2__messages').last();
      var position = target.offset().top + $('.mainbox2').scrollTop();
      $('.mainbox2').animate({
        scrollTop: position
      }, 300, 'swing')
    }
    })
    
    var reloadMessages = function() {
      last_message_id = $('.mainbox2__messages:last').data('id');
      group_id = $('.mainbox2').data('group');
      url = '/groups/' + group_id + '/api/messages';
     
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}  
      })
     
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(index, message){
          var html = build_bottommessage_HTML(message);
          insertHTML += html
          })
            $('.mainbox2').append(insertHTML);
            scrollBottom()
          })

      .fail(function() {
        console.log('error');
      });

      function scrollBottom(){
        var target = $('.mainbox2__messages').last();
        var position = target.offset().top + $('.mainbox2').scrollTop();
        $('.mainbox2').animate({
          scrollTop: position
        }, 300, 'swing')
      }
    };
    setInterval(reloadMessages, 5000);
});


