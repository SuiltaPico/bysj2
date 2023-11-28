import { Component, createSignal } from 'solid-js'
import { Row } from '../base/Flex'

interface Props {
}

const AIAssistant: Component<Props> = (props: Props) => {
  const [count, setCount] = createSignal(0)
  return <Row></Row>
}

export default AIAssistant
