"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsersAvatar(params) {
        return this.usersService.getUsersAvatar(params);
    }
    newUser(params, newUserBody, headers) {
        return this.usersService.newUser(params, newUserBody, headers);
    }
    getUsers(params, res, generalName, req) {
        return this.usersService.getUsers(params, res, generalName, req);
    }
    getUsersInRange(page, limit, res) {
        return this.usersService.getUsersInRange(page, limit, res);
    }
    getMeetingUsersStats(generalName, res, req) {
        return this.usersService.getMeetingUsersStats(generalName, res, req);
    }
    getUserFriendRequests(name, res) {
        return this.usersService.getUserFriendRequests(name, res);
    }
    newFriendRequest(params) {
        return this.usersService.newFriendRequest(params);
    }
    getFriendRequests(params) {
        return this.usersService.getFriendRequests(params);
    }
    getAllFriends(params) {
        return this.usersService.getAllFriends(params);
    }
    addFriend(params) {
        return this.usersService.addFriend(params);
    }
    deleteFriend(params) {
        return this.usersService.deleteFriend(params);
    }
};
__decorate([
    (0, common_1.Get)('/users/:name'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersAvatar", null);
__decorate([
    (0, common_1.Post)('/users/create/:url/:date'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "newUser", null);
__decorate([
    (0, common_1.Get)('/users/:url/:date'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Render)('users'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('q')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/load/range'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersInRange", null);
__decorate([
    (0, common_1.Get)('/users/meetingstats/:url/:date'),
    (0, common_1.Render)('meeting-stats'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMeetingUsersStats", null);
__decorate([
    (0, common_1.Get)('/friend-requests/:name'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserFriendRequests", null);
__decorate([
    (0, common_1.Post)('/friends/new-friend/:name/:sender'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "newFriendRequest", null);
__decorate([
    (0, common_1.Get)('/friends/friend-requests/:name'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getFriendRequests", null);
__decorate([
    (0, common_1.Get)('/friends/all-friends/:name'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Post)('/friends/add-friend/:sender/:receiver'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Delete)('/friends/delete/:receiver/:sender'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteFriend", null);
UsersController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map