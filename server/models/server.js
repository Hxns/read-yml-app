const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const http = require('http');
const yaml = require('js-yaml');
const fs = require('fs');


class Server {


    httpServer = http.createServer(this.app);
    io = new socket.Server(this.httpServer, {
        cors: { origin: '*' }
    });



    constructor () {

        this.app = express()

    }

    middlewares() {

        //CORS
        this.app.use(cors());
        this.app.use(express.static('public'));

    }

    async socketInit() {
        ;
        this.io.on("connection", socket => {
            console.log('usuario conectado', socket.id);
            let data = yaml.load(fs.readFileSync('./data.yml', 'utf-8'));
            this.initEmitTemperature(socket, data);
            this.initEmitPower(socket, data);
        });

        this.httpServer.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    }

    initEmitTemperature(socket, data) {
        socket.on('getTemperature', async () => {
            if (data.temperature) {
                for (const key in data.temperature.values) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            data.temperature.values,
                            key
                        )
                    ) {
                        data.temperature.values[key].value = parseFloat(
                            data.temperature.values[key].value
                        ) - 273.15;
                        this.io.emit("getTemperature", JSON.stringify(data.temperature.values[key]))
                        await this.sleep(5 * 1000);
                    }
                }
            }

        });
    }

    initEmitPower(socket, data) {
        socket.on('getPower', async () => {
            if (data.power) {
                for (const key in data.power.values) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            data.power.values,
                            key
                        )
                    ) {
                        data.power.values[key].value = parseFloat(
                            data.power.values[key].value
                        ) * 1000;
                        this.io.emit("getPower", JSON.stringify(data.power.values[key]))
                        await this.sleep(5 * 1000);
                    }
                }
            }

        });
    }

    sleep = async (timeout) => {
        return await new Promise((resolve) => setTimeout(resolve, timeout));
    };
}

module.exports = Server;