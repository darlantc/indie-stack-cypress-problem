import classNames from "classnames";
import type { FormProps } from "remix-forms";
import { Form as RemixForm } from "remix-forms";
import type { SomeZodObject } from "zod";
import FormCheckbox from "./FormCheckbox";
import FormErrors from "./FormErrors";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormInputError from "./FormInputError";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";

type OmittedRemixFormProps<T extends SomeZodObject> = Omit<
  FormProps<T>,
  | "errorComponent"
  | "fieldComponent"
  | "globalErrorsComponent"
  | "inputComponent"
  | "labelComponent"
  | "selectComponent"
>;

interface CustomFormProps<T extends SomeZodObject>
  extends OmittedRemixFormProps<T> {
  className?: string;
}

const CustomForm = <T extends SomeZodObject>({
  className,
  ...rest
}: CustomFormProps<T>) => {
  return (
    <RemixForm
      checkboxComponent={FormCheckbox}
      className={classNames("space-y-3", className)}
      errorComponent={FormInputError}
      fieldComponent={FormField}
      globalErrorsComponent={FormErrors}
      inputComponent={FormInput}
      labelComponent={FormLabel}
      selectComponent={FormSelect}
      {...rest}
    />
  );
};

export default CustomForm;
