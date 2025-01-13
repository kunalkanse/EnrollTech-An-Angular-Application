import { AbstractControl } from "@angular/forms";

export function emailValidatorReactiveForm(control: AbstractControl) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = control.value;
  
  if (!value) {
    return { emailRequired: true };
  }

  const isValid = emailRegex.test(value);
  return isValid ? null : { emailInvalid: true }
}