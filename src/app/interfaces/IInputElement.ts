import { FormControl } from "@angular/forms";

export interface IInputElement {
    label?: string;
    placeholder: string;
    type: string;
    errors: IInputError[];
}

export interface IInputError {
    key: string;
    label: string;
}
    
export interface IFormElement {
    control: FormControl,
    complement: IInputElement
}