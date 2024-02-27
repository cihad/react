import {SearchIcon, TriangleDownIcon} from '@primer/octicons-react'
import React, {useCallback, useMemo} from 'react'
import type {AnchoredOverlayProps} from '../AnchoredOverlay'
import {AnchoredOverlay} from '../AnchoredOverlay'
import type {AnchoredOverlayWrapperAnchorProps} from '../AnchoredOverlay/AnchoredOverlay'
import Box from '../Box'
import type {FilteredActionListProps} from '../FilteredActionList'
import {FilteredActionList} from '../FilteredActionList'
import Heading from '../Heading'
import type {OverlayProps} from '../Overlay'
import type {TextInputProps} from '../TextInput'
import type {ItemProps} from '../deprecated/ActionList'
import type {ItemInput} from '../deprecated/ActionList/List'
import {Button} from '../Button'
import {useProvidedRefOrCreate} from '../hooks'
import type {FocusZoneHookSettings} from '../hooks/useFocusZone'
import {useId} from '../hooks/useId'
import {useProvidedStateOrCreate} from '../hooks/useProvidedStateOrCreate'
import {LiveRegion, LiveRegionOutlet, Message} from '../internal/components/LiveRegion'

interface SelectPanelSingleSelection {
  selected: ItemInput | undefined
  onSelectedChange: (selected: ItemInput | undefined) => void
}

interface SelectPanelMultiSelection {
  selected: ItemInput[]
  onSelectedChange: (selected: ItemInput[]) => void
}

interface SelectPanelBaseProps {
  // TODO: Make `title` required in the next major version
  title?: string | React.ReactElement
  subtitle?: string | React.ReactElement
  onOpenChange: (
    open: boolean,
    gesture: 'anchor-click' | 'anchor-key-press' | 'click-outside' | 'escape' | 'selection',
  ) => void
  placeholder?: string
  // TODO: Make `inputLabel` required in next major version
  inputLabel?: string
  overlayProps?: Partial<OverlayProps>
}

export type SelectPanelProps = SelectPanelBaseProps &
  Omit<FilteredActionListProps, 'selectionVariant'> &
  Pick<AnchoredOverlayProps, 'open'> &
  AnchoredOverlayWrapperAnchorProps &
  (SelectPanelSingleSelection | SelectPanelMultiSelection)

function isMultiSelectVariant(
  selected: SelectPanelSingleSelection['selected'] | SelectPanelMultiSelection['selected'],
): selected is SelectPanelMultiSelection['selected'] {
  return Array.isArray(selected)
}

const focusZoneSettings: Partial<FocusZoneHookSettings> = {
  // Let FilteredActionList handle focus zone
  disabled: true,
}

export function SelectPanel({
  open,
  onOpenChange,
  renderAnchor = props => {
    const {children, ...rest} = props
    return (
      <Button trailingAction={TriangleDownIcon} {...rest}>
        {children}
      </Button>
    )
  },
  anchorRef: externalAnchorRef,
  placeholder,
  placeholderText = 'Filter items',
  inputLabel = placeholderText,
  selected,
  title = isMultiSelectVariant(selected) ? 'Select items' : 'Select an item',
  subtitle,
  onSelectedChange,
  filterValue: externalFilterValue,
  onFilterChange: externalOnFilterChange,
  items,
  textInputProps,
  overlayProps,
  sx,
  ...listProps
}: SelectPanelProps): JSX.Element {
  const titleId = useId()
  const subtitleId = useId()
  const [filterValue, setInternalFilterValue] = useProvidedStateOrCreate(externalFilterValue, undefined, '')
  const onFilterChange: FilteredActionListProps['onFilterChange'] = useCallback(
    (value, e) => {
      externalOnFilterChange(value, e)
      setInternalFilterValue(value)
    },
    [externalOnFilterChange, setInternalFilterValue],
  )

  const anchorRef = useProvidedRefOrCreate(externalAnchorRef)
  const onOpen: AnchoredOverlayProps['onOpen'] = useCallback(
    (gesture: Parameters<Exclude<AnchoredOverlayProps['onOpen'], undefined>>[0]) => onOpenChange(true, gesture),
    [onOpenChange],
  )
  const onClose = useCallback(
    (gesture: Parameters<Exclude<AnchoredOverlayProps['onClose'], undefined>>[0] | 'selection') => {
      onOpenChange(false, gesture)
    },
    [onOpenChange],
  )

  const renderMenuAnchor = useMemo(() => {
    if (renderAnchor === null) {
      return null
    }

    const selectedItems = Array.isArray(selected) ? selected : [...(selected ? [selected] : [])]

    return <T extends React.HTMLAttributes<HTMLElement>>(props: T) => {
      return renderAnchor({
        ...props,
        children: selectedItems.length ? selectedItems.map(item => item.text).join(', ') : placeholder,
      })
    }
  }, [placeholder, renderAnchor, selected])

  const testIsItemSelected = React.useCallback((selectedItem: ItemInput, item: ItemInput) => {
    const itemType = typeof selectedItem
    if (itemType === 'object') {
      if (selectedItem.hasOwnProperty('id')) {
        return selectedItem.id === item.id
      }
    }

    return selectedItem === item
  }, [])

  const itemsToRender = useMemo(() => {
    return items.map(item => {
      const isItemSelected = isMultiSelectVariant(selected)
        ? selected.some(selectedItem => {
            return testIsItemSelected(selectedItem, item)
          })
        : selected === item

      return {
        ...item,
        role: 'option',
        selected: 'selected' in item && item.selected === undefined ? undefined : isItemSelected,
        onAction: (itemFromAction, event) => {
          item.onAction?.(itemFromAction, event)

          if (event.defaultPrevented) {
            return
          }

          if (isMultiSelectVariant(selected)) {
            const wasPreviouslySelected = selected.some(selectedItem => {
              return testIsItemSelected(selectedItem, item)
            })
            const otherSelectedItems = selected.filter(selectedItem => {
              return !testIsItemSelected(selectedItem, item)
            })
            const newSelectedItems = wasPreviouslySelected ? otherSelectedItems : [...otherSelectedItems, item]

            const multiSelectOnChange = onSelectedChange as SelectPanelMultiSelection['onSelectedChange']
            multiSelectOnChange(newSelectedItems)
            return
          }

          // single select
          const singleSelectOnChange = onSelectedChange as SelectPanelSingleSelection['onSelectedChange']
          singleSelectOnChange(item === selected ? undefined : item)
          onClose('selection')
        },
      } as ItemProps
    })
  }, [onClose, onSelectedChange, items, selected, testIsItemSelected])

  const inputRef = React.useRef<HTMLInputElement>(null)
  const focusTrapSettings = {
    initialFocusRef: inputRef,
  }

  const extendedTextInputProps: Partial<TextInputProps> = useMemo(() => {
    return {
      sx: {m: 2},
      contrast: true,
      leadingVisual: SearchIcon,
      'aria-label': inputLabel,
      ...textInputProps,
    }
  }, [inputLabel, textInputProps])

  return (
    <LiveRegion>
      <AnchoredOverlay
        renderAnchor={renderMenuAnchor}
        anchorRef={anchorRef}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        overlayProps={{
          role: 'dialog',
          'aria-labelledby': titleId,
          'aria-describedby': subtitle ? subtitleId : undefined,
          ...overlayProps,
        }}
        focusTrapSettings={focusTrapSettings}
        focusZoneSettings={focusZoneSettings}
      >
        <LiveRegionOutlet />
        <Message
          value={
            filterValue === ''
              ? 'Showing all items'
              : items.length <= 0
              ? 'No matching items'
              : `${items.length} matching ${items.length === 1 ? 'item' : 'items'}`
          }
        />
        <Box sx={{display: 'flex', flexDirection: 'column', height: 'inherit', maxHeight: 'inherit'}}>
          <Box sx={{pt: 2, px: 3}}>
            <Heading as="h1" id={titleId} sx={{fontSize: 1}}>
              {title}
            </Heading>
            {subtitle ? (
              <Box id={subtitleId} sx={{fontSize: 0, color: 'fg.muted'}}>
                {subtitle}
              </Box>
            ) : null}
          </Box>
          <FilteredActionList
            filterValue={filterValue}
            onFilterChange={onFilterChange}
            placeholderText={placeholderText}
            {...listProps}
            role="listbox"
            aria-multiselectable={isMultiSelectVariant(selected) ? 'true' : 'false'}
            selectionVariant={isMultiSelectVariant(selected) ? 'multiple' : 'single'}
            items={itemsToRender}
            textInputProps={extendedTextInputProps}
            inputRef={inputRef}
            // inheriting height and maxHeight ensures that the FilteredActionList is never taller
            // than the Overlay (which would break scrolling the items)
            sx={{...sx, height: 'inherit', maxHeight: 'inherit'}}
          />
        </Box>
      </AnchoredOverlay>
    </LiveRegion>
  )
}

SelectPanel.displayName = 'SelectPanel'
