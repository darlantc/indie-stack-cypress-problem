import type { ReactNode } from "react";
import type { IUseButtonBase } from "./useButtonBase";
import useButtonBase from "./useButtonBase";

interface IButtonProps extends IUseButtonBase {
  children: ReactNode;
  isDisabled?: boolean;
  formId?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  children,
  isDisabled,
  formId,
  type = "button",
  onClick,
  ...buttonBaseProps
}: IButtonProps) => {
  const { className } = useButtonBase(buttonBaseProps);

  return (
    <button
      className={className}
      disabled={isDisabled}
      form={formId}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
