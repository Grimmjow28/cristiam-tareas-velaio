import { IHabilities } from "./Ihabilities";

export interface IUser {
    id: number;
    name: string;
    age?: number; //it is mandatory on the form, but has to be checked as optional because we are fetching data of a webapi that does not have this value
    habilities?: IHabilities[]; // the same case of age
}