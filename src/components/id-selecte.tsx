import React from "react";
import { Select, SelectProps } from "antd";
/**
 * 作者:chenjinrong
 * 时间:2023/06/30 08:20:22
 * 功能:IdSelect 是一个selecte value默认0，当value为非数字的时候转为数字，转失败为0（就是默认value）
 * onChange的时候为数字和undefined 同时 这个是一个受控组件 所以需要提供value和onchange（或者使用ref）
 *使用方法 <IdSelect value = {value} defaultName = '...' data = {data||[]} ...otherProps>
 */
const DEFAULT_VALUE = "";
const getNumber = (value: any) =>
  isNaN(value) ? DEFAULT_VALUE : Number(value);
const DEFAULT_OBJECT = { value: DEFAULT_VALUE, title: "请选择" };

const Option = Select.Option;
export interface IdSelectProps extends Omit<SelectProps, "value" | "onChange"> {
  value: number | null | undefined;
  data: { key: number | string; value: number | string }[] | null;
  defaultName?: number | string;
  onChange: (value: number) => void;
  [propName: string]: any;
}

export const IdSelect = (props: IdSelectProps) => {
  const {
    value = undefined,
    data,
    defaultName = DEFAULT_OBJECT.title,
    onChange,
    ...otherProps
  } = props;
  return (
    <Select value={value} {...otherProps} onChange={onChange}>
      {defaultName && (
        <Option value={DEFAULT_OBJECT.value}>{defaultName}</Option>
      )}
      {data?.map((item, index) => (
        <Option key={item.key} value={item.key}>
          {item.value}
        </Option>
      ))}
    </Select>
  );
};
