$(document).on('turbolinks:load', function() {
  function appendUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">
        ${user.name}
        </p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
        追加
        </a>
      </div>
      `
      return html;
    };

    function appendNoUser (fail_comment){
      var html = `
        <div>
        <a class="chat-group-user__name">${fail_comment}</a>
        </div>
        `
        return html;
    };

    function appendMembers(name, user_id) {
      var html = `
        <div class='chat-group-user clearfix js-chat-member' id="${user_id}">
        <input name='group[user_ids][]' type='hidden' value="${user_id}">
        <p class='chat-group-user__name'>${name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>
        `
        return html;
    }

  $("#user-search-field").on("change keyup", function() {
    var input = $(this).val();
    if(input!=="")
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    
    .done(function (users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = appendUser(user);
          $("#user-search-result").append(html);
        });
        }
        else 
        var html = appendNoUser("一致するユーザーはいませんでした");
        $("#user-search-result").append(html);
      })
  
    .fail(function () {
      alert('ユーザー検索に失敗しました');       
    });
  });

  $(function () {
    $("#user-search-result").on("click", '.user-search-add', function () {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        var html = appendMembers(name, user_id);          
        $("#chat-group-user").append(html);
        $(this).parent().remove();
      });

    $("#chat-group-user").on("click", '.user-search-remove', function () {
        $(this).parent().remove();
    });
  });
})
