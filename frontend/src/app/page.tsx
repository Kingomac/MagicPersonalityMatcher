'use client'

import Image from 'next/image'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Grid, GridItem, HStack, Heading, Modal, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { API_URL } from '../../config'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const cards = Array(10).fill(0).map((_, i) => (
    <Card key={i} margin={2}>
      <CardHeader><Text>Baby hellow</Text></CardHeader>
      <CardBody><Box><Text>fue por la historia que subiste a tus close</Text></Box></CardBody>
      <CardFooter>vi que tavasola y que qerías bllkiarrrr y prendeer</CardFooter>
    </Card>
  ))

  const [texto, setTexto] = useState('')

  const handleTextareaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTexto(e.target.value)
  }

  const handleTransformButtonClick = async () => {
    const resp = await fetch(`${API_URL}/personality`, {
      method: 'POST',
      body: JSON.stringify({ text: texto }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json() as { personality: string }
    router.push(`/personality/${data.personality}`)
  }

  return (
    <main>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 3fr 1fr" }} gridAutoFlow={{ base: "dense", lg: "column" }} gap={6}>
        <GridItem order={{ base: 2, lg: 1 }}>
          {cards}
        </GridItem>
        <GridItem order={{ base: 1, lg: 2 }}>
          <VStack marginTop={10} margin={10} textAlign="center">
            <Heading as='h1' size='4xl'>Magic Personality Matcher</Heading>
            <Heading as="h2" size="lg">Determina tu personalidad en base al texto que escribes</Heading>

            <VStack spacing={10}>
              <Textarea cols={60} rows={10} onInput={handleTextareaInputChange} value={texto} placeholder="Escribe ⌨️ aquí el texto ✍️ que quieres usar para determinar 🧮 tu 🧚 personalidad 🧚. Pueden ser Tweets, WhatsApps, mensajes de Tuenti o cualquier cosa que se te ocurra 🤔" />
              <Button onClick={handleTransformButtonClick} colorScheme="teal" size="lg">Transformar</Button>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem order={3}>
          <Text>prueba</Text>
        </GridItem>
      </Grid>
    </main>
  )
}
