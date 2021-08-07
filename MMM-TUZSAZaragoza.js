Module.register("MMM-TUZSAZaragoza", {
	// Default module config.
	defaults: {
		stopNumber: 325,
		updateInterval: 60, // in seconds 
		fadeSpeed: 1000 //in miliseconds (set to 0 to disable fade animation)
	},

	start: function () {

		var wrapper = document.createElement("div");
		wrapper.setAttribute("class", "TUZSAZARAGOZA");
		wrapper.innerHTML = this.translate("WAIT_INFO");
		this.moduleContents = wrapper;

		this.sendSocketNotification("TUZSA_INIT", this.config);
		this.sendSocketNotification("TUZSA_LANGUAGE", config.language);

	},

	// Override dom generator.
	getDom: function () {
		return this.moduleContents;
	},

	getTranslations: function () {
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		}
	},

	getStyles: function () {
		return [
			'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
			this.file('MMM-TUZSAZaragoza.css'), // this file will be loaded straight from the module folder.
		]
	},

	getHeader: function () {
		return this.data.header + " (" + this.translate("BUS_STOP") + ": " + this.config.stopNumber + ")";
	},

	socketNotificationReceived: function (notification, payload) {

		if (notification === "BUS_INFO") {

			var buses = "<table>";
			var mainDiv = document.createElement("div");
			mainDiv.setAttribute("class", "TUZSAZARAGOZA");

			var dataDiv = document.createElement("div");
			dataDiv.setAttribute("class", "TuzsaEstimaciones");
			mainDiv.appendChild(dataDiv);

			var updInfo = document.createElement("div");
			updInfo.setAttribute("class", "tuzsaUpdated");
			mainDiv.appendChild(updInfo);

			Log.info(this.name + ': Info is being processed.');

			for (let bus of payload.data.buses) {
				var busEntity = bus.split("|");
				buses += '<tr><td id="nombre"><i class="fas fa-bus"></i> ' + busEntity[0].trim() + '</td><td id="tiempo">' + busEntity[1].trim() + "</td></tr>";
			}

			buses += "</table>";

			var d = new Date(payload.data.lastUpdated);
			updInfo.innerHTML = this.translate("UPDATED") + ": " + d.toLocaleTimeString();

			dataDiv.innerHTML = buses;
			this.moduleContents = mainDiv;

			this.updateDom(this.config.fadeSpeed);

		} else if (notification === "ERR") {
			var updated = document.getElementsByClassName('tuzsaUpdated')[0];
			if (!updated.contains(document.getElementById('apidown'))) {
				var separator = document.createTextNode("  ");
				var alert = document.createElement("i");
				alert.setAttribute("class", "fas fa-exclamation-triangle");
				alert.setAttribute("id", "apidown");
	
				updated.prepend(separator);
				updated.prepend(alert);
			}

		} else { Log.info(this.name + ": Unknown notification received (module)."); }

	},

});
