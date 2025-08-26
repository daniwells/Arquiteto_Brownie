import styled from 'styled-components';
import { colors } from '@/styles/themes';

interface primaryButtonStyleProps {
  $category?: string;
  $fontSize?: string;
}

export const PrimaryButtonStyle = styled.button<primaryButtonStyleProps>`
  max-width: 400px;
  background-color: ${(props) =>
    props.$category == 'dark'
      ? colors.lightBrown
      : props.$category == 'error'
        ? colors.red
        : props.$category == 'success'
          ? colors.green
          : props.$category == 'secondary' || props.$category == 'delete'
            ? 'transparent'
            : props.$category == 'deactivate'
              ? colors.darkGray : colors.beige
  };

  font-family: 'Comfortaa Bold';
  color: ${(props) =>
    props?.$category == 'secondary'
      ? colors.beige
      : props?.$category == 'delete'
        ? colors.red
        : 'white'};
  border-radius: 30px;
  box-shadow: none;
  width: 100%;
  border: ${(props) =>
    props?.$category == 'secondary'
      ? '1px solid' + colors.beige
      : props?.$category == 'delete'
        ? '1px solid' + colors.red
        : 'none'};
  padding: 14px;
  font-size: ${(props) => (props?.$fontSize ? props?.$fontSize : '18px')};
  cursor: ${(props) => (props?.$category == 'deactivate' ? '' : 'pointer')};
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: none;
    background-color: ${(props) =>
      !(props.$category == 'error') &&
      props.$category == 'secondary'
        ? colors.beige
        : props?.$category == 'delete'
          ? colors.red
          : props?.$category == "success"
            ? colors.green
              : props?.$category == 'deactivate'
                ? colors.darkGray : colors.lightBrown
      };
    color: white;
  }
`;