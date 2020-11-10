import {ValidatorFn} from "@angular/forms";

export const isActualTranslation: ValidatorFn = (control) => {
  const isTheSameTrans = control.value === "Cat";
  if (isTheSameTrans) {
    return null
  } else {
    return {isCorrectTranslation: null}
  }
}
