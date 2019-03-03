function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let text = MyEntryPoints.getMessage();
while (true) {
    _SupercondActor.Logger.logInfo('Message from Long-running service', text);
    await sleep(5000);
}