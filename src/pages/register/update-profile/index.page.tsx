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
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  async function handleUpdateProfile(data: updateProfileFormData) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })

      await router.push(`/schedule/${session.data?.user.username}`)
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
        <Heading as="strong">Para finalizar!</Heading>
        <Text>Adicione uma breve descrição e uma foto de perfil.</Text>
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
