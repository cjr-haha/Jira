import React, { Fragment, useCallback, useMemo, useState } from "react";
import styles from "../index.less";
import ListBox from "./ListBox";

const ItemBox = ({ data: item_data }) => {
  const [showChildren, setShowChildren] = useState(false);

  const isShowExpendsFlag = useMemo(() => {
    return Array.isArray(item_data.children) && item_data.children.length > 0;
  }, [item_data]);

  const clickExpendsFlag = useCallback(
    (e) => {
      setShowChildren(true);
      e.stopPropagation();
    },
    [setShowChildren]
  );
  return (
    <Fragment>
      <div className={styles.ItemBox}>
        <div>{item_data.dataValue}</div>
        {isShowExpendsFlag && (
          <div className={styles.openFlag_right} onClick={clickExpendsFlag}>
            展开符号
          </div>
        )}

        {showChildren && (
          <div className={styles.ItemBox_children}>
            <ListBox data={item_data.children} />
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default ItemBox;
