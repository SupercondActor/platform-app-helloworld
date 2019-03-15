/// <reference path="../../SupercondActorTypes.d.ts" />

export class _SupercondActorMock implements SupercondActor.ISupercondActor {
    Logger: SupercondActor.IPlatformLogger = new SupercondActorLoggerMock();
    Service: SupercondActor.IPlatformContext = new SupercondActorContextMock();
    Config: SupercondActor.IPlatformConfig = new SupercondActorPlatformConfigMock();
}

export class _SupercondActor_RequestMock implements SupercondActor.IApiRequest {
    method = 'GET';
    headers = [];
    cookies = [];
    url = '';
    query = [];
    bodyJson = '{}';
    authClaims = [];
}

export class _SupercondActor_ResponseMock implements SupercondActor.IApiResponse {
    body = null;
    contentType = 'application/json';
    statusCode = 200;
    setHeader(key: string, value: string | string[]): void {

    }
    setCookie(key: string, value: string, options: SupercondActor.IApiCookieOptions): void {

    }
}

class SupercondActorLoggerMock implements SupercondActor.IPlatformLogger {
    logVerbose(args: any): void {
        console.log(args);
    }

    logInfo(args: any): void {
        console.log(args);
    }

    logWarning(args: any): void {
        console.log(args);
    }

    logError(args: any): void {
        console.log(args);
    }
}

class SupercondActorPlatformConfigMock implements SupercondActor.IPlatformConfig {
    getSecretsFromVaultAsync(vaultUrl: string, keys: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve('secretValue');
        });
    }
    getApiAuthConfigurationAsync(): Promise<SupercondActor.IApiAuthConfiguration> {
        return new Promise((resolve, reject) => {
            resolve({
                clientID: 'clientID-12345',
                tenantID: 'tenantID-12345'
            });
        });
    }
}

class SupercondActorContextMock implements SupercondActor.IPlatformContext {
    private state: Record<string, string> = {};

    saveLocalStateAsync(key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let json = (value == null) ? null : JSON.stringify(value);
                let resObj = (json == null) ? null : JSON.parse(json);
                this.state[key] = json;
                resolve(resObj);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getLocalStateAsync(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let json = this.state[key];
                let resObj = (json == null) ? null : JSON.parse(json);
                resolve(resObj);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getLocalStateKeysAsync(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(Object.keys(this.state));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getServiceDescriptorAsync(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(new SupercondActorServiceInfoMock());
        });
    }
    getApiServicesAsync(appUrl?: string): Promise<SupercondActor.IApiServiceState[]> {
        return new Promise((resolve, reject) => {
            resolve([new SupercondActorApiServiceStateMock()]);
        });
    }
    getLongRunningServicesAsync(appUrl?: string): Promise<SupercondActor.ILongRunningServiceState[]> {
        return new Promise((resolve, reject) => {
            resolve([new SupercondActorLongRunningServiceStateMock()]);
        });
    }
    getScheduledServicesAsync(appUrl?: string): Promise<SupercondActor.IScheduledServiceState[]> {
        return new Promise((resolve, reject) => {
            resolve([new SupercondActorScheduledServiceStateMock()]);
        });
    }
    createOrUpdateApiServiceAsync(serviceConfig: SupercondActor.IApiServiceConfig, appUrl?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(serviceConfig.serviceID);
        });
    }
    createOrUpdateLongRunningServiceAsync(serviceConfig: SupercondActor.ILongRunningServiceConfig, appUrl?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(serviceConfig.serviceID);
        });
    }
    createOrUpdateScheduledServiceAsync(serviceConfig: SupercondActor.IScheduledServiceConfig, appUrl?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(serviceConfig.serviceID);
        });
    }
    deleteServiceAsync(serviceID: string, appUrl?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(serviceID);
        });
    }
    callScheduledServiceAsync(serviceID: string, paramJson: string, appUrl?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve('{}');
        });
    }
    getApplicationsAsync(): Promise<SupercondActor.IApplicationInfo[]> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
    createApplicationAsync(appUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(appUrl);
        });
    }
    deleteApplicationAsync(appUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(appUrl);
        });
    }
}

class SupercondActorServiceInfoMock implements SupercondActor.IScheduledServiceInfo,
    SupercondActor.ILongRunningServiceInfo, SupercondActor.IApiServiceInfo {

    currentAppVersion = '1';
    descriptor = Object.assign(new SupercondActorScheduledServiceConfigMock(), Object.assign(new SupercondActorLongRunningServiceConfigMock(), new SupercondActorApiServiceConfigMock()))
}

class SupercondActorScheduledServiceConfigMock implements SupercondActor.IScheduledServiceConfig {
    serviceID = 'mockServiceID';
    serviceName = 'mockServiceName';
    groupName = 'mockGroupName';
    metadataJson = '{}';
    removalRequested = false;
    job = {
        jobScript: '',
        stopRequested: false,
        jobSchedule: {
            intervalSeconds: 15
        }
    }
}
class SupercondActorApiServiceConfigMock implements SupercondActor.IApiServiceConfig {
    serviceID = 'mockServiceUri';
    serviceName = 'mockServiceName';
    groupName = 'mockGroupName';
    instanceCount = 1;
    serviceScript = '';
    metadataJson = '{}';
    removalRequested = false;
    apiAuthenticationType = 0;
    apiAuthenticationConfig = {
        "authority": "",
        "validIssuers": [],
        "validAudiences": [],
        "disableIssuerValidation": false,
        "disableAudienceValidation": false,
        "disableLifetimeValidation": false
    };
    configureProxy = true;
    serveFiles = false;
    filesConfig = null;
    proxyConfiguration = [
        {
            "key": "traefik.frontend.rule",
            "value": "PathPrefixStrip: /api/v1"
        }
    ]
}
class SupercondActorLongRunningServiceConfigMock implements SupercondActor.ILongRunningServiceConfig {
    serviceID = 'mockServiceUri';
    serviceName = 'mockServiceName';
    groupName = 'mockGroupName';
    instanceCount = 1;
    serviceScript = '';
    metadataJson = '{}'
}

class SupercondActorApiServiceStateMock implements SupercondActor.IApiServiceState {
    private srvConfig = new SupercondActorApiServiceConfigMock();
    platformState: SupercondActor.IStatelessServicePlatformState = {
        serviceUri: this.srvConfig.serviceID,
        serviceTypeName: 'mockServiceTypeName',
        serviceManifestVersion: '1.0.0',
        healthState: 0,
        serviceStatus: 0
    };
    serviceInfo: SupercondActor.IApiServiceStateInfo = {
        serviceConfig: this.srvConfig,
        reportedStatus: null
    };
}
class SupercondActorLongRunningServiceStateMock implements SupercondActor.ILongRunningServiceState {
    private srvConfig = new SupercondActorLongRunningServiceConfigMock();
    platformState: SupercondActor.IStatelessServicePlatformState = {
        serviceUri: this.srvConfig.serviceID,
        serviceTypeName: 'mockServiceTypeName',
        serviceManifestVersion: '1.0.0',
        healthState: 0,
        serviceStatus: 0
    };
    serviceInfo: SupercondActor.ILongRunningServiceStateInfo = {
        serviceConfig: this.srvConfig,
        reportedStatus: null
    };
}
class SupercondActorScheduledServiceStateMock implements SupercondActor.IScheduledServiceState {
    serviceConfig = new SupercondActorScheduledServiceConfigMock();
    reportedStatus = null;
}