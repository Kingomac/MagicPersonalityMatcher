import Image from 'next/image'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, HStack, Heading, SimpleGrid, Spacer, Text, Textarea, VStack } from '@chakra-ui/react'

export default function Home() {

  const cards = Array(10).fill(0).map((_, i) => (
    <Card key={i}>
      <CardHeader><Text>Baby hellow</Text></CardHeader>
      <CardBody><Box><Text>fue por la historia que subiste a tus close</Text></Box></CardBody>
      <CardFooter>vi que tavasola y que qerías bllkiarrrr y prendeer</CardFooter>
    </Card>
  ))

  return (
    <main>
      <VStack marginTop={10}>
        <Heading as='h1' size='4xl'>Magic Personality Matcher</Heading>
        <Heading as="h2" size="lg">Determina tu personalidad en base al texto que escribes</Heading>

        <VStack spacing={10} marginX={{ base: "30px", md: "15vw", lg: "20vw" }}>
          <Textarea cols={30} rows={10} placeholder="Escribe ⌨️ aquí el texto ✍️ que quieres usar para determinar 🧮 tu 🧚 personalidad 🧚. Pueden ser Tweets, WhatsApps, mensajes de Tuenti o cualquier cosa que se te ocurra 🤔" />
          <Button colorScheme="teal" size="lg">Transformar</Button>
        </VStack>
      </VStack>

      <SimpleGrid marginX={10} marginTop={20} spacing={4} templateColumns="repeat(auto-fill, minmax(200px,1fr))">
        {cards}
      </SimpleGrid>
    </main>
  )
}
