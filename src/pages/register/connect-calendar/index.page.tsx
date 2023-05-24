import { Button, Heading, MultiStep, Text } from '@airs-ui/react'
import { ArrowRight } from 'phosphor-react'

import * as SCommon from '../styles'
import * as S from './styles'

export default function Register() {
  return (
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
          <Button variant="secondary" size="sm">
            Conectar <ArrowRight weight="bold" />
          </Button>
        </S.ConnectItem>
        <Button type="submit" disabled={false}>
          Próximo passo <ArrowRight weight="bold" />
        </Button>
      </S.ConnectBox>
    </SCommon.Container>
  )
}
