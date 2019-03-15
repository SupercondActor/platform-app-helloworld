declare namespace SupercondActor {

    interface ISupercondActor {
        Logger: SupercondActor.IPlatformLogger;
        Service: SupercondActor.IPlatformContext;
        Config: SupercondActor.IPlatformConfig;
    }

    interface IApiRequest {
        method: string;
        headers: IKeyValuePair[];
        cookies: IKeyValuePair[];
        url: string;
        query: IKeyValuePair[];
        bodyJson: string;
        authClaims: IAuthClaim[];
    }

    interface IAuthClaim {
        type: string;
        subject: IAuthClaimsIdentity;
        originalIssuer: string;
        issuer: string;
        valueType: string;
        value: string;
        properties: IKeyValuePair[];
    }

    interface IAuthClaimsIdentity {
        authenticationType: string;
        isAuthenticated: boolean;
        label: string;
        name: string;
        nameClaimType: string;
        roleClaimType: string;
    }

    interface IKeyValuePair {
        key: string;
        value: string;
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

        /**
         * Log verbose message to ETW stream
         * @param args - any number of paraneter objects, each will be serialized and displayed in JSON array
         */
        logVerbose(args: any): void;

        /**
         * Log info message to ETW stream
         * @param args - any number of paraneter objects, each will be serialized and displayed in JSON array
         */
        logInfo(args: any): void;

        /**
         * Log warning message to ETW stream
         * @param args - any number of paraneter objects, each will be serialized and displayed in JSON array
         */
        logWarning(args: any): void;

        /**
         * Log error message to ETW stream
         * @param args - any number of paraneter objects, each will be serialized and displayed in JSON array
         */
        logError(args: any): void;
    }

    interface IPlatformContext {

        /**
         * Save a value into the local state dictionary in the Scheduled Service.
         * The Scheduled Service state is guaranteed to survive the service restart or a VM failure.
         * @param {string} key
         * @param {any} value
         * @returns {Promise<any>} - Promise resolving to the saved state value
         */
        saveLocalStateAsync(key: string, value: any): Promise<any>;

        /**
         * Get a value from the local state dictionary in the Scheduled Service.
         * The Scheduled Service state is guaranteed to survive the service restart or a VM failure.
         * @param {string} key - dictionary key for the state value
         * @returns {Promise<any>} - Promise resolving to the local state value for the provided key
         */
        getLocalStateAsync(key: string): Promise<any>;

        /** 
         * Get all keys from the local state dictionary in the Scheduled Service.
         * @returns {Promise<string[]>} - Promise resolving to the array of state dictionary keys
         */
        getLocalStateKeysAsync(): Promise<string[]>;

        /**
         * Get ServiceInfo object for the current service. 
         * @returns {Promise<IScheduledServiceInfo> | Promise<ILongRunningServiceInfo> | Promise<IApiServiceInfo>} Return type depends on the type of current service
         */
        getServiceDescriptorAsync(): Promise<IScheduledServiceInfo> | Promise<ILongRunningServiceInfo> | Promise<IApiServiceInfo>;

        /**
         * Get an array of ServiceState objects representing all API services in a Business Platform application
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<IApiServiceState[]>} - Promise resolving to the array of ServiceState objects
         */
        getApiServicesAsync(appUrl?: string): Promise<IApiServiceState[]>;

        /**
         * Get an array of ServiceState objects representing all Long-Running services in a Business Platform application
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<ILongRunningServiceState[]>} - Promise resolving to the array of ServiceState objects
         */
        getLongRunningServicesAsync(appUrl?: string): Promise<ILongRunningServiceState[]>;

        /**
         * Get an array of ServiceState objects representing all Scheduled services in a Business Platform application
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<IScheduledServiceState[]>} - Promise resolving to the array of ServiceState objects
         */
        getScheduledServicesAsync(appUrl?: string): Promise<IScheduledServiceState[]>;

        /**
         * Create or update API Service in a Business Platform application
         * @param {IApiServiceConfig} serviceConfig - service configuration object
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<string>} - Promise resolving to the service ID
         */
        createOrUpdateApiServiceAsync(serviceConfig: IApiServiceConfig, appUrl?: string): Promise<string>;

        /**
         * Create or update Long-Running Service in a Business Platform application
         * @param {ILongRunningServiceConfig} serviceConfig - service configuration object
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<string>} - Promise resolving to the service ID
         */
        createOrUpdateLongRunningServiceAsync(serviceConfig: ILongRunningServiceConfig, appUrl?: string): Promise<string>;

        /**
         * Create or update Scheduled Service in a Business Platform application
         * @param {IScheduledServiceConfig} serviceConfig - service configuration object
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<string>} - Promise resolving to the service ID
         */
        createOrUpdateScheduledServiceAsync(serviceConfig: IScheduledServiceConfig, appUrl?: string): Promise<string>;

        /**
         * Delete service
         * @param {string} serviceID - service unique ID
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<string>} - Promise resolving to the service ID
         */
        deleteServiceAsync(serviceID: string, appUrl?: string): Promise<string>;

        /**
         * Call a Scheduled Service
         * @param {string} serviceID - service unique ID
         * @param {any} paramObj - parameter object to be sent to the service Job as _SupercondActor_Request parameter
         * @param {string} appUrl - Service Fabric URI for the application, if 'null' or 'undefined' assumes current application
         * @returns {Promise<any>} - Promise resolving to the returned result of the call
         */
        callScheduledServiceAsync(serviceID: string, paramObj: any, appUrl?: string): Promise<any>;

        /**
         * Get an array of ApplicationInfo objects representing all Business Platform applications
         * @returns {Promise<IApplicationInfo[]>} - Promise resolving to the array of ApplicationInfo objects
         */
        getApplicationsAsync(): Promise<IApplicationInfo[]>;

        /**
         * Create a new empty Business Platform application
         * @param {string} appUrl - Service Fabric URI for the application
         * @returns {Promise<string>} - Promise resolving to the Service Fabric URI for the application
         */
        createApplicationAsync(appUrl: string): Promise<string>;

        /**
         * Delete Business Platform application and all its services
         * @param {string} appUrl - Service Fabric URI for the application
         * @returns {Promise<string>} - Promise resolving to the Service Fabric URI for the application
         */
        deleteApplicationAsync(appUrl: string): Promise<string>;
    }

    interface IPlatformConfig {
        getSecretsFromVaultAsync(vaultUrl: string, keys: string[]): Promise<any>;
        getApiAuthConfigurationAsync(): Promise<IApiAuthConfiguration>;
    }

    interface IApiAuthConfiguration {
        clientID: string;
        tenantID: string;
    }

    interface IApplicationInfo {
        applicationName: string;
        applicationTypeName: string;
        applicationTypeVersion: string;
        applicationStatus: number;
        healthState: number;
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
        serviceID?: string;
        serviceName: string;
        groupName?: string;
        metadataJson?: string;
        instanceCount?: number;
        serviceScript?: string;
        jobSchedule?: IServiceJobSchedule;
        stopRequested?: boolean;
        removalRequested?: boolean;
    }

    interface IServiceJobSchedule {
        cronString?: string;
        intervalSeconds?: number;
        timeoutSeconds?: number;
    }

    interface IApiServiceConfig {
        serviceID?: string;
        serviceName: string;
        groupName?: string;
        instanceCount: number;
        metadataJson?: string;
        serviceScript?: string;
        apiAuthenticationType: number;
        apiAuthenticationConfig?: IApiAuthConfig;
        configureProxy: boolean;
        proxyConfiguration?: IKeyValuePair[];
        serveFiles: boolean;
        filesConfig?: IApiServiceFiles;
        stopRequested?: boolean;
    }

    interface IApiAuthConfig {
        authority: string;
        validIssuers: string[];
        validAudiences: string[];
        disableIssuerValidation: boolean;
        disableAudienceValidation: boolean;
        disableLifetimeValidation: boolean;
    }

    interface IApiServiceFiles {
        defaultFile: string;
        apiUrlPrefix: string;
    }

    interface ILongRunningServiceConfig {
        serviceID?: string;
        serviceName: string;
        groupName?: string;
        instanceCount: number;
        metadataJson?: string;
        serviceScript?: string;
        stopRequested?: boolean;
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