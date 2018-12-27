function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let text = MyEntryPoints.getMessage();
while (true) {
    console.log('Message from Long-running service', text);
    await sleep(5000);
}