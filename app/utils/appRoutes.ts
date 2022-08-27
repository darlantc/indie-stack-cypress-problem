const ACCOUNTS = `/accounts`;

const APP_ROUTES = {
  accounts: ACCOUNTS,
  addAccount: `${ACCOUNTS}/add`,
  editAccount: (accountId: string) => `${ACCOUNTS}/${accountId}`,
  home: "/",
  join: "/join",
  login: "/login",
};

export default APP_ROUTES;
