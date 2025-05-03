// Styles
import * as S from './styles';

// Libs
import Image from 'next/image';
import React, { ChangeEvent } from 'react';

// Images
import imagesIcon from '../../../../../public/svg/images.svg';

// Utils
import { getNameImageFromPath } from '@/lib/utils';

interface MultiImageInputProps {
  handleChange: (files: File[]) => void;
  value?: File[] | string[];
  id: string;
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({ handleChange, id, value }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filtered = files.filter((file) => ['image/png', 'image/jpeg'].includes(file.type));
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
      {value && value.length > 0  ? (
        <div>
          {value.map((image, index) => (
            <span key={index}>
              {
                <>
                  {
                    image instanceof File ? 
                      image.name
                    : 
                      getNameImageFromPath(image)
                  };
                </>
              }
            </span>
          ))}
        </div>
      ) : (
        <p>Imagens</p>
      )}
    </S.InputContainer>
  );
};

export default MultiImageInput;
