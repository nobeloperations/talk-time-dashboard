import { Request } from "express";
import { UserPayload } from "types/types";
export declare const getUserFromCookies: (req: Request) => UserPayload | any;
