interface User {
    name: string;
    badges: { [badge: string]: { count: number } };
}

interface TopUsersByBadge {
    [badge: string]: { name: string; count: number }[];
}

export const calculateUsersWithMostBadges = (users: User[]): TopUsersByBadge => {
    const badgeCounts: { [badge: string]: { name: string; count: number }[] } = {};
    users.forEach((user) => {
        Object.entries(user.badges).forEach(([badge, { count }]) => {
            if (!badgeCounts[badge]) {
                badgeCounts[badge] = [];
            }
            badgeCounts[badge].push({ name: user.name, count });
        });
    });

    const topUsersByBadge: TopUsersByBadge = {};
    
    Object.entries(badgeCounts).forEach(([badge, users]) => {
        users.sort((a, b) => b.count - a.count);
        topUsersByBadge[badge] = users.slice(0, 10);
    });

    return topUsersByBadge;
}