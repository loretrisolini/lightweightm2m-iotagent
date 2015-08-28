var config = {};

config.lwm2m = {
    logLevel: 'DEBUG',
    port: 60001,
    defaultType: 'Device',
    ipProtocol: 'udp4',
    serverProtocol: 'udp4',
    formats: [
        {
            name: 'application-vnd-oma-lwm2m/text',
            value: 1541
        },
        {
            name: 'application-vnd-oma-lwm2m/tlv',
            value: 1542
        },
        {
            name: 'application-vnd-oma-lwm2m/json',
            value: 1543
        },
        {
            name: 'application-vnd-oma-lwm2m/opaque',
            value: 1544
        }
    ],
    writeFormat: 'application-vnd-oma-lwm2m/text',
    types: [ ]
};

config.ngsi = { 
    logLevel: 'DEBUG', 
    iotDiscovery: { 
        host: '127.0.0.1', 
        port: '8080' 
    }, 
    iotBroker: { 
        host: '127.0.0.1', 
        port: '8090' 
    }, 
    server: { 
        port: 4041 
    }, 
    deviceRegistry: { 
        type: 'memory' 
    }, 
    types: { }, 
    service: 'smartGondor', 
    subservice: '/gardens', 
    providerUrl: 'http://localhost:4041/ngsi10', 
    deviceRegistrationDuration: 'P1M' 
};
};

module.exports = config;
