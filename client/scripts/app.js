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

/*
var app = {

  //TODO: The current 'handleUsernameClick' function just toggles the class 'friend'
  //to all messages sent by the user
  server: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,
  friends: {},
  messages: [],

  init: function() {
    // Get username
    app.username = window.location.search.substr(10);

    app.$message = $('#message');
    // Cache jQuery selectors
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');

    // Add listeners
    app.$chats.on('click', '.username', app.handleUsernameClick);
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.handleRoomChange);

    // Fetch previous messages
    app.startSpinner();
    app.fetch(false);

    // Poll for new messages
    setInterval(function() {
      app.fetch(true);
    }, 3000);
  },

  send: function(message) {
    app.startSpinner();

    // POST the message to the server
    $.ajax({
      url: app.server,
      type: 'POST',
      data: message,
      success: function (data) {
        // Clear messages input
        app.$message.val('');

        // Trigger a fetch to update the messages, pass true to animate
        app.fetch();
      },
      error: function (error) {
        console.error('chatterbox: Failed to send message', error);
      }
    });
  },

  fetch: function(animate) {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: function(data) {
        // Don't bother if we have nothing to work with
        if (!data.results || !data.results.length) { return; }

        // Store messages for caching later
        app.messages = data.results;

        // Get the last message
        var mostRecentMessage = data.results[data.results.length - 1];

        // Only bother updating the DOM if we have a new message
        if (mostRecentMessage.objectId !== app.lastMessageId) {
          // Update the UI with the fetched rooms
          app.renderRoomList(data.results);

          // Update the UI with the fetched messages
          app.renderMessages(data.results, animate);

          // Store the ID of the most recent message
          app.lastMessageId = mostRecentMessage.objectId;
        }
      },
      error: function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  clearMessages: function() {
    app.$chats.html('');
  },

  renderMessages: function(messages, animate) {
    // Clear existing messages`
    app.clearMessages();
    app.stopSpinner();
    if (Array.isArray(messages)) {
      // Add all fetched messages that are in our current room
      messages
        .filter(function(message) {
          return message.roomname === app.roomname ||
                 app.roomname === 'lobby' && !message.roomname;
        })
        .forEach(app.renderMessage);
    }

    // Make it scroll to the top
    if (animate) {
      $('body').animate({scrollTop: '0px'}, 'fast');
    }
  },

  renderRoomList: function(messages) {
    app.$roomSelect.html('<option value="__newRoom">New room...</option>');

    if (messages) {
      var rooms = {};
      messages.forEach(function(message) {
        var roomname = message.roomname;
        if (roomname && !rooms[roomname]) {
          // Add the room to the select menu
          app.renderRoom(roomname);

          // Store that we've added this room already
          rooms[roomname] = true;
        }
      });
    }

    // Select the menu option
    app.$roomSelect.val(app.roomname);
  },

  renderRoom: function(roomname) {
    // Prevent XSS by escaping with DOM methods
    var $option = $('<option/>').val(roomname).text(roomname);

    // Add to select
    app.$roomSelect.append($option);
  },

  renderMessage: function(message) {
    if (!message.roomname) {
      message.roomname = 'lobby';
    }

    // Create a div to hold the chats
    var $chat = $('<div class="chat"/>');

    // Add in the message data using DOM methods to avoid XSS
    // Store the username in the element's data attribute
    var $username = $('<span class="username"/>');
    $username.text(message.username + ': ').attr('data-roomname', message.roomname).attr('data-username', message.username).appendTo($chat);

    // Add the friend class
    if (app.friends[message.username] === true) {
      $username.addClass('friend');
    }

    var $message = $('<br><span/>');
    $message.text(message.text).appendTo($chat);

    // Add the message to the UI
    app.$chats.append($chat);

  },

  handleUsernameClick: function(event) {

    // Get username from data attribute
    var username = $(event.target).data('username');

    if (username !== undefined) {
      // Toggle friend
      app.friends[username] = !app.friends[username];

      // Escape the username in case it contains a quote
      var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';

      // Add 'friend' CSS class to all of that user's messages
      var $usernames = $(selector).toggleClass('friend');
    }
  },

  handleRoomChange: function(event) {

    var selectIndex = app.$roomSelect.prop('selectedIndex');
    // New room is always the first option
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        // Set as the current room
        app.roomname = roomname;

        // Add the room to the menu
        app.renderRoom(roomname);

        // Select the menu option
        app.$roomSelect.val(roomname);
      }
    } else {
      app.startSpinner();
      // Store as undefined for empty names
      app.roomname = app.$roomSelect.val();
    }
    // Rerender messages
    app.renderMessages(app.messages);
  },

  handleSubmit: function(event) {
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };

    app.send(message);

    // Stop the form from submitting
    event.preventDefault();
  },

  startSpinner: function() {
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function() {
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }
};
*/



