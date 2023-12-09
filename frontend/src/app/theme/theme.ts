import { extendTheme } from "@chakra-ui/react";


export default extendTheme({
    colors: {
        brand: {
            100: "#f7fafc",
            // ...
            900: "#1a202c",
        },
    },
    fonts: {
        title: 'White Star',
        heading: 'Helvetica',
        body: "Poppins",
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                bg: 'url("/fondo.webp")',
            },
            // styles for the `a`
            a: {
                color: "teal.500",
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
    },
})