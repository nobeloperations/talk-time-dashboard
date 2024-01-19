export const calculateUserWithMostBadges = users => {
    const badgeNames = ['Fun', 'Encourage', 'BeeBrief', 'ZenEnviroment', 'OnTime', 'Help', 'BePresent'];
    let result = [];

    badgeNames.forEach(badgeName => {
        let maxCount = 0;
        let maxUser = {};
        users.forEach(user => {
            const count = user.badges[badgeName].count;
            if (count > maxCount) {
                maxUser = { name: user.name, count, badge: badgeName }
                maxCount = count
            }
        })
        result.push(maxUser)
    })

    return result;
}