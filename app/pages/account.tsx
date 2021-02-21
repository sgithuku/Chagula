import { Text } from "@chakra-ui/react"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"
import Settings from "../components/settings"

const Account = () => {
  // const currentUser = useCurrentUser()

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Settings />
    </Suspense>
  )
}

export default Account
