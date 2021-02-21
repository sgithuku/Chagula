import { Box, Container, Heading, Text, useColorMode } from "@chakra-ui/react"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useMutation } from "blitz"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const { colorMode } = useColorMode()

  return (
    <Container centerContent justifyContent="center" maxW="100%">
      <Box
        backgroundColor={colorMode === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"}
        width={{ base: "100%", md: "md" }}
        borderRadius="lg"
        p={{ md: "6" }}
        border="3"
        boxShadow={{ md: "base" }}
      >
        <Heading mb="3">Create an Account</Heading>
        <Text marginY="3">
          You're one step away from taking control of dinner mayhem every night.{" "}
        </Text>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
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
        </Form>
      </Box>
    </Container>
  )
}

export default SignupForm
