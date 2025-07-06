'use client';

import Head from 'next/head';
import * as S from "./styles";
import arrowLeft from "../../../../public/svg/arrow-left.svg"

export default function PrivacyPolicy() {
  return (
    <S.Container>
      <S.Return href="/" id="returnSite">
        <S.IconStyleContainer>
          <S.IconStyle src={arrowLeft} alt="Ícone de voltar"/>
        </S.IconStyleContainer>
        <label htmlFor="returnSite">Retornar ao site</label> 
      </S.Return>
      
      <Head>
        <title>Política de Privacidade - Empresa</title>
        <meta name="description" content="Política de Privacidade conforme LGPD" />
      </Head>
      <S.Main>
        <h1>Política de Privacidade</h1>
        <h3>Arquiteto do Brownie</h3>

        <p>A Política de Privacidade da Arquiteto do Brownie foi atualizada em julho de 2025.</p>

        <p>
          Com o objetivo de proteger os direitos fundamentais de liberdade e de
          privacidade e o livre desenvolvimento da personalidade da pessoa
          natural, a Arquiteto do Brownie elaborou a presente Política de Privacidade,
          observadas as disposições da Lei Geral de Proteção de Dados Pessoais
          (LGPD) – Lei n° 13.709/2018.
        </p>

        <p>
          É fundamental dedicar um momento para se familiarizar com nossas
          práticas de privacidade e falar conosco se tiver dúvidas. Para nós é
          importante ser transparente sobre o tratamento dos dados pessoais dos
          Usuários que utilizam os Serviços oferecidos pela Empresa, nos termos
          do Artigo 9º da LGPD. Esta Política se aplica quando o Usuário utiliza
          os nossos Serviços.
        </p>

        <h2>Veracidade das Informações</h2>
        <p>
          Toda e qualquer informação prestada pelo Usuário ao negócio,
          principalmente seus dados pessoais, deverão ser verídicos e não podem
          violar a legislação brasileira, principalmente à LGPD. Caso o negócio
          verifique que as informações fornecidas sejam inverídicas, esta
          poderá excluir os dados pessoais.
        </p>

        <h2>O que são Dados Pessoais e Dados Sensíveis?</h2>
        <p>
          &quot;Dados Pessoais&quot; são informações que podem ser usadas para identificar
          uma pessoa natural. Dados de empresas (pessoas jurídicas) como razão
          social e CNPJ não são abarcados por esta política.
        </p>
        <p>
          &quot;Dados Pessoais Sensíveis&quot;, de acordo com a LGPD, consistem em
          informações sobre origem racial ou étnica, convicção religiosa,
          opinião política, filiação a sindicato ou organização de caráter
          religioso, filosófico ou político, ou até mesmo dado referente à
          saúde ou à vida sexual, dado genético ou biométrico.
        </p>

        <h2>Empresa como Controladora</h2>
        <p>
          A empresa figura como controladora dos Dados Pessoais coletados, ou
          seja, é responsável por tomar as decisões referentes ao tratamento
          desses dados.
        </p>

        <h2>Quais dados pessoais são coletados?</h2>
        <p>No formulário de pedido, são coletados os seguintes dados:</p>
        <ul>
          <li>Nome completo</li>
          <li>Telefone</li>
          <li>Cep</li>
          <li>Número da casa</li>
        </ul>
        <p>
          Esses dados são usados para identificação do usuário e entrega do produto.
        </p>

        <h2>Por que tratamos os dados pessoais?</h2>
        <p>
          A base legal é a execução de contrato, conforme inciso VI do Artigo 7º
          da LGPD.
        </p>

        <h2>Coletamos dados sensíveis?</h2>
        <p>
          Não, nenhum dado coletado pelo sistema se enquadra nesse escopo.
        </p>

        <h2>Armazenamento dos dados</h2>
        <p>
          Os dados são armazenados pela plataforma Neon, utilizando a
          infraestrutura da Vercel. A transferência internacional atende ao
          inciso I do artigo 33 da LGPD.
        </p>

        <h2>Duração do tratamento de dados</h2>
        <p>
          Todos os dados pessoais são removidos assim que um pedido é concluído, porém, caso não seja, 
          os dados são tratados enquanto durar o contrato, e mantidos por até 3
          anos após seu término, com base no Art. 206, §3º, V do Código Civil e
          Art. 16 da LGPD.
        </p>

        <h2>Segurança das informações</h2>
        <p>
          Utilizamos criptografia SSL e práticas modernas de segurança da
          informação, conforme Art. 6º, VII e VIII da LGPD.
        </p>

        <h2>Browsers compatíveis</h2>
        <p>
          Recomendamos navegadores atualizados como Chrome, Firefox e Edge.
          Navegadores incompatíveis podem afetar a segurança.
        </p>

        <h2>Compartilhamento com terceiros</h2>
        <p>
          Nenhum dado pessoal é compartilhado para fora da plataforma.
        </p>

        <h2>Direitos do Usuário</h2>
        <p>
          Conforme Art. 18 da LGPD, o Usuário pode solicitar: confirmação de
          tratamento, acesso, correção, anonimização, bloqueio, portabilidade,
          eliminação, revogação de consentimento, entre outros, via e-mail
          suporte@empresa.com.
        </p>

        <h2>Alterações nesta política</h2>
        <p>
          Qualquer alteração relevante será comunicada de forma clara e em
          destaque, conforme §6º do Art. 8º da LGPD.
        </p>

        <h2>Encarregado da Empresa</h2>
        <p>
          Em caso de dúvidas ou para exercer seus direitos, entre em contato com
          o Encarregado Sr(a). _________ pelo e-mail suporte@empresa.com.
        </p>

        <footer>
          <p>Última atualização: Julho de 2025</p>
          <p>Contato: suporte@empresa.com</p>
        </footer>
      </S.Main>
    </S.Container>
  );
}
