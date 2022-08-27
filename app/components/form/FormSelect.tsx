import classNames from "classnames";
import { forwardRef } from "react";

const FormSelect = forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ className, ...rest }, ref) => {
  const hasError = !!rest["aria-invalid"];

  return (
    <select
      className={classNames(
        "select select-bordered",
        {
          "select-error": hasError,
        },
        className
      )}
      data-testid="FormSelect"
      ref={ref}
      {...rest}
    />
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;
