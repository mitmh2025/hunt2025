var ws;
var nMessages = 0;
var playSound = false;
var displayOnly = false;

function removeMessage(elt) {
    document.getElementById('messages').removeChild;
}

function setMessage(msg, type, timeout) {
    console.log("Message (" + type + "): " + msg);
    var msgDiv = wrapInDiv(null, ["message", "message-" + type]);
    msgDiv.innerHTML = msg;
    document.getElementById('messages').appendChild(msgDiv);
    if (timeout != 0) {
        window.setTimeout(
            function() { document.getElementById('messages').removeChild(msgDiv) }, 
            timeout ? timeout : (type == 'info' ? 2*1000 : 10*1000));
    }
}

function div(...nodes) {
    var container = document.createElement("div");
    for (var i = 0; i < nodes.length; i++) { 
        container.appendChild(nodes[i]); 
    }
    return container;
}

function wrapInDiv(id, classes, ...nodes) {
    var container = div(...nodes);
    if (id != null) { container.id = id; }
    for (var i=0;i<classes.length;i++) {
      container.classList.add(classes[i]);
    }
    return container;
}

function updateTasks(tasks) {
  var tasklist = document.getElementById('tasks');
  tasklist.innerHTML = "";
  for (var i=0;i<tasks.length;i++) {
    console.log(tasks[i]);
    var node = document.createElement('li');
    var a = document.createElement('a');
    const task = tasks[i];
    a.onclick = function() { markCompletion(task.text, !task.finished) };
    if (tasks[i].finished) {
      a.classList.add("done");
    }
    a.innerText = tasks[i].text;
    node.appendChild(a)
    tasklist.appendChild(node)
    // node.innerHTML = "<a onclick='markCompletion("+'"'+tasks[i].text+'",'+!tasks[i].finished+");'>" + tasks[i].text + "</a>"
  }
}

function hideButton(id) {
  document.getElementById(id).classList.add("hidden");
}

function markCompletion(task, complete) {
  sendMessage(complete ? "task_complete" : "task_incomplete", {"task": task});
}

function assignRoom() {
  sendMessage("assign_team_id", {"team_id": document.getElementById('team_id').value});
}

function updateDisplay(action) {
  document.getElementById('verb').innerHTML = action.verb;
  document.getElementById('noun').innerHTML = action.noun;

  document.getElementById('verb').classList.remove("old");
  document.getElementById('noun').classList.remove("old");

  window.setTimeout(
    function() { 
      document.getElementById('verb').classList.add("old");
      document.getElementById('noun').classList.add("old");
     }, 
    3000);
  if (playSound) {
    var audio = new Audio('/assets/ding.mp3');
    audio.play();  
    console.log("played audio");
  }
}

function updateFromSocket(command, data) {
  console.log(data)
  switch (command) {
    case 'game_state':
      const state = data.state;
      updateDisplay(state['action']);
      if (!displayOnly) {
        updateTasks(state['tasks']);
        updateTasks(state['tasks']);
      }
      break;
    case 'teams':
      const teams = data.teams;
      break;
  }
}

function sendMessage(command, data) {
  console.log(data)
  ws.send(JSON.stringify({"name": command, ...data}))
}

function connectWebSocket(url, messageHandler) {
    ws = new WebSocket(url);
    ws.onopen = function (event) {
        console.log('websocket connection opened at '+url);
    };
    ws.onmessage = function (event) {
        console.log('received message from '+url);
        console.log('data: '+event.data);
        var data = JSON.parse(event.data);
        console.log('command '+data.name);
        if ('error' in data) {
          setMessage(data.error, "error");
        } else {
          messageHandler(data.name, data);
        }
    }
    ws.onclose = function (event) {
        console.log('websocket is closed.');
        setMessage("Lost connnection to server. Please refresh the page.", "error", 0);
    }
}

function setVideo(id) {
  if (!displayOnly) {
    document.getElementById('videoframe').src = id ? "https://www.youtube-nocookie.com/embed/" + id + "?controls=0&autoplay=1&mute=1" : "";
  }
}