// YOUR CODE HERE:

{
  class App {
    constructor() {
      this.server = 'http://parse.CAMPUS.hackreactor.com';
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
    $('#roomRender').on('click', function() {
      var $name = $('input[name=room]').val();
      //app.renderMessage($name);
      app.renderRoom($name);
    });
    app.init();
  });
  App.prototype.init = () => {
    this.server = 'http://parse.CAMPUS.hackreactor.com';
    // var $element = $('<div/>').addClass('username');
    // $('#main').append($element);
    // var $message = $('<div>message</div>').addClass('submit');
    // $('#chats').append($);
    // app.renderMessage(message);
    console.log(app.username);
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
      url: app.server,
      type: 'GET',
      data: JSON.stringify(app.server),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: URL received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
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
    var $element = $('<div class =username>' + app.username + '</div><div>' + message + '</div>');
    // $('<div/>', {
    //   class: 'username',
    //   // href: 'http://google.com',
    //   // title: 'Become a Googler',
    //   // rel: 'external',
    //   text: message
    //   //`${message.username}: ${message.text}`
    // }).appendTo('#chats');

    $('#chats').append($element);
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
    app.renderMessage($('input[name=im]').val());
  };
  App.prototype.handleSubmit = () => {
    app.renderMessage($('#message').val());
    // var $message = $('<div/>').addClass('submit');
    // $('#send .submit').append($message);
  };
}





