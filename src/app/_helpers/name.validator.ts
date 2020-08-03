import { AbstractControl } from "@angular/forms";

export function nameValidator (control: AbstractControl):{[key: string]: boolean} | null {
    let nameArray = control.value.split(' ');
    if( control.value !==null && nameArray.length < 2){
      return {'nameValidator': true}
    } 
    return null;
  };