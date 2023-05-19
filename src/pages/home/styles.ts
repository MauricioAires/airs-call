import { Heading, Text, styled } from '@airs-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100dvw - (100dvw - 1160px) / 2)',
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  height: '100dvh',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  '@media(max-width: 600px)': {
    padding: '0 $6',
  },

  [` > ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },
  [` > ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
