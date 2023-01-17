import { useTransactions } from "../../assets/hooks/useTransactions";
import incomeIgm from "../../assets/income.svg";
import outcomeIgm from "../../assets/outcome.svg";
import totalIgm from "../../assets/total.svg";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += Number(transaction.amount);
        acc.total += Number(transaction.amount);
      } else {
        acc.withdraws += Number(transaction.amount);
        acc.total -= Number(transaction.amount);
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>

        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIgm} alt="Entradas" />
        </header>

        <strong>
          -
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highligth-background">
        <header>
          <p>Total</p>
          <img src={totalIgm} alt="Total" />
        </header>

        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
