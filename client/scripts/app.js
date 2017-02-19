// YOUR CODE HERE:

{
  class App {
    constructor() {
      this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
      this.username = window.location.search.slice(10);   
    }
  }
  
  var app = new App();
  
  // var message = {
  //   username: 'shawndrost',
  //   text: 'trololo',
  //   roomname: '4chan'
  // };
  // $(document).ready(function () {
  // }); 
  $(document).ready(function () {
    
    $('.username').on('click', function() {
      app.handleUsernameClick();
    });
    
    $('#msg').on('click', function() {
      app.handleSubmit();
    });

    // $('#msg').on('click', function() {
    //   app.handleSubmit();
    // });
    // $('#roomRender').on('click', function() {
    //   var $name = $('input[name=room]').val();
    //   //app.renderMessage($name);
    //   app.renderRoom($name);
    // });
    app.init();
  });
  App.prototype.init = () => {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    // var $element = $('<div/>').addClass('username');
    // $('#main').append($element);
    // var $message = $('<div>message</div>').addClass('submit');
    // $('#chats').append($);
    // app.renderMessage(message);
    app.renderRoom('room1');
    app.renderRoom('room2');
    app.renderRoom('room3');
    
  };
  
  App.prototype.send = (message) => {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };
  
  App.prototype.fetch = () => {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + '?order=-createdAt&limit=1000',
      type: 'GET',
      //data: JSON.stringify(app.server),
      dataType: 'json',
      // contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: data received');
        app.clearMessages();
        var arr = data.results;
        for (var i = 0; i < arr.length; i++) {

          app.renderMessage(arr[i]);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive', data);
      }
    });
  };
  
  App.prototype.clearMessages = () => {
    $('#chats').empty();
    // $.ajax({
    // This is the url you should use to communicate with the parse API server.
      // url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
      // type: 'DELETE',
      //data: $('#chats'),
      // contentType: 'application/json',
      // success: function (data) {
      //   $('#chats').empty();
      //   console.log(window.location.href);
      // },
      // error: function (data) {
      //   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      //   console.error('chatterbox: Failed to send message', data);
      // }
    // });
  };
  App.prototype.renderMessage = (message) => {
    message.username = message.username || 'anonymous';
    if (message.text !== undefined) {
      if (message.text.indexOf('<') >= 0 || message.text.indexOf('>') >= 0 ) {
        if (message.username.indexOf('$(') >= 0) {
          var sentence = 'failed';
          var username = 'hack?';
        }
      } else {
        sentence = message.text;
        username = message.username;
      }
    }
    var $element = $('<br><div class =username>' + username + '</div><div>' + sentence + '</div></br>');
    // $('<div/>', {
    //   class: 'username',
    //   // href: 'http://google.com',
    //   // title: 'Become a Googler',
    //   // rel: 'external',
    //   text: message
    //   //`${message.username}: ${message.text}`
    // }).appendTo('#chats');

    $('.chat').append($element);
  };
  App.prototype.renderRoom = (name) => {
    $('<option/>', {
      value: name,
      text: name
    }).appendTo('#roomSelect');
    //document.body.append("<div>name<div/>").attr('id', 'roomSelect');
  }; 
  App.prototype.handleUsernameClick = () => {
    // var $element = $('<div/>').addClass('username');
    // $('#main').append($element);
    // $('<div/>', {
    //   class: 'username',
    //   text: 'a name'
    // }).appendTo('#main');
    // app.renderMessage($('input[name=im]').val());
  };
  App.prototype.handleSubmit = () => {
    var postRequest = {
      username: app.username,
      text: $('#message').val(),
      roomname: $('select').find('option:selected').val()
    };
    app.prototype.send(postRequest);
    // app.renderMessage($('#message').val());
    // var $message = $('<div/>').addClass('submit');
    // $('#send .submit').append($message);
  };
  setInterval(function() { app.fetch(); }, 3000);
}





