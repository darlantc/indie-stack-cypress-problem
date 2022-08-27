import classNames from "classnames";
import { forwardRef } from "react";

const FormInput = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(
  ({ className, type = "text", ...props }, ref) => {
    const hasError = !!props["aria-invalid"];

    return (
      <input
        className={classNames(
          "input input-bordered input-md w-full",
          className,
          {
            "input-error": hasError,
          }
        )}
        data-testid="FormInput"
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
