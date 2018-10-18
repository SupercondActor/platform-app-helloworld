require('../index.ts');

describe("MyService", () => {
    it("should be able to get text", () => {
        let text = (global as any).MyEntryPoint();
        expect(text).toBe('Hello world!');
    });
});