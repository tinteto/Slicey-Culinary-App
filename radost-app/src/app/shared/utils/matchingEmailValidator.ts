//!not to be used for the moment

// import { ValidatorFn } from "@angular/forms";

// export function matchingEmailValidator(domain: string[]) : ValidatorFn { //връща контролка, която връща резултат
//domains взима от constants EMAIL_DOMAINS
//const domainString = domains.join('|'); //Disjunction: Matches either "x" or "y".Ex.: /green|red/ matches "green" in "green apple" and "red" in "red apple".
//const regExp = new RegExp(`[A-Za-z0-9]+@gmail\.(${domainString})`);


//     return(control) => {
//         const isEmailInvalid = control.value === '' || regExp.test(control.value);
       
//        return isEmailInvalid ? null : { matchingEmailValidator : true};
//     };
   
// }