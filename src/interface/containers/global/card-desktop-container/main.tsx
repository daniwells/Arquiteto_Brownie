import React, { useRef, useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import * as S from "./styles";
import Image from "next/image";
import arrowLeftIcon from "../../../../../public/svg/arrow-left.svg"
import arrowRightIcon from "../../../../../public/svg/arrow-right.svg"
import useMediaQuery from '@mui/material/useMediaQuery';

interface cardDesktopContainerProps {
    children: React.ReactNode;
}

const CardDesktopContainer: React.FC<cardDesktopContainerProps> = ({children}) => {
    const size_1200 = useMediaQuery('(min-width:1200px)');

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [swiperReady, setSwiperReady] = useState(false);

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    return (
        <S.Wrapper>
            <S.NavButton ref={prevRef}>
                <Image src={arrowLeftIcon} alt="Flecha apontada para a esquerda" width={10}/>
            </S.NavButton>

            <S.SliderContainer>
                {swiperReady && (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={size_1200 ? 3 : 2}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            // @ts-expect-error — imcompatibility type
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-expect-error — imcompatibility type
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                    >
                        {children}
                    </Swiper>
                )}
            </S.SliderContainer>

            <S.NavButton ref={nextRef}>
                <Image src={arrowRightIcon} alt="Flecha apontada para a direita" width={10}/>
            </S.NavButton>
        </S.Wrapper>
    );
};

export default CardDesktopContainer;
