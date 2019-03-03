let text = MyEntryPoints.getMessage();
_SupercondActor.Logger.logInfo('Message from API service', text, _SupercondActor_Request);
return ['Message from API service', text, _SupercondActor_Request];