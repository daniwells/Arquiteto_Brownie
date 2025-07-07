import styled from 'styled-components';
import { colors } from '@/styles/themes';
import Image from 'next/image';
import Link from 'next/link';
import breakpoints from '@/styles/breakpoints';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000000;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media ${breakpoints.xs} {
        padding: 20px;
    }
`;

export const Container = styled.div`
    position: relative;
    background-color: white;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    padding: 20px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    @media ${breakpoints.xs} {
        padding: 24px;
    }
`;

export const Close = styled(Image)`
    position: absolute;
    width: 18px;
    height: 18px;
    right: 5%;
    cursor: pointer;
`

export const Message = styled.div`
    color: ${colors.blackGray};
    margin-bottom: 20px;
    font-size: 5px;
    
    @media ${breakpoints.md} {
        margin-bottom: 30px;
    }
`;

export const TitleError = styled.h2`
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;

    @media ${breakpoints.xs} {
        font-size: 24px;
    }

    @media ${breakpoints.sm} {
        font-size: 28px;
    }

    @media ${breakpoints.md} {
        font-size: 32px;
        margin-bottom: 30px;   
    }
`;

export const PrivacyPolicy = styled(Link)`
    font-size: 14px;

    @media ${breakpoints.sm} {
        font-size: 16px;
    }
`
