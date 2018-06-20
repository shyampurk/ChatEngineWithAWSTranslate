// create a new instance of ChatEngine
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-c22e8bc3-449b-4692-abf8-87ce62a6f333',
    subscribeKey: 'sub-c-a6ff1f8c-712a-11e8-847f-0e36953de9e2'
});


// create a bucket to store our ChatEngine Chat object
let homeChat;

// create a bucket to store
let me;

var userPref = "";

// compile handlebars templates and store them for use later
let peopleTemplate = Handlebars.compile($("#person-template").html());
let meTemplate = Handlebars.compile($("#message-template").html());
let userTemplate = Handlebars.compile($("#message-response-template").html());


var user_me = {};
user_me.first = 'Peter';
user_me.last = '';
user_me.full = [user_me.first, user_me.last].join(" ");
user_me.uuid = 'Peter';
user_me.avatar = 'img/person.png';
user_me.online = true;
user_me.lastSeen = Math.floor(Math.random() * 60);


// this is our main function that starts our chat app
const initChat = () =>
{

  ChatEngine.connect (user_me.uuid,user_me);



  ChatEngine.on('$.ready', function(data)
  {
    me = data.me;
    console.log(me);
    homeChat = new ChatEngine.Chat('home');
    //console.log(homeChat.users);

    // when we recieve messages in this chat, render them
    homeChat.on('message', (message) => {
        console.log("RECD " + message.data.target_text);
        console.log("REQ " + message.data.source_text);
        renderMessage(message);
    });

    homeChat.on('message', (payload) => {
    console.log(payload.data.target_text) // will contain the translated text
    });

    homeChat.on('userPref', (payload) => {
    console.log(payload.data.text) // will contain the translated text
    }); 

    homeChat.on('$.online.*', (data) => {
        $('#people-list ul').append(peopleTemplate(data.user));
      });

      // when a user goes offline, remove them from the online list
      homeChat.on('$.offline.*', (data) => {
        $('#people-list ul').find('#' + data.user.uuid).remove();
      });

      // wait for our chat to be connected to the internet
      homeChat.on('$.connected', () => {

          // search for 50 old `message` events
          homeChat.search({
            event: 'message',
            limit: 10
          }).on('message', (data) => {

            //console.log(data)

            // when messages are returned, render them like normal messages
            renderMessage(data, true);

          });

          //Set initial language pref to english
          setLanguagePref("en");

      });

      // bind our "send" button and return key to send message
      $('#sendMessage').on('submit', sendMessage)



  }); // end on ready

} // end of init function

$('#language').change(function languageSelect() {
    
    var LangaugePref = document.getElementById('language').value;
    setLanguagePref(LangaugePref);
    console.log("Language preference change to ", LangaugePref);
    
  });

//Send 'userPref' signal to indicate language preference
function setLanguagePref(userPref){
    
      homeChat.emit('userPref',{
        text:userPref,
        message:{
          userName:"peter",
          userLang: userPref
        }

      })

   };


// send a message to the Chat
const sendMessage = () => {

    // get the message text from the text input
    let message = $('#message-to-send').val().trim();

    // if the message isn't empty
    if (message.length) {

      console.log(message);

        //send chat message to user John
        homeChat.emit('message', {
          //type:'REQUEST',
          text: message,
          translate: {
            user: "john",
            source_text: message
            }
        });

        console.log('message sent');

        // clear out the text input
        $('#message-to-send').val('');
    }

    // stop form submit from bubbling
    return false;

};



// render messages in the list
const renderMessage = (message, isHistory = false) => {

    // use the generic user template by default
    let template = userTemplate;

    console.log(message.sender.uuid + " said: " + message.data.source_text + " : " + message.data.target_text);

    // if I happened to send the message, use the special template for myself
    if (message.sender.uuid == me.uuid) {
        template = meTemplate;
    }

    var msgtxt = "";

    if (message.sender.uuid == me.uuid){
       msgtxt = message.data.source_text;
    }
    else{
       msgtxt = message.data.target_text;
    }

     let el = template({

        messageOutput: msgtxt,
        time: getCurrentTime(),
        user: message.sender.state
    });

    // render the message
    if(isHistory) {
      $('.chat-history ul').prepend(el);
    } else {
      $('.chat-history ul').append(el);
    }

    // scroll to the bottom of the chat
    scrollToBottom();

};


// scroll to the bottom of the window
const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

// get the current time in a nice format
const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};



// boot the app
initChat();

