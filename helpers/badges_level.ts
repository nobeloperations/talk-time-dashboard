export const checkBadgesLevels = (badgesLevels: number[]) => {
    let levels: number[] = [];
    badgesLevels.forEach((badgesLevel: number) => {
        const currentLevel: number = badgesLevel < 3 ? 3 : badgesLevel < 5 ? 5 : badgesLevel < 10 ? 10 : 20;
        levels.push(currentLevel)
    })

    return Array.from(new Set(levels)).length === 1
}