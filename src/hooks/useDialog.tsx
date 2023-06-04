import { useCallback, useId, useState } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'

type Params = {
  title: React.ReactNode
  content: React.ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

export const useDialog = () => {
  const id = useId()
  const [params, setParams] = useState<Params>()

  const dialog = params && <Dialog id={id} {...params} />

  const openDialog = useCallback(
    (params: Params) => {
      setParams(params)
      window.requestAnimationFrame(() => {
        // @ts-expect-error
        window[id]?.showModal()
      })
    },
    [id]
  )

  return {
    dialog,
    openDialog,
  }
}

type Props = {
  id: string
} & Params

function Dialog(props: Props) {
  return (
    <dialog id={props.id} className='modal'>
      <form method='dialog' className='modal-box'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          <HiOutlineXMark className='w-5 h-5' />
        </button>
        <h3 className='font-bold text-lg'>{props.content}</h3>
        <div className='py-4'>{props.content}</div>
        <div>
          <button className='btn btn-ghost'>Cancel</button>
          {props.onConfirm && (
            <button className='btn' onClick={props.onConfirm}>
              Confirm
            </button>
          )}
        </div>
      </form>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
