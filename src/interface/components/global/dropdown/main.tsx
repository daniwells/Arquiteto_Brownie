import React, { useState } from 'react';
import * as S from './styles';
import arrowDown from '../../../../../public/svg/arrow-down.svg';

interface dropdownProps {
  setSelectedOption: (ticketId: string) => void;
  selectedOption: string;
  width?: string;
  options: { value: string; label: string }[];
  colorBall: string;
}

const Dropdown: React.FC<dropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  width,
  colorBall,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer data-width={width ? width : null}>
      <S.DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <S.Ball $color={colorBall} /> {selectedOption}{' '}
        <S.Icon src={arrowDown} alt="Ícone de flecha para baixo" $rotate={isOpen}/>
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownItem key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
