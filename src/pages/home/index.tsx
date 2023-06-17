import Image from 'next/image'
import { Heading, Text } from '@airs-ui/react'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'
import previewImage from '../../assets/app-preview.png'

import * as S from './styles'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Airs Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos
        no seu tempo livre."
      />

      <S.Container>
        <S.Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </S.Hero>
        <S.Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
          />
        </S.Preview>
      </S.Container>
    </>
  )
}
