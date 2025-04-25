import React, { ChangeEvent } from "react";
import * as S from "./styles";
import Image from "next/image";
import imagesIcon from "../../../../../public/svg/images.svg"

interface MultiImageInputProps {
  handleChange: (files: File[]) => void;
  value?: File[],
  id: string,
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({ 
  handleChange, 
  id,
  value,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filtered = files.filter((file) =>
      ["image/png", "image/jpeg"].includes(file.type)
    );
    handleChange(filtered);
  };

  return (
    <S.InputContainer>
      <Image src={imagesIcon} alt="Ícone de imagens" width={20} height={20} />
      <S.InputImage
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleFileChange}
        id={id}
      />
      {
        value && value.length > 0 ?
          <p>
            {
              value.map((image, index) => (
                <span key={index}>{image.name};</span>
              ))
            }
          </p>
        :
          <p>Imagens</p>
      }
      
    </S.InputContainer>
    
  );
};

export default MultiImageInput;
