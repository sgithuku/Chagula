import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Container } from "@chakra-ui/react"
import Nav from "app/components/Nav"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container centerContent maxW="100%">
      <Nav />
      <SignupForm onSuccess={() => router.push("/")} />
    </Container>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
