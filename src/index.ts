// Entry point Types should be listed here.
// This is how you connect your TypeScript code to your service's job script.
// You can use any kind of coding style here, but
// you should be able to call your entry point from your service's job script at runtime.

// It's OK to delare global types or immutable variables here, 
// BUT DON'T CREATE GLOBAL INSTANCES OR VARIABLES THAT CAN CHANGE -
// IT WILL LEAD TO MULTITHREADING PROBLEMS!!!

export class MyEntryPointsDefinition {
    getMessage() {
        return 'Hello world!';
    };
}

(global as any).MyEntryPoints = new MyEntryPointsDefinition();
