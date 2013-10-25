
$(document).ready(function () {

	// get the URL path of the server from which the current page is served
  	var socket = io.connect('http://' + location.hostname);
  	
  	socket.on('connect', function() {
    setTimeout( sendOpenCapConnect(), 10);
  	});
  
  	// send an open cap connect message
	  function sendOpenCapConnect(){
	    sendOpenCap(
	      '<opencap type="command">' +
	      '  <connect netid="mopencapapi" timeout="1000" user="" password="" sharedgroup="shared" acceptevents="1" protocolversion="1.0" />' +
	      '</opencap>'
	    );
	    setTimeout( function(){
	      sendOpenCap(
	        '<opencap type="command">' +
	          '  <registergroup sharedgroup="shared" acceptevents="1"/>' +
	          '</opencap>'
	      )}, 100);
	  } // end open cap connect message

	function sendOpenCapPerform(object, action, parameters) {
	    var s = '<perform object="' + object + '" action="' + action + '">';
	    s += '<parameters>';
	    if (parameters && parameters.length) {
	      for(var i=0; i < parameters.length; i++){
	        var parameter = parameters[i];
	        s += '<parameter name="' + parameter.name + '" value="' + parameter.value + '"/>';
	      }
	    }
	    s += '</parameters>';
	    s += '</perform>';
	    sendOpenCapCommand(s);
	  }
	  
  function sendOpenCapCommand(innerXml){
    sendOpenCap(
      '<opencap type="command">' +
      innerXml +
      '</opencap>'
    );
  }
  
  function sendOpenCap(data){
    socket.emit('opencap',data);
    // console.log('Sent:\n', data);
  }

// Event handlers -----------------------------
    //TV Dialogue Controls
    var off = document.getElementById("tvOff");
        off.onclick = function(){
            sendOpenCapPerform('beep','starttask');
        };
        
	var off = document.getElementById("tvOn");
        off.onclick = function(){
            sendOpenCapPerform('beep','starttask');
        };
	//TV Dialogue Controls -->

}); // document ready


