// import { User } from "../users/user.model";

declare namespace express {
    export interface Request {
       user?: any
    }
 }