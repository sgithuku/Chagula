import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Container, Box } from "@chakra-ui/react"
import Nav from "app/components/Nav"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container centerContent justifyContent="center" maxW="100%">
      <Nav />
      <LoginForm
        onSuccess={() => {
          const next = (router.query.next as string) ?? "/"
          router.push(next)
        }}
      />
    </Container>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
