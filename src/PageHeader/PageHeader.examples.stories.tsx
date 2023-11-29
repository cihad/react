import React from 'react'
import {Meta} from '@storybook/react'
import {Button, IconButton, Breadcrumbs, Link, Text, StateLabel, BranchName, Box, PageLayout} from '..'
import {
  KebabHorizontalIcon,
  GitBranchIcon,
  CodeIcon,
  CommentDiscussionIcon,
  CommitIcon,
  ChecklistIcon,
  FileDiffIcon,
  ArrowRightIcon,
  TriangleDownIcon,
  CheckIcon,
  CopyIcon,
} from '@primer/octicons-react'

import {PageHeader} from './PageHeader'
import {Hidden} from '../Hidden'
import {UnderlineNav} from '../UnderlineNav'
import {ActionMenu} from '../ActionMenu'
import {ActionList} from '../ActionList'

const meta: Meta = {
  title: 'Drafts/Components/PageHeader/Examples',
  parameters: {
    layout: 'fullscreen',
    controls: {expanded: true},
  },
  args: {},
}

const setViewportParamToNarrow = {
  viewport: {
    defaultViewport: 'small',
  },
}
export const Webhooks = () => (
  <Box sx={{padding: 3}}>
    <PageHeader>
      <PageHeader.TitleArea>
        <PageHeader.Title as="h2">Webhooks</PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.ContextArea>
        <PageHeader.ParentLink href="http://github.com">Repository settings</PageHeader.ParentLink>
        <PageHeader.ContextBar>context bar</PageHeader.ContextBar>
        <PageHeader.ContextAreaActions>
          <Button>Context action</Button>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextArea>
      <PageHeader.LeadingAction>
        <IconButton aria-label="More webhooks actions" icon={KebabHorizontalIcon} />
      </PageHeader.LeadingAction>
      <PageHeader.TrailingAction>
        <IconButton aria-label="More webhooks actions" icon={KebabHorizontalIcon} />
      </PageHeader.TrailingAction>
      <PageHeader.Actions>
        <Hidden when={['narrow']}>
          <Button variant="primary">New webhook</Button>
        </Hidden>
        <Hidden when={['regular', 'wide']}>
          <Button variant="primary">New</Button>
        </Hidden>
      </PageHeader.Actions>
    </PageHeader>
  </Box>
)

export const WebhooksOnNarrowViewport = () => {
  return <Webhooks />
}

WebhooksOnNarrowViewport.parameters = setViewportParamToNarrow

export const PullRequestPage = () => (
  <Box sx={{padding: 3}}>
    <PageHeader>
      <PageHeader.TitleArea>
        <PageHeader.Title as="h1">
          PageHeader component initial layout explorations extra long pull request title
        </PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.ContextArea>
        <PageHeader.ParentLink href="http://github.com">Pull requests</PageHeader.ParentLink>
      </PageHeader.ContextArea>
      <PageHeader.Actions>
        <Hidden when={['regular', 'wide']}>
          <ActionMenu>
            <ActionMenu.Anchor>
              <IconButton aria-label="More pull request actions" icon={KebabHorizontalIcon} />
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="small">
              <ActionList>
                <ActionList.Item onSelect={() => alert('Edit button action')}>Edit</ActionList.Item>
                <ActionList.Item onSelect={() => alert('Code button action')}>Code</ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Hidden>
        <Hidden when={['narrow']}>
          <Box sx={{display: 'flex'}}>
            <Button>Edit</Button>
            <Button leadingVisual={CodeIcon}>Code</Button>
          </Box>
        </Hidden>
      </PageHeader.Actions>
      <PageHeader.Description>
        <StateLabel status="pullOpened">Open</StateLabel>
        <Hidden when={['narrow']}>
          <Text sx={{fontSize: 1, color: 'fg.muted'}}>
            <Link href="https://github.com/broccolinisoup" sx={{fontWeight: 'bold'}}>
              broccolinisoup
            </Link>{' '}
            wants to merge 3 commits into <BranchName href="https://github.com/primer/react">main</BranchName> from{' '}
            <BranchName href="https://github.com/primer/react">bs/pageheader-title</BranchName>
          </Text>
        </Hidden>
        <Hidden when={['regular', 'wide']}>
          <Text sx={{fontSize: 1, color: 'fg.muted'}}>
            <BranchName href="https://github.com/primer/react">main</BranchName>
            <ArrowRightIcon />
            <BranchName href="https://github.com/primer/react">page-header-initial</BranchName>
          </Text>
        </Hidden>
      </PageHeader.Description>
      <PageHeader.Navigation>
        <UnderlineNav aria-label="Pull Request">
          <UnderlineNav.Item icon={CommentDiscussionIcon} counter="12" aria-current="page">
            Conversation
          </UnderlineNav.Item>
          <UnderlineNav.Item counter={3} icon={CommitIcon}>
            Commits
          </UnderlineNav.Item>
          <UnderlineNav.Item counter={7} icon={ChecklistIcon}>
            Checks
          </UnderlineNav.Item>
          <UnderlineNav.Item counter={4} icon={FileDiffIcon}>
            Files Changes
          </UnderlineNav.Item>
        </UnderlineNav>
      </PageHeader.Navigation>
    </PageHeader>
  </Box>
)

export const IssuesPage = () => (
  <Box sx={{padding: 3}}>
    <PageHeader>
      <PageHeader.TitleArea>
        <PageHeader.Title as="h1">
          PageHeader component initial layout explorations extra long pull request title
          <Link
            sx={{color: 'rgb(101, 109, 118)', textDecoration: 'none', fontWeight: '400', paddingLeft: '4px'}}
            href="https://github.com/github/primer/issues/3978"
          >
            #3978
          </Link>
        </PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.ContextArea>
        <PageHeader.ParentLink href="http://github.com">Pull requests</PageHeader.ParentLink>
      </PageHeader.ContextArea>
      <PageHeader.Actions>
        <Hidden when={['regular', 'wide']}>
          <ActionMenu>
            <ActionMenu.Anchor>
              <IconButton aria-label="More pull request actions" icon={KebabHorizontalIcon} />
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="small">
              <ActionList>
                <ActionList.Item onSelect={() => alert('Edit button action')}>Edit</ActionList.Item>
                <ActionList.Item onSelect={() => alert('Code button action')}>Code</ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Hidden>
        <Hidden when={['narrow']}>
          <Box sx={{display: 'flex', gap: '8px'}}>
            <Button>Edit</Button>
            <Button variant="primary">New Issue</Button>
            <IconButton size="small" variant="invisible" aria-label="Copy to clipboard" icon={CopyIcon} />
            <Hidden when={['narrow']}>
              <ActionMenu>
                <ActionMenu.Anchor>
                  <IconButton variant="invisible" aria-label="More pull request actions" icon={KebabHorizontalIcon} />
                </ActionMenu.Anchor>
                <ActionMenu.Overlay width="small">
                  <ActionList>
                    <ActionList.Item onSelect={() => alert('Edit button action')}>Edit</ActionList.Item>
                    <ActionList.Item onSelect={() => alert('Code button action')}>Code</ActionList.Item>
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Hidden>
          </Box>
        </Hidden>
      </PageHeader.Actions>
      <PageHeader.Description>
        <StateLabel status="pullOpened">Open</StateLabel>
      </PageHeader.Description>
    </PageHeader>
  </Box>
)

export const PullRequestPageOnNarrowViewport = () => {
  return <PullRequestPage />
}

PullRequestPageOnNarrowViewport.parameters = setViewportParamToNarrow

export const FilesPage = () => (
  <Box sx={{padding: 3}}>
    <PageHeader>
      <PageHeader.TitleArea>
        <Text sx={{color: 'rgb(101, 109, 118)'}}>/</Text>
        <PageHeader.Title as="h1" sx={{fontSize: 1}}>
          PageHeader.tsx
        </PageHeader.Title>
      </PageHeader.TitleArea>

      <PageHeader.ContextArea>
        <PageHeader.ParentLink href="/">Files</PageHeader.ParentLink>
        <PageHeader.ContextAreaActions>
          <ActionMenu>
            <ActionMenu.Anchor>
              <Button size="small" leadingVisual={GitBranchIcon} trailingVisual={TriangleDownIcon}>
                Main
              </Button>
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="medium">
              <ActionList>
                <ActionList.Item onSelect={() => alert('Main')}>
                  <ActionList.LeadingVisual>
                    <CheckIcon />
                  </ActionList.LeadingVisual>
                  main <ActionList.TrailingVisual>default</ActionList.TrailingVisual>
                </ActionList.Item>
                <ActionList.Item onSelect={() => alert('Branch 1')}>branch-1</ActionList.Item>
                <ActionList.Item onSelect={() => alert('Branch 2')}>branch-2</ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>

          <ActionMenu>
            <ActionMenu.Anchor>
              <IconButton size="small" aria-label="More file actions" icon={KebabHorizontalIcon} />
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="medium">
              <ActionList>
                <ActionList.Group title="Raw file content">
                  <ActionList.Item onSelect={() => alert('Download')}>Download</ActionList.Item>
                </ActionList.Group>
                <ActionList.Divider />
                <ActionList.Item onSelect={() => alert('Jump to line')}>
                  Jump to line
                  <ActionList.TrailingVisual>L</ActionList.TrailingVisual>
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item onSelect={() => alert('Copy path')}>
                  Copy path
                  <ActionList.TrailingVisual>⌘⇧.</ActionList.TrailingVisual>
                </ActionList.Item>
                <ActionList.Item onSelect={() => alert('Copy permalink')}>
                  Copy permalink
                  <ActionList.TrailingVisual>⌘⇧,</ActionList.TrailingVisual>
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Group title="View Options">
                  <ActionList.Item onSelect={() => alert('Show code folding buttons')}>
                    Show code folding buttons
                  </ActionList.Item>
                  <ActionList.Item onSelect={() => alert('Wrap lines')}>Wrap lines</ActionList.Item>
                  <ActionList.Item onSelect={() => alert('Center content')}>Center content</ActionList.Item>
                </ActionList.Group>
                <ActionList.Divider />
                <ActionList.Item variant="danger" onSelect={() => alert('Delete file clicked')}>
                  Delete file
                  <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
                </ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </PageHeader.ContextAreaActions>
      </PageHeader.ContextArea>
      {/* This is a hack for now. Breadcrumbs are not leading visuals but for now we are displaying them under until we get the layout right. */}
      <PageHeader.LeadingAction hidden={false}>
        <Breadcrumbs>
          <Breadcrumbs.Item href="https://github.com/primer/react/tree/main">react</Breadcrumbs.Item>
          <Breadcrumbs.Item href="https://github.com/primer/react/tree/main/src">src</Breadcrumbs.Item>
          <Breadcrumbs.Item href="https://github.com/primer/react/tree/main/src/PageHeader">
            PageHeader
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </PageHeader.LeadingAction>
      <PageHeader.TrailingAction>
        <IconButton size="small" variant="invisible" aria-label="Copy to clipboard" icon={CopyIcon} />
      </PageHeader.TrailingAction>

      <PageHeader.Actions>
        <ActionMenu>
          <ActionMenu.Anchor>
            <IconButton size="small" aria-label="More file actions" icon={KebabHorizontalIcon} />
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="medium">
            <ActionList>
              <ActionList.Group title="Raw file content">
                <ActionList.Item onSelect={() => alert('Download')}>Download</ActionList.Item>
              </ActionList.Group>
              <ActionList.Divider />
              <ActionList.Item onSelect={() => alert('Jump to line')}>
                Jump to line
                <ActionList.TrailingVisual>L</ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item onSelect={() => alert('Copy path')}>
                Copy path
                <ActionList.TrailingVisual>⌘⇧.</ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Item onSelect={() => alert('Copy permalink')}>
                Copy permalink
                <ActionList.TrailingVisual>⌘⇧,</ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Divider />
              <ActionList.Group title="View Options">
                <ActionList.Item onSelect={() => alert('Show code folding buttons')}>
                  Show code folding buttons
                </ActionList.Item>
                <ActionList.Item onSelect={() => alert('Wrap lines')}>Wrap lines</ActionList.Item>
                <ActionList.Item onSelect={() => alert('Center content')}>Center content</ActionList.Item>
              </ActionList.Group>
              <ActionList.Divider />
              <ActionList.Item variant="danger" onSelect={() => alert('Delete file clicked')}>
                Delete file
                <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </PageHeader.Actions>
    </PageHeader>
  </Box>
)

export const FilesPageOnNarrowViewport = () => {
  return <FilesPage />
}

export const WithPageLayout = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.Title as="h1">
              PageHeader component initial layout explorations extra long pull request title &nbsp;
              <Text sx={{color: 'fg.muted', fontWeight: 'light'}}>#1831</Text>
            </PageHeader.Title>
          </PageHeader.TitleArea>
          <PageHeader.ContextArea>
            <PageHeader.ParentLink href="http://github.com">Pull requests</PageHeader.ParentLink>
          </PageHeader.ContextArea>
          <PageHeader.Actions>
            <Hidden when={['regular', 'wide']}>
              {/* Pop up actions */}
              <ActionMenu>
                <ActionMenu.Anchor>
                  <IconButton aria-label="More pull request actions" icon={KebabHorizontalIcon} />
                </ActionMenu.Anchor>
                <ActionMenu.Overlay width="small">
                  <ActionList>
                    <ActionList.Item onSelect={() => alert('Edit button action')}>Edit</ActionList.Item>
                    <ActionList.Item onSelect={() => alert('Code button action')}>Code</ActionList.Item>
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Hidden>

            <Hidden when={['narrow']}>
              <Box sx={{display: 'flex'}}>
                <Button>Edit</Button>
                <Button leadingVisual={CodeIcon}>Code</Button>
              </Box>
            </Hidden>
          </PageHeader.Actions>
          <PageHeader.Description>
            <StateLabel status="pullOpened">Open</StateLabel>
            <Hidden when={['narrow']}>
              <Text sx={{fontSize: 1, color: 'fg.muted'}}>
                <Link href="https://github.com/broccolinisoup" sx={{fontWeight: 'bold'}}>
                  broccolinisoup
                </Link>{' '}
                wants to merge 3 commits into <BranchName href="https://github.com/primer/react">main</BranchName> from{' '}
                <BranchName href="https://github.com/primer/react">
                  broccolinisoup/switch-to-new-underlineNav
                </BranchName>
              </Text>
            </Hidden>
            <Hidden when={['regular', 'wide']}>
              <Text sx={{fontSize: 1, color: 'fg.muted'}}>
                <BranchName href="https://github.com/primer/react">main</BranchName>
                <ArrowRightIcon />
                <BranchName href="https://github.com/primer/react">page-header-initial</BranchName>
              </Text>
            </Hidden>
          </PageHeader.Description>
          <PageHeader.Navigation>
            <UnderlineNav aria-label="Pull Request">
              <UnderlineNav.Item icon={CommentDiscussionIcon} counter="12" aria-current="page">
                Conversation
              </UnderlineNav.Item>
              <UnderlineNav.Item counter={3} icon={CommitIcon}>
                Commits
              </UnderlineNav.Item>
              <UnderlineNav.Item counter={7} icon={ChecklistIcon}>
                Checks
              </UnderlineNav.Item>
              <UnderlineNav.Item counter={4} icon={FileDiffIcon}>
                Files Changes
              </UnderlineNav.Item>
            </UnderlineNav>
          </PageHeader.Navigation>
        </PageHeader>
      </PageLayout.Header>
      <PageLayout.Content>
        <Box sx={{border: '1px solid', borderRadius: 2, borderColor: 'border.default', height: 200}}></Box>
      </PageLayout.Content>
      <PageLayout.Pane>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          <Box>
            <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Assignees</Text>

            <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed', display: 'flex', alignItems: 'center'}}>
              No one —
              <Button
                variant="invisible"
                onClick={() => {
                  alert('Assign yourself')
                }}
                sx={{color: 'fg.muted'}}
              >
                assign yourself
              </Button>
            </Text>
          </Box>
          <Box role="separator" sx={{width: '100%', height: 1, backgroundColor: 'border.default'}}></Box>
          <Box>
            <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Labels</Text>
            <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>None yet</Text>
          </Box>
        </Box>
      </PageLayout.Pane>
    </PageLayout>
  )
}

FilesPageOnNarrowViewport.parameters = setViewportParamToNarrow

export default meta
