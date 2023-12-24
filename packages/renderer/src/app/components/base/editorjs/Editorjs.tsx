import EditorJS, { EditorConfig } from "@editorjs/editorjs";
// import Paragraph from "@editorjs/paragraph";
import {
  Component,
  JSX,
  createEffect,
  on,
  onMount,
  splitProps,
} from "solid-js";
import "./Editorjs.css";
import { extract_text_from_blocks } from "/@/common/utils/editorjs";

export type EditorjsProps = {
  inst?: EditorJS;
  config: EditorConfig;
  placeholder?: string;
  onChange(data_fetcher: () => Promise<[raw: string, plain: string]>): void;
  // onFocus?: (e: FocusEvent) => void;
};

const Editorjs: Component<
  EditorjsProps & Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange">
> = (props) => {
  const [comp_props, others] = splitProps(props, [
    "ref",
    "config",
    "placeholder",
    "onChange",
    // "onFocus"
  ]);

  let holder_ref: HTMLDivElement | undefined;
  let inst: EditorJS;

  createEffect(
    on(
      () => comp_props.placeholder,
      (it) => {
        if (inst && holder_ref) {
          // inst  props.placeholder
          const first = holder_ref.querySelector(".codex-editor__redactor")
            ?.firstElementChild as HTMLElement;
          if (first) {
            first.dataset.placeholder = it;
            const fitst_block = first.querySelector(
              ".cdx-block"
            ) as HTMLElement;
            if (fitst_block) {
              fitst_block.dataset.placeholder = it;
            }
          }
        }
      }
    )
  );

  onMount(() => {
    const holder = holder_ref!;
    inst = new EditorJS({
      holder: holder,
      placeholder: comp_props.placeholder,
      async onChange(api, event) {
        props.onChange(async () => {
          const output_data = await api.saver.save();
          return [
            JSON.stringify(output_data),
            extract_text_from_blocks(output_data.blocks),
          ];
        });
      },
      ...props.config,
    });
    props.inst = inst;
    // inst.toolbar.toggleBlockSettings(false)
  });
  return <div ref={holder_ref} {...others}></div>;
};

export default Editorjs;
