import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const NewTransactionModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionInputs = z.infer<typeof NewTransactionModalSchema>;

export default function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(NewTransactionModalSchema),
    defaultValues: {
      type: "income",
    },
  });

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  async function handleCreateNewTransaction(data: NewTransactionInputs) {
    createTransaction({
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type,
    });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
