import classNames from "classnames";
import Button from "~/components/button/Button";
import LinkButton from "~/components/button/LinkButton";
import Card from "~/components/card/Card";
import ListAsGridContainer from "~/components/ListAsGrid/ListAsGridContainer";
import type { Account, AccountId } from "~/models/Account";
import { getCurrencyName } from "~/models/CurrencyCode";
import APP_ROUTES from "~/utils/appRoutes";
import { plural } from "~/utils/stringUtils";

interface IListAccountsProps {
  activeAccounts: Account[];
  inactiveAccounts: Account[];
  onSelect: (id: AccountId) => void;
  selectedAccountId?: AccountId;
}

const ListAccounts = ({
  activeAccounts,
  inactiveAccounts,
  onSelect,
  selectedAccountId,
}: IListAccountsProps) => {
  return (
    <ListAsGridContainer<Account>
      activeList={activeAccounts}
      inactiveList={inactiveAccounts}
      inactiveTitle={plural({
        countFrom: inactiveAccounts,
        one: "Inactive account",
        other: "Inactive accounts",
      })}
      registerFirstItem={{
        buttonLabel: "Add first account",
        title: "Add your first account to use the app",
        to: APP_ROUTES.addAccount,
      }}
      renderItem={renderAccount}
    />
  );

  function renderAccount({ currencyCode, id, isActive, name }: Account) {
    const isDisabled = !isActive;
    const isSelected = !isDisabled && id === selectedAccountId;

    return (
      <Card
        className={classNames({
          "line-through": isDisabled,
          "bg-primary-content text-primary-focus": isSelected,
        })}
        buttons={
          <>
            <LinkButton to={APP_ROUTES.editAccount(id)} variant="primary">
              Edit
            </LinkButton>
            {!isSelected && !isDisabled && (
              <Button onClick={onSelectAccount(id)} isFullWidth>
                Select {name}
              </Button>
            )}
          </>
        }
        key={id}
        title={isSelected ? `${name} (selected)` : name}
      >
        <small>
          {getCurrencyName(currencyCode)} ({currencyCode})
        </small>
      </Card>
    );
  }

  function onSelectAccount(id: AccountId) {
    return () => {
      onSelect(id);
    };
  }
};

export default ListAccounts;
