import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
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
  },
}
export default NextAuth(authOptions)

// https://www.googleapis.com/auth/userinfo.email => Veja o endereço de e-mail principal da sua Conta do Google
// https://www.googleapis.com/auth/userinfo.profile => Veja suas informações pessoais, incluindo qualquer informação pessoal que você disponibilizou publicamente

// NOTE: Apenas o usuário pode realizar modificações näo nenhum acesso administrativo que possa ter acesso
// https://www.googleapis.com/auth/calendar => Veja, edite, compartilhe e exclua permanentemente todos os calendários que você pode acessar usando o Google Agenda
