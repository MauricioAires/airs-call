import { Button, Heading, MultiStep, Text } from '@airs-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import * as SCommon from '../styles'
import * as S from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const isSignedIn = session.status === 'authenticated'
  const hasAuthError = !!router.query.error

  const handleConnectCalendar = async () => {
    await signIn('google')
  }

  const handleNavigateToNextStep = async () => {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Airs Call" noindex />

      <SCommon.Container>
        <SCommon.Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </SCommon.Header>

        <S.ConnectBox>
          <S.ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => signIn('google')}
                disabled
              >
                Conectado com {session.data.user?.name} <Check weight="bold" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar <ArrowRight weight="bold" />
              </Button>
            )}
          </S.ConnectItem>

          {hasAuthError && (
            <S.AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </S.AuthError>
          )}
          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSignedIn}
          >
            Próximo passo <ArrowRight weight="bold" />
          </Button>
        </S.ConnectBox>
      </SCommon.Container>
    </>
  )
}
