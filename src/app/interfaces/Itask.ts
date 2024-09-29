export interface Itask {
    userId: number;
    userName?: string; //marked as not mandatory because is a field that does not exist on the webapi
    id: number;
    title: string;
    completed: boolean;
}
