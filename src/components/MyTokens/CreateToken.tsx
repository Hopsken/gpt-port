import { env } from '@/env.mjs'
import { useCreateToken } from '@/hooks/useTokens'
import { formatDate } from '@/utils/date'
import {
  ActionIcon,
  Button,
  CopyButton,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { useMemo, useState } from 'react'
import { HiOutlineCheck, HiOutlineClipboardDocument } from 'react-icons/hi2'
import {
  FutureDatePicker,
  getFutureDate,
  type FutureDate,
} from '../FutureDatePicker'
import { useAPIHost } from './useAPIHost'

type FormValues = {
  label: string
  expireAt: FutureDate
}

export default function CreateToken() {
  const [generating, setGenerating] = useState(false)

  const resetGenerating = () => {
    setGenerating(false)
  }

  if (generating) {
    return (
      <GenerateKeyForm onCancel={resetGenerating} onSuccess={resetGenerating} />
    )
  }

  return (
    <Button variant='outline' size={'sm'} onClick={() => setGenerating(true)}>
      New Key
    </Button>
  )
}

function CopyText(props: { title: string; text: string }) {
  return (
    <Stack spacing={'xs'}>
      <Text fw='500'>{props.title}</Text>
      <Group noWrap>
        <TextInput styles={{ root: { flex: 1 } }} readOnly value={props.text} />
        <CopyButton value={props.text} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
              <ActionIcon
                variant='light'
                onClick={copy}
                color={copied ? 'cyan' : 'blue'}
              >
                {copied ? <HiOutlineCheck /> : <HiOutlineClipboardDocument />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    </Stack>
  )
}

function GenerateKeyForm(props: {
  onCancel: () => void
  onSuccess: () => void
}) {
  const apiHost = useAPIHost()
  const form = useForm<FormValues>({
    initialValues: {
      label: '',
      expireAt: {
        type: 'preset',
        data: '7d',
      },
    },
    validate: {
      label: val => (val.length ? null : 'Label is required.'),
    },
  })

  const createKeyMutation = useCreateToken()

  const handleSubmit = async (values: FormValues) => {
    const token = await createKeyMutation.trigger(
      {
        label: values.label,
        expire: getFutureDate(values.expireAt),
      },
      {
        onSuccess: props.onSuccess,
      }
    )

    if (!token) {
      return
    }

    openConfirmModal({
      title: 'Key generated',
      centered: true,
      children: (
        <Stack>
          <Text>
            {
              "Please save this secret key somewhere safe and accessible. For security reasons, you won't be able to view it again. If you lose this secret key, you'll need to generate a new one."
            }
          </Text>
          <Stack>
            <CopyText title={'API Endpoint'} text={`${apiHost}/api/openai`} />
            <CopyText title='API Key' text={token.token} />
          </Stack>
        </Stack>
      ),
      cancelProps: { display: 'none' },
      labels: { confirm: 'Got it', cancel: 'Cancel' },
    })
  }

  return (
    <form onSubmit={form.onSubmit(values => void handleSubmit(values))}>
      <Stack>
        <Title order={2} size={'h3'}>
          New Key
        </Title>
        <TextInput
          label='Label'
          description={'A unique name for this key.'}
          withAsterisk
          {...form.getInputProps('label')}
        />
        <FutureDatePicker
          label={'Expire on'}
          description={`The token will expire on ${formatDate(
            getFutureDate(form.values['expireAt'])
          )}`}
          withAsterisk
          {...form.getInputProps('expireAt')}
        />
        <Group>
          <Button variant={'white'} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='filled'
            loading={createKeyMutation.isMutating}
            disabled={!form.isValid()}
          >
            Generate
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
