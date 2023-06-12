import { Button, Text, TextArea, TextInput } from '@airs-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import * as S from './styles'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome precisa no mínimo 3 caracteres',
  }),
  email: z.string().email({
    message: 'Digite um e-mail válido',
  }),
  observation: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const handleConfirmScheduling = () => {}
  return (
    <S.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <S.FormHeader>
        <Text>
          <CalendarBlank size={22} /> 22 de Setembro de 2024
        </Text>
        <Text>
          <Clock size={22} /> 18:00h
        </Text>
      </S.FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />

        {errors.name && <S.FormError>{errors.name.message}</S.FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && <S.FormError>{errors.email.message}</S.FormError>}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observation')} />
      </label>

      <S.FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </S.FormActions>
    </S.ConfirmForm>
  )
}
