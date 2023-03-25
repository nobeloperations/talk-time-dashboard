export class NewBadgeParamDto {
    readonly name: string;
    readonly url: string;
}

export class NewBadgeBodyDto {
    readonly badge: string;
    readonly from: string;
    readonly to: string;
    readonly text: string;
    readonly url: string;
}