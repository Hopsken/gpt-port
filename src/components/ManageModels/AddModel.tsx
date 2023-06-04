import { Button, Menu } from '@mantine/core'
import { useState } from 'react'
import { GenericForm } from '../Form/GenericForm'
import { AzureAIModelProviderFields, OpenAIModelProviderFields } from './config'
import { useAddModel } from '@/hooks/useModels'

export default function AddModel() {
  const [provider, setProvider] = useState<'openai' | 'azure'>()
  const mutation = useAddModel()

  const onSubmit = (data: ModelProvider) => {
    mutation.trigger(data)
    setProvider(undefined)
  }

  const onCancel = () => {
    setProvider(undefined)
  }

  function renderProviderForm() {
    if (provider === 'openai') {
      return (
        <GenericForm
          fields={OpenAIModelProviderFields}
          onSubmit={data =>
            onSubmit({ ...data, type: 'openai' } as ModelProvider)
          }
          onCancel={onCancel}
        />
      )
    }

    if (provider === 'azure') {
      return (
        <GenericForm
          fields={AzureAIModelProviderFields}
          onSubmit={data =>
            onSubmit({ ...data, type: 'azure' } as ModelProvider)
          }
        />
      )
    }

    return null
  }

  function renderTrigger() {
    return (
      <Menu width={200} shadow='md' position='bottom-start'>
        <Menu.Target>
          <Button variant='outline'>Add Model</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => setProvider('openai')}>
            Import OpenAI Model
          </Menu.Item>

          <Menu.Item onClick={() => setProvider('azure')}>
            Import Azure Model
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return renderProviderForm() || renderTrigger()
}
