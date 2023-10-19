import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assests/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import NewTransactionModal from "../NewTransactionModal";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.DialogTrigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
