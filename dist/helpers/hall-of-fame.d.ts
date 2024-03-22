interface User {
    name: string;
    badges: {
        [badge: string]: {
            count: number;
        };
    };
}
interface TopUsersByBadge {
    [badge: string]: {
        name: string;
        count: number;
    }[];
}
export declare const calculateUsersWithMostBadges: (users: User[]) => TopUsersByBadge;
export {};
