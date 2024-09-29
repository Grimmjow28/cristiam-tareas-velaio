import { IUser } from "./IUser";

export interface Itask {
    userId: number;
    user: IUser; //marked as not mandatory because is a field that does not exist on the webapi
    id: number;
    title: string;
    completed: boolean;
    date?: Date; // marked as not mandatory due the current BE does not give us this data and we have to mocked on FE
}
