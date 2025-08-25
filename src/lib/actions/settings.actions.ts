'use server';

import { prisma } from '../../db/prisma';
import { convertToPlainObject } from '../utils/utils';
import { formatError } from '../utils/utils';
import { auth } from '../../../auth';
import { CustomError } from '../utils/exceptions';

export const getSettings = async (key: string) => {
  try{
    if (!key) return { success: false, message: 'Configuração não encontrada' };
    
    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const settings = await prisma.settings.findFirst({where: { key: key },});

    if (!settings)
      return {
        success: false,
        message: `Configuração não encontrada, chave '${key}' incorreta`,
      };

    const settingsJson = convertToPlainObject(settings);

    return {
      success: true,
      message: '',
      content: settingsJson,
    };
  }catch(error){
    return {
      success: false,
      message: await formatError(error),
    };
  }
};

export const editSettings = async (key: string, value: string) => {
  try{
    if (!key) return { success: false, message: 'Configuração não encontrada' };
    
    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const settings = await prisma.settings.update({
        where: { key: key },
        data: {value: value},
    });

    if (!settings)
      return {
        success: false,
        message: `Configuração não encontrada, chave '${key}' incorreta`,
      };

    const settingsJson = convertToPlainObject(settings);

    return {
      success: true,
      message: '',
      content: settingsJson,
    };
  }catch(error){
    return {
      success: false,
      message: await formatError(error),
    };
  }
};