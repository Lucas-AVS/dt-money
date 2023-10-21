import { useContext } from "react";
import Summary from "../../components/Summary";
import Header from "../../components/header";
import SearchForm from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export default function Transaction() {
  const { transactions } = useContext(TransactionsContext);

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
                        R$ {transaction.price}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
