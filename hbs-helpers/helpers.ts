import { BadgeValues, Badges } from "types/types";

export let helpers = {
    badgeToImage(badge: string): string {
        badge = badge.split(/(?=[A-Z])/).join('_').toLowerCase()
        return `${badge}.png`
    },
    formatBadgeName(badge: string): string {
        return badge.split(/(?=[A-Z])/).join(' ')
    },
    average(rate: number[]): string | number {
        if (!rate.length || rate.length === 1) return 0;
        let sum: number = rate.reduce((a, b) => +a + +b, 0);
        return (sum / (rate.length - 1)).toFixed(1);
    },
    formatDate(date: string): string {
        const parts: string[] = date.split('/')
        const day: string = parts[0]
        const month: string = parts[1]
        const year: string = parts[2]
        return `${month}/${day}/${year}`
    },
    moreThan(str: string, n: number): boolean {
        return str.length > n
    },
    badgesExist(badges: Badges): boolean {
        if (badges) {
            let badgesExist: boolean = false;
            let values: BadgeValues[] = Object.values(badges).filter(value => !!value['count'])
            if (values.length) badgesExist = true

            return badgesExist
        }
    },
    lessThan(a: number, b: number): boolean {
        return a < b
    },
    getKeysFromBadgesConfig(badges, index) {
        const keys = Object.keys(badges);
        return keys[index]
    },
    getValuesFromBadgesConfig(badges, index: number) {
        const values = Object.values(badges);
        return values[index]
    },
    getNextBadgeLevel(level: string) {
        return {
            'Knowlege': 'Apprentice',
            'Apprentice': 'Mastery',
            // 'Mastery': 'Leadership'
        }[level]
    }
}
