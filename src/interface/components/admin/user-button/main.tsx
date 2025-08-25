import { useState } from "react";
import * as S from "./styles";
import { limitSizeString } from "@/lib/utils/utils";
import { editSettings } from "@/lib/actions/settings.actions";
import { usePopup } from "@/contexts/PopupContext";
import { useActiveStore } from "@/contexts/ActiveStoreContext";

const UserButton: React.FC<{userEmail: string}> = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { openPopup } = usePopup();
  const { activeStatus, checkStoreStatus } = useActiveStore();


  const inactivateStore = async (value: string) => {
    setIsOpen(false);
  
    const response = await editSettings("site_disabled", value);
    if(!response){
      openPopup('Não foi possível fechar o site', 'error');
    }else{
      checkStoreStatus();
    }
  };

  return (
    <S.DropdownContainer>
      <S.DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <S.IconTrigger>
          {userEmail[0].toUpperCase()}
        </S.IconTrigger>
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList>
          <div>
            {limitSizeString(userEmail, 25)}
          </div>
          {
            activeStatus ? 
              <S.DropdownItem onClick={() => inactivateStore("false")}>
                Abrir Loja
              </S.DropdownItem>
            :
              <S.DropdownItem onClick={() => inactivateStore("true")} $isred>
                Fechar Loja
              </S.DropdownItem>
          }
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default UserButton;
