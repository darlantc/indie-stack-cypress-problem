import classNames from "classnames";
import { forwardRef } from "react";

type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  autoFocus?: boolean;
  helperMessage?: string;
  id: string;
  options: SelectOption[];
  isDisabled?: boolean;
  isRequired?: boolean;
  errorMessage?: string | null;
  label: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      autoFocus,
      helperMessage,
      id,
      options,
      isDisabled,
      isRequired,
      errorMessage,
      label,
      ...rest
    },
    ref
  ) => {
    const hasError = !!errorMessage;
    const hasHelperMessage = !!helperMessage;

    return (
      <div className="form-control w-full">
        <label htmlFor={id} className="label">
          <span className="label-text">{label}</span>
        </label>
        <select
          id={id}
          autoFocus={autoFocus}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasHelperMessage ? `${id}-helper-message` : undefined
          }
          aria-errormessage={hasError ? `${id}-error` : undefined}
          className={classNames("input input-bordered input-md w-full", {
            "input-error": hasError,
          })}
          disabled={isDisabled}
          name={id}
          ref={ref}
          required={isRequired}
          {...rest}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {hasHelperMessage && (
          <div className="label" id={`${id}-helper-message`}>
            <span className="label-text-alt">{helperMessage}</span>
          </div>
        )}
        {hasError && (
          <div className="label" id={`${id}-error`}>
            <span className="label-text-alt text-red-700">{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
