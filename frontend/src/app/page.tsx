'use client'

import Image from 'next/image'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, HStack, Heading, SimpleGrid, Spacer, Text, Textarea, VStack } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { API_URL } from '../../config'

export default function Home() {

  const cards = Array(10).fill(0).map((_, i) => (
    <Card key={i}>
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
    alert('Transformando texto: ' + texto)
    const resp = await fetch(`${API_URL}/personality`, {
      method: 'POST',
      body: JSON.stringify({ text: texto }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json() as { personality: string }
    alert('Tu personalidad es: ' + data.personality)
  }

  return (
    <main>
      <VStack marginTop={10} margin={10} textAlign="center">
        <Heading as='h1' size='4xl'>Magic Personality Matcher</Heading>
        <Heading as="h2" size="lg">Determina tu personalidad en base al texto que escribes</Heading>

        <VStack spacing={10}>
          <Textarea cols={60} rows={10} onInput={handleTextareaInputChange} value={texto} placeholder="Escribe ⌨️ aquí el texto ✍️ que quieres usar para determinar 🧮 tu 🧚 personalidad 🧚. Pueden ser Tweets, WhatsApps, mensajes de Tuenti o cualquier cosa que se te ocurra 🤔" />
          <Button onClick={handleTransformButtonClick} colorScheme="teal" size="lg">Transformar</Button>
        </VStack>
      </VStack>

      <SimpleGrid marginX={10} marginTop={20} spacing={4} templateColumns="repeat(auto-fill, minmax(200px,1fr))">
        {cards}
      </SimpleGrid>
    </main>
  )
}
