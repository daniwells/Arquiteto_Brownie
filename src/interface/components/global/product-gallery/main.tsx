import React, { useState } from "react";
import Image from "next/image";
import * as S from "./styles";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <S.Container>
      <S.Thumbnails>
        {images.map((img, index) => (
          <S.ThumbnailWrapper
            key={index}
            onClick={() => setSelectedImage(img)}
            active={selectedImage === img ? "true" : "false"}
          >
            <Image src={img} alt={`Miniatura ${index}`} width={60} height={60} />
          </S.ThumbnailWrapper>
        ))}
      </S.Thumbnails>
      <S.MainImageWrapper>
        <Image
          src={selectedImage}
          alt="Imagem principal do produto"
          width={200}
          height={230}
          style={{ objectFit: "cover", borderRadius: "12px", }}
        />
      </S.MainImageWrapper>

    </S.Container>
  );
};

export default ProductGallery;
