import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export default function Summary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === "income") {
        accumulator.income += transaction.price;
        accumulator.total += transaction.price;
      }
      if (transaction.type === "outcome") {
        accumulator.outcome += transaction.price;
        accumulator.total -= transaction.price;
      }
      return accumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
