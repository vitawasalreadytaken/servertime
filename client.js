(function (global) {
	var offset = 0;

	function update(url) {
		var xhr = new XMLHttpRequest();
		var requested;

		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status !== 200) {
					throw 'Failed to update server time, response status = ' + xhr.status;
				}
				var now = new Date();
				var stamp = Number(xhr.responseText);
				offset = now - stamp - (now - requested) / 2;
				// console.debug && console.debug('Server time =', stamp, 'new offset =', offset);
			}
		};

		xhr.open('GET', url);
		requested = new Date();
		xhr.send();
	}

	global.ServerTime = {
		init: function (port, host, updateInterval) {
			host = host || window.document.location.hostname;
			port = port || 37890;
			updateInterval = updateInterval || 5000;
			var url = 'http://' + host + ':' + port;
			update(url);
			global.setInterval(function () { update(url); }, updateInterval);
		},
		get: function () {
			return new Date((new Date) - offset);
		}
	};

})(this);
