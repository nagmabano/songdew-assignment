import { AbstractControl } from "@angular/forms";

export function ageValidator (control: AbstractControl):{[key: string]: boolean} | null {
    if( control.value !==null && (isNaN(control.value) || control.value <18  || control.value> 120)){
      return {'ageValidator': true}
    }
    return null;
  };