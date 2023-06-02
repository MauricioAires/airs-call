import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@airs-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'

import * as SCommon from '../styles'
import * as S from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type updateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<updateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const session = useSession()

  console.log({ session })

  async function handleUpdateProfile(data: updateProfileFormData) {
    try {
      console.log(data)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        return alert(err.response?.data?.message)
      }

      console.log(err)
    }
  }

  return (
    <SCommon.Container>
      <SCommon.Header>
        <Heading as="strong">Bem-vindo ao Airs Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </SCommon.Header>

      <S.ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            referrerPolicy="no-referrer"
            alt={session.data?.user.name}
          />
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea autoComplete="off" {...register('bio')} />
          <S.FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </S.FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar <ArrowRight weight="bold" />
        </Button>
      </S.ProfileBox>
    </SCommon.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await getServerSession(req, res, buildNextAuthOptions(req, res))

  return {
    props: {},
  }
}
