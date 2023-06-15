import { Button, Text, TextArea, TextInput } from '@airs-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import * as S from './styles'

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

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

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const handleConfirmScheduling = () => {}

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <S.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <S.FormHeader>
        <Text>
          <CalendarBlank size={22} /> {describeDate}
        </Text>
        <Text>
          <Clock size={22} /> {describeTime}
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
        <Button
          type="button"
          onClick={() => onCancelConfirmation()}
          variant="tertiary"
        >
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Confirmar
        </Button>
      </S.FormActions>
    </S.ConfirmForm>
  )
}
