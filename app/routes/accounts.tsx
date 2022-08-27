import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import AlertMessage from "~/components/alert/AlertMessage";
import LinkButton from "~/components/button/LinkButton";
import ListAccounts from "~/feature/account/ListAccounts";
import { useOptionalAccount } from "~/hooks/useOptionalAccount";
import type { Account, AccountId } from "~/models/Account";
import AccountServer from "~/server/account.server";
import { requireUserId } from "~/server/session.server";
import APP_ROUTES from "~/utils/appRoutes";

type LoaderData = {
  accounts: Account[];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const accountId = formData.get("accountId");

  if (typeof accountId === "string") {
    return AccountServer.setAccountSession({ accountId, request });
  }

  return json({});
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const accounts = await AccountServer.getAll(userId);
  return { accounts };
}

export default function AccountPage() {
  const { accounts } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const selectedAccount = useOptionalAccount();

  const activeAccounts = accounts.filter(({ isActive }) => isActive);
  const inactiveAccounts = accounts.filter(({ isActive }) => !isActive);

  return (
    <>
      {renderMessage()}
      <div className="flex justify-between	">
        <h1>Your Accounts</h1>

        <LinkButton to={APP_ROUTES.addAccount} variant="primary" isOutlined>
          Add new account
        </LinkButton>
      </div>
      <Outlet />

      <ListAccounts
        activeAccounts={activeAccounts}
        inactiveAccounts={inactiveAccounts}
        onSelect={onSelect}
        selectedAccountId={selectedAccount?.id}
      />
    </>
  );

  function onSelect(id: AccountId) {
    fetcher.submit({ accountId: id }, { method: "post" });
  }

  function renderMessage() {
    if (!accounts.length) {
      return null;
    }

    if (!selectedAccount) {
      return (
        <AlertMessage className="mb-8" type="warning">
          Select an account to continue
        </AlertMessage>
      );
    }
  }
}
