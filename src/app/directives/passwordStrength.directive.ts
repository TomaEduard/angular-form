import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective}
  ]
})
export class PasswordStrengthDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}
