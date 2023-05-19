import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Button, TextInput } from '@airs-ui/react'
import { z } from 'zod'

import * as S from './styles'

const claimUserFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUserFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }
  return (
    <S.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        autoComplete="off"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        <ArrowRight /> Reservar
      </Button>
    </S.Form>
  )
}
