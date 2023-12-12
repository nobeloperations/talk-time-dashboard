export function filterBadges(badges, maxBadgesCount: number) {
    return badges.filter(badge => +Object.values(badge)[0] < maxBadgesCount).map(badge => Object.keys(badge)[0])
}