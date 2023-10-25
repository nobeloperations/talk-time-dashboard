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
        if (!rate.length) return 0;
        let sum: number = rate.reduce((a, b) => +a + +b, 0);
        return (sum / rate.length).toFixed(1);
    },
    mult(e: number, coef: number): number {
        return e * coef
    },
    formatDate(date: string): string {
        const parts: string[] = date.split('/')
        const day: string = parts[0]
        const month: string = parts[1]
        const year: string = parts[2]
        return `${month}/${day}/${year}`
    },
    badgesLevel(e: number): string {
        return e === 1 ? 'Knowlege level' : e === 2 ? 'Apprentice level' : e === 3 ? 'Mastery level' : 'Leadership level'
    },
    moreThan(str: string, n: number): boolean {
        return str.length > n
    },
    badgesExist(badges: Badges): boolean {
        if (badges) {
            let badgesExist: boolean = false;
            let values: BadgeValues[] = Object.values(badges)
            values = values.filter(value => !!value['count'])
            if (values.length) badgesExist = true

            return badgesExist
        }
    }
}
