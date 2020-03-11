import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '@tds/core-box'

import { safeRest } from '@tds/util-helpers'
import { colorWhite, colorTelusPurple } from '@tds/core-colours'
import { Print } from '@tds/core-interactive-icon'

const tagColors = {
  selected: {
    text: colorWhite,
    default: colorTelusPurple,
    hover: '#33204C',
    active: '#201430',
    focus: '#33204C',
    outline: '#7557A0',
    border: '#33204C',
  },
  unselected: {
    text: colorTelusPurple,
    default: colorWhite,
    hover: colorWhite,
    active: '#F1EFF4',
    focus: colorWhite,
    outline: '#7557A0',
    border: '#33204C',
  },
}

const StyledTagButton = styled(Box)(
  {
    marginTop: '1rem', // add vertical spacing when TagItems wrap
  },
  ({ isSelected, isLoading }) => {
    const colors = tagColors[isSelected ? 'selected' : 'unselected']

    return {
      overflow: 'visible',
      color: colors.text,
      background: isLoading ? colors.active : colors.default,
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      border: `1px solid ${colorTelusPurple}`,
      borderRadius: '20px',
      height: '2.5rem',
      '&:hover': {
        background: colors.hover,
        border: isSelected && `1px solid ${tagColors.selected.hover}`,
      },
      '&:hover:after': {
        content: "''",
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        bottom: '-2px',
        right: '-2px',
        border: `1px solid ${colors.border}`,
        borderRadius: '22px',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: isLoading ? colors.active : colors.focus,
        ':after': {
          content: "''",
          position: 'absolute',
          top: isSelected ? '-10px' : '-11px',
          left: isSelected ? '-10px' : '-11px',
          bottom: isSelected ? '-10px' : '-11px',
          right: isSelected ? '-10px' : '-11px',
          border: `${isSelected ? '2px' : '3px'} solid ${colors.outline}`,
          margin: '5px',
          borderRadius: '25px',
        },
      },
      '&:active': {
        backgroundColor: colors.active,
        border: isSelected && `1px solid ${colors.active}`,
      },
      ':after': {
        content: "''",
      },
    }
  }
)

const StyledText = styled.span({
  marginLeft: '0.5rem',
})

const TagItem = forwardRef(({ children, isSelected, isLoading, onClick, ...rest }, ref) => {
  const handleClick = () => {
    onClick(children)
  }

  return (
    <StyledTagButton
      {...safeRest(rest)}
      ref={ref}
      between={2}
      inline
      isSelected={isSelected}
      isLoading={isLoading}
      tag="button"
      role="switch"
      aria-checked={isSelected}
      onClick={handleClick}
    >
      <StyledText>{children}</StyledText>
      <Print invert={isSelected} />
    </StyledTagButton>
  )
})

TagItem.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
}

TagItem.defaultProps = {
  isSelected: false,
  isLoading: false,
  onClick: undefined,
}

TagItem.displayName = 'TagItem'

export default TagItem