import { Container, Heading } from "@chakra-ui/react"
import { Head } from "blitz"
import { ReactNode, Suspense } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  // const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container w="100%" maxW="100%" m="0" p="0">
      <Head>
        <title>{title || "Chagula"}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%2322543d%22></rect><path fill=%22%23fff%22 d=%22M71.28 28.67L71.28 28.67Q71.28 29.93 70.52 30.83Q69.75 31.73 68.77 32.18L68.77 32.18Q66.42 30.56 63.28 29.12Q60.13 27.68 55.09 27.68L55.09 27.68Q50.95 27.68 47.44 29.12Q43.92 30.56 41.31 33.35Q38.70 36.14 37.22 40.37Q35.73 44.60 35.73 50.09L35.73 50.09Q35.73 55.67 37.17 59.81Q38.62 63.95 41.18 66.74Q43.75 69.53 47.34 70.92Q50.95 72.32 55.36 72.32L55.36 72.32Q60.03 72.32 63.50 71.02Q66.97 69.71 69.30 67.91L69.30 67.91Q70.20 68.27 71.02 69.22Q71.83 70.16 71.83 71.42L71.83 71.42Q71.83 73.31 69.67 74.84L69.67 74.84Q67.59 76.28 64.00 77.41Q60.39 78.53 54.81 78.53L54.81 78.53Q49.14 78.53 44.28 76.73Q39.42 74.93 35.87 71.38Q32.31 67.82 30.25 62.51Q28.18 57.20 28.18 50.09L28.18 50.09Q28.18 42.98 30.29 37.63Q32.41 32.27 36.01 28.67Q39.61 25.07 44.42 23.27Q49.23 21.47 54.55 21.47L54.55 21.47Q58.23 21.47 61.34 22.10Q64.44 22.73 66.65 23.77Q68.86 24.80 70.07 26.11Q71.28 27.41 71.28 28.67Z%22></path></svg>"
        />
      </Head>
      <Suspense fallback={<Heading>Loading...</Heading>}>{children}</Suspense>
    </Container>
  )
}

export default Layout
