OMA Lightweight M2M IoT Agent
==================
# Index

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Packaging](#packaging)
* [Testing](#testing)

#  <a name="overview"/> Overview
## Description
An Internet of Things Agent is a component that lets groups of devices send their data to and be managed from a FIWARE NGSI Context Broker using their own native protocols. This project provides the IoT Agent for the Lightweight M2M protocol, i.e. the bridge between OMA Lightweight M2M enabled devices and a NGSI Context Broker. 

For more information on what an IoT Agent is or how it should work, please check the documentation on the [Node IoT Agent Library](https://github.com/telefonicaid/iotagent-node-lib).

For more information on [OMA Lightweight M2M](http://openmobilealliance.org/about-oma/work-program/m2m-enablers/) you can check the [Node.js OMA Lightweight M2M library](https://github.com/telefonicaid/lwm2m-node-lib) we are using.

If you just want to start using the agent, jump to the [Quick Start Guide](docs/gettingStarted.md). 

## Type configuration
In order to assign the proper configuration for each type of device, a mechanism to assign types to new arriving devices should be used. This mechanism is based on Prefixes for the registrarion URL. For each type configured in the `lwm2m` configuration section in the `config.js` config file, a url prefix has to be defined. Whenever a registration arrives to an url with that prefix, the device will be assigned the corresponding type.

## Mappings
One of the features to provide through the IoT Agent is the mapping between the protocol specific names of the South Bound to the application-specific names in the North Bound. In the case of Lightweight M2M, this means to map two things:
* OMA Registry objects and resources from their URIs (e.g.: '') to their common names (e.g.: '').
* Custom device objects to the names defined by the user.

In order to accomplish this task, the agent supports:
* An aditional property `lwm2mResourceMapping` that lets the user configure names for to each of the particular resources exposed by a device Type
* Two optional configuration file, `omaRegistry.json` containing the automatic mappings that will be applied in case there are no custom mappings.

Custom mappings defined by the user in the config.js file or by preprovisioning devices take precedence over any other available mapping.

### OMA Registry mapping
The IoT Agent provides a mean to map Lightweight M2M objects supported by the client without the need to map them in the type or prevoprovision information. The mapping works as follows: whenever a device registration arrives to the IoT Agent **if there is no configured mapping for any of the objects supported by the decive** (that should appear in the registration payload), then **all the resources supported by the object in the OMA Registry** are configured **as passive resources** offered by the object.

The OMA Registry information is read from two files: `omaRegistryMap.json` and `omaRegistryInverseMap.json`. This two files can be generated with the last information in the OMA Registry with the command `bin/downloadOmaRegistry.js`. Notice that the generated files **do not** have the same name than the original ones (so the result can be double-checked before changing them). In order to use the freshly downloaded ones, just remove the former and rename the latter.

## Preprovisioning
For individual provisioning of devices, LWM2M devices can be preprovisioned to the server, sending all the required information to the IoT Agent Provisioning API. Preprovisioned devices should target the standard '/rd' url instead of a type url. The preprovision configuration will be identified by the Endpoint name sent by the device.

## A note about security
IoT Agent security is still in development, so no Southbound or Northbound security mechanisms are provided. The NGSI Context Broker can be secured with a [PEP Proxy]() anyway, so the IoT Agent should be able to deal with token based security. This mechanism is achieved with the use of Keystone Trust Tokens. For more information on how to use them, please read the Security Section in [Node IoT Agent Library](https://github.com/telefonicaid/iotagent-node-lib).

#  <a name="prerequisites"/>  Prerequisites
The IOT Agent requires Node.js 0.10.x to work and uses NPM as its package manager. Most Linux distributions offer packages to install it. For other OS, you can find instructions to install Node.js [here](https://nodejs.org/). 

NOTE: the current version of Node.js, 0.12.x has not been tested with the Agent, so we suggest to download and use the previous version (that process can be eased with utilities as `n` or  `nvm`).

#  <a name="installation"/> Installation

## Cloning the Github repository
Once the repository is cloned, from the root folder of the project execute:
```
npm install
```
This will download the dependencies for the project, and let it ready to the execution.

## Using the RPM 
To see how to generate the RPM, follow the instructions in [Packaging](#rpm).

To install the RPM, use the YUM tool:
```
yum localinstall --nogpg <rpm-file>
```

# <a name="usage"/> Usage
## Github installation
In order to execute the IOTAgent, just issue the following command from the root folder of the cloned project:
```
bin/lwm2mAgent.js [config file]
```
The optional name of a config file is optional and described in the following section.

## RPM installation
The RPM installs a linux service that can be managed with the typical instructions:
```
service iotagent-lwm2m start

service iotagent-lwm2m status

service iotagent-lwm2m stop
```

In this mode, the log file is written in `/var/log/iotagent-lwm2m/iotagent-lwm2m.log`.

# <a name="configuration"/> Configuration
There are two ways to provide the IOT Agent with a configuration set: passing the name of a config file (related to the root folder of the project) or customize the example `config.js` in the root. 

The configuration file is divided in two sections: one standard section for the NGSI North bound `ngsi`, and another one for the specific Lightweight M2M South bound, `lwm2m`. The former follows the same format described for the Node.js IOT Agent Framework, described [here](https://github.com/telefonicaid/iotagent-node-lib#global-configuration). The latter configures the Lightweight M2M library used for communicating with the devices, as described [here](https://github.com/telefonicaid/lwm2m-node-lib#-configuration) (`server` section).

These are the specific LWM2M parameters that can be configured for the agent:
* **logLevel**: level of logs for the IOTAgent specific information. E.g.: 'DEBUG'.
* **port**: UDP port where the IOTAgent will be listening. E.g.: 60001.
* **defaultType**: for the cases when no type can be assigned to a device (no preprovision or path asignation of type), this type will be assigned by default. E.g.: 'Device'
* **types**: for IOTAgents with multiple southbound paths, this attribute maps attribute types (defined either in the configuration file or by using the Device Configuration API) to southbound interfaces. E.g.:
```
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
```
# <a name="packaging"/> Packaging
The only package type allowed is RPM. In order to execute the packaging scripts, the RPM Build Tools must be available
in the system.

From the root folder of the project, create the RPM with the following commands:
```
cd rpm
./create-rpm.sh <release-number> <version-number>
```
Where `<version-number>` is the version (x.y.z) you want the package to have and `<release-number>` is an increasing
number dependent un previous installations. 

# <a name="testing"/> Testing
The IoT Agent comes with a test suite to check the main functionalities. In order to execute the test suite you must have the Grunt client installed. You can install it using the following command (you will need root permissions):
```
npm install -g grunt-cli
```
Once the client is installed and the dependencies are downloaded, you can execute the tests using:
```
grunt
```
This will execute the functional tests and the syntax checking as well.

NOTE: This are end to end tests, so they execute against real instances of the components (so make sure you have a real Context Broker configured in the config.js). Be aware that the tests clean the databases before and after they have been executed so DO NOT EXECUTE THIS TESTS ON PRODUCTION MACHINES.
