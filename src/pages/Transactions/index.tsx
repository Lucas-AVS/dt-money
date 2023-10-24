import Summary from "../../components/Summary";
import Header from "../../components/header";
import SearchForm from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export default function Transaction() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions
              ? transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>

                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === "outcome" && "- "}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
