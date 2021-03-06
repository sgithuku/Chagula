import { Button, useColorMode } from "@chakra-ui/react"
import { PropsWithoutRef, ReactNode } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import z from "zod"
import { dark, light } from "../../colors"
export { FORM_ERROR } from "final-form"
export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const { colorMode } = useColorMode()

  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <Button
              colorScheme={colorMode === "dark" ? dark.link : light.link}
              variant="outline"
              mr={["3", "3", "6"]}
              type="submit"
              disabled={submitting}
              justifySelf="center"
            >
              {submitText}
            </Button>
          )}
        </form>
      )}
    />
  )
}

export default Form
