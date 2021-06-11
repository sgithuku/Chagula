import { Box, Button, Container, Heading, Text, useColorMode } from "@chakra-ui/react"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { dark, light } from "../../colors"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const { colorMode } = useColorMode()

  return (
    <Container
      centerContent
      justifyContent="flex-start"
      maxW="100%"
      backgroundImage="/plate.jpg"
      backgroundSize="cover"
    >
      <Box
        backgroundColor={colorMode === "dark" ? "rgba(0,0,0,0.7)" : "#F0F7EE"}
        width={{ base: "100%", md: "md" }}
        borderRadius="lg"
        p={{ md: "6" }}
        border="3"
        boxShadow={{ md: "base" }}
      >
        <Heading mb="3">Login</Heading>
        <Text marginY="3">Welcome back to Chagula.</Text>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Box>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>Forgot your password?</a>
            </Link>
          </Box>
        </Form>
        <Container mt="6" p="0">
          <Text>Or if you don't already have an account</Text>
          <Button
            colorScheme={colorMode === "dark" ? dark.link : light.link}
            variant="outline"
            mr={["3", "3", "6"]}
          >
            <Link href={Routes.SignupPage()}>Sign Up</Link>
          </Button>
        </Container>
      </Box>
    </Container>
  )
}

export default LoginForm
