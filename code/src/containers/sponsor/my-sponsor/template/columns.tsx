import EditIcon from '@/components/icons/EditIcon'
import { Text3th400Styled, Text3th700Styled } from '@/components/styled'
import { Tooltip } from 'antd'
import { TFunction } from 'i18next'
import { NextRouter } from 'next/router'

export const columns = (t: TFunction, router: NextRouter, isMobile: boolean) => {
  return [
    {
      title: t('NUMBER'),
      dataIndex: 'no',
      key: 'no',
      width: isMobile ? '2%' : '10%',
      render: (text: string, record: any, index: number) => {
        return <Text3th400Styled>{index + 1}</Text3th400Styled>
      }
    },
    {
      title: t('TEMPLATE_NAME'),
      dataIndex: 'template',
      key: 'template',
      width: isMobile ? '5%' : '15%',
      render: (text: string) => {
        const renderTP = (type: string) => {
          const TYPE_TP = {
            TEMPLATE_1: 'テンプレート名_1',
            TEMPLATE_2: 'テンプレート名_2'
          }

          return TYPE_TP[type]
        }

        return <Text3th400Styled>{renderTP(text)}</Text3th400Styled>
      }
    },
    {
      title: t('TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: isMobile ? '20%' : '30%',
      render: (text: string) => {
        return (
          <Tooltip title={text}>
            <Text3th400Styled className='title-column text-nowrap-1'>{text}</Text3th400Styled>
          </Tooltip>
        )
      }
    },
    {
      title: t('PUBLIC_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: isMobile ? '8%' : '25%',
      render: (text: string) => {
        const renderStatus = (text: string) => {
          const STATUS = {
            PUBLIC: {
              text: t('PUBLIC'),
              className: 'public'
            },
            UN_PUBLIC: {
              text: t('UN_PUBLIC'),
              className: 'private'
            }
          }

          return STATUS[text]
        }
        return <Text3th700Styled className={renderStatus(text)?.className}>{renderStatus(text)?.text}</Text3th700Styled>
      }
    },
    {
      title: t('ACTION'),
      dataIndex: 'action',
      key: 'action',
      width: isMobile ? '3%' : '5%',
      render: (text: string, record: any) => {
        const { template, id } = record || {}
        const renderTemplate = (template: string) => {
          const TEMPLATE = {
            TEMPLATE_1: 1,
            TEMPLATE_2: 2
          }

          return TEMPLATE[template]
        }

        const handleEdit = () => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              chooseTemplate: renderTemplate(template),
              step: '3',
              typeScreen: 'edit',
              templateId: id
            }
          })
        }

        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div onClick={handleEdit}>
            <EditIcon className='hover' />
          </div>
        )
      }
    }
  ]
}
