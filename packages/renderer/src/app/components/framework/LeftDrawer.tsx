import { splitProps, type ParentComponent } from "solid-js";
import { Column, Row } from "../base/Flex";

const LeftDrawer: ParentComponent<{}> = (props) => {
  return (
    <Column>
      <Row><i class="flex"></i></Row>
    </Column>
  );
};

export default LeftDrawer;
