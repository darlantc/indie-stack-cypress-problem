import { z } from "zod";
import CustomForm from "~/components/form/CustomForm";
import FormModal from "~/components/modal/FormModal";
import { useUser } from "~/hooks/useUser";
import type { Account } from "~/models/Account";
import { getCurrencyList, getCurrencyName } from "~/models/CurrencyCode";
import APP_ROUTES from "~/utils/appRoutes";

export const addSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(4),
  currencyCode: z.string().default("BRL"),
  userId: z.string().min(1),
});

export const editSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(4),
  currencyCode: z.string().default("BRL"),
  userId: z.string().min(1),
});

interface AccountFormModalProps {
  account?: Account;
}

const AccountFormModal = ({ account }: AccountFormModalProps) => {
  const user = useUser();

  const isEditing = !!account;

  return (
    <FormModal
      formId="account-form"
      onCloseLinkTo={APP_ROUTES.accounts}
      submitButtonLabel={isEditing ? "Update account" : "Save account"}
      title={isEditing ? "Edit account" : "New account"}
    >
      <CustomForm
        id="account-form"
        schema={isEditing ? editSchema : addSchema}
        values={{
          currencyCode: account?.currencyCode,
          id: isEditing ? account?.id : undefined,
          name: account?.name,
          userId: user.id,
        }}
        buttonComponent={() => null}
        options={{
          currencyCode: getCurrencyList().map((currencyCode) => ({
            name: getCurrencyName(currencyCode),
            value: currencyCode,
          })),
        }}
        hiddenFields={["id", "userId"]}
      />
    </FormModal>
  );
};

export default AccountFormModal;
