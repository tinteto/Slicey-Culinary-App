import { ValidatorFn } from "@angular/forms";

export function matchingPassValidator(passwordControlName: string, repasswordControlName: string): ValidatorFn {
    return(control) => {
        const passwordControl = control.get(passwordControlName);
        const repasswordControl = control.get(repasswordControlName);

        const areMatching = passwordControl?.value == repasswordControl?.value;

        return areMatching ? null : { matchingPassValidator : true };
    };
}