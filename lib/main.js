// http://stackoverflow.com/questions/5205672/modify-url-before-loading-page-in-firefox/
var {Cc, Ci} = require("chrome");

var httpRequestObserver =
{
  observe: function(subject, topic, data)
  {
    if (topic == "http-on-modify-request")
    {   
        var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
        if(/^http:\/\/(.+).facebook.com/.test( httpChannel.URI.spec ))
        {
            var origURL = httpChannel.URI.spec;
            var newURL  = origURL.replace(/^http:\/\//,'https://');
            
            
            var newuri = Cc["@mozilla.org/network/standard-url;1"]
                  .createInstance(Ci.nsIStandardURL);
            newuri.init(Ci.nsIStandardURL.URLTYPE_STANDARD, 80, newURL, 'utf-8', null);
            newuri = newuri.QueryInterface(Ci.nsIURI);
            
            httpChannel.redirectTo( newuri );
        }
    }
  },
 
  get observerService() {
    return Cc["@mozilla.org/observer-service;1"]
                     .getService(Ci.nsIObserverService);
  },
 
  register: function()
  {
    this.observerService.addObserver(this, "http-on-modify-request", false);
  },
 
  unregister: function()
  {
    this.observerService.removeObserver(this, "http-on-modify-request");
  }
};

httpRequestObserver.register();