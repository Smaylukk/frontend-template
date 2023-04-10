import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { UserType } from '../../store/UserStore'
import { Button, Form, Modal } from 'react-bootstrap'
import { $authHost } from '../../http'

interface IPostModalProps {
  show: boolean
  onHide: () => void
  update: () => void
}
const PostModal = observer(({ show, onHide, update }: IPostModalProps) => {
  const { userStore } = useContext(Context) as UserType
  const [body, setBody] = useState('')

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      body,
      userId: userStore.user.id,
    }
    $authHost.post(`/api/post`, data).then((res) => {
      update()
      onHide()
    })
  }

  useEffect(() => {
    if (show) {
      setBody('')
    }
  }, [show])

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>Нова публікація</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id={'formPost'} onSubmit={submitHandler}>
            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value)
              }}
            ></textarea>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Закрити
          </Button>
          <Button type={'submit'} form={'formPost'}>
            Зберегти
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})

export default PostModal
