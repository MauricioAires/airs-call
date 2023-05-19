import { Button, TextInput } from '@airs-ui/react'

import * as S from './styles'
import { ArrowRight } from 'phosphor-react'

export function ClaimUsernameForm() {
  return (
    <S.Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuario" />
      <Button size="sm" type="submit">
        <ArrowRight /> Reservar
      </Button>
    </S.Form>
  )
}
