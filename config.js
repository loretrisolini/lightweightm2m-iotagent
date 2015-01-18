/*
 * Copyright 2014 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of fiware-iotagent-lib
 *
 * fiware-iotagent-lib is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * fiware-iotagent-lib is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with fiware-iotagent-lib.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */

var config = {};

config.lwm2m = {
    logLevel: 'DEBUG',
    port: 60001,
    defaultType: 'Device',
    types: [
        {
            name: 'Light',
            url: '/light'
        },
        {
            name: 'Pressure',
            url: '/pres'
        },
        {
            name: 'Arduino',
            url: '/arduino'
        }
    ]
};

config.ngsi = {
    logLevel: 'DEBUG',
    contextBroker: {
        host: '192.168.56.101',
        port: '1026'
    },
    server: {
        port: 4041
    },
    deviceRegistry: {
        type: 'mongodb',
 	host: 'localhost'
    },
    types: {
        'Light': {
            service: 'smartGondor',
            subservice: '/gardens',
            commands: [],
            lazy: [
                {
                    name: 'luminescence',
                    type: 'Lumens'
                }
            ],
            active: [
                {
                    name: 'status',
                    type: 'Boolean'
                }
            ]
        },
        'Pressure': {
            service: 'dumbMordor',
            subservice: '/deserts',
            commands: [],
            lazy: [
                {
                    name: 'pressure',
                    type: 'bars'
                }
            ],
            active: [
                {
                    name: 'status',
                    type: 'Boolean'
                }
            ]
        }
    },
    service: 'smartGondor',
    subservice: '/gardens',
    providerUrl: 'http://192.168.56.1:4041',
    deviceRegistrationDuration: 'P1M'
};

module.exports = config;
