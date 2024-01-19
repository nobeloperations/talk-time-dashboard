import { Badges } from "types/types";
export declare let helpers: {
    badgeToImage(badge: string): string;
    formatBadgeName(badge: string): string;
    average(rate: number[]): string | number;
    formatDate(date: string): string;
    moreThan(str: string, n: number): boolean;
    badgesExist(badges: Badges): boolean;
    lessThan(a: number, b: number): boolean;
    getKeysFromBadgesConfig(badges: any, index: any): string;
    getValuesFromBadgesConfig(badges: any, index: number): unknown;
    getNextBadgeLevel(level: string): string;
};
