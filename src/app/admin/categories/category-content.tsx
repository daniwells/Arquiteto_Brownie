'use client';

// Libs
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import FormContainer from '@/interface/containers/global/form-container/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/button/main';
import Line from '@/interface/components/admin/line/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import CardCategory from '@/interface/components/admin/card-category/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import HeaderDesktopContainer from '@/interface/containers/global/header-desktop-container/main';
import Loading from '@/interface/containers/global/loading/main';

// Images
import categoryIcon from '../../../../public/svg/category.svg';

// Contexts
import { usePopup } from '@/contexts/PopupContext';

// Actions
import { getAllCategories, insertCategory, removeCategory, patchCategory } from '@/lib/actions/category.actions';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


const CategoryContent: React.FC<{userEmail: string}> = ({userEmail}) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const [createdCategory, setCreatedCategory] = useState('');
  const [listCategories, setListCategories] = useState<
    | {
        category: string;
        id: string;
        position: number;
      }[]
    | null
  >(null);

  const handleGetAllCategories = async () => {
    setLoading(true);
    const allCategories = await getAllCategories();
    setLoading(false);

    if (!allCategories.success) {
      openPopup(
        allCategories.message
          ? await allCategories.message
          : "Erro ao resgatar as categorias",
        'error',
      );
      return;
    }

    const categoriesResponse =
      allCategories?.content
        ? await allCategories.content
        : allCategories.content;

    setListCategories(categoriesResponse);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await insertCategory(createdCategory);
    if (!response?.success) {
      const message = response.message ? await response.message : '';
      openPopup(message, 'error');
    }
    setLoading(false);
  };

  const handleRemoveCategory = async (categoryId: string) => {
    setLoading(true);
    const response = await removeCategory(categoryId);
    setLoading(false);

    if (!response?.success) {
      const message = response.message ? await response.message : '';
      openPopup(message, 'error');
    }

    handleGetAllCategories();
  };

  useEffect(() => {
    handleGetAllCategories();
    setMounted(false);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlePatchCategory = async (idA: string, idB: string) => {
    setLoading(true);
    const response = await patchCategory(idA, idB);
    setLoading(false);

    if (!response?.success) {
      const message = response.message ? await response.message : '';
      openPopup(message, 'error');
    }

    handleGetAllCategories();
  };


  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setListCategories((items) => {
      if (!items) return items;

      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      return newItems.map((item, index) => ({
        ...item,
        position: index,
      }));
    });

    handlePatchCategory(active.id, over.id)
  };

  if(mounted){
    return <Loading/>
  }

  return (
    <MainContainer isBottomMenu>
      {
        size_768 ?
          <HeaderDesktopContainer
            logoPosition="middle"
            title="Categorias"
            description="Crie ou edite uma categoria para os seus produtos"
            hasUser
            userEmail={userEmail}
          />
        :
          <>
            <HeaderAdmin userEmail={userEmail}/>
            <DescriptionContainer
              title="Categorias"
              desc="Crie ou edite uma categoria para os seus produtos"
            />
          </>
      }
      
      <FormContainer style="padding-top: 30px;" handleSubmit={handleSubmit}>
          <BaseInput
            value={createdCategory}
            icon={categoryIcon}
            altIcon="ícone de categoria"
            placeholder="Categoria"
            id="category"
            handleChange={(value: string) => setCreatedCategory(value)}
          />
          <PrimaryButton loading={loading} type="submit" value={'Criar categoria'} />
          <Line/>
      </FormContainer>
      <CardContainer>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
        <SortableContext
          items={listCategories?.map(c => c.id) || []}
          strategy={verticalListSortingStrategy}
        >
          {listCategories
            ?.sort((a, b) => a.position - b.position)
            .map((category) => (
              <CardCategory
                id={category.id}
                loading={loading}
                handleRemove={() => handleRemoveCategory(category.id)}
                value={category.category}
                key={category.id}
              />
            ))
          }
        </SortableContext>
        </DndContext>
      </CardContainer>
      <MenuAdmin />
    </MainContainer>
  );
};

export default CategoryContent;
