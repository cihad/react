import React, {forwardRef} from 'react'
import type {MouseEventHandler} from 'react'
import TokenBase, {isTokenInteractive} from './TokenBase'
import type {TokenBaseProps} from './TokenBase'
import {toHex} from 'color2k'
import type {ForwardRefComponent as PolymorphicForwardRefComponent} from '../utils/polymorphic'
import {getColorsFromHex} from './getColorsFromHex'
import {useTheme} from '../ThemeProvider'
import TokenTextContainer from './_TokenTextContainer'
import RemoveTokenButton from './_RemoveTokenButton'
import './temp.v8Tokens.css'
import styled from 'styled-components'
import type {hexString} from '../utils/isHex'

export type Variant =
  | 'pink'
  | 'plum'
  | 'purple'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'pine'
  | 'green'
  | 'lime'
  | 'olive'
  | 'lemon'
  | 'yellow'
  | 'orange'
  | 'amber'
  | 'red'
  | 'coral'
  | 'gray'
  | 'brown'
  | 'auburn'

export interface IssueLabelTokenProps extends TokenBaseProps {
  // this seems not to work to exlude as property from TokenBaseProps
  variant?: Variant
  fillColor?: string
}

export type variantColor = {
  backgroundColor: string
  textColor: string
  backgroundColorHover: string
  backgroundColorPressed: string
}

const variantColors = (variant: Variant): variantColor => ({
  backgroundColor: `var(--label-${variant}-bgColor-rest)`,
  backgroundColorHover: `var(--label-${variant}-bgColor-hover)`,
  backgroundColorPressed: `var(--label-${variant}-bgColor-pressed)`,
  textColor: `var(--label-${variant}-fgColor)`,
})

const getLabelColors = (
  variant?: Variant,
  fillColor?: string,
  resolvedColorScheme = 'light',
  bgColor = '#ffffff',
): variantColor => {
  // valid variant
  if (variant) {
    return variantColors(variant)
  }
  // valid hex string
  fillColor = fillColor !== undefined ? toHex(fillColor) : undefined
  if (fillColor) {
    return getColorsFromHex(fillColor as hexString, resolvedColorScheme, bgColor) // TODO: remove false prop if no selection nessesary for tokens
  }
  // if invalid variant and invalid hex string, return default
  return variantColors('gray')
}

const StyledIssueLabelToken: typeof TokenBase = styled(TokenBase)`
  background-color: var(--label-bgColor-rest);
  color: var(--label-fgColor);
  padding-right: ${props => (!props.onRemove ? undefined : 0)};
  position: relative;
  border: none;
  &[data-interactive='true'] {
    &:hover {
      background-color: var(--label-bgColor-hover);
    }
    &:active {
      background-color: var(--label-bgColor-pressed);
    }
  }
`

const getElementType = (
  href?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLLinkElement | HTMLButtonElement>,
): 'a' | 'button' | 'span' => {
  if (href) return 'a'
  if (onClick) return 'button'
  return 'span'
}

const IssueLabelToken = forwardRef((props, forwardedRef) => {
  const {
    variant,
    fillColor,
    onRemove,
    id,
    text,
    href, // or could we just do it depending on href or onClick?
    onClick,
    ...rest
  } = props

  const {resolvedColorScheme, theme} = useTheme()
  const bgColor =
    getComputedStyle(document.documentElement).getPropertyValue(theme?.colors.canvas.default) ||
    resolvedColorScheme?.startsWith('light')
      ? '#ffffff'
      : '#000000'

  const {backgroundColor, textColor, backgroundColorHover, backgroundColorPressed} = getLabelColors(
    variant,
    fillColor,
    resolvedColorScheme,
    bgColor,
  )

  const interactiveTokenProps = {
    as: getElementType(href, onClick),
    href,
    onClick,
  }

  const hasMultipleActionTargets = isTokenInteractive(props) && Boolean(onRemove)

  const hasHoverAndActiveStyles = (
    as: 'a' | 'button' | 'span',
    onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLLinkElement | HTMLButtonElement>,
  ) => Boolean(onClick || ['a', 'button'].includes(as))

  const onRemoveClick: MouseEventHandler = e => {
    e.stopPropagation()
    onRemove && onRemove()
  }

  return (
    <StyledIssueLabelToken
      data-interactive={hasHoverAndActiveStyles(getElementType(href, onClick), props.onClick)}
      onRemove={onRemove}
      id={id?.toString()}
      text={text}
      size="medium"
      style={
        {
          '--label-bgColor-rest': backgroundColor,
          '--label-fgColor': textColor,
          '--label-bgColor-hover': backgroundColorHover,
          '--label-bgColor-pressed': backgroundColorPressed,
        } as React.CSSProperties
      }
      {...(!hasMultipleActionTargets
        ? {
            forwardedAs: getElementType(href, onClick),
            href,
            onClick,
          }
        : {as: 'span'})}
      {...rest}
      ref={forwardedRef}
    >
      <TokenTextContainer {...(hasMultipleActionTargets ? {...interactiveTokenProps} : {})}>{text}</TokenTextContainer>
      {onRemove ? (
        <RemoveTokenButton
          onClick={onRemoveClick}
          size="medium"
          aria-hidden={hasMultipleActionTargets ? 'true' : 'false'}
          isParentInteractive={isTokenInteractive({...props, as: interactiveTokenProps.as})}
          sx={{
            position: 'relative',
            zIndex: '1',
          }}
        />
      ) : null}
    </StyledIssueLabelToken>
  )
}) as PolymorphicForwardRefComponent<'span' | 'a' | 'button', IssueLabelTokenProps>

IssueLabelToken.displayName = 'IssueLabelToken'

export default IssueLabelToken
