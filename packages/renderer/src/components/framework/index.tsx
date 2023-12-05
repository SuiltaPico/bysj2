import { splitProps, type ParentComponent } from "solid-js";
import { Column, Row } from "../base/Flex";

const LeftDrawer: ParentComponent<{}> = (props) => {
  return <Column></Column>;
};

const Framwork: ParentComponent<{}> = (props) => {
  const [children, others] = splitProps(props, ["children"]);
  return (
    <Row {...others}>
      <LeftDrawer></LeftDrawer>
      <Row {...children}></Row>
    </Row>
  );
};

export default Framwork;
