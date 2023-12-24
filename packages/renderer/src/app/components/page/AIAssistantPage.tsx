import { Component, createSignal } from "solid-js";
import { Row } from "../base/Flex";
import { Button } from "@fluentui/web-components";

interface Props {}

const AIAssistant: Component<Props> = (props: Props) => {
  const [count, setCount] = createSignal(0);
  return (
    <Row>
      <fluent-button appearance="lightweight">Hello world</fluent-button>
    </Row>
  );
};

export default AIAssistant;
