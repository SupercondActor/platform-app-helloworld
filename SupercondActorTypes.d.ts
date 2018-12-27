declare var _SupercondActor: SupercondActor.ISupercondActor;

// for API only
declare var _SupercondActor_Request: SupercondActor.IApiRequest;
declare var _SupercondActor_Response: SupercondActor.IApiResponse;

declare namespace SupercondActor {

    interface ISupercondActor {
        Logger: SupercondActor.IPlatformLogger;
        Context: SupercondActor.IPlatformContext;
        Config: SupercondActor.IPlatformConfig;
    }

    interface IApiRequest {
        method: string;
        headers: IKeyValuePair[];
        cookies: IKeyValuePair[];
        url: string;
        query: IKeyValuePair[];
        bodyJson: string;
    }

    interface IKeyValuePair {
        Key: string;
        Value: string;
    }

    interface IApiResponse {
        body: any;
        contentType: string;
        statusCode: number;
        setHeader(key: string, value: string | string[]): void;
        setCookie(key: string, value: string, options: IApiCookieOptions): void;
    }

    interface IApiCookieOptions {
        domain: string;
        expires: Date;
        httpOnly: boolean;
        maxAge: number;
        path: string;
        secure: boolean;
        signed: boolean;
        sameSite: string;
    }

    interface IPlatformLogger {
        logVerbose(args: any): void;
        logInfo(args: any): void;
        logWarning(args: any): void;
        logError(args: any): void;
    }

    interface IPlatformContext {
        saveLocalStateAsync(key: string, value: any): Promise<any>;

        /**
        * @param {string} key - dictionary key for the state value
        * @returns {Promise<any>} - local state value for the provided key
        */
        getLocalStateAsync(key: string): Promise<any>;
        getLocalStateKeysAsync(): Promise<string[]>;
        getServiceDescriptorAsync(): Promise<IScheduledServiceInfo | ILongRunningServiceInfo>;
        getApiServicesAsync(appUrl?: string): Promise<IApiServiceState[]>;
        getLongRunningServicesAsync(appUrl?: string): Promise<ILongRunningServiceState[]>;
        getScheduledServicesAsync(appUrl?: string): Promise<IScheduledServiceState[]>;
        createOrUpdateApiServiceAsync(serviceConfig: IApiServiceConfig, appUrl?: string): Promise<string>;
        createOrUpdateLongRunningServiceAsync(serviceConfig: ILongRunningServiceConfig, appUrl?: string): Promise<string>;
        createOrUpdateScheduledServiceAsync(serviceConfig: IScheduledServiceConfig, appUrl?: string): Promise<string>;
        deleteServiceAsync(serviceID: string, appUrl?: string): Promise<string>;
        callScheduledServiceAsync(serviceID: string, paramJson: string, appUrl?: string): Promise<any>;
        createApplicationAsync(appUrl: string): Promise<string>;
        deleteApplicationAsync(appUrl: string): Promise<string>;
    }

    interface IPlatformConfig {
        getSecretsFromVaultAsync(vaultUrl: string, keys: string[]): Promise<any>;
    }

    interface IScheduledServiceInfo {
        currentAppVersion: string;
        descriptor: IScheduledServiceConfig;
    }

    interface IApiServiceInfo {
        currentAppVersion: string;
        descriptor: IApiServiceConfig;
    }

    interface ILongRunningServiceInfo {
        currentAppVersion: string;
        descriptor: ILongRunningServiceConfig;
    }

    interface IScheduledServiceConfig {
        serviceID: string;
        serviceName: string;
        groupName: string;
        metadataJson: string;
        job: IScheduledJobConfig;
        removalRequested: boolean;
    }

    interface IScheduledJobConfig {
        jobScript: string;
        jobSchedule: IServiceJobSchedule;
        stopRequested: boolean;
    }

    interface IServiceJobSchedule {
        cronString?: string;
        intervalSeconds?: number;
        timeoutSeconds?: number;
    }

    interface IApiServiceConfig {
        serviceUri: string;
        serviceName: string;
        groupName: string;
        instanceCount: number;
        metadataJson: string;
        serviceScript: string;
        enableADAuthentication: boolean;
        configureProxy: boolean;
        proxyConfiguration: IKeyValuePair[];
        serveFiles: boolean;
        filesConfig: IApiServiceFiles;
    }

    interface IApiServiceFiles {
        defaultFile: string;
        apiUrlPrefix: string;
    }

    interface ILongRunningServiceConfig {
        serviceUri: string;
        serviceName: string;
        groupName: string;
        instanceCount: number;
        metadataJson: string;
        serviceScript: string;
    }

    interface IApiServiceState {
        platformState: IStatelessServicePlatformState;
        serviceInfo: IApiServiceStateInfo;
    }

    interface IScheduledServiceState {
        serviceConfig: IScheduledServiceConfig;
        reportedStatus: IServiceOperationalStatus;
    }

    interface ILongRunningServiceState {
        platformState: IStatelessServicePlatformState;
        serviceInfo: ILongRunningServiceStateInfo;
    }

    interface IStatelessServicePlatformState {
        serviceUri: string;
        serviceTypeName: string;
        serviceManifestVersion: string;
        healthState: number;
        serviceStatus: number;
    }

    interface IApiServiceStateInfo {
        serviceConfig: IApiServiceConfig;
        reportedStatus: IServiceOperationalStatus;
    }

    interface ILongRunningServiceStateInfo {
        serviceConfig: ILongRunningServiceConfig;
        reportedStatus: IServiceOperationalStatus;
    }

    interface IServiceOperationalStatus {
        status: number;
        lastResult: number;
        lastExecutionError: string;
        operationTime: Date;
        message: string;
    }
}