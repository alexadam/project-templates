
export default class Hello {

    private static instance: Hello

    private constructor() {
    }

    public static getInstance(): Hello {
        if (!Hello.instance) {
            Hello.instance = new Hello();
        }

        return Hello.instance;
    }

    public sayHello(): string {
        return "Hello World!"
    }

}