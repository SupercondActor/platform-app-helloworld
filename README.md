# SupercondActor Business Platform
## Hello World example for Scheduled Service

SupercondActor Business Platform allows deployment of multiple orchestrated JavaScript services to the Service Fabric cluster, enjoying full range of security, performance, and application lifecycle management capabilities.

<img src="https://www.supercondactor.com/images/SupercondActorPlatformInfo.svg" alt="SupercondActor Business Platform" />

This repository provides Business Platform developers with a quick start Hello World project tailored for Node.js development experience. 

The goal is to allow developers to easily generate complete `Code Package` zip file ready to be uploaded to the SupercondActor Business Platform cluster.

### Two types of business services

There are two types of business services in the SupercondActor Business Platform - Scheduled Service and Listening Service

#### Scheduled Service

As the name implies Scheduled Service runs your code on a pre-defined schedule - it does not need an external event to start execution. This type of service is useful when you want to perform some processing job periodically, like every 5 minutes or on Saturdays at 1:00 AM.

#### Listening Service

This type of service is supposed to wait for some external event, like an API call, a message arriving through a queue, or IOT data stream.

## Quick Start

How to build and install the Hello World service to the SupercondActor Business Platform cluster. (Note: these instructions are for Windows platform.)

### Prerequisites

1. Node.js and NPM installed on your local computer (reasonably fresh versions).
2. This repository cloned or downloaded to your local computer.
3. Local or Azure Service Fabric cluster with Business Platform applications installed (see https://www.supercondactor.com/documentation/basics/deployment/ for details).

### Building Code Package

In the root folder of the project run following commands:

1. `npm install`
2. `npm run build`
3. Optionally, run `npm test` to make sure that created package works properly.

The `dist` folder will be created containing the Code Package file `BusinessScriptBundle.zip`. You'll need to upload this file using Service Manager UI.

### Deploying Code Package

1. Navigate to your cluster's Service Manager UI. On local development cluster the URL is https://localhost/service-manager
2. In the Cluster Explorer tree click a fabric: application
3. Under 'Upload Application Services Code package' click `Choose` button and select the `BusinessScriptBundle.zip` file.
4. Click `Upload` button.

You are done! Now you can inspect and start your new service.

## Project structure

### `index.ts` file

`index.ts` is the entry file of your project, as specified in the `webpack.config.js`. It is the starting point in the TypeScript compilation and following JavaScript optimization, so make sure it references all entry points for your application - the dependency graph must reach all libraries you want to be included in the final script bundle.

You have to modify this file as appropriate for your application.

### `webpack.config.js` file

`webpack.config.js` file is the webpack configuration file where the entry point of your project is specified. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. See https://webpack.js.org/concepts/ for details.

This file is preconfigured to create the Code Package zip file ready to be uploaded to the SupercondActor Business Platform cluster.

Usually, you don't have to modify this file.

### Your application files and folders

Add anything you need for your application.

### `spec` folder

Here you put your unit tests.

### `src/appConfig` folder

This folder contain files which should be included into the Code Package - you should create package folders and files inside the `src/appConfig` folder after you decide which services you want to include in your application. See below for the structure of the Code Package.

### Structure of the Code Package

Whether you are developing a single business service or a complex application containing multiple services of different types, the best way of deploying your code to the SupercondActor Business Platform is to use Code Package - a set of folders and files packed in a zip file.

You can create a Code Package manually, or use this project structure and create the package by executing `npm run build` command. Anyway, here is a couple of simple rules.

The name of the zip file can be anything, but inside there can be three folders:

- :open_file_folder: `ScheduledServices`
- :open_file_folder: `ListeningServices`
- :open_file_folder: `Scripts`

`ScheduledServices` and `ListeningServices` folders contain configuration and script files describing your business services.

`Scripts` folder contains common JavaScript libraries common for all services in the current application.

```javascript
BusinessScriptBundle.zip
|
├── ScheduledServices
|  ├── myService1.config.json
|  ├── myService1.job.js
|  |
|  └── myService2.config.json
|
├── ListeningServices
|  ├── myService3.config.json
|  └── myService3.job.js
|
└── Scripts
   ├── bundle.js
   └── another.js
```

The file `.config.json` must be present for a service, while the file `.job.js` is optional.

You create the `Scripts` folder only if you are creating the Code Package manually. When executing the `build` command the Scripts folder will be created and populated for you automatically.

### Scheduled Service configuration

#### Configuration file `.config.json`

To create a Scheduled Service you create a `your_service_name.config.json` file with the following structure:

```json
{
    "ServiceID": null,
    "ServiceName": "My Scheduled Service",
    "GroupName": "Demo Services",
    "MetadataJson": "{\"Description\": \"My first service\"}",
    "Job": {
        "JobSchedule": {
            "IntervalSeconds": 5,
            "CronString": null
        },
        "JobScript": ""
    }
}
```

Description of the properties:

- `ServiceID` - unique ID for the service. You need to provide it only if you are updating an existing service
- `ServiceName` - display name for the service, can be changed at any time
- `GroupName` - display name for a group of services, available for your convenience. If not provided - will be `[Unnamed group]`
- `MetadataJson` - any kind of data, usually in JSON format, to be used by the service at runtime
- `Job` - describes schedule and script to execute:
    - `JobSchedule` - exactly one of the parameters must be provided: 
        - `IntervalSeconds` - interval between finishing previous job run and starting the next one.
        - `CronString` - running schedule defined as a standard `Cron` expression
    - `JobScript` - the script to be run when job starts - usually a call to an entry point defined in a larger library. Can be empty - in that case a separate script file `your_service_name.job.js` must be provided.

CronString expression can be written in a five-part format:

    * * * * *
    | | | | └── day of week (0 - 6) (Sunday=0)
    | | | └──── month (1 - 12)
    | | └────── day of month (1 - 31)
    | └──────── hour (0 - 23)
    └────────── min (0 - 59)

or a six-part format that allows for seconds:

    * * * * * *
    | | | | | └── day of week (0 - 6) (Sunday=0)
    | | | | └──── month (1 - 12)
    | | | └────── day of month (1 - 31)
    | | └──────── hour (0 - 23)
    | └────────── min (0 - 59)
    └──────────── sec (0 - 59)

The value column can have a star `*` or a list of elements separated by commas. An element is either a number in the ranges shown above or two numbers in the range separated by a hyphen (meaning an inclusive range).

#### Job Script file `.job.js`

If you don't want to put your starting script in the `JobScript` property in the `your_service_name.config.json` file, you can create a separate file `your_service_name.job.js`. Note: in the file name the `your_service_name` part should be identical for both files.

### Listening Service configuration

To create a Listening Service you create a `<service_name>.config.json` file with the following structure:

```json
{
    "ServiceUri": null,
    "ServiceName": "My Listening Service",
    "GroupName": "Demo Services",
    "InstanceCount": 1,
    "RestartDelayMillisec": 100,
    "MetadataJson": "{\"Description\": \"My first service\"}",
    "ServiceScript": ""
}
```

Description of the properties:

- `ServiceUri` - unique ID for the service in a special URI format. You need to provide it only if you are updating an existing service
- `ServiceName` - display name for the service, can be changed at any time
- `GroupName` - display name for a group of services, available for your convenience. If not provided - will be `[Unnamed group]`
- `InstanceCount` - number of service instances you want to run concurrently for increased performance. If your script requests a port number (for example for an API endpoint) this number should not be greater that number of virtual machines in the Service Fabric cluster. Specify `-1` if you want to put one instance of the service onto each cluster node.
- `RestartDelayMillisec` - in case your script experienced an unhandled exception it will be re-started after specified number of milliseconds
- `MetadataJson` - any kind of data, usually in JSON format, to be used by the service at runtime

