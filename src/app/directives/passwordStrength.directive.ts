import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {createPasswordStrengthValidator} from '../validators/password-strength.validator';

// this directive is used only for template driven form(.html file)
// in reactive form use directly return method of validate
@Directive({
  selector: "[passwordStrength]",
  providers: [{
      provide: NG_VALIDATORS,
      useExisting:PasswordStrengthDirective,
      multi: true
  }]
})
export class PasswordStrengthDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }

}
