/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
} from 'styled-components/macro'

import { Colors } from './styled'
import { useIsDarkMode } from '../state/user/hooks'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#FFFFFF',
    text2: darkMode ? '#FFFFFF' : '#FFFFFF',
    text3: darkMode ? '#FFFFFF' : '#FFFFFF',
    text4: darkMode ? '#565A69' : '#FFFFFF',
    text5: darkMode ? '#2C2F36' : '#FFFFFF',
    // backgrounds / greys
    bg0: darkMode ? '#1a2c3f' : '#1a2c3f',
    bg1: darkMode ? '#1a2c3f' : '#142e46',
    bg2: darkMode ? '#142e46' : '#1a2c3f',
    bg3: darkMode ? '#4e854f': '#4e854f',
    bg4: darkMode ? '#4e854f': '#4e854f',
    bg5: darkMode ? '#4e854f': '#4e854f',
    bg6: darkMode ? '#4e854f': '#4e854f',

    //specialty colors
    modalBG: darkMode ? '#black' : '#1a2c3f',
    advancedBG: darkMode ? '#1a2c3f' : '#1a2c3f',

    //primary colors
    primary1: darkMode ? '#4e854f' : '#4e854f',
    primary2: darkMode ? '#4e854f' : '#4e854f',
    primary3: darkMode ? '#4e854f' : '#4e854f',
    primary4: darkMode ? '#4e854f' : '#4e854f',
    primary5: darkMode ? '#4e854f' : '#4e854f',

    // color text
    primaryText1: darkMode ? '#1a2c3f' : '#1a2c3f',

    // secondary colors
    secondary1: darkMode ? '#4e854f': '#4e854f',
    secondary2: darkMode ? '#1a2c3f' : '#1a2c3f',
    secondary3: darkMode ? '#1a2c3f' : '#1a2c3f',

    // other
    red1: darkMode ? '#4e854f': '#4e854f',
    red2: darkMode ? '#4e854f': '#4e854f',
    red3: '#4e854f',
    green1: darkMode ? '#4e854f': '#4e854f',
    yellow1: '#4e854f',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: darkMode ? '#4e854f': '#4e854f',
    blue2: darkMode ? '#4e854f': '#4e854f',
    error: darkMode ? '#FD4040' : '#DF1F38',
    success: darkMode ? '#27AE60' : '#007D35',
    warning: '#FF8F00',

    // dont wanna forget these blue yet
    blue4: darkMode ? '#4e854f': '#4e854f',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  Label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  Black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  White(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  Blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  Yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  DarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  Gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  Italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
