import type { ReactNode } from "react";
import Button from "~/components/button/Button";
import LinkButton from "~/components/button/LinkButton";
import Modal from "~/components/modal/Modal";
import type { LinkTo } from "~/types/LinkTo";

interface FormModalProps {
  children?: ReactNode;
  formId: string;
  onCloseLinkTo: LinkTo;
  submitButtonLabel: string;
  title?: string;
}

const FormModal = ({
  children,
  formId,
  submitButtonLabel,
  onCloseLinkTo,
  title,
}: FormModalProps) => {
  return (
    <Modal
      buttons={
        <>
          <LinkButton to={onCloseLinkTo} variant="ghost">
            Cancel
          </LinkButton>
          <Button formId={formId} type="submit">
            {submitButtonLabel}
          </Button>
        </>
      }
      isOpen={true}
      onCloseLinkTo={onCloseLinkTo}
      title={title}
    >
      {children}
    </Modal>
  );
};

export default FormModal;
