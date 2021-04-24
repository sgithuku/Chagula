import { Container } from "@chakra-ui/react"
import { SignupForm } from "app/auth/components/SignupForm"
import Nav from "app/components/Nav"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes, useRouter } from "blitz"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container centerContent maxW="100%">
      <Nav />
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Container>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
