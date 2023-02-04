export class GetNewFeedbackParamDto {
    readonly url: string;
    readonly name: string;
}
export class createFeedbackBodyDto {
    readonly sender: string;
    readonly rating: string;
    readonly feedback: string;
    readonly badge: string;
    readonly tech: string;
    readonly level: string;
}