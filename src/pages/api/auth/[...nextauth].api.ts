import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile: (profile: GoogleProfile) => {
          return {
            id: profile.sub,
            name: profile.name,
            // NOTE: O Username pode ser retornado coo vazio porque ele não vai ser atualizado
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        console.log(account?.scope)
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          // É o mesmo que false só que direcionando para um lugar
          return '/register/connect-calendar/?error=permissions'
        }

        // tudo certo
        return true
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

// https://www.googleapis.com/auth/userinfo.email => Veja o endereço de e-mail principal da sua Conta do Google
// https://www.googleapis.com/auth/userinfo.profile => Veja suas informações pessoais, incluindo qualquer informação pessoal que você disponibilizou publicamente

// NOTE: Apenas o usuário pode realizar modificações näo nenhum acesso administrativo que possa ter acesso
// https://www.googleapis.com/auth/calendar => Veja, edite, compartilhe e exclua permanentemente todos os calendários que você pode acessar usando o Google Agenda

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
