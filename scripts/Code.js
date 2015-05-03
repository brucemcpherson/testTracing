
function myFunction() {
  
  // -- always leave this comment somewhere .. its a hack to provoke an authorization dialog ... Drive.Files.copy(resource, fileId)
  
  // create tracing object - need to have enabled drive advanced service to get a properly scoped token
  var trace = new cChromeTrace.ChromeTrace().setAccessToken(ScriptApp.getOAuthToken());
  
  var text = "abcdefghijklmnop";
  var key = "xyz";

  // add a couple of events
  trace.begin('hmac');
  
    var LOOPSIZE = 1000;
  
    trace.begin('hmac256');
    
      for (var i = 0 ; i < LOOPSIZE ; i++) {
        Utilities.computeHmacSha256Signature(text, key);
        trace.counter ("count256", {args:{count:i,random:Math.random()*LOOPSIZE}});
      }
      
      
    trace.end('hmac256');
   
    trace.begin ('hmac512');
    
      for (var i = 0 ; i < LOOPSIZE ; i++) {
        Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, text, key);
        trace.counter ("count512", {args:{count:i,random:Math.random()*LOOPSIZE}});
      }
      
    trace.end('hmac512',{args:{success:true}});

  trace.end('hmac');

  trace.dump("/Published Scripts/tracing");
  
  
}

