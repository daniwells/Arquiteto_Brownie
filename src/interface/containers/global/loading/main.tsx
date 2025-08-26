"use client";

import React, { useEffect, useState } from "react";
import * as S from "./styles";

const Loading: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <S.Container>
      <S.Spinner viewBox="0 0 50 50" width="60" height="60">
        <circle cx="25" cy="25" r="20" />
      </S.Spinner>
    </S.Container>
  );
};

export default Loading;
