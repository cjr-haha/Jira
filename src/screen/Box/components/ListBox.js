import React, { Fragment, useCallback, useState } from "react";
import ItemBox from "./ItemBox";
import styles from "../index.less";

const KEY = "dataId";
const ListBox = ({ data = [], choiceItem, setChoiceItem }) => {
  const changeSetChoiceItem = useCallback(
    (data, e) => {
      let hasItem = false;
      if (Array.isArray(choiceItem)) {
        let i = 0;
        try {
          while (i < choiceItem.length) {
            if (data.value === choiceItem[i].value) {
              hasItem = true;
              throw Error("找到了");
            }
          }
        } catch (e) {
          hasItem = true;
        }
      }
      if (!hasItem) return setChoiceItem([...choiceItem, { ...data }]);
      const _choiceItem = !choiceItem
        ? [data]
        : choiceItem.filter((item) => item.value !== data.value);
      setChoiceItem([..._choiceItem]);
    },
    [setChoiceItem, choiceItem]
  );
  const checkIfItemSelected = useCallback(
    (item) => {
      const hasNotChildren =
        !Array.isArray(item.children) || item.children.length == 0;
      const hasSelected = JSON.stringify(choiceItem || "").includes(item.value);
      return hasNotChildren && hasSelected;
    },
    [choiceItem]
  );
  return (
    <Fragment>
      <div className={styles.ListBox}>
        {data.map((item, index) => (
          <ItemBox
            key={item[KEY]}
            data={item}
            onClick={(e) => changeSetChoiceItem(item, e)}
            className={checkIfItemSelected(item) ? "active" : ""}
          />
        ))}
      </div>
    </Fragment>
  );
};
export default ListBox;
