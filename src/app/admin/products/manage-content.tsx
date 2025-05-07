'use client';
import React from 'react'


import MainContainer from '@/interface/containers/global/main-container/main'
import Title from '@/interface/components/global/title/main'
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import CardManage from '@/interface/components/admin/card-manage/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import Search from '@/interface/components/global/search/main';

const ContentManage = () => {
  return (
    <MainContainer>
      <HeaderAdmin/>
      <Title text= "Gerenciar produtos"/>
      <Search value="" handleChange={() => {}} placeholder='Pesquisar por produto' />
      <PrimaryButton category="normal" type="submit" handleClick={() => {}} value="Criar novo produto" />
      <CardManage/>
      <CardManage/>
      <CardManage/>
      <MenuAdmin/>
    </MainContainer>
  )
}

export default ContentManage
