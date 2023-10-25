import { Badges } from "types/types";
export declare let helpers: {
    badgeToImage(badge: string): string;
    formatBadgeName(badge: string): string;
    average(rate: number[]): string | number;
    mult(e: number, coef: number): number;
    formatDate(date: string): string;
    badgesLevel(e: number): string;
    moreThan(str: string, n: number): boolean;
    badgesExist(badges: Badges): boolean;
};
