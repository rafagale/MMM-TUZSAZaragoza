const NodeHelper = require("node_helper");
const fs = require("fs");
const axios = require('axios');

module.exports = NodeHelper.create({

    start: function () {
        console.log("Starting stop fetcher for: " + this.name);
    },

    socketNotificationReceived: function (notification, payload) {

        var self = this;

        switch (notification) {
            case "TUZSA_LANGUAGE":
                var translationsDir = "./modules/" + this.name + "/translations/";
                var lFile = translationsDir + payload + ".json";
                var lCont;

                if (fs.existsSync(lFile)) {
                    lCont = fs.readFileSync(translationsDir + payload + ".json");
                } else {
                    lCont = fs.readFileSync(translationsDir + "en.json");
                }

                this.langFile = JSON.parse(lCont);
                break;
            case "TUZSA_INIT":
                this.config = payload;
                setInterval(function () {
                    self.updateBusInfo();
                }, this.config.updateInterval * 1000);
                break;
            default:
                console.log(this.name + ": Unknown notification received (helper).");
        }
    },

    updateBusInfo: function () {
        console.log(this.name + ": Updating bus info.");

        var self = this;

        let url = "https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-" + this.config.stopNumber + ".json";

        axios.get(url, { timeout: 15000 })
            .then(function (response) {
                let data = response.data;
                let buses = [];

                data.destinos.forEach(function (bus) {
                    let primero = bus.linea + " - " + bus.destino.slice(0, -1) + " | " + self.getFormattedEstimation(bus.primero);
                    buses.push(primero);

                    let segundo = bus.linea + " - " + bus.destino.slice(0, -1) + " | " + self.getFormattedEstimation(bus.segundo);
                    buses.push(segundo);
                });

                var busInfo = {
                    buses: buses,
                    lastUpdated: data.lastUpdated,
                    title: data.title
                };

                self.sendSocketNotification("BUS_INFO", { data: busInfo });

            }).catch(function (error) {
                console.log(error.code);
            });
    },

    getFormattedEstimation: function (str) {
        let estimation = str;
        if (/\d/.test(str)) {
            if (!str.startsWith("0")) {
                estimation = str.split("u")[0];
            } else {
                estimation = this.langFile['DEPART'];
            }
        } else if (str.toLowerCase().startsWith("sin")) {
            estimation = this.langFile['NO_DATA'];
        }
        return estimation;
    },

});
