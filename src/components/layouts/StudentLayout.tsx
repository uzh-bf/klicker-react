import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Icon } from 'semantic-ui-react'

import CommonLayout from './CommonLayout'
import Sidebar from '../common/sidebar/Sidebar'

interface Props {
  children: React.ReactNode
  isAuthenticationEnabled?: boolean
  isInteractionEnabled?: boolean
  pageTitle?: string
  sidebar: any
  subscribeToMore: () => void
  title: string
}

const defaultProps = {
  isAuthenticationEnabled: false,
  isInteractionEnabled: false,
  pageTitle: 'StudentLayout',
}

function StudentLayout({
  children,
  isAuthenticationEnabled,
  isInteractionEnabled,
  pageTitle,
  sidebar,
  title,
  subscribeToMore,
}: Props): React.ReactElement {
  useEffect((): void => {
    subscribeToMore()
  }, [])

  const activeQuestionItem = {
    href: 'activeQuestion',
    label: <FormattedMessage defaultMessage="Active Question" id="joinSession.sidebar.activeQuestion" />,
    name: 'activeQuestion',
  }
  const feedbackChannelItem = {
    href: 'feedbackChannel',
    label: <FormattedMessage defaultMessage="Feedback-Channel" id="joinSession.sidebar.feedbackChannel" />,
    name: 'feedbackChannel',
  }

  const sidebarItems = isInteractionEnabled ? [activeQuestionItem, feedbackChannelItem] : [activeQuestionItem]

  return (
    <CommonLayout baseFontSize="16px" nextHeight="100%" pageTitle={pageTitle}>
      <div className="studentLayout">
        <div className="header">
          <Button
            basic
            active={sidebar.sidebarVisible}
            disabled={sidebarItems.length === 1}
            icon="content"
            onClick={sidebar.handleToggleSidebarVisible}
          />

          <h1 className="pageTitle">
            {isAuthenticationEnabled && <Icon color="green" name="lock" />} {title}
          </h1>
          <Button basic icon="refresh" onClick={(): void => window.location.reload()} />
        </div>

        <div className="content">
          <Sidebar
            activeItem={sidebar.activeItem}
            handleSidebarItemClick={sidebar.handleSidebarActiveItemChange}
            items={sidebarItems}
            visible={sidebar.sidebarVisible}
          >
            {children}
          </Sidebar>
        </div>

        <style jsx>
          {`
            @import 'src/theme';

            .studentLayout {
              display: flex;
              flex-direction: column;

              min-height: 100%;

              .header {
                flex: 0 0 auto;

                display: flex;
                justify-content: space-between;

                align-items: center;

                border-bottom: 1px solid lightgrey;
                padding: 0.3rem;

                :global(button) {
                  margin: 0;
                }
              }

              .pageTitle {
                font-size: 1.1rem !important;
                margin: 0;
              }

              .content {
                flex: 1;

                display: flex;
              }

              @include desktop-tablet-only {
                .header {
                  display: none;
                }
              }
            }
          `}
        </style>
      </div>
    </CommonLayout>
  )
}

StudentLayout.defaultProps = defaultProps

export default StudentLayout
