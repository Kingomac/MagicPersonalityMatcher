'use client'

import Image from 'next/image'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Grid, GridItem, HStack, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Spinner, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { API_URL } from '../../config'
import { useRouter } from 'next/navigation'
import loadingTexts from './data/loadingTexts.json'
import AnyCharacterList from './any_character_list'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleTextareaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTexto(e.target.value)
  }

  const handleTransformButtonClick = async () => {
    onOpen()
    const resp = await fetch(`${API_URL}/personality`, {
      method: 'POST',
      body: JSON.stringify({ text: texto }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json() as { personality: string }
    setTimeout(() => {
      router.push(`/personality/${data.personality}`)
    }, Math.random() * 3000 + 1000);
  }

  return (
    <main>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 3fr 1fr" }} gridAutoFlow={{ base: "dense", lg: "column" }} gap={6} margin={2}>
        <GridItem order={{ base: 2, lg: 1 }}>
          {cards}
        </GridItem>
        <GridItem order={{ base: 1, lg: 2 }}>
          <VStack marginTop={10} margin={10} textAlign="center">
            <Heading as='h1' fontFamily="White Star" color="white" backgroundColor="#4cb3ce" padding={10} size='4xl'>Magic Personality Matcher</Heading>
            <Heading as="h2" size="lg" marginTop={50}>Determina tu personalidad en base al texto que escribes</Heading>

            <VStack spacing={10} marginTop={50}>
              <Textarea cols={60} rows={10} onInput={handleTextareaInputChange} value={texto} placeholder="Escribe ⌨️ aquí el texto ✍️ que quieres usar para determinar 🧮 tu 🧚 personalidad 🧚. Pueden ser Tweets, WhatsApps, mensajes de Tuenti o cualquier cosa que se te ocurra 🤔" />
              <Button onClick={handleTransformButtonClick} colorScheme="teal" size="lg">Transformar</Button>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem order={3}>
          <AnyCharacterList limit={10} />
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cargando...</ModalHeader>
          <ModalBody>
            <VStack>
              <Spinner />
              <Text>{loadingTexts[Math.floor(Math.random() * loadingTexts.length)]}</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  )
}
