import { Button, Heading, MultiStep, Text, TextInput } from '@airs-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as S from './styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Usuário deve conter no mínimo 3 letras.',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário pode ter apena letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, {
    message: 'O nome deve conter no mínimo 3 letras.',
  }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: 'mau',
      name: '',
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Bem-vindo ao Airs Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </S.Header>

      <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            autoComplete="off"
            {...register('username')}
          />
          {errors.username && (
            <S.FormError size="xs">{errors.username.message}</S.FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            placeholder="Seu nome"
            autoComplete="off"
            {...register('name')}
          />
          {errors.name && (
            <S.FormError size="xs">{errors.name.message}</S.FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight weight="bold" />
        </Button>
      </S.Form>
    </S.Container>
  )
}
