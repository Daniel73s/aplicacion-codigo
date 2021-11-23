import { AbstractControl} from "@angular/forms";
export class MisValidaciones{
   static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('clave').value; // get password from our password form control
    const confirmPassword: string = control.get('repclave').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('repclave').setErrors({ NoPassswordMatch: true });
    }
  }
}
