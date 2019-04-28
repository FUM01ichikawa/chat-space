
$(document).on('turbolinks:load', function(){
  function buildHTML(message) { 
    var content = message.content? `${ message.content }` : "";
    var image = message.image? `<img src= ${ message.image }>` : "";
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

    .done(function(data){
      var html = buildHTML(data);
      $('.mainbox2').append(html);
      scrollBottom()
      $('.message_box_input__text').val(''); 
       })

    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(data){
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
})