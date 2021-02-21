import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Button, Container, Heading, useColorMode, Text } from "@chakra-ui/react"
import { light, dark } from "../../colors"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container centerContent justifyContent="center" maxW="100%">
      <Box
        backgroundColor="rgba(255,255,255,0.7)"
        width="md"
        borderRadius="lg"
        p="6"
        border="3"
        boxShadow="base"
      >
        <Heading mb="3">Login</Heading>
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
            <Link href="/forgot-password">
              <a>Forgot your password?</a>
            </Link>
          </Box>
        </Form>
        <Container width="xs" mt="6" centerContent>
          <Text>Or if you don't already have an account</Text>
          <Button
            colorScheme={colorMode === "dark" ? dark.link : light.link}
            variant="outline"
            mr={["3", "3", "6"]}
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </Container>
      </Box>
    </Container>
  )
}

export default LoginForm
