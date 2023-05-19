import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Button, Text, TextInput } from '@airs-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'
import { error } from 'console'

const claimUserFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Usuário deve conter no mínimo 3 letras.',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário pode ter apena letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUserFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUserFormSchema),
  })

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
      <S.FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username?.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </S.FormAnnotation>
    </S.Form>
  )
}
