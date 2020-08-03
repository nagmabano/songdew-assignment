import { AbstractControl } from "@angular/forms";

export function nameLengthValidator (control: AbstractControl):{[key: string]: boolean} | null {
    let nameArray = control.value.split(' ');
    let flag  = null;
    if( control.value !==null){
        nameArray.forEach((item) => {
            if (item.length < 2)
            flag = {'nameLengthValidator': true}
          });
    } 
    if (flag) {
        return flag;
    }
    return null;
  };