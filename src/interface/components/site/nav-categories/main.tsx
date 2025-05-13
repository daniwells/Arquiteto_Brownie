import * as S from './styles';
import { useState, useEffect, useRef } from 'react';
import Title from '../../global/title/main';
import { SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';

interface navProps {
  handleChange: (category: string) => void;
  navItems: { name: string; value: string }[];
}

const NavCategories: React.FC<navProps> = ({ handleChange, navItems }) => {
  const [active, setActive] = useState(navItems[0]);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    handleChange(active.value);
  }, [active]);

  const handleItemClick = (item: { name: string; value: string }, index: number) => {
    setActive(item);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <S.BackgroundNav>
      <Title text="Nosso menu" />
      <S.NavBar
        className="my-swiper"
        spaceBetween={20}
        slidesPerView="auto"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {navItems.map((item, index) => (
          <SwiperSlide key={item.value}>
            <S.NavItem onClick={() => handleItemClick(item, index)}>
              <a href="#">{item.name}</a>
              {active.value === item.value && <S.Underline layoutId="underline" />}
            </S.NavItem>
          </SwiperSlide>
        ))}
      </S.NavBar>
    </S.BackgroundNav>
  );
};
export default NavCategories;
