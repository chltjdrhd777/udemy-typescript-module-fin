//validation
export interface Validatable {
  value: string | number; // there should be
  required?: boolean; // ?~~ : optional
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  let isValid = true; // default boolean = true
  if (validatableInput.required) {
    // in case that there is "required" property in the object.
    isValid = isValid && validatableInput.value.toString().trim().length !== 0; // new isValid's answer is up to the following condition. if validatableInput.value(is string) is not empty, it is true.
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    // in case that there is "minLength" property in the object + typeguard : validatableInput.value should be string. != null means not null and not undefined to avoid the situation that the minlength is 0
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength; // If validatableInput.value's length is greater than minLength, it returns true
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid; // about four "if"s which are possible scenarios, retunr true or false.
}
