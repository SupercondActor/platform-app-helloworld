require('../dist/Scripts/bundle');

describe("MyService", () => {
    it("should be able to get text", () => {
        let text = MyEntryPoint();
        expect(text).toBe('Hello world!');
    });
});