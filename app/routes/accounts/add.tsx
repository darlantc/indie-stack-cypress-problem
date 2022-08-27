import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { makeDomainFunction } from "remix-domains";
import { performMutation } from "remix-forms";
import AccountFormModal, {
  addSchema as schema,
} from "~/feature/account/AccountFormModal";
import type { CurrencyCode } from "~/models/CurrencyCode";
import AccountServer from "~/server/account.server";

const mutation = makeDomainFunction(schema)(
  async ({ currencyCode, id, ...values }) =>
    await AccountServer.create({
      currencyCode: currencyCode as CurrencyCode,
      ...values,
    })
);

export async function action({ request }: ActionArgs) {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (!result.success) {
    return json(result, 400);
  }

  return AccountServer.setAccountSession({
    accountId: result.data.id,
    request,
  });
}

export default function AddAccountPage() {
  return <AccountFormModal />;
}
