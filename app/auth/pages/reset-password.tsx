import { Box, Container, Heading, Text } from "@chakra-ui/react"
import resetPassword from "app/auth/mutations/resetPassword"
import { ResetPassword } from "app/auth/validations"
import Nav from "app/components/Nav"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes, useMutation, useRouterQuery } from "blitz"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Container centerContent maxW="100%">
      <Nav />

      <Heading>Set a New Password</Heading>

      {isSuccess ? (
        <Box>
          <Heading>Password Reset Successfully</Heading>
          <Text>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </Text>
        </Box>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword.omit({ token: true })}
          initialValues={{ password: "", passwordConfirmation: "" }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation({ ...values, token: query.token as string })
            } catch (error) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </Container>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
