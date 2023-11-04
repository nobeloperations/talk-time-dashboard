export declare class MessageService {
    private eventEmitter;
    sendMessage(message: any): void;
    onMessage(callback: (message: string) => void): void;
    offMessage(callback: (message: string) => void): void;
}
