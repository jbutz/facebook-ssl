var tabs = require("sdk/tabs");

var fbssl = function(tab)
{
	if(tab.url.substr(0,6) !== "https:" && tab.url.indexOf("facebook.com") !== -1)
	{
		var origURL = tab.url;
		tab.url = "https://" + tab.url.substr(tab.url.indexOf("http://") + "http://".length);
	}
};

tabs.on("open", fbssl);
tabs.on("ready", fbssl);


