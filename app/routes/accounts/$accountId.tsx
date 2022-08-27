import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "remix-domains";
import { performMutation } from "remix-forms";
import AccountFormModal, {
  editSchema as schema,
} from "~/feature/account/AccountFormModal";
import type { Account } from "~/models/Account";
import type { CurrencyCode } from "~/models/CurrencyCode";
import AccountServer from "~/server/account.server";
import APP_ROUTES from "~/utils/appRoutes";

const mutation = makeDomainFunction(schema)(
  async ({ currencyCode, ...values }) =>
    await AccountServer.update({
      currencyCode: currencyCode as CurrencyCode,
      ...values,
    })
);

type LoaderData = {
  account: Account;
};

export async function action({ request }: ActionArgs) {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (!result.success) {
    return json(result, 400);
  }

  return redirect(APP_ROUTES.accounts);
}

export async function loader({ params }: LoaderArgs) {
  if (!params.accountId) {
    return redirect(APP_ROUTES.accounts);
  }

  const account = await AccountServer.getById(params.accountId);
  if (!account) {
    return redirect(APP_ROUTES.accounts);
  }

  return { account };
}

export default function EditAccountPage() {
  const { account } = useLoaderData<LoaderData>();

  return <AccountFormModal account={account} />;
}
