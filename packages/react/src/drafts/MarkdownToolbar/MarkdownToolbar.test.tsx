import React from 'react'
import {render, behavesAsComponent} from '../../utils/testing'
import {render as HTMLRender} from '@testing-library/react'
import {axe} from 'jest-axe'

import MarkdownToolbar from '../MarkdownToolbar'

describe('MarkdownToolbar', () => {
  behavesAsComponent({
    Component: MarkdownToolbar,
    options: {skipAs: true, skipSx: true},
    toRender: () => <MarkdownToolbar for="dummy" />,
  })

  it('renders a <markdown-toolbar>', () => {
    expect(render(<MarkdownToolbar for="dummy" />).type).toEqual('markdown-toolbar')
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<MarkdownToolbar for="dummy">hello</MarkdownToolbar>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
